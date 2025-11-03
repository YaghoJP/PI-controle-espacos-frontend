// app/dashboard/page.tsx
"use client";

// React e hooks
import { useEffect, useState } from "react";

import { Space } from "../Componets/SpaceCard";
import PopUpReserva  from "../Componets/PopUpReserva";
import { API_BASE_URL } from "../Service/localhost";
import { handlerDeleteSpace } from "../Service/service";
import NavbarAdmin from "../Componets/NavbarAdmin";
import UserCard from "../Componets/UserCard";
import { set } from "zod";

// Componente principal da página de dashboard
export default function DashboardPage() {
  const [resultsCount, setResultsCount] = useState<number>();
  const [User, setUserData] = useState<User[]>([]);
  const [openPopup, setOpenPopup] = useState(false);

  async function onDelete(id: number) {
    const response = await fetch(`${API_BASE_URL}/user/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.error("Erro ao deletar usuário:", response.statusText);
      return;
    } else {
      const update = User.filter((u) => u.id !== id);
      setUserData(update);
    }
  }
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await fetch(API_BASE_URL + "/users");
        const data = await response.json();
        setUserData(data);
        setResultsCount(data.length); // Inicializa com o total de espaços
      } catch (error) {
        console.error("Erro ao buscar espaços:", error);
      }
    };
    fetchSpaces();
  }, [User, resultsCount]);

  return (
    <>
      <NavbarAdmin />
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Usuários
          </h1>
          <p className="text-base text-slate-500">
            Usuários cadastrados no sistema.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {User.slice(0, User.length).map((space) => (
            <UserCard key={space.id} user={space} onDelete={onDelete} />
          ))}
        </div>
        {openPopup && (
          <PopUpReserva
            open={openPopup}
            onClose={() => setOpenPopup(false)}
            onConfirm={() => {}}
          />
        )}
      </main>
    </>
  );
}
