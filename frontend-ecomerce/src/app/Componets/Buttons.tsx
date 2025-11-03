"use client";

import { useRouter } from "next/navigation";

interface ButtonsProps {
  onChangeBack: () => void;
  onSubmit: () => void;
}

export function Buttons({ onChangeBack, onSubmit }: ButtonsProps) {
  
  return (
    <div className="mb-6 col-span-2 flex gap-4">
      <button
        type="button"
        onClick={onChangeBack} // ou handleGoHome se quiser navegar
        className="bg-gray-500 text-white px-4 py-2 rounded w-1/2 disabled:opacity-50"
      >
        Voltar
      </button>
      <button
        type="button" // se quiser enviar form, use "submit" dentro do form
        onClick={onSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded w-1/2 disabled:opacity-50"
      >
        Criar Conta
      </button>
    </div>
  );
}
