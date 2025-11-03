// ✅ Importações devem estar sempre no topo
import { useRouter } from 'next/navigation'; 
"use client";

import { useRouter } from "next/navigation";

// ✅ Interface unificada
interface ButtonsProps {
  onChangeBack: () => void;
  onSubmit: () => void;
  onChangeBack: () => void;
}

export function Buttons({ onSubmit, onChangeBack }: ButtonsProps) {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/Home');
    onChangeBack(); // você pode decidir se quer chamar isso aqui ou deixar só no botão
  };

  return (
    <div className="mb-6 col-span-2 flex gap-4">
      <button
        type="button"
        onClick={onChangeBack}
        onClick={onChangeBack} // ou handleGoHome se quiser navegar
        className="bg-gray-500 text-white px-4 py-2 rounded w-1/2 disabled:opacity-50"
      >
        Voltar
      </button>

      <button
        type="submit"
        type="button" // se quiser enviar form, use "submit" dentro do form
        onClick={onSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded w-1/2 disabled:opacity-50"
      >
        Criar Conta
      </button>
    </div>
  );
}
