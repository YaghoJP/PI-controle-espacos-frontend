import { API_BASE_URL } from "./localhost";

export async function handlerCreateReservation(payload: {
  user_id: number;
  space_id: number;
  start_time: string; // ISO
  end_time: string;   // ISO
}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}/reservations`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    console.error("Erro ao criar reserva:", data);
    throw new Error(data?.message || `Erro ao criar reserva (status ${res.status})`);
  }

  return data;
}

export async function handlerCreateSpace(space: {
  name: string;
  description: string;
  capacity: number;
  available: boolean;
  imageUrl?: string | null;
}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

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
    console.error("Erro ao criar espaço:", res.status, raw);
    throw new Error(`Erro ao criar espaço (${res.status})`);
  }

  return raw ? JSON.parse(raw) : null;
}


export async function handlerDeleteReservation(id: number) {
  const token = localStorage.getItem("token");
  await fetch(API_BASE_URL + `/reservations/${id}`, {
    method: "DELETE",
    headers: {
      headerAuthorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export async function handlerLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) return null;

  const data = await res.json();

  console.log("LOGIN RAW:", data);

  return {
    token: data.token,
    id: data.id,
    role: data.role, 
  };
}


export async function handlerDeleteSpace(id: number) {
  const token = localStorage.getItem("token");
  await fetch(API_BASE_URL + `/spaces/${id}`, {
    method: "DELETE",
    headers: {
      headerAuthorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export async function handlerCreateUser(user: {
  name: string;
  email: string;
  password: string;
  role: string;
}) {
  try {


    //const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const headers: Record<string,string> = {
      "Content-Type": "application/json",
    };

    // só adicionar Authorization se houver token
    //if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE_URL}/user`, {
      method: "POST",
      headers,
      body: JSON.stringify(user),
    });

    const data = await res.json(); 

    if (!res.ok) {
      
      throw new Error(data?.message ?? `Erro ${res.status}`);
    }

    console.log("create user response:", data);
    return data; 
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("handlerCreateUser failed:", message);
    throw err; 
  }
}
