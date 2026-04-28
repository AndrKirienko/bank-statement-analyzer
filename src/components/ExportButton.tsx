"use client";

import React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/lib/schema";
import { exportTransactionsToCSV } from "@/lib/statement";

interface ExportButtonProps {
  data: Transaction[];
}

export const ExportButton: React.FC<ExportButtonProps> = ({ data }) => {
  return (
    <Button
      onClick={() => exportTransactionsToCSV(data)}
      variant="outline"
      className="mt-4 flex w-full items-center gap-2 text-xs font-medium"
    >
      <Download size={14} />
      Export Validated CSV
    </Button>
  );
};
