// app/Dashboard/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import NavbarAdmin from "../Componets/NavbarAdmin";
import SpaceCard, { Space } from "../Componets/SpaceCard";
import { Filter } from "lucide-react";
import { API_BASE_URL } from "../Service/localhost";
import { handlerDeleteSpace } from "../Service/service";
import ReservationPopup from "../Componets/PopUpReserva";

export default function DashboardPage() {
  const [resultsCount, setResultsCount] = useState<number>(0);
  const [spacesData, setSpacesData] = useState<Space[]>([]);
  const [userId, setUserId] = useState<number | undefined>();
  const [spaceId, setSpaceId] = useState<number | undefined>();
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  // carrega user_id do localStorage uma vez
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user_id");
      if (stored) {
        setUserId(Number(stored));
      }
    }
  }, []);

  const fetchSpaces = useCallback(async () => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
        headers["headerAuthorization"] = `Bearer ${token}`; // compat com backend
      }

      const response = await fetch(`${API_BASE_URL}/spaces`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        console.error("Erro ao buscar espaços. Status:", response.status);
        setSpacesData([]);
        setResultsCount(0);
        return;
      }

      const data = await response.json();

      const list: Space[] = Array.isArray(data) ? data : [];
      setSpacesData(list);
      setResultsCount(list.length);
    } catch (error) {
      console.error("Erro ao buscar espaços:", error);
      setSpacesData([]);
      setResultsCount(0);
    }
  }, []);

  useEffect(() => {
    fetchSpaces();
  }, [fetchSpaces]);

  const handleDelete = async (id: number) => {
    try {
      await handlerDeleteSpace(id);
      await fetchSpaces();
    } catch (err) {
      console.error("Erro ao deletar espaço:", err);
      alert("Erro ao deletar espaço. Tente novamente.");
    }
  };

  const handleFilterChange = () => {
    const randomCount =
      spacesData.length > 0
        ? Math.floor(Math.random() * spacesData.length) + 1
        : 0;
    setResultsCount(randomCount);
  };

  return (
    <>
      <NavbarAdmin />

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Espaços Disponíveis
          </h1>
          <p className="text-base text-slate-500">
            Encontre e reserve o espaço perfeito para seu evento
          </p>
        </header>

        <section className="bg-background border rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Filter className="text-blue-600" size={20} />
            Filtros Avançados
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-600">
                Tipo de Espaço
              </label>
              <select
                onChange={handleFilterChange}
                className="bg-background p-2.5 border-2 border-slate-200 dark:border-slate-700 
                  rounded-lg text-sm transition-all focus:outline-none 
                  focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
              >
                <option>Todos os tipos</option>
                <option>Salão de Festas</option>
              </select>
            </div>
          </div>
        </section>

        <div>
          <p className="text-sm text-slate-500 mb-4">
            Exibindo{" "}
            <strong className="font-semibold text-foreground">
              {resultsCount} espaços
            </strong>{" "}
            disponíveis
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {(spacesData || []).map((space) => (
              <SpaceCard
                key={space.id}
                space={space}
                onDelete={() => handleDelete(space.id)}
                onReservation={() => {
                  setSpaceId(space.id);
                  setOpenPopup(true);
                }}
              />
            ))}
          </div>

          {openPopup && spaceId && userId && (
            <ReservationPopup
              open={openPopup}
              space_id={spaceId}
              user_id={userId}
              onClose={() => setOpenPopup(false)}
              onConfirm={() => {
                // aqui você pode dar um fetchSpaces() depois que criar reserva
                setOpenPopup(false);
              }}
            />
          )}
        </div>
      </main>
    </>
  );
}
