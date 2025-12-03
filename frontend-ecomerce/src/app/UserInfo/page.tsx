// src/app/configuracoes/page.tsx
"use client";

import React, { useState } from 'react';
import Navbar from "../Componets/Navbar";
import { 
  User, 
  Home, 
  Lock, 
  Camera, 
  CheckCircle, 
  Check,
  Star,
  ClipboardList
} from 'lucide-react'; // Ícones

export default function PerfilPage() {
  // Estados para controlar a UI (ex: modo de edição)
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingAssoc, setIsEditingAssoc] = useState(false);


  return (
    // O fundo principal é controlado pelo seu globals.css (var(--background))
    <div className="min-h-screen"> 
      <Navbar />

      <main className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Cabeçalho da Página */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Meu Perfil</h1>
          <p className="text-base text-slate-500">Gerencie suas informações pessoais e configurações de conta</p>
        </header>

        {/* Layout da Página (Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">
          
          {/* 1. Sidebar do Perfil */}
          <aside className="bg-background border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm lg:sticky top-28">
            {/* Seção do Avatar */}
            <div className="text-center pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 mx-auto mb-4 flex items-center justify-center relative">
                <span className="text-5xl font-bold text-white">JD</span>
              </div>
              <h2 className="text-xl font-bold text-foreground">João Silva</h2>
              <p className="text-sm text-slate-500 mb-3">joao.silva@email.com</p>
              <span className="inline-flex items-center gap-1.5 py-1 px-3 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded-full text-xs font-bold">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                Conta Ativa
              </span>
            </div>
            
            {/* Seção de Stats */}
            <div className="grid gap-3">
              <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-sm font-medium text-slate-500">Reservas Ativas</span>
                <span className="text-base font-bold text-foreground">3</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-sm font-medium text-slate-500">Total de Reservas</span>
                <span className="text-base font-bold text-foreground">28</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-sm font-medium text-slate-500">Membro desde</span>
                <span className="text-base font-bold text-foreground">Jan 2024</span>
              </div>
            </div>
          </aside>

          {/* 2. Conteúdo Principal */}
          <div className="flex flex-col gap-6">
            
            {/* Card: Informações Pessoais */}
            <div className="bg-background border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
              <CardHeader title="Informações Pessoais" icon={<User size={20} />} onEdit={() => handleEditClick('Informações Pessoais')} />
              <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <InfoItem label="Nome Completo" value="João Silva" />
                <InfoItem label="CPF" value="123.456.789-00" />
                <InfoItem label="E-mail" value="joao.silva@email.com" />
                <InfoItem label="Telefone" value="(11) 98765-4321" />
                <InfoItem label="Data de Nascimento" value="15/03/1985" />
                <InfoItem label="Tipo de Perfil" value="Associado" />
              </div>
            </div>

            {/* Card: Informações de Associação */}
            <div className="bg-background border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
              <CardHeader title="Informações de Associação" icon={<Home size={20} />} onEdit={() => handleEditClick('Informações de Associação')} />
              <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <InfoItem label="Número de Associado" value="ASC-2024-00847" />
                <InfoItem label="Clube Principal" value="Clube Central" />
                <InfoItem label="Status" value="Ativo" icon={<CheckCircle size={14} className="text-green-600" />} />
                <InfoItem label="Dependentes" value="2 cadastrados" />
              </div>
            </div>

            {/* Card: Plano */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-7 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" aria-hidden="true"></div>
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                  <div>
                    <span className="inline-block py-1 px-3 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider mb-3">Plano Atual</span>
                    <h3 className="text-3xl font-extrabold mb-2">Premium</h3>
                    <p className="text-sm text-slate-300">Acesso completo a todos os espaços e benefícios.</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-4xl font-extrabold">R$ 149</div>
                    <div className="text-sm text-slate-300">/mês</div>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  <PlanFeature text="Reservas ilimitadas por mês" />
                  <PlanFeature text="Acesso a todos os clubes da rede" />
                  <PlanFeature text="Prioridade em reservas de alta demanda" />
                </ul>
                <div className="flex flex-col sm:flex-row gap-3">
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// --- Sub-componentes para limpar a página ---

// Cabeçalho de Card reutilizável
const CardHeader = ({ title, icon, onEdit }: { title: string; icon: React.ReactNode; onEdit?: () => void }) => (
  <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
    <h3 className="text-lg font-bold text-foreground flex items-center gap-2.5">
      <span className="text-blue-600">{icon}</span>
      {title}
    </h3>
  </div>
);

// Item de Informação reutilizável
const InfoItem = ({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) => (
  <div className="flex flex-col">
    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{label}</span>
    <span className="text-sm font-medium text-foreground flex items-center gap-1.5">
      {icon}
      {value}
    </span>
  </div>
);

// Feature do Plano reutilizável
const PlanFeature = ({ text }: { text: string }) => (
  <li className="flex items-center gap-2 text-sm text-slate-200">
    <span className="w-5 h-5 flex items-center justify-center bg-white/20 rounded-full">
      <Check size={12} />
    </span>
    <span>{text}</span>
  </li>
);