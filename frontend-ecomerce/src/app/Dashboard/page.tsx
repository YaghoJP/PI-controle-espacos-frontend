// src/app/Dashboard/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../Componets/Navbar";
import SpaceCard, { Space } from "../Componets/SpaceCard";
import { Filter } from "lucide-react";
import { API_BASE_URL } from "../Service/localhost";
import { handlerDeleteSpace } from "../Service/service";
import ReservationPopup from "../Componets/PopUpReserva";
import Swal from "sweetalert2";

export default function DashboardPage() {
  const router = useRouter();

  const [resultsCount, setResultsCount] = useState<number>(0);
  const [spacesData, setSpacesData] = useState<Space[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [userId, setUserId] = useState<number | undefined>();
  const [spaceId, setSpaceId] = useState<number | undefined>();
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  // Carrega user_id
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("user_id") : null;
    if (stored) setUserId(Number(stored));
  }, []);

  // Abre popup
  const handleReserve = (space: Space) => {
    setSpaceId(space.id);
    setOpenPopup(true);
  };

  // Busca espaços
  const fetchSpaces = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/spaces`, {
        method: "GET",
        headers,
      });

      if (res.status === 401 || res.status === 403) {
        Swal.fire({
          icon: "warning",
          title: "Sessão expirada",
          text: "Faça login novamente para continuar.",
        });
        router.push("/TelaLogin");
        return;
      }

      const rawText = await res.text();
      let raw: any = null;

      try {
        raw = rawText ? JSON.parse(rawText) : null;
      } catch {
        raw = rawText;
      }

      const list: Space[] = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.data)
        ? raw.data
        : [];

      setSpacesData(list);
      setResultsCount(list.length);
    } catch (err) {
      console.error("Erro ao buscar espaços:", err);
      setError("Não foi possível carregar os espaços.");
      Swal.fire({
        icon: "error",
        title: "Erro ao carregar",
        text: "Não foi possível carregar os espaços. Tente novamente.",
      });
      setSpacesData([]);
      setResultsCount(0);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchSpaces();
  }, [fetchSpaces]);

  // Delete com confirmação
  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Tem certeza?",
      text: "Isso vai excluir o espaço permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      await handlerDeleteSpace(id);

      Swal.fire({
        icon: "success",
        title: "Excluído!",
        text: "O espaço foi removido com sucesso.",
      });

      await fetchSpaces();
    } catch (err) {
      console.error("Erro ao deletar espaço:", err);

      Swal.fire({
        icon: "error",
        title: "Erro ao excluir",
        text: "Não foi possível excluir o espaço. Tente novamente.",
      });
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
      <Navbar />
      <main className="max-w-7xl mx-auto p-4 md:p-8 bg-gray-100 min-h-screen">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Espaços Disponíveis
          </h1>
          <p className="text-base text-slate-500">
            Encontre e reserve o espaço perfeito para seu evento
          </p>
        </div>

        <section className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Filter className="text-blue-600" size={18} />
              Filtros Avançados
            </h2>
            <div className="text-sm text-slate-500">
              Exibindo <strong className="text-gray-900">{resultsCount}</strong> espaços
            </div>
          </div>
        </section>

        <div className="mb-6">
          {isLoading ? (
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
              <p className="text-gray-700">Carregando espaços...</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
              <p className="text-red-600">{error}</p>
              <button
                onClick={fetchSpaces}
                className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Tentar novamente
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-500 mb-4">
                Exibindo{" "}
                <strong className="font-semibold text-gray-900">
                  {resultsCount} espaços
                </strong>{" "}
                disponíveis
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {spacesData.map((space) => (
                  <SpaceCard
                    key={space.id}
                    space={space}
                    onDelete={() => handleDelete(space.id)}
                    onReservation={() => handleReserve(space)}
                  />
                ))}
              </div>

              {spacesData.length === 0 && (
                <div className="mt-6 bg-white rounded-2xl shadow-xl p-6 text-center">
                  <p className="text-gray-700">Nenhum espaço encontrado.</p>
                </div>
              )}
            </>
          )}
        </div>

        {openPopup && spaceId && userId && (
          <ReservationPopup
            open={openPopup}
            space_id={spaceId}
            user_id={userId}
            onClose={() => setOpenPopup(false)}
            onSuccess={() => setOpenPopup(false)}
          />
        )}
      </main>
    </>
  );
}
