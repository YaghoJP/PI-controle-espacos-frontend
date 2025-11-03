import Image from "next/image";
import { Users, X } from "lucide-react"; // importando o X
import React from "react";
import { Reservation } from "../Interfaces";

interface ReservaCardProps {
  space: Reservation;
  onDelete?: (id: number) => void; // função opcional para deletar
}

const ReservaCard: React.FC<ReservaCardProps> = ({ space, onDelete }) => {
  

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(space.id);
    }
  };

  return (
    <div
      onClick={() => {}}
      className="bg-background border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl relative"
    >
      <div className="w-full h-48 relative">
        
        <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500">
          Sem imagem
        </div>
        {/* Botão X para deletar */}
        <button
          onClick={handleDeleteClick}
          className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md"
        >
          <X size={14} />
        </button>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-foreground mb-2 truncate">
          {}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {}
        </p>

        <div className="flex items-center gap-4 mb-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Users size={16} className="text-green-700 dark:text-green-400" />
            <span>{} pessoas</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={()=>{}}
            className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg font-semibold text-sm transition-colors hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            Detalhes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservaCard;
