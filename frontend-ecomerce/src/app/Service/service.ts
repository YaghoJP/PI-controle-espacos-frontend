import { API_BASE_URL } from "./localhost";
export async function handlerCreateReservation(
  space_id?: number,
  start_time?: string,
  end_time?: string,
  reservation_date?: string
) {
  const token = localStorage.getItem("token");
  const user_id = Number(localStorage.getItem("user_id"));
  const res = await fetch(API_BASE_URL + "/reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      user_id,
      space_id,
      start_time,
      end_time,
      reservation_date,
    }),
  });
  console.log(res);
  return res.json();
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
  const token = localStorage.getItem("token");

  const res = await fetch(API_BASE_URL + "/session", {
    method: "POST",
    headers: {
      headerAuthorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  console.log(res);
  return res.status ===200 ?res.json():null;
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
  } catch (err: any) {
    console.error("handlerCreateUser failed:", err);
    throw err; 
  }
}