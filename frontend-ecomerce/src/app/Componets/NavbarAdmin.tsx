"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { API_BASE_URL } from "../Service/localhost";
import Image from "next/image";
import UserMenuDropdown from "./UserMenuDropdown";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const pathname = usePathname() ?? "/";
  const isActive = pathname.toLowerCase() === href.toLowerCase();

  return (
    <Link
      href={href}
      className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
        isActive
          ? "bg-blue-50 text-blue-600"
          : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
      }`}
    >
      {children}
    </Link>
  );
};

export default function NavbarAdmin() {
  const [userName, setUserName] = useState<string | null>(null);
  const [initials, setInitials] = useState<string>("US");
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    const storedRole = localStorage.getItem("role");

    if (storedRole) {
      setRole(storedRole.toUpperCase());
    }

    if (!userId) return;

    const loadUser = async () => {
      try {
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
          method: "GET",
          headers,
        });

        if (!res.ok) {
          console.error("Falha ao buscar usuário:", await res.text());
          return;
        }

        const user = await res.json();
        setUserName(user.name);

        const parts = user.name.split(" ");
        const ini =
          parts.length === 1
            ? parts[0].slice(0, 2).toUpperCase()
            : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();

        setInitials(ini);

      } catch (err) {
        console.error("Erro ao carregar usuário:", err);
      }
    };

    loadUser();
  }, []);

  return (
    <nav className="bg-white border-b border-slate-200 px-4 md:px-8 h-auto md:h-[72px] flex items-center justify-between sticky top-0 z-50 shadow-sm py-3">

      {/* LOGO */}
      <Link href="/DashboardAdmin" className="flex items-center gap-3">
        <Image
          src="/icon_rcm_2.png"
          alt="Logo ReservaCM"
          width={100}
          height={100}
          className="w-40 h-auto object-contain"
        />
      </Link>

      {/* LINKS ADMIN */}
      <div className="hidden md:flex gap-2">
        <NavLink href="/DashboardAdmin">Espaços</NavLink>
        <NavLink href="/TelaReservas">Reservas</NavLink>
        <NavLink href="/CreateSpace">Criar Espaço</NavLink>
        <NavLink href="/ListUsers">Usuários do Sistema</NavLink>
        <NavLink href="/TelaCadastro">Cadastrar Usuários</NavLink>
      </div>

      {/* MENU DO USUÁRIO (DROPDOWN) */}
      <UserMenuDropdown
        userName={userName}
        initials={initials}
        role={role ?? "ADMIN"}
      />

    </nav>
  );
}
