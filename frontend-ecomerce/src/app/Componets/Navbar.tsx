"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { API_BASE_URL } from "../Service/localhost";
import UserMenuDropdown from "./UserMenuDropdown";
import Image from "next/image";

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
      className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${isActive
        ? "bg-blue-50 text-blue-600"
        : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
        }`}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  const [userName, setUserName] = useState<string | null>(null);
  const [initials, setInitials] = useState<string>("US");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");

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

        const data = await res.json();
        const user = data?.data ?? data;

        if (!user?.name) return;

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
      <Link href="/Dashboard" className="flex items-center gap-3">
        <Image
          src="/icon_rcm_2.png"
          alt="Logo ReservaCM"
          width={100}
          height={100}
          className="w-40 h-auto object-contain"
        />

      </Link>

      {/* LINKS */}
      <div className="hidden md:flex gap-2">
        <NavLink href="/Dashboard">Espaços</NavLink>
        <NavLink href="/Reserva">Minhas Reservas</NavLink>
      </div>

      {/* MENU DO USUÁRIO COM DROPDOWN */}
      <UserMenuDropdown userName={userName} initials={initials} />
    </nav>
  );
}
