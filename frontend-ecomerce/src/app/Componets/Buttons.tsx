import { useRouter } from 'next/navigation'; 

interface ButtonsProps {
  onSubmit: () => void;
import { on } from "events";

interface ButtonsProps{
    onChangeBack: ()=> void;
    onSubmit: ()=> void;
}

export function Buttons({ onSubmit }: ButtonsProps) {

  const router = useRouter();

  const handleGoHome = () => {
    router.push('/Home');
  };

  return (
    <div className="mb-6 col-span-2 flex gap-4">
      <button
        type="button" 
        onClick={handleGoHome} 
        type="submit"
        onClick={onChangeBack}
        className="bg-gray-500 text-white px-4 py-2 rounded w-50/100 disabled:opacity-50"
      >
        Voltar
      </button>
      <button
        type="submit" 
        onClick={onSubmit} 
        onClick={onSubmit}
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-50/100 disabled:opacity-50"
      >
        Criar Conta
      </button>
    </div>
  );
}