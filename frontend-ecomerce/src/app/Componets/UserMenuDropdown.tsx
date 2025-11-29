// src/app/Componets/UserMenuDropdown.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Calendar,
  Settings,
  LogOut,
  ChevronDown,
  Star,
} from "lucide-react";
import { API_BASE_URL } from "../Service/localhost";

type Props = {
  userName?: string | null;
  initials?: string;
};

function useOutsideClick(ref: React.RefObject<HTMLDivElement>, callback: () => void) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback]);
}

export default function UserMenuDropdown({ userName = null, initials = "US" }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useOutsideClick(dropdownRef, () => {
    if (isOpen) setIsOpen(false);
  });

  useEffect(() => {
    // tenta obter email do backend se houver user_id/token e email ainda não for conhecido
    (async () => {
      try {
        if (email) return; // já temos
        if (typeof window === "undefined") return;
        const userId = localStorage.getItem("user_id");
        const token = localStorage.getItem("token");
        if (!userId) return;

        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(`${API_BASE_URL}/users/${userId}`, { headers });
        if (!res.ok) return;
        const data = await res.json();
        const payload = data?.data ?? data;
        if (payload?.email) setEmail(payload.email);
      } catch (err) {
        // não é fatal — apenas logar
        console.debug("Não foi possível buscar email do usuário:", err);
      }
    })();
  }, [email]);

  const handleLogout = () => {
    // remove credenciais locais e redireciona
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("role");
    } catch (e) {
      /* ignore */
    }
    setIsOpen(false);
    router.push("/TelaLogin");
  };

  const displayName = userName ?? "Usuário";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors hover:bg-slate-100"
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {initials}
        </div>

        <div className="hidden lg:flex flex-col items-start">
          <span className="font-semibold text-sm text-gray-900">{displayName}</span>
          <span className="text-xs text-slate-500">Associado</span>
        </div>

        <ChevronDown
          size={16}
          className={`text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-5 border-b border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                {initials}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{displayName}</div>
                <div className="text-sm text-slate-500">{email ?? "—"}</div>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 py-1 px-3 bg-green-100 border border-green-700 rounded-full text-xs font-bold text-green-800">
              <Star size={12} className="text-green-700" />
              Plano Premium
            </span>
          </div>

          <nav className="p-2">
            <Link
              href="/UserInfo"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-blue-600"
            >
              <User size={16} />
              <span>Meu Perfil</span>
            </Link>

            <Link
              href="/Reserva"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-blue-600"
            >
              <Calendar size={16} />
              <span>Minhas Reservas</span>
            </Link>

            <Link
              href="/Configuracoes"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-blue-600"
            >
              <Settings size={16} />
              <span>Configurações</span>
            </Link>

            <div className="h-px bg-slate-100 my-2"></div>

            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <LogOut size={16} />
              <span>Sair</span>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
