"use client";

import React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/lib/schema";
import { exportTransactionsToJSON } from "@/lib/statement";

interface ExportJsonButtonProps {
  data: Transaction[];
}

export const ExportJsonButton: React.FC<ExportJsonButtonProps> = ({ data }) => {
  return (
    <Button
      onClick={() => exportTransactionsToJSON(data)}
      variant="outline"
      className="flex w-full items-center gap-2 text-xs font-medium"
    >
      <Download size={14} />
      Export JSON
    </Button>
  );
};

