"use client";

import { useState, useMemo } from "react";

const statusMap = {
  confirmed: { label: "Confirmada", className: "confirmed" },
  pending: { label: "Pendente", className: "pending" },
  cancelled: { label: "Cancelada", className: "cancelled" },
};

type ReservationStatus = "all" | keyof typeof statusMap;

const initialReservations = [
  {
    id: "RCM-2025-00847",
    title: "Salão de Festas Premium",
    club: "Clube Central",
    status: "confirmed", 
    icon: "🎉",
    date: "15 de Outubro, 2025",
    time: "Tarde (13:00 - 18:00)",
    price: "R$ 450,00",
  },
  {
    id: "RCM-2025-00851",
    title: "Churrasqueira Gourmet",
    club: "Clube Norte",
    status: "pending", 
    icon: "⏳",
    date: "22 de Outubro, 2025",
    time: "Manhã (08:00 - 12:00)",
    price: "R$ 280,00",
  },
  {
    id: "RCM-2025-00855",
    title: "Quadra Poliesportiva",
    club: "Clube Sul",
    status: "confirmed", 
    icon: "⚽",
    date: "28 de Outubro, 2025",
    time: "Noite (19:00 - 23:00)",
    price: "R$ 320,00",
  },
  {
    id: "RCM-2025-00832",
    title: "Área de Piscina Privativa",
    club: "Clube Central",
    status: "cancelled", 
    icon: "❌",
    date: "08 de Outubro, 2025",
    time: "Tarde (13:00 - 18:00)",
    price: "R$ 380,00",
  },
];

