import { z } from "zod";

export const transactionSchema = z.object({
  date: z.string().min(1, "Date is required"),
  counterparty: z.string().min(1, "Counterparty is required"),
  description: z.string().min(1, "Description is required"),
  amount: z.preprocess((val) => Number(val), z.number()),
});

export type Transaction = z.infer<typeof transactionSchema>;

export interface ValidationError {
  row: number;
  message: string;
}

export interface ParseStatementResult {
  transactions: Transaction[];
  errors: ValidationError[];
}
