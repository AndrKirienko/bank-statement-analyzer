"use client";

import React, { useState } from "react";
import { parseStatementFile } from "@/lib/statement";
import { type Transaction, type ValidationError } from "@/lib/schema";
import { FileUploader } from "@/components/FileUploader";
import { ValidationErrors } from "@/components/ValidationErrors";

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const handleFileSelect = async (file: File) => {
    const result = await parseStatementFile(file);
    setTransactions(result.transactions);
    setErrors(result.errors);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 p-10">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Bank Statement Analyzer</h1>

      <FileUploader onFileSelect={handleFileSelect} />
      <ValidationErrors errors={errors} />

      {transactions.length > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-2 mt-6 font-medium text-green-600">
          ✅ Processed successfully: {transactions.length} transactions
        </div>
      )}
    </main>
  );
}
