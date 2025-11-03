"use client";

import { useRouter } from "next/navigation";

interface ButtonsProps {
  onChangeBack: () => void;
  onSubmit: () => void;
}

export function Buttons({ onSubmit, onChangeBack }: ButtonsProps) {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/Home');
    onChangeBack(); 
  };

  return (
    <div className="mb-6 col-span-2 flex gap-4">
      <button
        type="button"
        onClick={onChangeBack}
        className="bg-gray-500 text-white px-4 py-2 rounded w-1/2 disabled:opacity-50"
      >
        Voltar
      </button>

      <button
        type="submit"
        onClick={onSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded w-1/2 disabled:opacity-50"
      >
        Criar Conta
      </button>
    </div>
  );
}
