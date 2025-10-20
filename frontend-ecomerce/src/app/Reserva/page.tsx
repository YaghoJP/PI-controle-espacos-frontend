"use client";

import { useState, useMemo } from "react";
import Navbar from "../Componets/Navbar";
import { useRouter } from "next/navigation";


const statusMap = {
  confirmed: { label: "Confirmada", className: "confirmed" },
  pending: { label: "Pendente", className: "pending" },
  cancelled: { label: "Cancelada", className: "cancelled" },
};

type ReservationStatus = "all" | keyof typeof statusMap;

const initialReservations = [
  {
    id: "RCM-2025-00847",
    title: "Salão de Festas Premium",
    club: "Clube Central",
    status: "confirmed",
    icon: "🎉",
    date: "15 de Outubro, 2025",
    time: "Tarde (13:00 - 18:00)",
    price: "R$ 450,00",
  },
  {
    id: "RCM-2025-00851",
    title: "Churrasqueira Gourmet",
    club: "Clube Norte",
    status: "pending",
    icon: "⏳",
    date: "22 de Outubro, 2025",
    time: "Manhã (08:00 - 12:00)",
    price: "R$ 280,00",
  },
  {
    id: "RCM-2025-00855",
    title: "Quadra Poliesportiva",
    club: "Clube Sul",
    status: "confirmed",
    icon: "⚽",
    date: "28 de Outubro, 2025",
    time: "Noite (19:00 - 23:00)",
    price: "R$ 320,00",
  },
  {
    id: "RCM-2025-00832",
    title: "Área de Piscina Privativa",
    club: "Clube Central",
    status: "cancelled",
    icon: "❌",
    date: "08 de Outubro, 2025",
    time: "Tarde (13:00 - 18:00)",
    price: "R$ 380,00",
  },
];

export default function MyReservationsPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<ReservationStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleViewDetails = (id: string) => {
    alert(`Abrindo detalhes da reserva #${id}...`);
  };

  const handleCancel = (id: string) => {
    if (confirm("Deseja realmente cancelar esta reserva?")) {
      alert(`Reserva #${id} cancelada com sucesso!`);
    }
  };

  const handleNewBooking = () => {
    router.push("/Dashboard");
  };

  const filteredReservations = useMemo(() => {
    return initialReservations
      .filter((r) => activeFilter === "all" || r.status === activeFilter)
      .filter((r) =>
        `${r.title} ${r.club} ${r.id}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
  }, [activeFilter, searchTerm]);

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-1">
              Minhas Reservas
            </h1>
            <p className="text-slate-500">
              Gerencie suas reservas ativas e histórico
            </p>
          </div>
          <button
            className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={handleNewBooking}
          >
            + Nova Reserva
          </button>
        </div>

        {/* Filtros e busca */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            <button
              className={`px-4 py-2 rounded-lg border ${
                activeFilter === "all"
                  ? "bg-blue-100 border-blue-500 text-blue-700"
                  : "bg-gray-100 border-transparent text-gray-700"
              } font-semibold`}
              onClick={() => setActiveFilter("all")}
            >
              Todas
            </button>
            {(Object.keys(statusMap) as Array<keyof typeof statusMap>).map(
              (key) => (
                <button
                  key={key}
                  className={`px-4 py-2 rounded-lg border ${
                    activeFilter === key
                      ? "bg-blue-100 border-blue-500 text-blue-700"
                      : "bg-gray-100 border-transparent text-gray-700"
                  } font-semibold`}
                  onClick={() => setActiveFilter(key)}
                >
                  {statusMap[key].label}
                </button>
              )
            )}
          </div>
          <input
            type="text"
            placeholder="Buscar reservas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Grid de reservas */}
        {filteredReservations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredReservations.map((r) => {
              const currentStatus = statusMap[r.status as keyof typeof statusMap];
              return (
                <div
                  key={r.id}
                  className="bg-white rounded-xl p-6 shadow hover:shadow-md transition grid grid-cols-1 gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl text-white ${
                        currentStatus.className === "confirmed"
                          ? "bg-green-600"
                          : currentStatus.className === "pending"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                      }`}
                    >
                      {r.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{r.title}</h3>
                      <span className="text-sm text-gray-600">{r.club}</span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                        currentStatus.className === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : currentStatus.className === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {currentStatus.label}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 text-gray-700 text-sm">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>{r.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🕐</span>
                      <span>{r.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>💰</span>
                      <span>{r.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🔖</span>
                      <span>#{r.id}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 flex-wrap">
                    <button
                      className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
                      onClick={() => handleViewDetails(r.id)}
                    >
                      Ver Detalhes
                    </button>
                    {r.status !== "cancelled" && (
                      <button
                        className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded-lg font-semibold hover:bg-red-200 transition"
                        onClick={() => handleCancel(r.id)}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center p-12 bg-white rounded-xl shadow">
            <div className="text-6xl mb-4">📂</div>
            <h2 className="font-bold text-xl mb-2">Nenhuma reserva encontrada</h2>
            <p className="text-gray-600">
              Tente ajustar seus filtros ou o termo de busca.
            </p>
          </div>
        )}
      </main>
    </>
  );
}
