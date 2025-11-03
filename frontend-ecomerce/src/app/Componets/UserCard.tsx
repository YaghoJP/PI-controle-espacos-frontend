import React from "react";
import { X, User as UserIcon } from "lucide-react";

export interface User {
  id: number;
  name: string;
  email: string;
}

interface UserCardProps {
  user: User;
  onDelete?: (id: number) => void; // função opcional para deletar
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
  const handleCardClick = () => alert(`Abrindo detalhes de ${user.name}...`);

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(user.id);
    } else {
      alert(`Deletando ${user.name}...`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 relative w-80"
    >
      {/* Botão X para deletar */}
      <button
        onClick={handleDeleteClick}
        className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md z-10 transition"
      >
        <X size={16} />
      </button>

      <div className="p-5 flex flex-col items-center">
        {/* Avatar / ícone */}
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          <UserIcon size={28} className="text-blue-600" />
        </div>

        {/* Nome e email */}
        <h3 className="text-lg font-semibold text-gray-800 mb-1 text-center truncate">
          {user.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4 text-center truncate">
          {user.email}
        </p>

        {/* Botão Detalhes */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            alert(`Nome ${user.name}\nEmail: ${user.email}`);
          }}
          className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold text-sm transition transform hover:-translate-y-px hover:shadow-md"
        >
          Detalhes
        </button>
      </div>
    </div>
  );
};

export default UserCard;
