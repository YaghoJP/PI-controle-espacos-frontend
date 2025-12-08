"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Calendar, ChevronDown } from "lucide-react";
import { API_BASE_URL } from "../Service/localhost";
import Swal from "sweetalert2"; // 🔥 ADICIONADO

type Props = {
  userName?: string | null;
  initials?: string;
  role?: string | null;
};

export default function UserMenuDropdown({ userName = "Usuário", initials = "US", role = "ASSOCIADO" }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Busca email do usuário
  useEffect(() => {
    (async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const token = localStorage.getItem("token");
        if (!userId || !token) return;

        const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();
        const data = json?.data ?? json;

        if (data?.email) {
          setEmail(data.email);
        }
      } catch (err) {
        Swal.fire({
          icon: "warning",
          title: "Aviso",
          text: "Não foi possível carregar seu e-mail agora.",
          confirmButtonColor: "#2563eb",
        });
      }
    })();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/Home");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors hover:bg-slate-100"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
          {initials}
        </div>

        <div className="hidden lg:flex flex-col items-start">
          <span className="font-semibold text-sm text-gray-900">{userName}</span>
          <span className="text-xs text-blue-600">{role}</span>
        </div>

        <ChevronDown size={16} className={`text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* MENU */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-60 bg-white border border-slate-200 rounded-xl shadow-lg p-2 z-50">
          
          {/* Mostrar "Minhas Reservas" APENAS se for associado */}
          {role === "ASSOCIADO" && (
            <Link
              href="/Reserva"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <Calendar size={16} />
              Minhas Reservas
            </Link>
          )}

          <div className="h-px bg-slate-100 my-2"></div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 text-sm w-full text-left text-red-600 rounded-lg hover:bg-red-50"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
