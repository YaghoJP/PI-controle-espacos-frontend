"use client";

import { useState } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import {handlerLogin} from "../Service/service"
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const router = useRouter();
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const handler = await handlerLogin(email.trim(), password);
    console.log("login response:", handler);

    if (!handler || !handler.token) {
      alert("Credenciais inválidas. Tente novamente.");
      return;
    }

    // normaliza valores
    const roleRaw = String(handler.role ?? "").trim();
    const role = roleRaw.toUpperCase();

    // salva informações
    localStorage.setItem("token", handler.token);
    if (handler.role !== undefined && handler.role !== null) {
      localStorage.setItem("role", String(handler.role));
    }
    if (handler.id !== undefined && handler.id !== null) {
      localStorage.setItem("user_id", String(handler.id));
    }

    // redireciona com base na role normalizada
    if (role === "ASSOCIADO") {
      router.push("/Dashboard");
    } else if (role === "ADMIN" || role === "ADMINISTRADOR" || role === "ADM") {
      router.push("/DashboardAdmin");
    } else {
      // fallback: se não corresponde a nada esperado, use role originalmente retornada
      console.warn("Role não mapeada:", handler.role);
      router.push("/Dashboard");
    }
  } catch (err) {
    console.error("Erro no login:", err);
    alert("Erro ao conectar com o servidor. Tente novamente mais tarde.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl p-12 w-full max-w-md relative">
        {/* Barra superior */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-700 via-green-600 to-blue-600"></div>

        {/* Logo e título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-700 to-green-600 rounded-xl flex items-center justify-center">
              {/* ícone de check com Tailwind */}
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="text-3xl font-bold text-green-800">
              reserva<span className="text-blue-600">CM</span>
            </div>
          </div>
          <p className="text-gray-500">Faça login para acessar sua conta</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3.5 border-2 border-gray-200 rounded-xl bg-gray-50
                        text-black placeholder-gray-700 
                        focus:outline-none focus:border-blue-600 focus:bg-white 
                        focus:ring-4 focus:ring-blue-600/10"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6 relative">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full p-3.5 border-2 border-gray-200 rounded-xl bg-gray-50 
                        text-black placeholder-gray-700
                        focus:outline-none focus:border-blue-600 focus:bg-white 
                        focus:ring-4 focus:ring-blue-600/10 pr-12"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Botão de mostrar/ocultar senha */}
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.034.153-2.035.438-2.967m2.493-3.658A9.96 9.96 0 0112 3c5.523 0 10 4.477 10 10 0 1.034-.153 2.035-.438 2.967m-2.493 3.658L4.222 4.222"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-blue-600 to-blue-700 text-white p-4 rounded-xl font-semibold mb-6 hover:-translate-y-px hover:shadow-lg hover:shadow-blue-600/30 disabled:bg-gray-400 disabled:transform-none disabled:shadow-none"
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>

          <div className="text-center mb-6">
            <Link
              href="/esqueci-senha"
              className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              Esqueci minha senha
            </Link>
          </div>
          
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-sm text-gray-400">ou</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <div className="text-center mt-4">
            <Link
              href="/TelaCadastro"
              className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              Criar uma conta
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
