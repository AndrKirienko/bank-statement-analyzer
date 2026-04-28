"use client";

import React, { useMemo } from "react";
import { Transaction } from "@/lib/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown } from "lucide-react";
import { getTopExpenses } from "@/lib/statement";

interface TopCounterpartiesProps {
  transactions: Transaction[];
}

export const TopCounterparties: React.FC<TopCounterpartiesProps> = ({ transactions }) => {
  const topExpenses = useMemo(() => getTopExpenses(transactions), [transactions]);

  if (topExpenses.length === 0) return null;

  return (
    <Card className="h-fit min-w-[300px]">
      <CardHeader className="flex flex-row items-center gap-2 pb-4">
        <TrendingDown className="h-5 w-5 text-red-500" />
        <CardTitle className="text-lg font-semibold">Top 5 Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {topExpenses.map((item, index) => (
            <li
              key={index}
              className="border-muted flex flex-col border-b pb-2 last:border-0 last:pb-0"
            >
              <span className="truncate text-sm font-medium text-primary" title={item.name}>
                {item.name}
              </span>
              <span className="text-lg font-bold text-red-600">-{item.total.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
