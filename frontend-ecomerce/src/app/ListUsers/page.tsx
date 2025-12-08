"use client";

import { useEffect, useState, useCallback } from "react";
import NavbarAdmin from "../Componets/NavbarAdmin";
import UserCard from "../Componets/UserCard";
import { API_BASE_URL } from "../Service/localhost";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import type { User } from "../Interfaces";

export default function DashboardPage() {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [resultsCount, setResultsCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 🗑️ Deletar usuário
  const onDelete = async (id: number) => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/user/${id}`, {
        method: "DELETE",
        headers,
      });

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Erro ao deletar usuário",
          text: "Não foi possível deletar o usuário.",
        });
        return;
      }

      const updated = users.filter((u) => u.id !== id);
      setUsers(updated);
      setResultsCount(updated.length);

      Swal.fire({
        icon: "success",
        title: "Usuário deletado!",
        text: "O usuário foi removido com sucesso.",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Erro ao deletar",
        text: "Ocorreu um erro ao tentar deletar o usuário.",
      });
    }
  };

  // 📌 Buscar usuários
  const fetchUsers = useCallback(async () => {
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

      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "GET",
        headers,
      });

      if (response.status === 401 || response.status === 403) {
        Swal.fire({
          icon: "warning",
          title: "Sessão expirada",
          text: "Faça login novamente para continuar.",
        });
        router.push("/TelaLogin");
        return;
      }

      const rawText = await response.text();
      let data: any = null;

      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch {
        data = rawText;
      }

      const list: User[] = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setUsers(list);
      setResultsCount(list.length);
    } catch (err) {
      setError("Não foi possível carregar os usuários.");
      Swal.fire({
        icon: "error",
        title: "Erro ao carregar usuários",
        text: "Tente novamente mais tarde.",
      });
      setUsers([]);
      setResultsCount(0);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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

        <p className="text-sm text-slate-500 mb-4">
          Exibindo{" "}
          <strong className="font-semibold text-foreground">
            {resultsCount}
          </strong>{" "}
          usuários
        </p>

        {isLoading ? (
          <div className="p-6 text-center bg-white rounded-xl shadow">
            Carregando usuários...
          </div>
        ) : error ? (
          <div className="p-6 text-center bg-white rounded-xl shadow">
            <p className="text-red-600 mb-2">{error}</p>
            <button
              onClick={fetchUsers}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {users.map((user) => (
              <UserCard key={user.id} user={user} onDelete={onDelete} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
