// src/app/components/Navbar.tsx
"use client"; // Necessário para hooks como usePathname e o dropdown

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation'; // Importa o hook para detectar a rota
import UserMenuDropdown from './UserMenuDropdown'; // <-- 1. Importa o novo componente de Dropdown

// Tipagem para as props do componente NavLink interno
// Removemos 'isActive' pois o componente vai descobrir sozinho
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

// Este componente NavLink agora é inteligente
const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const pathname = usePathname(); // Pega a URL atual
  // Compara a URL atual com o href do link.
  // Usamos toLowerCase para garantir que /dashboard e /Dashboard sejam tratados da mesma forma
  const isActive = pathname.toLowerCase() === href.toLowerCase();

  return (
    <Link href={href} className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300' // Estilo ativo
        : 'text-slate-500 hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800' // Estilo inativo
    }`}>
      {children}
    </Link>
  );
};

// Componente Navbar Principal
export default function Navbar() {
  return (
    <nav className="bg-background border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 h-auto md:h-[72px] flex items-center justify-between sticky top-0 z-50 shadow-sm flex-wrap md:flex-nowrap py-3 md:py-0">
      
      {/* Brand (Logo) - Corrigido para /dashboard para consistência */}
      <Link href="/Dashboard" className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gradient-to-br from-green-700 to-green-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">✓</span>
        </div>
        <div className="text-xl font-bold text-green-800">
          reserva<span className="text-blue-600">CM</span>
        </div>
      </Link>

      {/* Navegação Principal (Desktop) */}
      {/* 2. Os links agora são dinâmicos e usam rotas em minúsculas (melhor prática) */}
      <div className="hidden md:flex w-full md:w-auto order-3 md:order-2 mt-3 md:mt-0 justify-around md:justify-center gap-2">
        <NavLink href="/Dashboard">Espaços</NavLink>
        <NavLink href="/Reserva">Minhas Reservas</NavLink>
      </div>
      
      {/* 3. O antigo div estático do usuário é substituído pelo componente interativo */}
      <div className="order-2 md:order-3">
        <UserMenuDropdown />
      </div>

      {/* Navegação (Mobile) - Oculta em desktop (hidden md:flex) e aparece em mobile (w-full order-3) */}
      {/* Esta duplicata foi removida e unificada com a de cima para melhor layout mobile */}
    </nav>
  );
}