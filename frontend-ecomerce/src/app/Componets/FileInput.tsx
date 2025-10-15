"use client";

import React, { useState, useRef } from "react";

interface ImagePathInputProps {  
    onImageSelect: (file: string) => void;
    value: string;
}

export function ImagePathInput({onImageSelect}: ImagePathInputProps) {
  const [imageName, setImageName] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    onImageSelect(file ? file.name : "");
    if (file) {
      setImageName(file.name);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleInputClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-start gap-3">
      {/* Campo de texto clicável */}
      <label style={{ color: "black" }}>Imagem</label>
      <input
        type="text"
        readOnly
        value={imageName}
        style={{ color: "black", borderColor: "black" }}
        placeholder="Clique aqui para selecionar uma imagem"
        onClick={handleInputClick}
        className="w-full px-3 py-2 border rounded-lg shadow-sm cursor-pointer hover:border-blue-500 focus:outline-none"
      />

      {/* Input de arquivo oculto */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Pré-visualização */}
      {preview && (
        <div
          className="mt-2"
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            width: "100%",
          }}
        >
          <img
            src={preview}
            alt="Preview"
            className="max-w-xs max-h-60 rounded-lg border"
          />
        </div>
      )}
    </div>
  );
}
