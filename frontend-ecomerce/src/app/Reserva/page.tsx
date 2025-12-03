"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Navbar from "../Componets/Navbar";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "../Service/localhost";
import ReservaModal from "../Componets/NewReservationModal";

const statusMap = {
  confirmed: { label: "Confirmada", className: "confirmed" },
  pending: { label: "Pendente", className: "pending" },
  cancelled: { label: "Cancelada", className: "cancelled" },
};

type ReservationStatus = "all" | keyof typeof statusMap;

type UiReservation = {
  id: string;
  title: string;
  club: string;
  status: keyof typeof statusMap;
  icon: string;
  date: string;
  time: string;
  price: string;
};

export default function MyReservationsPage() {
  const router = useRouter();

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<any>(null);

  // Data state
  const [activeFilter, setActiveFilter] = useState<ReservationStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [reservations, setReservations] = useState<UiReservation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ------------------------------------------
  // Helpers
  const formatDate = (date: string) => {
    try {
      const d = new Date(date);
      return d.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "—";
    }
  };

  const formatTimeRange = (start?: string, end?: string) => {
    if (!start) return "—";
    const s = new Date(start).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const e = end
      ? new Date(end).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";
    return `${s}${e ? " - " + e : ""}`;
  };

  // ------------------------------------------
  // Mapping data
  const mapReservation = (raw: any): UiReservation => {
    const id = String(raw.id ?? raw._id ?? "0");
    const space = raw.space ?? {};

    const title =
      space.name ||
      raw.title ||
      raw.space_name ||
      "Espaço reservado";

    const club =
      space.club ||
      space.location ||
      raw.club ||
      "—";

    let statusRaw =
      (raw.status ?? raw.state ?? raw.status_reservation ?? "")
        .toString()
        .toLowerCase();

    if (!statusRaw) {
      if (raw.cancelled) statusRaw = "cancelled";
      else if (raw.confirmed) statusRaw = "confirmed";
      else statusRaw = "pending";
    }

    const status: keyof typeof statusMap =
      ["confirmed", "pending", "cancelled"].includes(statusRaw)
        ? (statusRaw as any)
        : "pending";

    const type = space.type ?? "";
    const icon =
      type.includes("piscina")
        ? "🏊"
        : type.includes("churr")
        ? "🍖"
        : type.includes("salão")
        ? "🎉"
        : type.includes("quadra")
        ? "⚽"
        : "📌";

    const start = raw.start_time ?? raw.start;
    const end = raw.end_time ?? raw.end;

    const date = formatDate(start);
    const time = formatTimeRange(start, end);

    const priceRaw = raw.price ?? space.price ?? null;
    const price =
      priceRaw != null
        ? `R$ ${Number(priceRaw).toFixed(2)}`
        : "—";

    return { id, title, club, status, icon, date, time, price };
  };

  // ------------------------------------------
  // Fetch
  const fetchReservations = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const headers: any = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/reservations`, { headers });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        router.push("/TelaLogin");
        return;
      }

      const data = await res.json();
      const list = Array.isArray(data) ? data : data.data ?? [];

      setReservations(list.map(mapReservation));
    } catch (error) {
      console.error(error);
      setError("Erro ao carregar reservas.");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  // ------------------------------------------
  // Cancelar reserva
  const handleCancel = async (id: string) => {
    if (!confirm("Deseja realmente cancelar esta reserva?")) return;

    try {
      const token = localStorage.getItem("token");
      const headers: any = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/reservations/${id}`, {
        method: "DELETE",
        headers,
      });

      if (!res.ok) throw new Error("Erro ao cancelar");

      fetchReservations();
    } catch (error) {
      alert("Erro ao cancelar.");
    }
  };

  // ------------------------------------------
  // Filtros
  const filteredReservations = useMemo(() => {
    return reservations
      .filter((r) => activeFilter === "all" || r.status === activeFilter)
      .filter((r) =>
        `${r.title} ${r.club} ${r.id}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
  }, [activeFilter, searchTerm, reservations]);

  // ------------------------------------------
  // Abrir modal
  const openNewModal = () => {
    setSelectedSpace({ name: "Nova Reserva" });
    setIsModalOpen(true);
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto p-4 md:p-8">

        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Minhas Reservas
            </h1>
            <p className="text-slate-500">
              Gerencie suas reservas ativas e histórico
            </p>
          </div>

          <button
            onClick={openNewModal}
            className="mb-6 px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            + Nova Reserva
          </button>
        </div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            <button
              className={`px-4 py-2 rounded-lg border ${
                activeFilter === "all"
                  ? "bg-blue-100 border-blue-500 text-blue-700"
                  : "bg-gray-100"
              }`}
              onClick={() => setActiveFilter("all")}
            >
              Todas
            </button>

            {Object.keys(statusMap).map((key) => (
              <button
                key={key}
                className={`px-4 py-2 rounded-lg border ${
                  activeFilter === key
                    ? "bg-blue-100 border-blue-500 text-blue-700"
                    : "bg-gray-100"
                }`}
                onClick={() =>
                  setActiveFilter(key as keyof typeof statusMap)
                }
              >
                {statusMap[key as keyof typeof statusMap].label}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Buscar reservas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2"
          />
        </div>

        {/* Lista */}
        {isLoading ? (
          <div className="p-6 text-center">Carregando...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-600">{error}</div>
        ) : filteredReservations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredReservations.map((r) => {
              const currentStatus = statusMap[r.status];

              return (
                <div
                  key={r.id}
                  className="bg-white rounded-xl p-6 shadow"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">{r.title}</h3>
                    <span className="px-3 py-1 rounded-full text-xs bg-gray-200">
                      {currentStatus.label}
                    </span>
                  </div>

                  <p className="text-gray-600">{r.club}</p>

                  <div className="mt-3 text-sm text-gray-700 space-y-1">
                    <p>📅 {r.date}</p>
                    <p>🕐 {r.time}</p>
                    <p>💰 {r.price}</p>
                    <p>🔖 #{r.id}</p>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      className="flex-1 bg-gray-100 px-3 py-2 rounded-lg"
                      onClick={() =>
                        router.push(`/reservations/${r.id}`)
                      }
                    >
                      Ver Detalhes
                    </button>

                    {r.status !== "cancelled" && (
                      <button
                        className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded-lg"
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
            <h2 className="font-bold text-xl mb-2">
              Nenhuma reserva encontrada
            </h2>
            <p className="text-gray-600">
              Tente ajustar seus filtros ou o termo de busca.
            </p>
          </div>
        )}

{/* MODAL */}
<ReservaModal
  isOpen={isModalOpen} // Correção: use a variável de estado 'isModalOpen'
  onClose={() => setIsModalOpen(false)} // Correção: função para fechar o modal
  onCreated={fetchReservations} // Melhoria: Recarrega a lista ao criar
/>
      </main>
    </>
  );
}
