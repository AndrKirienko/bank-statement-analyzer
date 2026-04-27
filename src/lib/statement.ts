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
