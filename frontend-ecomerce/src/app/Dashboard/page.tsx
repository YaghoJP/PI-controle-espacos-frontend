// src/app/Dashboard/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../Componets/Navbar";
import SpaceCard, { Space } from "../Componets/SpaceCard";
import { Filter } from "lucide-react";
import { API_BASE_URL } from "../Service/localhost";
import { handlerDeleteSpace } from "../Service/service";

export default function DashboardPage() {
  const router = useRouter();

  const [resultsCount, setResultsCount] = useState<number>(0);
  const [spacesData, setSpacesData] = useState<Space[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSpaces = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // pega token do localStorage (só client-side)
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/spaces`, {
        method: "GET",
        headers,
      });

      // se não autorizado -> redireciona para login (limpar token opcional)
      if (res.status === 401 || res.status === 403) {
        console.warn("Usuário não autenticado (401/403). Redirecionando para login.");
        // opcional: limpar token
        // localStorage.removeItem("token");
        router.push("/TelaLogin");
        return;
      }

      const rawText = await res.text();
      // tenta parsear JSON (seguro para respostas inválidas)
      let raw: any = null;
      try {
        raw = rawText ? JSON.parse(rawText) : null;
      } catch (e) {
        console.warn("Resposta /spaces não é JSON:", rawText);
        raw = rawText;
      }

      // DEBUG: log da resposta bruta (remova em produção se quiser)
      console.log("GET /spaces -> status:", res.status, "raw:", raw);

      // Normaliza resposta: aceita array direto ou { data: [...] } ou { success: true, data: [...] }
      const list: Space[] = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.data)
        ? raw.data
        : [];

      setSpacesData(list);
      setResultsCount(list.length);
    } catch (err) {
      console.error("Erro ao buscar espaços:", err);
      setError("Não foi possível carregar os espaços. Tente novamente.");
      setSpacesData([]);
      setResultsCount(0);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchSpaces();
    // não incluir spacesData/resultsCount nas deps para evitar loop
  }, [fetchSpaces]);

  const handleDelete = async (id: number | string) => {
    try {
      await handlerDeleteSpace(id);
      // refazer fetch após exclusão para atualizar UI
      await fetchSpaces();
    } catch (err) {
      console.error("Erro ao deletar espaço:", err);
      alert("Erro ao deletar espaço. Tente novamente.");
    }
  };

  const handleFilterChange = () => {
    const randomCount =
      spacesData.length > 0 ? Math.floor(Math.random() * spacesData.length) + 1 : 0;
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-600">Tipo de Espaço</label>
              <select
                onChange={handleFilterChange}
                className="bg-gray-50 p-2.5 border-2 border-slate-200 rounded-lg text-sm transition-all focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 text-gray-900"
              >
                <option>Todos os tipos</option>
                <option>Salão de Festas</option>
              </select>
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
                {(spacesData || []).map((space) => (
                  <SpaceCard key={space.id} space={space} onDelete={() => handleDelete(space.id)} />
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
      </main>
    </>
  );
}