export default function MyReservationsPage() {
  const [activeFilter, setActiveFilter] = useState<ReservationStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleViewDetails = (id: string) => {
    alert(`Abrindo detalhes da reserva #${id}...`);
  };

  const handleCancel = (id: string) => {
    if (confirm("Deseja realmente cancelar esta reserva?")) {
      alert(`Reserva #${id} cancelada com sucesso!`);
    }
  };

  const handleNewBooking = () => {
    alert("Redirecionando para página de espaços...");
  };

  const filteredReservations = useMemo(() => {
    return initialReservations
      .filter((r) => activeFilter === "all" || r.status === activeFilter)
      .filter((r) =>
        `${r.title} ${r.club} ${r.id}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
  }, [activeFilter, searchTerm]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="logo-icon"></div>
          <div className="navbar-brand-text">
            reserva<span className="navbar-brand-cm">CM</span>
          </div>
        </div>
        <div className="navbar-nav">
          <a href="#" className="nav-link">
            Espaços
          </a>
          <a href="#" className="nav-link active">
            Minhas Reservas
          </a>
          <a href="#" className="nav-link">
            Configurações
          </a>
        </div>
        <div className="user-menu">
          <div className="user-avatar">JD</div>
        </div>
      </nav>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="container">
        <div className="page-header">
          <div className="page-title-section">
            <h1 className="page-title">Minhas Reservas</h1>
            <p className="page-subtitle">
              Gerencie suas reservas ativas e histórico
            </p>
          </div>
          <button className="btn-new-booking" onClick={handleNewBooking}>
            <span>+</span>
            Nova Reserva
          </button>
        </div>

        {/* FILTROS E BUSCA */}
        <div className="filters-bar">
          <div className="filter-tabs">
            {}
            <button
              className={`filter-tab ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              Todas
            </button>
            {}
            {(Object.keys(statusMap) as Array<keyof typeof statusMap>).map(
              (key) => (
                <button
                  key={key}
                  className={`filter-tab ${
                    activeFilter === key ? "active" : ""
                  }`}
                  onClick={() => setActiveFilter(key)}
                >
                  {statusMap[key].label}
                </button>
              )
            )}
          </div>
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Buscar reservas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* LISTA DE RESERVAS */}
        <div className="reservations-grid">
          {filteredReservations.length > 0 ? (
            filteredReservations.map((r) => {
              const currentStatus = statusMap[r.status as keyof typeof statusMap];

              return (
                <div className="reservation-card" data-status={r.status} key={r.id}>
                  {}
                  <div className={`reservation-icon ${currentStatus.className}`}>
                    {r.icon}
                  </div>
                  <div className="reservation-info">
                    <div className="reservation-header">
                      <h3 className="reservation-title">{r.title}</h3>
                      {}
                      <span className={`status-badge ${currentStatus.className}`}>
                        {currentStatus.label}
                      </span>
                    </div>
                    <div className="reservation-club">{r.club}</div>
                    <div className="reservation-details">
                      <div className="detail-item-inline">
                        <span className="detail-icon">📅</span>
                        <span>{r.date}</span>
                      </div>
                      <div className="detail-item-inline">
                        <span className="detail-icon">🕐</span>
                        <span>{r.time}</span>
                      </div>
                      <div className="detail-item-inline">
                        <span className="detail-icon">💰</span>
                        <span>{r.price}</span>
                      </div>
                      <div className="detail-item-inline">
                        <span className="detail-icon">🔖</span>
                        <span>#{r.id}</span>
                      </div>
                    </div>
                  </div>
                  <div className="reservation-actions">
                    <button
                      className="btn-action btn-details"
                      onClick={() => handleViewDetails(r.id)}
                    >
                      Ver Detalhes
                    </button>
                    {r.status !== "cancelled" && (
                      <button
                        className="btn-action btn-cancel"
                        onClick={() => handleCancel(r.id)}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📂</div>
              <h2 className="empty-title">Nenhuma reserva encontrada</h2>
              <p className="empty-text">
                Tente ajustar seus filtros ou o termo de busca.
              </p>
            </div>
          )}
        </div>
      </div>

      {}
      <style>{`
        /* --- ESTILOS GERAIS E BODY --- */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background: #F8FAFC;
            min-height: 100vh;
        }
        
        /* --- NAVBAR --- */
        .navbar {
            background: white;
            border-bottom: 1px solid #E2E8F0;
            padding: 0 32px;
            height: 72px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        .navbar-brand {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .logo-icon {
            width: 36px;
            height: 36px;
            background: linear-gradient(135deg, #2D5A3D, #4A7C59);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .logo-icon::after {
            content: '✓';
            color: white;
            font-weight: bold;
            font-size: 16px;
        }
        .navbar-brand-text {
            font-size: 22px;
            font-weight: 700;
            color: #2D5A3D;
        }
        .navbar-brand-cm {
            color: #1976D2;
        }
        .navbar-nav {
            display: flex;
            align-items: center;
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
        .nav-link.active {
            background: #EBF5FF;
            color: #1976D2;
        }
        .user-menu {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 16px;
            border-radius: 10px;
            cursor: pointer;
            transition: background 0.2s;
        }
        .user-menu:hover {
            background: #F1F5F9;
        }
        .user-avatar {
            width: 38px;
            height: 38px;
            background: linear-gradient(135deg, #1976D2, #1565C0);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 15px;
        }
        
        /* --- CONTAINER E CABEÇALHO --- */
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 32px;
        }
        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 32px;
        }
        .page-title-section {
            flex: 1;
        }
        .page-title {
            font-size: 32px;
            font-weight: 700;
            color: #1E293B;
            margin-bottom: 8px;
        }
        .page-subtitle {
            font-size: 16px;
            color: #64748B;
        }
        .btn-new-booking {
            padding: 14px 24px;
            background: linear-gradient(135deg, #1976D2, #1565C0);
            color: white;
            border: none;
            border-radius: 10px;
            font-weight: 600;
            font-size: 15px;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .btn-new-booking:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(25, 118, 210, 0.3);
        }
        
        /* --- BARRA DE FILTROS --- */
        .filters-bar {
            background: white;
            padding: 20px 24px;
            border-radius: 12px;
            margin-bottom: 24px;
            display: flex;
            gap: 16px;
            align-items: center;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        .filter-tabs {
            display: flex;
            gap: 8px;
            flex: 1;
        }
        .filter-tab {
            padding: 10px 20px;
            background: #F8FAFC;
            border: 2px solid transparent;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            color: #64748B;
            cursor: pointer;
            transition: all 0.2s;
        }
        .filter-tab:hover {
            background: #F1F5F9;
        }
        .filter-tab.active {
            background: #EBF5FF;
            border-color: #1976D2;
            color: #1976D2;
        }
        .search-box {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 16px;
            background: #F8FAFC;
            border: 2px solid #E2E8F0;
            border-radius: 8px;
            min-width: 250px;
        }
        .search-box:focus-within {
            border-color: #1976D2;
            background: white;
        }
        .search-icon {
            color: #94A3B8;
        }
        .search-input {
            border: none;
            background: transparent;
            outline: none;
            font-size: 14px;
            width: 100%;
        }
        
        /* --- CARDS DE RESERVA --- */
        .reservations-grid {
            display: grid;
            gap: 20px;
        }
        .reservation-card {
            background: white;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
            display: grid;
            grid-template-columns: auto 1fr auto;
            gap: 24px;
            align-items: center;
            transition: all 0.3s;
        }
        .reservation-card:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
            transform: translateY(-2px);
        }
        .reservation-icon {
            width: 72px;
            height: 72px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            flex-shrink: 0;
            color: white;
        }
        .reservation-icon.confirmed {
            background: linear-gradient(135deg, #2D5A3D, #4A7C59);
        }
        .reservation-icon.pending {
            background: linear-gradient(135deg, #F59E0B, #D97706);
        }
        .reservation-icon.cancelled {
            background: linear-gradient(135deg, #94A3B8, #64748B);
        }
        .reservation-info {
            flex: 1;
        }
        .reservation-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 8px;
        }
        .reservation-title {
            font-size: 20px;
            font-weight: 700;
            color: #1E293B;
        }
        .status-badge {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .status-badge.confirmed {
            background: #D1FAE5;
            color: #065F46;
        }
        .status-badge.pending {
            background: #FEF3C7;
            color: #92400E;
        }
        .status-badge.cancelled {
            background: #F1F5F9;
            color: #475569;
        }
        .reservation-club {
            font-size: 14px;
            color: #1976D2;
            font-weight: 600;
            margin-bottom: 12px;
        }
        .reservation-details {
            display: flex;
            gap: 24px;
            flex-wrap: wrap;
        }
        .detail-item-inline {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 14px;
            color: #64748B;
        }
        .detail-icon {
            font-size: 16px;
        }
        
        /* --- BOTÕES DE AÇÃO --- */
        .reservation-actions {
            display: flex;
            gap: 8px;
            flex-direction: column;
        }
        .btn-action {
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            border: none;
            white-space: nowrap;
        }
        .btn-details {
            background: #F1F5F9;
            color: #475569;
        }
        .btn-details:hover {
            background: #E2E8F0;
        }
        .btn-cancel {
            background: #FEE2E2;
            color: #991B1B;
        }
        .btn-cancel:hover {
            background: #FECACA;
        }
        
        /* --- ESTADO VAZIO --- */
        .empty-state {
            text-align: center;
            padding: 80px 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        .empty-icon {
            font-size: 64px;
            margin-bottom: 24px;
            opacity: 0.5;
        }
        .empty-title {
            font-size: 24px;
            font-weight: 700;
            color: #1E293B;
            margin-bottom: 12px;
        }
        .empty-text {
            font-size: 16px;
            color: #64748B;
            margin-bottom: 24px;
        }
        
        /* --- MEDIA QUERIES (RESPONSIVIDADE) --- */
        @media (max-width: 1024px) {
            .reservation-card {
                grid-template-columns: 1fr;
            }
            .reservation-actions {
                flex-direction: row;
                justify-content: flex-start;
            }
        }
        @media (max-width: 768px) {
            .navbar {
                padding: 12px 16px;
                height: auto;
                flex-wrap: wrap;
            }
            .navbar-nav {
                width: 100%;
                margin-top: 12px;
                order: 3;
                justify-content: space-around;
            }
            .container {
                padding: 16px;
            }
            .page-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 16px;
            }
            .btn-new-booking {
                width: 100%;
                justify-content: center;
            }
            .filters-bar {
                flex-direction: column;
                align-items: stretch;
            }
            .filter-tabs {
                overflow-x: auto;
                flex-wrap: nowrap;
            }
            .search-box {
                min-width: auto;
            }
            .reservation-details {
                flex-direction: column;
                gap: 8px;
            }
        }
      `}</style>
    </>
  );
}