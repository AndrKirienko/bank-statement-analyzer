import { z } from "zod";

export const transactionSchema = z.object({
  date: z.string("Date is required").min(1, "Date is required").trim(),
  counterparty: z.string("Counterparty is required").min(1, "Counterparty is required").trim(),
  description: z.string("Description is required").min(1, "Description is required").trim(),
  amount: z.preprocess((val) => {
    if (typeof val === "string" && val.trim() === "") return undefined;
    return Number(val);
  }, z.number("Amount is required")),
});
export type Transaction = z.infer<typeof transactionSchema>;

export interface ValidationError {
  row: number;
  messages: string[];
}

export interface ParseStatementResult {
  transactions: Transaction[];
  errors: ValidationError[];
}
