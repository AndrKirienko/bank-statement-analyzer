"use client";

import React from "react";
import { useDropzone, Accept } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { UploadCloud, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  accept?: Accept;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  accept = { "text/csv": [".csv"] },
}) => {
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles[0]) onFileSelect(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: false,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "hover:bg-muted/50 w-full max-w-xl cursor-pointer border-2 border-dashed p-16 text-center transition-all",
        isDragActive ? "border-primary bg-muted/50 scale-[1.02]" : "border-muted-foreground/25"
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <div className="text-primary opacity-80">
          {isDragActive ? <UploadCloud size={48} /> : <FileText size={48} />}
        </div>
        <div className="space-y-2">
          <p className="text-xl font-semibold tracking-tight">
            {isDragActive ? "Drop the file here" : "Drag & Drop CSV file"}
          </p>
          <p className="text-muted-foreground text-sm">
            or <span className="text-primary underline">click to select</span>
          </p>
        </div>
      </div>
    </Card>
  );
};
