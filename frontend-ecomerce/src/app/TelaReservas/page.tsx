// src/app/TelaReservas/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { Filter } from "lucide-react";

import NavbarAdmin from "../Componets/NavbarAdmin";
import SpaceReserva from "../Componets/SpaceReserva";
import ReservationPopup from "../Componets/PopUpReserva";

import { API_BASE_URL } from "../Service/localhost";
import { handlerDeleteReservation } from "../Service/service";
import { Reservation } from "../Interfaces"; // interface da reserva

export default function TelaReservasPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [resultsCount, setResultsCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [userId, setUserId] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [selectedSpaceId, setSelectedSpaceId] = useState<number | null>(null);

  // Carregar user_id e role do localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedUserId = localStorage.getItem("user_id");
    const storedRole = localStorage.getItem("role"); // ajusta aqui se o teu projeto usar outro nome

    if (storedUserId) {
      setUserId(Number(storedUserId));
    }

    if (storedRole === "admin") {
      setIsAdmin(true);
    }
  }, []);

  // Buscar reservas da API
  const fetchReservations = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`${API_BASE_URL}/reservations`, {
        method: "GET",
        headers,
      });

      const rawText = await res.text();
      let raw: any = null;

      try {
        raw = rawText ? JSON.parse(rawText) : null;
      } catch (e) {
        console.warn("Resposta /reservations não é JSON:", rawText);
        raw = rawText;
      }

      if (!res.ok) {
        console.error("Erro ao buscar reservas:", res.status, raw);
        setReservations([]);
        setResultsCount(0);
        setError("Não foi possível carregar as reservas.");
        return;
      }

      const list: Reservation[] = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.data)
        ? raw.data
        : [];

      setReservations(list);
      setResultsCount(list.length);
    } catch (err) {
      console.error("Erro ao buscar reservas:", err);
      setError("Não foi possível carregar as reservas. Tente novamente.");
      setReservations([]);
      setResultsCount(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  // Filtro fake só pra manter teu comportamento anterior
  const handleFilterChange = () => {
    if (!reservations.length) {
      setResultsCount(0);
      return;
    }
    const randomCount = Math.floor(Math.random() * reservations.length) + 1;
    setResultsCount(randomCount);
  };

  // Deletar reserva
  const handleDelete = async (id: number) => {
    try {
      await handlerDeleteReservation(id);
      await fetchReservations();
    } catch (err) {
      console.error("Erro ao deletar reserva:", err);
      alert("Erro ao deletar reserva. Tente novamente.");
    }
  };

  // Abrir popup de reserva (apenas admin)
  const handleOpenPopup = (reservation: Reservation) => {
    if (!isAdmin) return; // segurança extra
    setSelectedSpaceId(reservation.space_id); // assumindo que Reservation tem space_id
    setOpenPopup(true);
  };

  return (
    <>
      <NavbarAdmin />
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Espaços Reservados
          </h1>
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
              {resultsCount}
            </strong>{" "}
            reservas
          </p>

          {isLoading ? (
            <div className="p-6 text-center bg-white rounded-xl shadow">
              Carregando reservas...
            </div>
          ) : error ? (
            <div className="p-6 text-center bg-white rounded-xl shadow">
              <p className="text-red-600 mb-2">{error}</p>
              <button
                onClick={fetchReservations}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Tentar novamente
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.isArray(reservations) &&
                reservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    // Apenas admin pode clicar para abrir popup
                    onClick={() => handleOpenPopup(reservation)}
                    className={isAdmin ? "cursor-pointer" : ""}
                  >
                    <SpaceReserva
                      space={reservation}
                      onDelete={handleDelete}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
      </main>

      {/* ReservationPopup só aparece se for admin, tiver userId e espaço selecionado */}
      {isAdmin && openPopup && userId && selectedSpaceId && (
        <ReservationPopup
          open={openPopup}
          space_id={selectedSpaceId}
          user_id={userId}
          onClose={() => setOpenPopup(false)}
          onSuccess={() => {
            setOpenPopup(false);
            fetchReservations(); // recarrega lista depois de criar nova reserva
          }}
        />
      )}
    </>
  );
}
