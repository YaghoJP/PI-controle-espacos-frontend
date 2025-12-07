"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginModal from "../Componets/LoginModal";
import Image from "next/image";


export default function HomePage() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => router.push("/TelaLogin");

  const handleContactRedirect = () =>
    alert("Redirecionando para a página de contato...");

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all 
        ${isScrolled
            ? "h-16 shadow-md bg-white/95 backdrop-blur-md"
            : "h-20 bg-white/95 backdrop-blur-md"
          }
      `}
      >
        <div className="flex items-center justify-between h-full px-12">
          <div className="flex items-center gap-3">
            <Image
              src="/icon_rcm_2.png"
              alt="Logo ReservaCM"
              width={100}
              height={100}
              className="w-40 h-auto object-contain"
            />
          </div>


          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-slate-500 hover:text-blue-600 font-medium"
            >
              Recursos
            </a>
            <a
              href="https://wa.me/5594991817016"
              target="_blank"
              className="text-slate-500 hover:text-blue-600 font-medium"
            >
              Contato
            </a>


            <button
              onClick={handleLogin}
              className="px-6 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold text-slate-600"
            >
              Entrar
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="mt-20 px-12 py-24 bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
            <div className="animate-fadeInUp space-y-6">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full font-semibold text-sm">
                🎯 O seu lugar para eventos em Campo Mourão
              </span>

              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 leading-tight">
                Reserve espaços{" "}
                <span className="bg-gradient-to-r from-green-700 to-blue-600 bg-clip-text text-transparent">
                  incríveis
                </span>{" "}
                com total facilidade
              </h1>

              <p className="text-lg md:text-xl text-slate-500">
                Encontre e alugue o espaço perfeito para seus eventos — salões,
                churrasqueiras e quadras com uma experiência digital simples e
                eficiente.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* REMOVIDO: botão Explorar Espaços */}

                <a
                  href="https://wa.me/5594991817016"
                  target="_blank"
                  className="px-8 py-4 bg-white border border-slate-200 hover:bg-slate-100 font-bold rounded-xl text-center"
                >
                  Fale Conosco
                </a>

              </div>
            </div>

            {/* CARDS HERO */}
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-white shadow-xl rounded-xl hover:-translate-y-2 transition">
                <div className="w-14 h-14 bg-gradient-to-br from-green-700 to-green-500 rounded-xl flex items-center justify-center text-white text-3xl mb-4">
                  📅
                </div>
                <h3 className="font-bold text-lg">Reservas Simplificadas</h3>
                <p className="text-slate-500 text-sm">
                  Interface intuitiva para reservar espaços em poucos cliques.
                </p>
              </div>

              <div className="p-6 bg-white shadow-xl rounded-xl mt-10 hover:-translate-y-2 transition">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center text-white text-3xl mb-4">
                  ⚡
                </div>
                <h3 className="font-bold text-lg">Confirmação Imediata</h3>
                <p className="text-slate-500 text-sm">
                  Disponibilidade real e confirmação instantânea.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="px-12 py-24 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800">
                Uma experiência de reserva completa
              </h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">
                Tudo que você precisa para uma reserva tranquila, rápida e
                segura.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                ["📱", "Sistema Responsivo", "Acesse e reserve de qualquer dispositivo."],
                ["🗓️", "Calendário Inteligente", "Disponibilidade em tempo real com calendário interativo."],
                ["🔔", "Notificações Automáticas", "Confirmações e lembretes enviados automaticamente."],
                ["👥", "Painel do Sócio", "Gerencie reservas, pagamentos e dados pessoais."],
                ["📊", "Histórico Completo", "Veja todas as suas reservas anteriores facilmente."],
                ["🔒", "Segurança Total", "Criptografia e autenticação segura."],
              ].map(([icon, title, desc], i) => (
                <div
                  key={i}
                  className="p-10 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 hover:bg-white shadow-sm hover:shadow-xl transition"
                >
                  <div className="w-16 h-16 rounded-xl bg-blue-600 text-white flex items-center justify-center text-3xl mb-5">
                    {icon}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        { }
        <section className="px-12 py-3 bg-slate-900 text-center text-white">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold">
              Pronto para reservar seu próximo evento?
            </h2>

            <p className="text-lg text-slate-300">
              Fale conosco e tire todas as suas dúvidas sobre como reservar.
            </p>

            { }
          </div>
        </section>
      </main>

<footer className="bg-slate-900 text-slate-300 px-8 py-10">
  <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">

    {/* Linha separadora */}
    <div className="w-full border-t border-slate-700 pt-6" />
    {/* Links */}

    {/* Copyright */}
    <p className="text-xs text-slate-500 mt-4">
      © 2025 reservaCM • Desenvolvido por Viczinha, Mineirin, Jota e Yagho CLT.
    </p>
  </div>
</footer>


      {/* MODAL */}
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
