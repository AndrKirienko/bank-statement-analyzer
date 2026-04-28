import Papa from "papaparse";
import { transactionSchema, type Transaction, type ParseStatementResult } from "./schema";

export const parseStatementFile = (file: File): Promise<ParseStatementResult> => {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const transactions: Transaction[] = [];
        const errors: { row: number; messages: string[] }[] = [];

        results.data.forEach((row: any, index: number) => {
          const result = transactionSchema.safeParse(row);

          if (result.success) {
            transactions.push(result.data);
          } else {
            const allMessages = result.error.issues.map((issue) => issue.message);

            errors.push({
              row: index + 2,
              messages: allMessages,
            });
          }
        });
        resolve({ transactions, errors });
      },
    });
  });
};

export const calculateSummary = (transactions: Transaction[]) => {
  const income = transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return {
    income,
    expenses,
    balance: income - expenses,
    count: transactions.length,
  };
};

export const getTopExpenses = (transactions: Transaction[], limit = 5) => {
  const expenses = transactions.filter((t) => t.amount < 0);

  const grouped = expenses.reduce(
    (acc, t) => {
      const name = t.counterparty || "Unknown";
      acc[name] = (acc[name] || 0) + Math.abs(t.amount);
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.entries(grouped)
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, limit);
};

export const filterTransactions = (
  transactions: Transaction[],
  search: string,
  filter: "all" | "income" | "expense"
) => {
  const searchTerm = search.toLowerCase();

  return transactions.filter((t) => {
    const matchesSearch =
      t.counterparty.toLowerCase().includes(searchTerm) ||
      t.description.toLowerCase().includes(searchTerm);

    const matchesFilter =
      filter === "all" ||
      (filter === "income" && t.amount > 0) ||
      (filter === "expense" && t.amount < 0);

    return matchesSearch && matchesFilter;
  });
};

export const exportTransactionsToCSV = (
  data: Transaction[],
  fileName = "validated_statement.csv"
) => {
  if (data.length === 0) return;
  const csv = Papa.unparse(data);

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};
