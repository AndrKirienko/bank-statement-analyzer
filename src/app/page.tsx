"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { parseStatementFile } from "@/lib/statement";

export default function HomePage() {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const result = await parseStatementFile(file);
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

          <div className="mt-4 rounded bg-gray-100 px-4 py-1.5 font-mono text-xs text-gray-400">
            Accepted format: .csv
          </div>
        </div>
      </div>
    </main>
  );
}
