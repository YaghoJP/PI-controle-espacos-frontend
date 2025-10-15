import { API_BASE_URL } from "./localhost";

export async function handlerLogin(email: string, password: string) {
  const res = await fetch(API_BASE_URL+"/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function handlerDeleteSpace(id: number){
  await fetch(API_BASE_URL+`/spaces/${id}`, {
    method: "DELETE",
    headers: {
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
  const res = await fetch(API_BASE_URL+"/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = res.json();
  console.log(data);
}
