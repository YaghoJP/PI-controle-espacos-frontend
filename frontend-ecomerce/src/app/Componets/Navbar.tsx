// app/components/Navbar.tsx
import Link from 'next/link';
import React from 'react';

// Tipagem para as props do componente NavLink interno
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, isActive }) => (
  <Link href={href} className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
    isActive 
      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300' 
      : 'text-slate-500 hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800'
  }`}>
    {children}
  </Link>
);

export default function Navbar() {
  return (
    <nav className="bg-background border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 h-auto md:h-[72px] flex items-center justify-between sticky top-0 z-50 shadow-sm flex-wrap md:flex-nowrap py-3 md:py-0">
      <Link href="/dashboard" className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gradient-to-br from-green-700 to-green-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">✓</span>
        </div>
        <div className="text-xl font-bold text-green-800">
          reserva<span className="text-blue-600">CM</span>
        </div>
      </Link>

      <div className="w-full md:w-auto order-3 md:order-2 mt-3 md:mt-0">
        <div className="flex items-center justify-around md:justify-center gap-2">
          <NavLink href="/Dashboard" isActive>Espaços</NavLink>
          <NavLink href="/minhas-reservas">Minhas Reservas</NavLink>
          <NavLink href="/configuracoes">Configurações</NavLink>
          <NavLink href="/dashboard" isActive>Espaços</NavLink>
          <NavLink href="/minhas">Minhas Reservas</NavLink>
          <NavLink href="/CreateSpace">Criar Espaço</NavLink>
        </div>
      </div>
      
      <div className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 order-2 md:order-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          JD
        </div>
        <div className="hidden lg:flex flex-col items-start">
          <span className="font-semibold text-sm text-foreground">João Silva</span>
          <span className="text-xs text-slate-500">Associado</span>
        </div>
      </div>
    </nav>
  );
}