// src/app/components/UserMenuDropdown.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  User, 
  Calendar, 
  CreditCard, 
  Settings, 
  HelpCircle, 
  LogOut, 
  ChevronDown,
  Star
} from 'lucide-react'; // Ícones para um visual profissional

// Hook customizado para detectar cliques fora do elemento
function useOutsideClick(ref: React.RefObject<HTMLDivElement>, callback: () => void) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback]);
}

export default function UserMenuDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o menu se o usuário clicar fora
useOutsideClick(dropdownRef as React.RefObject<HTMLDivElement>, () => {
    if (isOpen) setIsOpen(false);
});

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 1. O Gatilho (Botão do Usuário) */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          JD
        </div>
        <div className="hidden lg:flex flex-col items-start">
          <span className="font-semibold text-sm text-foreground">João Silva</span>
          <span className="text-xs text-slate-500">Associado</span>
        </div>
        <ChevronDown 
          size={16} 
          className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* 2. O Dropdown (Menu Flutuante) */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-background border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Cabeçalho do Dropdown */}
          <div className="p-5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                JD
              </div>
              <div>
                <div className="font-semibold text-foreground">João Silva</div>
                <div className="text-sm text-slate-500">joao.silva@email.com</div>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 py-1 px-3 bg-green-100 dark:bg-green-900/50 border border-green-700 dark:border-green-800 rounded-full text-xs font-bold text-green-800 dark:text-green-300">
              <Star size={12} className="text-green-700 dark:text-green-300" />
              Plano Premium
            </span>
          </div>
          
          {/* Menu de Links */}
          <nav className="p-2">
            <Link href="/UserInfo" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400">
              <User size={16} />
              <span>Meu Perfil</span>
            </Link>
            <Link href="/Reserva" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400">
              <Calendar size={16} />
              <span>Minhas Reservas</span>
            </Link>
            <Link href="/Configuracoes" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400">
              <Settings size={16} />
              <span>Configurações</span>
            </Link>
            {/* Divisor */}
            <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
            <Link href="/logout" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/50">
              <LogOut size={16} />
              <span>Sair</span>
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}