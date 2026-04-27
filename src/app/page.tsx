"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { parseStatementFile } from "@/lib/statement";
import { type Transaction, type ValidationError } from "@/lib/schema"; 

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const result = await parseStatementFile(file);

      setTransactions(result.transactions);
      setErrors(result.errors);

      console.log("Success:", result.transactions);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    multiple: false,
  });

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 p-10">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Bank Statement Analyzer</h1>

      <div
        {...getRootProps()}
        className={`w-full max-w-xl cursor-pointer rounded-2xl border-4 border-dashed p-16 text-center transition-all ${
          isDragActive
            ? "scale-105 border-blue-500 bg-blue-50 shadow-lg"
            : "border-gray-300 bg-white hover:border-gray-400"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className="mb-2 text-5xl text-blue-500">{isDragActive ? "📥" : "📄"}</div>
          <div className="space-y-2">
            <p className="text-xl font-semibold text-gray-700">
              {isDragActive ? "Drop the file here..." : "Drag & Drop CSV file"}
            </p>
            <p className="text-gray-500">
              or <span className="text-blue-600 underline">click to select</span>
            </p>
          </div>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="mt-6 w-full max-w-xl rounded border-l-4 border-red-500 bg-red-50 p-4 text-red-700 shadow-sm">
          <p className="mb-3 text-lg font-bold text-red-800">
            ⚠️ Errors in the data: ({errors.length} lines):
          </p>

          <ul className="custom-scrollbar max-h-60 space-y-3 overflow-y-auto pr-2">
            {errors.map((err, index) => (
              <li key={index} className="rounded border border-red-100 bg-white/50 p-2 text-sm">
                <div className="mb-1 font-bold text-red-900">Line {err.row}:</div>
                <ul className="list-inside list-disc space-y-0.5 opacity-90">
                  {err.messages.map((msg, i) => (
                    <li key={i}>{msg}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}

      {transactions.length > 0 && (
        <div className="mt-4 font-medium text-green-600">
          Processed successfully: {transactions.length} transactions
        </div>
      )}
    </main>
  );
}
