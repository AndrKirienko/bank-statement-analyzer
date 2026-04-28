import { describe, it, expect } from "vitest";
import { calculateSummary, getTopExpenses } from "./statement";
import { Transaction } from "./schema";

const mockTransactions: Transaction[] = [
  { date: "2024-01-01", counterparty: "Salary", description: "Monthly", amount: 5000 },
  { date: "2024-01-02", counterparty: "Grocery Store", description: "Food", amount: -100 },
  { date: "2024-01-03", counterparty: "Grocery Store", description: "More Food", amount: -50 },
  { date: "2024-01-04", counterparty: "Rent", description: "Apartment", amount: -1000 },
  { date: "2024-01-05", counterparty: "Bonus", description: "Performance", amount: 500 },
];

describe("Statement Business Logic", () => {
  it("should correctly calculate income, expenses and balance", () => {
    const summary = calculateSummary(mockTransactions);

    expect(summary.income).toBe(5500);
    expect(summary.expenses).toBe(1150);
    expect(summary.balance).toBe(4350);
    expect(summary.count).toBe(5);
  });

  it("should group top expenses correctly and sort them", () => {
    const top = getTopExpenses(mockTransactions);

    expect(top[0].name).toBe("Rent");
    expect(top[0].total).toBe(1000);

    expect(top[1].name).toBe("Grocery Store");
    expect(top[1].total).toBe(150);
  });
});
