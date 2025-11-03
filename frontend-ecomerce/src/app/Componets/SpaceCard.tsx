import Image from "next/image";
import {} from "../Componets/PopUpReserva"
import { Users, X } from "lucide-react"; // importando o X
import {handlerDeleteSpace} from "../Service/service"
import React from "react";
import { on } from "events";

export interface Space {
  id: number;
  name: string;
  description: string;
  capacity: number;
  image?: string;
}

interface SpaceCardProps {
  space: Space;
  onDelete?: (id: number) => void; // função opcional para deletar
  onReservation?: () => void; // função opcional para reservar
}

const SpaceCard: React.FC<SpaceCardProps> = ({ space, onReservation,onDelete }) => {
  
  const handleCardClick = () =>
    alert(`Demo: Abrindo detalhes de ${space.name}...`);
    
  const handleDetailsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    alert(`Demo: Visualizando detalhes completos de ${space.name}...`);
  };
  
  const handleReserveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onDelete) {
      handlerDeleteSpace(space.id);
    } else {
      alert(`Demo: Deletando ${space.name}...`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-background border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl relative"
    >
      <div className="w-full h-48 relative">
        {/* Imagem */}
        {space.image ? (
          <Image
            src={space.image}
            alt={space.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500">
            Sem imagem
          </div>
        )}

        {/* Label de disponibilidade */}
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/50 py-1.5 px-3 rounded-full text-xs font-semibold text-green-800 dark:text-green-300 shadow-sm">
          Disponível
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
          {space.name}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {space.description}
        </p>

        <div className="flex items-center gap-4 mb-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Users size={16} className="text-green-700 dark:text-green-400" />
            <span>{space.capacity} pessoas</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleDetailsClick}
            className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg font-semibold text-sm transition-colors hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            Detalhes
          </button>
          <button
            onClick={onReservation}
            className="flex-2 py-3 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg font-semibold text-sm transition-all hover:-translate-y-px hover:shadow-lg hover:shadow-blue-600/30"
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpaceCard;
