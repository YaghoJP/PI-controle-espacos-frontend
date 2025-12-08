import { API_BASE_URL } from "./localhost";
import Swal from "sweetalert2";

// ===============================
// CREATE RESERVATION
// ===============================
export async function handlerCreateReservation(payload: {
  user_id: number;
  space_id: number;
  reservation_date: string;
  start_time: string;
  end_time: string;
  status?: string;
  approved_by?: number | null;
  rejection_reason?: string | null;
}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}/reservations`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  const rawText = await res.text();
  let data: any = null;

  try {
    data = rawText ? JSON.parse(rawText) : null;
  } catch {}

  if (!res.ok) {
    let message =
      data?.message ||
      data?.error ||
      rawText ||
      `Erro ao criar reserva (status ${res.status})`;

    Swal.fire({
      title: "Erro ao Criar Reserva",
      text: message,
      icon: "error",
      confirmButtonColor: "#d33",
    });

    throw new Error(message);
  }

  return data;
}

// ===============================
// CREATE SPACE
// ===============================
export async function handlerCreateSpace(space: {
  name: string;
  description: string;
  capacity: number;
  available: boolean;
  imageUrl?: string | null;
}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}/spaces`, {
    method: "POST",
    headers,
    body: JSON.stringify(space),
  });

  const raw = await res.text();

  if (!res.ok) {
    Swal.fire({
      title: "Erro ao Criar Espaço",
      text: `Falha (${res.status}). Verifique os dados enviados.`,
      icon: "error",
      confirmButtonColor: "#d33",
    });

    throw new Error(`Erro ao criar espaço (${res.status})`);
  }

  return raw ? JSON.parse(raw) : null;
}

// ===============================
// DELETE RESERVATION
// ===============================
export async function handlerDeleteReservation(id: number) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(API_BASE_URL + `/reservations/${id}`, {
      method: "DELETE",
      headers: {
        headerAuthorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      Swal.fire({
        title: "Erro ao Deletar",
        text: "Não foi possível excluir a reserva.",
        icon: "error",
      });
    }
  } catch (err) {
    Swal.fire({
      title: "Erro ao Deletar",
      text: "Ocorreu um erro inesperado.",
      icon: "error",
    });
    console.error(err);
  }
}

// ===============================
// LOGIN
// ===============================
export async function handlerLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    Swal.fire({
      title: "Falha no Login",
      text: "Email ou senha incorretos.",
      icon: "error",
      confirmButtonColor: "#d33",
    });
    return null;
  }

  const data = await res.json();
  return {
    token: data.token,
    id: data.id,
    role: data.role,
  };
}

// ===============================
// DELETE SPACE
// ===============================
export async function handlerDeleteSpace(id: number) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(API_BASE_URL + `/spaces/${id}`, {
      method: "DELETE",
      headers: {
        headerAuthorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      Swal.fire({
        title: "Erro ao Deletar Espaço",
        text: "Verifique se o espaço não está vinculado a reservas.",
        icon: "error",
      });
    }
  } catch (err) {
    Swal.fire({
      title: "Erro ao Deletar Espaço",
      text: "Erro inesperado ao tentar excluir.",
      icon: "error",
    });
  }
}

// ===============================
// CREATE USER
// ===============================
export async function handlerCreateUser(user: {
  name: string;
  email: string;
  password: string;
  role: string;
}) {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const res = await fetch(`${API_BASE_URL}/user`, {
      method: "POST",
      headers,
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (!res.ok) {
      Swal.fire({
        title: "Erro ao Criar Usuário",
        text: data?.message ?? "Tente novamente mais tarde.",
        icon: "error",
      });

      throw new Error(data?.message ?? `Erro ${res.status}`);
    }

    Swal.fire({
      title: "Usuário Criado!",
      text: "O usuário foi registrado com sucesso.",
      icon: "success",
    });

    return data;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);

    Swal.fire({
      title: "Erro",
      text: message,
      icon: "error",
    });

    throw err;
  }
}
