"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../Componets/Navbar";
import SpaceCard, { Space } from "../Componets/SpaceCard";
import { Filter } from "lucide-react";
import { API_BASE_URL } from "../Service/localhost";
// Nota: Se for dashboard de usuário, talvez não deva ter delete. 
// Mas mantive a lógica que você enviou no primeiro código.
import { handlerDeleteSpace } from "../Service/service"; 

export default function DashboardPage() {
  const router = useRouter();

  const [resultsCount, setResultsCount] = useState<number>(0);
  const [spacesData, setSpacesData] = useState<Space[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // --- LÓGICA DE BUSCA (Mantida do seu código original) ---
  const fetchSpaces = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/spaces`, {
        method: "GET",
        headers,
      });

      if (res.status === 401 || res.status === 403) {
        router.push("/TelaLogin");
        return;
      }

      const rawText = await res.text();
      let raw: any = null;
      try {
        raw = rawText ? JSON.parse(rawText) : null;
      } catch (e) {
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
      setSpacesData([]);
      setResultsCount(0);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchSpaces();
  }, [fetchSpaces]);

  const handleDelete = async (id: number | string) => {
    try {
      await handlerDeleteSpace(id);
      await fetchSpaces();
    } catch (err) {
      console.error("Erro ao deletar espaço:", err);
      alert("Erro ao deletar espaço.");
    }
  };

  const handleFilterChange = () => {
    // Apenas simulação visual de filtro conforme seu código original
    const randomCount = spacesData.length > 0 ? Math.floor(Math.random() * spacesData.length) + 1 : 0;
    setResultsCount(randomCount);
  };

  return (
    <>
      <Navbar />
      
      {/* ESTILIZAÇÃO ATUALIZADA:
        - Removido bg-gray-100 e min-h-screen (para ficar clean igual o admin)
        - Mantido max-w-7xl e paddings
      */}
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        
        {/* HEADER */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Espaços Disponíveis
          </h1>
          <p className="text-base text-slate-500">
            Encontre e reserve o espaço perfeito para seu evento
          </p>
        </header>

        {/* SECTION DE FILTROS (Estilo Card Clean) */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
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
                className="bg-white p-2.5 border-2 border-slate-200 rounded-lg text-sm transition-all focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 text-slate-700"
              >
                <option>Todos os tipos</option>
                <option>Salão de Festas</option>
              </select>
            </div>
            {/* Outros filtros podem vir aqui */}
          </div>
        </section>

        {/* LISTAGEM */}
        <div>
          {isLoading ? (
            <div className="p-8 text-center text-slate-500 bg-white border border-slate-100 rounded-xl">
              Carregando espaços...
            </div>
          ) : error ? (
            <div className="p-8 text-center bg-red-50 border border-red-100 rounded-xl">
              <p className="text-red-600 mb-2">{error}</p>
              <button
                onClick={fetchSpaces}
                className="text-sm font-bold text-red-700 hover:underline"
              >
                Tentar novamente
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-500 mb-4">
                Exibindo{" "}
                <strong className="font-semibold text-slate-900">
                  {resultsCount} espaços
                </strong>{" "}
                disponíveis
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {spacesData.map((space) => (
                  <SpaceCard 
                    key={space.id} 
                    space={space} 
                    // Se o usuário comum não puder deletar, remova esta prop onDelete
                    onDelete={() => handleDelete(space.id)} 
                  />
                ))}
              </div>

              {spacesData.length === 0 && (
                <div className="mt-8 p-12 text-center bg-white border border-slate-200 rounded-xl border-dashed">
                  <p className="text-slate-500 text-lg">Nenhum espaço encontrado.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}