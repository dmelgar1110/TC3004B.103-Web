import React, { useState, useEffect, useMemo } from "react";
import { getReservations, deleteReservation } from "../services/api";
import ReservationItemIA from "./ReservationItemIA";
import ReservationFormIA from "./ReservationFormIA";
import "./ReservationListIA.css";

const ReservationListIA = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [sortBy, setSortBy] = useState("created_at");

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const data = await getReservations();
      setReservations(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar las reservaciones: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta reservación?")) {
      try {
        await deleteReservation(id);
        setReservations(reservations.filter((reservation) => reservation.reservation_id !== id));
      } catch (err) {
        setError("Error al eliminar la reservación: " + err.message);
      }
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
    setShowForm(false);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleFormSubmit = () => {
    fetchReservations();
    setEditingId(null);
    setShowForm(false);
  };

  // Filtrado y búsqueda
  const filteredReservations = useMemo(() => {
    return reservations
      .filter(reservation => {
        const matchesSearch = 
          String(reservation.reservation_id).includes(searchTerm) ||
          String(reservation.sala_id).includes(searchTerm) ||
          String(reservation.user_id).includes(searchTerm);
        
        const matchesStatus = 
          filterStatus === "todos" || 
          reservation.status?.toLowerCase() === filterStatus.toLowerCase();
        
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "created_at") {
          return new Date(b.created_at) - new Date(a.created_at);
        } else if (sortBy === "start_time") {
          return new Date(a.start_time) - new Date(b.start_time);
        } else if (sortBy === "people") {
          return b.people - a.people;
        }
        return 0;
      });
  }, [reservations, searchTerm, filterStatus, sortBy]);

  // Estadísticas
  const stats = useMemo(() => {
    return {
      total: reservations.length,
      pendientes: reservations.filter(r => r.status?.toLowerCase() === 'pendiente').length,
      confirmadas: reservations.filter(r => r.status?.toLowerCase() === 'confirmada').length,
      completadas: reservations.filter(r => r.status?.toLowerCase() === 'completada').length,
      canceladas: reservations.filter(r => r.status?.toLowerCase() === 'cancelada').length,
      totalPersonas: reservations.reduce((sum, r) => sum + (r.people || 0), 0)
    };
  }, [reservations]);

  if (loading && reservations.length === 0) {
    return (
      <div className="loading-container">
        <div className="loader">
          <div className="loader-spinner"></div>
          <p className="loading-text">Cargando reservaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reservation-list-ia">
      {/* Header con estadísticas */}
      <div className="header-section">
        <div className="title-container">
          <h1 className="main-title">
            <span className="title-icon">📋</span>
            Sistema de Reservaciones
            <span className="title-badge">IA Edition</span>
          </h1>
          <p className="subtitle">Gestión inteligente y moderna de salas</p>
        </div>

        {/* Estadísticas */}
        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total</div>
            </div>
          </div>
          <div className="stat-card pendiente">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <div className="stat-value">{stats.pendientes}</div>
              <div className="stat-label">Pendientes</div>
            </div>
          </div>
          <div className="stat-card confirmada">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-value">{stats.confirmadas}</div>
              <div className="stat-label">Confirmadas</div>
            </div>
          </div>
          <div className="stat-card completada">
            <div className="stat-icon">🎉</div>
            <div className="stat-content">
              <div className="stat-value">{stats.completadas}</div>
              <div className="stat-label">Completadas</div>
            </div>
          </div>
          <div className="stat-card personas">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <div className="stat-value">{stats.totalPersonas}</div>
              <div className="stat-label">Total Personas</div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <span className="error-icon">⚠️</span>
          <span className="error-message">{error}</span>
          <button onClick={() => setError(null)} className="error-close">✕</button>
        </div>
      )}

      {/* Controles */}
      <div className="controls-section">
        <div className="search-filter-container">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar por ID de reservación, sala o usuario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="clear-search">✕</button>
            )}
          </div>

          <div className="filter-group">
            <label className="filter-label">
              <span className="filter-icon">🏷️</span>
              Estado:
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="todos">Todos</option>
              <option value="pendiente">Pendiente</option>
              <option value="confirmada">Confirmada</option>
              <option value="completada">Completada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">
              <span className="filter-icon">↕️</span>
              Ordenar:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="created_at">Fecha de Creación</option>
              <option value="start_time">Hora de Inicio</option>
              <option value="people">Número de Personas</option>
            </select>
          </div>
        </div>

        <button 
          onClick={() => setShowForm(!showForm)} 
          className="add-btn"
        >
          <span className="btn-icon">{showForm ? '➖' : '➕'}</span>
          <span>{showForm ? 'Ocultar Formulario' : 'Nueva Reservación'}</span>
        </button>
      </div>

      {/* Formulario */}
      {(showForm || editingId) && (
        <div className="form-section">
          <h3 className="form-section-title">
            {editingId ? '✏️ Editar Reservación' : '✨ Nueva Reservación'}
          </h3>
          <ReservationFormIA
            reservation={editingId ? reservations.find(r => r.reservation_id === editingId) : null}
            onSubmitSuccess={handleFormSubmit}
            onCancel={editingId ? handleCancelEdit : () => setShowForm(false)}
          />
        </div>
      )}

      {/* Tabla de Reservaciones */}
      <div className="table-section">
        <div className="table-header">
          <h2 className="section-title">
            📋 Lista de Reservaciones
            <span className="result-count">({filteredReservations.length} resultado{filteredReservations.length !== 1 ? 's' : ''})</span>
          </h2>
          {loading && (
            <div className="refresh-loader">
              <div className="mini-spinner"></div>
              Actualizando...
            </div>
          )}
        </div>

        {filteredReservations.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3 className="empty-title">No hay reservaciones</h3>
            <p className="empty-message">
              {searchTerm || filterStatus !== "todos"
                ? "No se encontraron resultados para tu búsqueda"
                : "Comienza creando tu primera reservación"}
            </p>
            {!showForm && !searchTerm && filterStatus === "todos" && (
              <button onClick={() => setShowForm(true)} className="empty-action-btn">
                ✨ Crear Primera Reservación
              </button>
            )}
          </div>
        ) : (
          <div className="table-container">
            <table className="reservations-table-ia">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha Creación</th>
                  <th>Sala</th>
                  <th>Usuario</th>
                  <th>Personas</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                  <th>Status</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map((reservation, index) => (
                  <ReservationItemIA
                    key={reservation.reservation_id}
                    reservation={reservation}
                    onDelete={() => handleDelete(reservation.reservation_id)}
                    onEdit={() => handleEdit(reservation.reservation_id)}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationListIA;
