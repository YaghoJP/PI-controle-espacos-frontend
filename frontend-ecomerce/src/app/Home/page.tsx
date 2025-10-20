"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 

export default function HomePage() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogin = () => {
    router.push('/TelaLogin');
  };

  const handleSignup = () => {
    router.push('/TelaCadastro');
  };

  const handleDemoRedirect = () => {
    alert("Redirecionando para a galeria de espaços...");
  };
  
  const handleContactRedirect = () => {
    alert("Redirecionando para a página de contato...");
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-brand">
          <div className="logo-icon"></div>
          <div className="navbar-brand-text">
            reserva<span className="navbar-brand-cm">CM</span>
          </div>
        </div>

        <div className="navbar-menu">
          <div className="nav-links">
            <a href="#features" className="nav-link">Recursos</a>
            <a href="#about" className="nav-link">Sobre</a>
            <a href="#contact" className="nav-link">Contato</a>
          </div>

          {}
          <div className="nav-actions">
            <button className="btn-login" onClick={handleLogin}>Entrar</button>
            <button className="btn-signup" onClick={handleSignup}>Criar Conta</button>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <span className="hero-badge">🎯 O seu lugar para eventos em Campo Mourão</span>
              <h1 className="hero-title">
                Reserve espaços <span className="highlight">incríveis</span> com total facilidade
              </h1>
              <p className="hero-description">
                Encontre e alugue o espaço perfeito para seus eventos. Oferecemos salões de festa,
                churrasqueiras e quadras com uma experiência de reserva digital e sem complicações.
              </p>
              <div className="hero-cta">
                <button className="btn-primary-large" onClick={handleDemoRedirect}>
                  Explorar Espaços
                  <span>→</span>
                </button>
                <button className="btn-secondary-large" onClick={handleContactRedirect}>
                  Fale Conosco
                </button>
              </div>
            </div>

            <div className="hero-visual">
              <div className="visual-card">
                <div className="visual-icon">📅</div>
                <div className="visual-title">Reservas Simplificadas</div>
                <div className="visual-text">
                  Interface intuitiva para reservar espaços em poucos cliques.
                </div>
              </div>
              <div className="visual-card">
                <div className="visual-icon">⚡</div>
                <div className="visual-title">Confirmação Imediata</div>
                <div className="visual-text">
                  Consulte a disponibilidade e receba a confirmação em tempo real.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section" id="features">
          <div className="section-container">
            <div className="section-header">
              <span className="section-badge">✨ Vantagens</span>
              <h2 className="section-title">Uma experiência de reserva completa</h2>
              <p className="section-description">
                Nossa plataforma foi pensada para oferecer tudo que você precisa para uma reserva
                tranquila e segura.
              </p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3 className="feature-title">Sistema Responsivo</h3>
                <p className="feature-description">
                  Acesse e reserve de qualquer dispositivo: computador, tablet ou smartphone.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🗓️</div>
                <h3 className="feature-title">Calendário Inteligente</h3>
                <p className="feature-description">
                  Visualize a disponibilidade em tempo real com um calendário interativo e fácil de usar.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🔔</div>
                <h3 className="feature-title">Notificações Automáticas</h3>
                <p className="feature-description">
                  Receba confirmações por e-mail e lembretes automáticos sobre suas reservas.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">👥</div>
                <h3 className="feature-title">Painel do Sócio</h3>
                <p className="feature-description">
                  Gerencie todas as suas reservas, pagamentos e informações em um único perfil.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3 className="feature-title">Histórico de Reservas</h3>
                <p className="feature-description">
                  Acesse facilmente o histórico de todos os espaços que você já reservou conosco.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3 className="feature-title">Segurança Total</h3>
                <p className="feature-description">
                  Seus dados estão protegidos com criptografia e autenticação segura.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Pronto para encontrar o espaço ideal?</h2>
            <p className="cta-description">
              Crie sua conta gratuitamente e comece a planejar seu próximo evento em um de nossos
              espaços exclusivos.
            </p>
            <div className="cta-buttons">
              {}
              <button className="btn-cta-primary" onClick={handleSignup}>Criar Conta Gratuita</button>
              <button className="btn-cta-secondary" onClick={handleDemoRedirect}>Ver Todos os Espaços</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="logo-icon"></div>
            <div className="navbar-brand-text" style={{ color: "white" }}>
              reserva<span className="navbar-brand-cm">CM</span>
            </div>
          </div>

          <p className="footer-text">
            A melhor solução para reserva de espaços de lazer e eventos em Campo Mourão.
          </p>

          <div className="footer-links">
            <a href="#" className="footer-link">Sobre</a>
            <a href="#" className="footer-link">Recursos</a>
            <a href="#" className="footer-link">Preços</a>
            <a href="#" className="footer-link">Suporte</a>
            <a href="#" className="footer-link">Privacidade</a>
            <a href="#" className="footer-link">Termos</a>
          </div>

          <div className="footer-copyright">
            © 2025 reservaCM. Todos os direitos reservados a Viczinha, Mineirin, Jota e Yagho CLT.
          </div>
        </div>
      </footer>

      {}
      <style jsx>{`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background: white;
            overflow-x: hidden;
        }
        
        .navbar {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid #E2E8F0;
            padding: 0 48px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            transition: all 0.3s;
        }
        
        .navbar.scrolled {
            height: 70px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        
        .navbar-brand {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .logo-icon {
            width: 42px;
            height: 42px;
            background: linear-gradient(135deg, #2D5A3D, #4A7C59);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s;
        }
        
        .logo-icon:hover {
            transform: scale(1.05) rotate(5deg);
        }
        
        .logo-icon::after {
            content: '✓';
            color: white;
            font-weight: bold;
            font-size: 18px;
        }
        
        .navbar-brand-text {
            font-size: 24px;
            font-weight: 700;
            color: #2D5A3D;
        }
        
        .navbar-brand-cm {
            color: #1976D2;
        }
        
        .navbar-menu {
            display: flex;
            align-items: center;
            gap: 32px;
        }
        
        .nav-links {
            display: flex;
            gap: 8px;
        }
        
        .nav-link {
            padding: 10px 18px;
            color: #64748B;
            text-decoration: none;
            font-weight: 500;
            font-size: 15px;
            border-radius: 8px;
            transition: all 0.2s;
        }
        
        .nav-link:hover {
            background: #F1F5F9;
            color: #1976D2;
        }
        
        .nav-actions {
            display: flex;
            gap: 12px;
        }
        
        .btn-login {
            padding: 10px 24px;
            background: #F1F5F9;
            color: #475569;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 15px;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .btn-login:hover {
            background: #E2E8F0;
        }
        
        .btn-signup {
            padding: 10px 24px;
            background: linear-gradient(135deg, #1976D2, #1565C0);
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 15px;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .btn-signup:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(25, 118, 210, 0.3);
        }
        
        .hero-section {
            margin-top: 80px;
            padding: 100px 48px;
            background: linear-gradient(135deg, #F0F9F4 0%, #E3F2FD 100%);
            position: relative;
            overflow: hidden;
        }
        
        .hero-section::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -20%;
            width: 800px;
            height: 800px;
            background: radial-gradient(circle, rgba(45, 90, 61, 0.08) 0%, transparent 70%);
            border-radius: 50%;
        }
        
        .hero-section::after {
            content: '';
            position: absolute;
            bottom: -30%;
            left: -10%;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(25, 118, 210, 0.08) 0%, transparent 70%);
            border-radius: 50%;
        }
        
        .hero-content {
            max-width: 1400px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            align-items: center;
            position: relative;
            z-index: 1;
        }
        
        .hero-text {
            animation: fadeInUp 0.8s ease-out;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .hero-badge {
            display: inline-block;
            padding: 8px 16px;
            background: rgba(25, 118, 210, 0.1);
            color: #1976D2;
            border-radius: 24px;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 24px;
        }
        
        .hero-title {
            font-size: 56px;
            font-weight: 800;
            color: #1E293B;
            line-height: 1.1;
            margin-bottom: 24px;
        }
        
        .hero-title .highlight {
            background: linear-gradient(135deg, #2D5A3D, #1976D2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .hero-description {
            font-size: 20px;
            color: #64748B;
            line-height: 1.6;
            margin-bottom: 40px;
        }
        
        .hero-cta {
            display: flex;
            gap: 16px;
        }
        
        .btn-primary-large {
            padding: 18px 36px;
            background: linear-gradient(135deg, #1976D2, #1565C0);
            color: white;
            border: none;
            border-radius: 12px;
            font-weight: 700;
            font-size: 18px;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .btn-primary-large:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 28px rgba(25, 118, 210, 0.35);
        }
        
        .btn-secondary-large {
            padding: 18px 36px;
            background: white;
            color: #475569;
            border: 2px solid #E2E8F0;
            border-radius: 12px;
            font-weight: 700;
            font-size: 18px;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .btn-secondary-large:hover {
            border-color: #CBD5E1;
            background: #F8FAFC;
        }
        
        .hero-visual {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            animation: fadeIn 1s ease-out 0.3s both;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        .visual-card {
            background: white;
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
            transition: transform 0.3s;
        }
        
        .visual-card:hover {
            transform: translateY(-8px);
        }
        
        .visual-card:nth-child(2) {
            margin-top: 40px;
        }
        
        .visual-icon {
            width: 56px;
            height: 56px;
            background: linear-gradient(135deg, #2D5A3D, #4A7C59);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            color: white;
            margin-bottom: 16px;
        }
        
        .visual-card:nth-child(2) .visual-icon {
            background: linear-gradient(135deg, #1976D2, #1565C0);
        }
        
        .visual-title {
            font-size: 18px;
            font-weight: 700;
            color: #1E293B;
            margin-bottom: 8px;
        }
        
        .visual-text {
            font-size: 14px;
            color: #64748B;
            line-height: 1.5;
        }
        
        .features-section {
            padding: 100px 48px;
            background: white;
        }
        
        .section-container {
            max-width: 1400px;
            margin: 0 auto;
        }
        
        .section-header {
            text-align: center;
            margin-bottom: 64px;
        }
        
        .section-badge {
            display: inline-block;
            padding: 8px 16px;
            background: #F0F9F4;
            color: #2D5A3D;
            border-radius: 24px;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 16px;
        }
        
        .section-title {
            font-size: 42px;
            font-weight: 800;
            color: #1E293B;
            margin-bottom: 16px;
        }
        
        .section-description {
            font-size: 18px;
            color: #64748B;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
        }
        
        .feature-card {
            background: #F8FAFC;
            border-radius: 16px;
            padding: 36px;
            transition: all 0.3s;
            border: 2px solid transparent;
        }
        
        .feature-card:hover {
            background: white;
            border-color: #E2E8F0;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
            transform: translateY(-4px);
        }
        
        .feature-icon {
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, #1976D2, #1565C0);
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            color: white;
            margin-bottom: 24px;
        }
        
        .feature-card:nth-child(2) .feature-icon {
            background: linear-gradient(135deg, #2D5A3D, #4A7C59);
        }
        
        .feature-card:nth-child(3) .feature-icon {
            background: linear-gradient(135deg, #0891B2, #06B6D4);
        }
        
        .feature-card:nth-child(4) .feature-icon {
            background: linear-gradient(135deg, #F59E0B, #D97706);
        }
        
        .feature-card:nth-child(5) .feature-icon {
            background: linear-gradient(135deg, #8B5CF6, #7C3AED);
        }
        
        .feature-card:nth-child(6) .feature-icon {
            background: linear-gradient(135deg, #EC4899, #DB2777);
        }
        
        .feature-title {
            font-size: 22px;
            font-weight: 700;
            color: #1E293B;
            margin-bottom: 12px;
        }
        
        .feature-description {
            font-size: 15px;
            color: #64748B;
            line-height: 1.6;
        }
        
        .cta-section {
            padding: 100px 48px;
            background: linear-gradient(135deg, #1E293B 0%, #334155 100%);
            position: relative;
            overflow: hidden;
        }
        
        .cta-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
        }
        
        .cta-content {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
            position: relative;
            z-index: 1;
        }
        
        .cta-title {
            font-size: 48px;
            font-weight: 800;
            color: white;
            margin-bottom: 24px;
            line-height: 1.2;
        }
        
        .cta-description {
            font-size: 20px;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 40px;
            line-height: 1.6;
        }
        
        .cta-buttons {
            display: flex;
            gap: 16px;
            justify-content: center;
        }
        
        .btn-cta-primary {
            padding: 20px 40px;
            background: white;
            color: #1E293B;
            border: none;
            border-radius: 12px;
            font-weight: 700;
            font-size: 18px;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .btn-cta-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 28px rgba(255, 255, 255, 0.3);
        }
        
        .btn-cta-secondary {
            padding: 20px 40px;
            background: transparent;
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 12px;
            font-weight: 700;
            font-size: 18px;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .btn-cta-secondary:hover {
            border-color: white;
            background: rgba(255, 255, 255, 0.1);
        }
        
        .footer {
            background: #0F172A;
            padding: 48px;
            text-align: center;
        }
        
        .footer-content {
            max-width: 1400px;
            margin: 0 auto;
        }
        
        .footer-logo {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 24px;
        }
        
        .footer-text {
            font-size: 14px;
            color: #94A3B8;
            margin-bottom: 24px;
        }
        
        .footer-links {
            display: flex;
            justify-content: center;
            gap: 32px;
            margin-bottom: 24px;
        }
        
        .footer-link {
            color: #CBD5E1;
            text-decoration: none;
            font-size: 14px;
            transition: color 0.2s;
        }
        
        .footer-link:hover {
            color: white;
        }
        
        .footer-copyright {
            font-size: 13px;
            color: #64748B;
            padding-top: 24px;
            border-top: 1px solid #1E293B;
        }
        
        @media (max-width: 1024px) {
            .hero-content {
                grid-template-columns: 1fr;
                gap: 60px;
            }
            .hero-visual {
                order: -1;
            }
            .features-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media (max-width: 768px) {
            .navbar {
                padding: 0 24px;
                height: 70px;
            }
            .nav-links {
                display: none;
            }
            .hero-section {
                padding: 60px 24px;
            }
            .hero-title {
                font-size: 36px;
            }
            .hero-description {
                font-size: 16px;
            }
            .hero-cta {
                flex-direction: column;
            }
            .features-section,
            .cta-section {
                padding: 60px 24px;
            }
            .features-grid {
                grid-template-columns: 1fr;
            }
            .section-title {
                font-size: 32px;
            }
            .cta-title {
                font-size: 32px;
            }
            .cta-buttons {
                flex-direction: column;
            }
        }
      `}</style>
    </>
  );
}