"use client";

import React, { useState } from "react";
import { parseStatementFile } from "@/lib/statement";
import { type Transaction, type ValidationError } from "@/lib/schema";
import { FileUploader } from "@/components/FileUploader";
import { ValidationErrors } from "@/components/ValidationErrors";
import { SummaryCards } from "@/components/SummaryCards";
import { TransactionTable } from "@/components/TransactionTable";
import { TopCounterparties } from "@/components/TopCounterparties";
import { ExportButton } from "@/components/ExportButton";

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const handleFileSelect = async (file: File) => {
    const result = await parseStatementFile(file);
    setTransactions(result.transactions);
    setErrors(result.errors);
  };

  return (
    <main className="flex min-h-screen bg-gray-50">
      <aside className="sticky top-0 flex h-screen w-[400px] flex-col gap-6 overflow-y-auto border-r bg-white p-6 shadow-sm">
        <div>
          <h1 className="mb-6 text-2xl font-bold tracking-tight text-gray-800">
            Bank Statement <br /> <span className="text-blue-600">Analyzer</span>
          </h1>

          <FileUploader onFileSelect={handleFileSelect} />
        </div>

        <ValidationErrors errors={errors} />
      </aside>

      <section className="flex-1 overflow-y-auto p-10">
        {transactions.length > 0 ? (
          <div className="duration-500 animate-in fade-in">
            <h2 className="mb-6 text-xl font-semibold text-gray-700">Financial Overview</h2>

            <SummaryCards transactions={transactions} />

            <div className="mt-8">
              <h2 className="mb-4 text-xl font-semibold text-gray-700">Detailed Report</h2>

              <div className="flex flex-col items-start gap-6 lg:flex-row">
                <div className="w-full flex-1 overflow-hidden">
                  <TransactionTable data={transactions} />
                </div>
                <div className="w-full duration-700 animate-in fade-in slide-in-from-right-4 lg:w-fit">
                  <TopCounterparties transactions={transactions} />
                  <ExportButton data={transactions} />
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
