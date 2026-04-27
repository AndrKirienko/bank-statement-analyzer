import Papa from "papaparse";
import { transactionSchema, type Transaction, type ParseStatementResult } from "./schema";

export const parseStatementFile = (file: File): Promise<ParseStatementResult> => {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const transactions: Transaction[] = [];
        const errors: { row: number; message: string }[] = [];

        results.data.forEach((row: any, index: number) => {
          const result = transactionSchema.safeParse(row);
          if (result.success) {
            transactions.push(result.data);
          } else {
            errors.push({
              row: index + 2,
              message: "Invalid data format or missing fields",
            });
          }
        });

        resolve({ transactions, errors });
      },
    });
  });
};
