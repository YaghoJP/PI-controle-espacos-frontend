// app/dashboard/page.tsx
"use client";

// React e hooks
import { useEffect, useState } from "react";
import Navbar from "../Componets/Navbar";
import { Space} from "../Componets/SpaceCard"
import SpaceCard  from "../Componets/SpaceCard"; // Importa o componente e seu tipo
import { Filter } from "lucide-react";
import { API_BASE_URL } from "../Service/localhost";
import { handlerDeleteSpace } from "../Service/service";

// Componente principal da página de dashboard
export default function DashboardPage() {
  const [resultsCount, setResultsCount] = useState<number>();
  const [spacesData, setSpacesData] = useState<Space[]>([]);

  const handleFilterChange = () => {
    const randomCount = Math.floor(Math.random() * spacesData.length) + 1;
    setResultsCount(randomCount);
  };
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await fetch(API_BASE_URL+"/spaces");
        const data = await response.json();
        setSpacesData(data);
        setResultsCount(data.length); // Inicializa com o total de espaços
      } catch (error) {
        console.error("Erro ao buscar espaços:", error);
      }
    };
    fetchSpaces();
  }, [spacesData, resultsCount]);

  return (
    <>
      <Navbar />
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
            {/* Adicione outros filtros aqui */}
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
            {spacesData.slice(0, spacesData.length).map((space) => (
              <SpaceCard key={space.id} space={space} onDelete={handlerDeleteSpace} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
