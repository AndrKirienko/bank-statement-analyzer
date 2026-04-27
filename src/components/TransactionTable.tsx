"use client";

import React, { useState, useMemo } from "react";
import { Transaction } from "@/lib/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface TransactionTableProps {
  data: Transaction[];
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ data }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");

  const filteredData = useMemo(() => {
    return data.filter((t) => {
      const matchesSearch =
        t.counterparty.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "income" && t.amount > 0) ||
        (filter === "expense" && t.amount < 0);

      return matchesSearch && matchesFilter;
    });
  }, [data, search, filter]);

  return (
    <Card className="w-full max-w-5xl overflow-hidden">
      <div className="flex flex-col items-center justify-between gap-4 border-b p-4 md:flex-row">
        <Input
          placeholder="Search by counterparty or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <div className="bg-muted flex rounded-md p-1">
          {(["all", "income", "expense"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-sm px-3 py-1 text-sm capitalize transition-all ${
                filter === f ? "bg-white font-medium shadow-sm" : "text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Counterparty</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length > 0 ? (
            filteredData.map((t, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{t.date}</TableCell>
                <TableCell>{t.counterparty}</TableCell>
                <TableCell className="text-muted-foreground">{t.description}</TableCell>
                <TableCell
                  className={`text-right font-bold ${t.amount > 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {t.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-muted-foreground py-10 text-center">
                No transactions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};
