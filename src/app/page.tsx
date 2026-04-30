"use client";

import React, { useState } from "react";
import { FileText } from "lucide-react";
import { parseStatementFile } from "@/lib/statement";
import { type Transaction, type ValidationError } from "@/lib/schema";
import { FileUploader } from "@/components/FileUploader";
import { ValidationErrors } from "@/components/ValidationErrors";
import { SummaryCards } from "@/components/SummaryCards";
import { TransactionTable } from "@/components/TransactionTable";
import { TopCounterparties } from "@/components/TopCounterparties";
import { ExportButton } from "@/components/ExportButton";
import { ExportJsonButton } from "@/components/ExportJsonButton";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setFileName(file.name);
    const result = await parseStatementFile(file);
    setTransactions(result.transactions);
    setErrors(result.errors);
  };

  return (
    <main className="flex min-h-screen bg-gray-50">
      <aside className="sticky top-0 flex h-screen w-[400px] flex-col gap-6 overflow-y-auto border-r bg-card p-6 shadow-sm">
        <div>
          <div className="flex justify-between">
            <h1 className="mb-6 text-2xl font-bold tracking-tight">
              Bank Statement <br /> <span className="text-blue-600">Analyzer</span>
            </h1>
            <div className="w-20">
              <ThemeToggle />
            </div>
          </div>

          <FileUploader onFileSelect={handleFileSelect} />
          {fileName && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border bg-muted/50 p-3 text-sm">
              <FileText className="h-4 w-4 text-primary" />
              <span className="truncate font-medium">{fileName}</span>
            </div>
          )}
        </div>

        <ValidationErrors errors={errors} />
      </aside>

      <section className="flex-1 overflow-y-auto bg-card p-10">
        {transactions.length > 0 ? (
          <div className="duration-500 animate-in fade-in">
            <h2 className="mb-6 text-xl font-semibold">Financial Overview</h2>

            <SummaryCards transactions={transactions} />

            <div className="mt-8">
              <h2 className="mb-4 text-xl font-semibold">Detailed Report</h2>

              <div className="flex flex-col items-start gap-6 lg:flex-row">
                <div className="w-full flex-1 overflow-hidden">
                  <TransactionTable data={transactions} />
                </div>
                <div className="w-full duration-700 animate-in fade-in slide-in-from-right-4 lg:w-fit">
                  <TopCounterparties transactions={transactions} />
                  <ExportButton data={transactions} />
                  <div className="mt-4">
                    <ExportJsonButton data={transactions} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center opacity-40">
            <div className="mb-4 text-6xl">📊</div>
            <h2 className="text-2xl font-medium">No data to display</h2>
            <p className="mt-2 text-gray-500">
              Please upload a bank statement CSV file to start the analysis.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
