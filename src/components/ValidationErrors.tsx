"use client";

import React from "react";
import { ValidationError } from "@/lib/schema";

interface ValidationErrorsProps {
  errors: ValidationError[];
}

export const ValidationErrors: React.FC<ValidationErrorsProps> = ({ errors }) => {
  if (errors.length === 0) return null;

  return (
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
  );
};
