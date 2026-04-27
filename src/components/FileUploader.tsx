"use client";

import React from "react";
import { useDropzone, Accept } from "react-dropzone";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  accept?: Accept;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  accept = { "text/csv": [".csv"] },
}) => {
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      onFileSelect(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: false,
  });

  return (
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
  );
};
