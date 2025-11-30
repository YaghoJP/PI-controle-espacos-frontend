// src/app/TelaReservas/page.tsx
"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Navbar from "../Componets/Navbar";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "../Service/localhost";

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
  const [activeFilter, setActiveFilter] = useState<ReservationStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [reservations, setReservations] = useState<UiReservation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // --- Helpers para formatar datas/hora ---
  const formatDate = (isoOrDate: string | null | undefined) => {
    if (!isoOrDate) return "—";
    try {
      const d = new Date(isoOrDate);
      return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
    } catch {
      return String(isoOrDate);
    }
  };

  const formatTimeRange = (start?: string | null, end?: string | null) => {
    if (!start && !end) return "—";
    try {
      const s = start ? new Date(start) : null;
      const e = end ? new Date(end) : null;
      const sStr = s ? s.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "";
      const eStr = e ? e.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "";
      if (sStr && eStr) return `${sStr} - ${eStr}`;
      if (sStr) return `${sStr}`;
      return `${String(start ?? end)}`;
    } catch {
      return `${String(start ?? end ?? "—")}`;
    }
  };

  // Mapear uma reserva do backend para UiReservation (tolerante)
  const mapReservation = (raw: any): UiReservation => {
    // campos típicos possíveis:
    // raw.id
    // raw.space (obj) -> name/title, club/location, type, price
    // raw.start_time, raw.end_time OR raw.date/time fields
    // raw.status or raw.is_confirmed / raw.canceled
    // raw.price or raw.space.price
    const id = String(raw.id ?? raw._id ?? raw.uuid ?? "unknown");

    // espaço
    const space = raw.space ?? raw.spaceId ?? raw.place ?? null;
    const title =
      space?.name ??
      space?.title ??
      raw.title ??
      raw.space_name ??
      "Espaço reservado";

    const club =
      space?.club ??
      space?.location ??
      space?.clubName ??
      space?.owner?.name ??
      raw.club ??
      "—";

    // status
    let statusRaw = (raw.status ?? raw.state ?? raw.status_reservation ?? "").toString().toLowerCase();
    if (!statusRaw) {
      if (raw.cancelled === true || raw.isCanceled === true || raw.canceled === true) statusRaw = "cancelled";
      else if (raw.confirmed === true || raw.is_confirmed === true) statusRaw = "confirmed";
      else statusRaw = "pending";
    }
    const status = (["confirmed", "pending", "cancelled"].includes(statusRaw) ? statusRaw : "pending") as keyof typeof statusMap;

    // icon baseado no tipo do espaço se existir
    const type = space?.type ?? space?.category ?? raw.type ?? "";
    const icon =
      (type && type.toLowerCase().includes("piscina")) ? "🏊" :
      (type && type.toLowerCase().includes("churr")) ? "🍖" :
      (type && type.toLowerCase().includes("salão")) ? "🎉" :
      (type && type.toLowerCase().includes("quadra")) ? "⚽" :
      raw.icon ?? "📌";

    // datas/times
    const start = raw.start_time ?? raw.startDate ?? raw.start ?? raw.date;
    const end = raw.end_time ?? raw.endDate ?? raw.end;
    const date = formatDate(start ?? raw.date ?? null);
    const time = formatTimeRange(start, end);

    // price
    const priceRaw = raw.price ?? raw.value ?? space?.price ?? null;
    const price = priceRaw ? (typeof priceRaw === "number" ? `R$ ${priceRaw.toFixed(2)}` : String(priceRaw)) : "—";

    return { id, title, club, status, icon, date, time, price };
  };

  // --- fetch das reservas do backend ---
  const fetchReservations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headers: Record<string,string> = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/reservations`, { method: "GET", headers });

      if (res.status === 401 || res.status === 403) {
        // usuário não autenticado: limpar e redirecionar para login
        try { localStorage.removeItem("token"); localStorage.removeItem("user_id"); } catch {}
        router.push("/TelaLogin");
        return;
      }

      const text = await res.text();
      let data: any = null;
      try { data = text ? JSON.parse(text) : null; } catch { data = text; }

      // normalizar: array direto ou { success, data }
      const listRaw = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
      const mapped = listRaw.map(mapReservation);
      setReservations(mapped);
    } catch (err: any) {
      console.error("Erro ao buscar reservas:", err);
      setError("Não foi possível carregar as reservas. Tente novamente.");
      setReservations([]);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  // cancelar reserva (chama DELETE /reservations/:id)
  const handleCancel = async (id: string) => {
    if (!confirm("Deseja realmente cancelar esta reserva?")) return;
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headers: Record<string,string> = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/reservations/${id}`, { method: "DELETE", headers });
      if (!res.ok) {
        const text = await res.text();
        let payload = null;
        try { payload = text ? JSON.parse(text) : null; } catch {}
        throw new Error(payload?.message ?? `Erro ${res.status}`);
      }
      // sucesso -> refetch
      await fetchReservations();
      alert("Reserva cancelada com sucesso.");
    } catch (err: any) {
      console.error("Erro ao cancelar reserva:", err);
      alert(err?.message ?? "Erro ao cancelar. Tente novamente.");
    }
  };

  const handleViewDetails = (id: string) => {
    router.push(`/reservations/${id}`);
  };

  const handleNewBooking = () => {
    router.push("/Dashboard");
  };

  // filtro e busca
  const filteredReservations = useMemo(() => {
    return reservations
      .filter((r) => activeFilter === "all" || r.status === activeFilter)
      .filter((r) =>
        `${r.title} ${r.club} ${r.id}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [activeFilter, searchTerm, reservations]);

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
            <p className="text-slate-500">Gerencie suas reservas ativas e histórico</p>
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
        {isLoading ? (
          <div className="bg-white rounded-xl p-6 shadow text-center">
            Carregando reservas...
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl p-6 shadow text-center">
            <p className="text-red-600">{error}</p>
            <button onClick={fetchReservations} className="mt-4 px-4 py-2 rounded bg-blue-600 text-white">Tentar novamente</button>
          </div>
        ) : filteredReservations.length > 0 ? (
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
            <p className="text-gray-600">Tente ajustar seus filtros ou o termo de busca.</p>
          </div>
        )}
      </main>
    </>
  );
}
