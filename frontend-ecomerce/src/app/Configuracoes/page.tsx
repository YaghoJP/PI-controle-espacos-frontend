// src/app/configuracoes/page.tsx
"use client";

import React, { useState } from 'react';
import Navbar from "../Componets/Navbar";
import { 
  Bell, 
  Lock, 
  Settings, 
  Globe, 
  ChevronRight, 
  AlertTriangle 
} from 'lucide-react'; // Ícones do Lucide

// --- TIPOS ---
// Define qual seção está ativa
type ActiveSection = 'notifications' | 'privacy' | 'preferences' | 'language';

// --- COMPONENTE PRINCIPAL ---
export default function ConfiguracoesPage() {
  // Estado para controlar a navegação lateral
  const [activeSection, setActiveSection] = useState<ActiveSection>('notifications');

  // Estado para os toggles de Notificações
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [reservationConfirmations, setReservationConfirmations] = useState(true);
  const [reservationReminders, setReservationReminders] = useState(true);
  const [promotionalNotifications, setPromotionalNotifications] = useState(false);
  
  // Estado para os toggles de Privacidade
  const [publicProfile, setPublicProfile] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  // Estado para as Preferências
  const [theme, setTheme] = useState('auto');
  const [language, setLanguage] = useState('pt-br');

  return (
    <div className="min-h-screen"> {/* Usa o fundo do seu globals.css */}
      <Navbar />

      <main className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Cabeçalho da Página */}
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
            <span className="hover:underline"><a href="/Dashboard">Início</a></span>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="font-medium text-foreground">Configurações</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Configurações</h1>
          <p className="text-base text-slate-500">Personalize sua experiência e gerencie preferências da conta.</p>
        </header>

        {/* Layout da Página (Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 items-start">
          
          {/* 1. Navegação Lateral (Sidebar) */}
          <nav className="bg-background border border-slate-200 dark:border-slate-800 rounded-xl p-2 shadow-sm lg:sticky top-28">
            <SettingsNavItem
              icon={<Bell size={18} />}
              label="Notificações"
              isActive={activeSection === 'notifications'}
              onClick={() => setActiveSection('notifications')}
            />
            <SettingsNavItem
              icon={<Lock size={18} />}
              label="Privacidade"
              isActive={activeSection === 'privacy'}
              onClick={() => setActiveSection('privacy')}
            />
            <SettingsNavItem
              icon={<Settings size={18} />}
              label="Preferências"
              isActive={activeSection === 'preferences'}
              onClick={() => setActiveSection('preferences')}
            />
            <SettingsNavItem
              icon={<Globe size={18} />}
              label="Idioma e Região"
              isActive={activeSection === 'language'}
              onClick={() => setActiveSection('language')}
            />
          </nav>

          {/* 2. Conteúdo Principal (Renderização Condicional) */}
          <div className="flex flex-col gap-6">
            {activeSection === 'notifications' && (
              <SectionShell title="Notificações" icon={<Bell />}>
                <SettingItem label="Notificações por E-mail" description="Receba atualizações importantes sobre suas reservas por e-mail.">
                  <ToggleSwitch enabled={emailNotifications} setEnabled={setEmailNotifications} />
                </SettingItem>
                <SettingItem label="Confirmações de Reserva" description="Receber e-mail quando uma reserva for confirmada.">
                  <ToggleSwitch enabled={reservationConfirmations} setEnabled={setReservationConfirmations} />
                </SettingItem>
                <SettingItem label="Lembretes de Reserva" description="Receber lembretes 24h antes da data da reserva.">
                  <ToggleSwitch enabled={reservationReminders} setEnabled={setReservationReminders} />
                </SettingItem>
                <SettingItem label="Notificações Promocionais" description="Receber ofertas especiais e novidades sobre espaços.">
                  <ToggleSwitch enabled={promotionalNotifications} setEnabled={setPromotionalNotifications} />
                </SettingItem>
              </SectionShell>
            )}

            {activeSection === 'privacy' && (
              <SectionShell title="Privacidade e Segurança" icon={<Lock />}>
                <SettingItem label="Perfil Público" description="Permitir que outros usuários vejam seu perfil básico.">
                  <ToggleSwitch enabled={publicProfile} setEnabled={setPublicProfile} />
                </SettingItem>
                <SettingItem label="Mostrar Histórico de Reservas" description="Exibir suas reservas passadas no perfil público.">
                  <ToggleSwitch enabled={showHistory} setEnabled={setShowHistory} />
                </SettingItem>
                <SettingItem label="Autenticação em Duas Etapas" description="Adicione uma camada extra de segurança à sua conta.">
                  <button className="py-2 px-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg font-semibold text-sm transition-colors hover:bg-slate-200 dark:hover:bg-slate-700">
                    Configurar
                  </button>
                </SettingItem>
                <SettingItem label="Alterar Senha" description="Última alteração há 45 dias.">
                  <button className="py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold text-sm transition-colors hover:bg-blue-700">
                    Alterar
                  </button>
                </SettingItem>
              </SectionShell>
            )}

            {activeSection === 'preferences' && (
              <SectionShell title="Preferências Gerais" icon={<Settings />}>
                <div className="space-y-5">
                  <FormSelect label="Tema de Cores" value={theme} onChange={(e) => setTheme(e.target.value)}>
                    <option value="light">Claro</option>
                    <option value="dark">Escuro</option>
                    <option value="auto">Automático (Seguir sistema)</option>
                  </FormSelect>
                  <FormSelect label="Formato de Data" defaultValue="dd/mm/aaaa">
                    <option value="dd/mm/aaaa">DD/MM/AAAA</option>
                    <option value="mm/dd/aaaa">MM/DD/AAAA</option>
                    <option value="aaaa-mm-dd">AAAA-MM-DD</option>
                  </FormSelect>
                  <FormSelect label="Formato de Hora" defaultValue="24h">
                    <option value="24h">24 horas (13:00)</option>
                    <option value="12h">12 horas (1:00 PM)</option>
                  </FormSelect>
                </div>
              </SectionShell>
            )}

            {activeSection === 'language' && (
              <SectionShell title="Idioma e Região" icon={<Globe />}>
                <div className="space-y-3 mb-6">
                  <LanguageOption
                    flag="🇧🇷" name="Português (Brasil)" native="Portuguese"
                    selected={language === 'pt-br'}
                    onClick={() => setLanguage('pt-br')}
                  />
                  <LanguageOption
                    flag="🇺🇸" name="Inglês (EUA)" native="English"
                    selected={language === 'en-us'}
                    onClick={() => setLanguage('en-us')}
                  />
                  <LanguageOption
                    flag="🇪🇸" name="Espanhol" native="Español"
                    selected={language === 'es-es'}
                    onClick={() => setLanguage('es-es')}
                  />
                </div>
                <FormSelect label="Fuso Horário" defaultValue="gmt-3">
                  <option value="gmt-3">(GMT-3:00) Brasília</option>
                  <option value="gmt-5">(GMT-5:00) Nova York</option>
                </FormSelect>
              </SectionShell>
            )}

            {/* Botão Salvar Fixo */}
            <button 
              className="w-full py-4 px-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg font-semibold text-base transition-all hover:-translate-y-px hover:shadow-lg hover:shadow-blue-600/30"
              onClick={() => alert('Configurações salvas!')}
            >
              Salvar Todas as Alterações
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTES INTERNOS ---

// 1. Navegação Lateral (Item)
interface SettingsNavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}
const SettingsNavItem: React.FC<SettingsNavItemProps> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full p-3 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300'
        : 'text-slate-500 hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800'
    }`}
  >
    <span className={isActive ? 'text-blue-600' : 'text-slate-400'}>{icon}</span>
    <span>{label}</span>
  </button>
);

// 2. Wrapper de Seção de Configuração
interface SectionShellProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}
const SectionShell: React.FC<SectionShellProps> = ({ title, icon, children }) => (
  <div className="bg-background border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
    <header className="p-6 md:p-7 border-b border-slate-100 dark:border-slate-800">
      <h2 className="text-xl font-bold text-foreground flex items-center gap-2.5">
        <span className="text-blue-600">{icon}</span>
        {title}
      </h2>
    </header>
    <div className="p-6 md:p-7">
      {children}
    </div>
  </div>
);

// 3. Item de Configuração (Label + Descrição + Ação)
interface SettingItemProps {
  label: string;
  description: string;
  children: React.ReactNode;
}
const SettingItem: React.FC<SettingItemProps> = ({ label, description, children }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-5 border-b border-slate-100 dark:border-slate-800 last:border-b-0 last:pb-0 first:pt-0">
    <div className="flex-1 mb-3 sm:mb-0 sm:mr-6">
      <h3 className="text-sm font-semibold text-foreground mb-1">{label}</h3>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
    <div className="flex-shrink-0">
      {children}
    </div>
  </div>
);

// 4. Toggle Switch
interface ToggleSwitchProps {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, setEnabled }) => (
  <button
    onClick={() => setEnabled(!enabled)}
    className={`${
      enabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
  >
    <span
      aria-hidden="true"
      className={`${
        enabled ? 'translate-x-5' : 'translate-x-0'
      } inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
    />
  </button>
);

// 5. Seletor de Idioma
interface LanguageOptionProps {
  flag: string;
  name: string;
  native: string;
  selected: boolean;
  onClick: () => void;
}
const LanguageOption: React.FC<LanguageOptionProps> = ({ flag, name, native, selected, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
      selected
        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/50'
        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
    }`}
  >
    <span className="text-2xl">{flag}</span>
    <div className="flex-1">
      <div className="font-semibold text-foreground">{name}</div>
      <div className="text-sm text-slate-500">{native}</div>
    </div>
    <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${selected ? 'border-blue-600' : 'border-slate-300 dark:border-slate-600'}`}>
      {selected && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>}
    </div>
  </div>
);

// 6. Componente Select (Dropdown)
interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: React.ReactNode;
}
const FormSelect: React.FC<FormSelectProps> = ({ label, children, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{label}</label>
    <select
      {...props}
      className="w-full p-3 border-2 border-slate-200 dark:border-slate-700 bg-background rounded-lg text-sm transition-all focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
    >
      {children}
    </select>
  </div>
);