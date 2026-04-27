"use client";

import React from "react";
import { ValidationError } from "@/lib/schema";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ValidationErrorsProps {
  errors: ValidationError[];
}

export const ValidationErrors: React.FC<ValidationErrorsProps> = ({ errors }) => {
  if (errors.length === 0) return null;

  return (
    <div className="mt-6 w-full max-w-xl space-y-4">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Validation Failed</AlertTitle>
        <AlertDescription>{errors.length} rows contain errors and were skipped.</AlertDescription>
      </Alert>

      <div className="custom-scrollbar max-h-64 space-y-2 overflow-y-auto pr-2">
        {errors.map((err, index) => (
          <Card key={index} className="border-destructive/20 bg-destructive/5 p-3">
            <p className="text-destructive text-xs font-bold uppercase tracking-wider">
              Line {err.row}
            </p>
            <ul className="text-muted-foreground mt-1 list-inside list-disc text-sm">
              {err.messages.map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
};
