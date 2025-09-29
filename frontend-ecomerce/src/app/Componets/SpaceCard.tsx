// app/components/SpaceCard.tsx
import { Users, Tally5 } from 'lucide-react';
import React from 'react';

// 1. Definimos e exportamos o tipo para os dados do espaço
export interface Space {
  id: number;
  club: string;
  name: string;
  description: string;
  capacity: number;
  area: number;
  imageBg: string;
}

// 2. Definimos o tipo para as props do nosso componente
interface SpaceCardProps {
  space: Space;
}

const SpaceCard: React.FC<SpaceCardProps> = ({ space }) => {
  // 3. Tipamos os eventos do mouse para segurança
  const handleCardClick = () => alert(`Demo: Abrindo detalhes de ${space.name}...`);
  const handleDetailsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    alert(`Demo: Visualizando detalhes completos de ${space.name}...`);
  };
  const handleReserveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    alert(`Demo: Abrindo página de reserva para ${space.name}...`);
  };

  return (
    <div onClick={handleCardClick} className="bg-background border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl">
      <div className={`w-full h-48 relative ${space.imageBg}`}>
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/50 py-1.5 px-3 rounded-full text-xs font-semibold text-green-800 dark:text-green-300 shadow-sm">
          Disponível
        </div>
      </div>

      <div className="p-5">
        <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">{space.club}</p>
        <h3 className="text-xl font-bold text-foreground mb-2 truncate">{space.name}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">{space.description}</p>
        
        <div className="flex items-center gap-4 mb-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Users size={16} className="text-green-700 dark:text-green-400" />
            <span>{space.capacity} pessoas</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Tally5 size={16} className="text-green-700 dark:text-green-400" />
            <span>{space.area}m²</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={handleDetailsClick} className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg font-semibold text-sm transition-colors hover:bg-slate-200 dark:hover:bg-slate-700">
            Detalhes
          </button>
          <button onClick={handleReserveClick} className="flex-2 py-3 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg font-semibold text-sm transition-all hover:-translate-y-px hover:shadow-lg hover:shadow-blue-600/30">
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpaceCard;