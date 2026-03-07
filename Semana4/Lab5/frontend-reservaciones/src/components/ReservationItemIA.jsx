import React, { useState } from "react";
import "./ReservationItemIA.css";

const ReservationItemIA = ({ reservation, onDelete, onEdit }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const getStatusColor = (status) => {
    const statusColors = {
      'confirmada': '#10b981',
      'pendiente': '#f59e0b',
      'cancelada': '#ef4444',
      'completada': '#6366f1'
    };
    return statusColors[status?.toLowerCase()] || '#8b5cf6';
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return "No especificada";
    const date = new Date(isoString);
    return date.toLocaleString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCreatedAt = (isoString) => {
    if (!isoString) return "No especificada";
    const date = new Date(isoString);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete();
  };

  return (
    <tr className={`reservation-item-ia ${isDeleting ? 'deleting' : ''}`}>
      <td className="id-cell">
        <div className="id-badge">{reservation.reservation_id}</div>
      </td>
      <td className="date-cell">
        <span className="date-icon">📅</span>
        {formatCreatedAt(reservation.created_at)}
      </td>
      <td className="sala-cell">
        <div className="sala-badge">
          <span className="sala-icon">🏢</span>
          Sala {reservation.sala_id}
        </div>
      </td>
      <td className="user-cell">
        <div className="user-info">
          <span className="user-icon">👤</span>
          Usuario {reservation.user_id}
        </div>
      </td>
      <td className="people-cell">
        <div className="people-count">
          <span className="people-icon">👥</span>
          {reservation.people} {reservation.people === 1 ? 'persona' : 'personas'}
        </div>
      </td>
      <td className="time-cell">
        <div className="time-info start">
          <span className="time-label">Inicio:</span>
          <span className="time-value">{formatDateTime(reservation.start_time)}</span>
        </div>
      </td>
      <td className="time-cell">
        <div className="time-info end">
          <span className="time-label">Fin:</span>
          <span className="time-value">{formatDateTime(reservation.end_time)}</span>
        </div>
      </td>
      <td className="status-cell">
        <span 
          className="status-badge" 
          style={{ 
            backgroundColor: getStatusColor(reservation.status),
            boxShadow: `0 0 15px ${getStatusColor(reservation.status)}50`
          }}
        >
          {reservation.status || "Sin status"}
        </span>
      </td>
      <td className="action-cell">
        <button 
          onClick={onEdit} 
          className="edit-btn-ia"
          title="Editar reservación"
        >
          <span className="btn-icon">✏️</span>
          <span className="btn-text">Editar</span>
        </button>
      </td>
      <td className="action-cell">
        <button 
          onClick={handleDelete} 
          className="delete-btn-ia"
          disabled={isDeleting}
          title="Eliminar reservación"
        >
          <span className="btn-icon">{isDeleting ? '⏳' : '🗑️'}</span>
          <span className="btn-text">{isDeleting ? 'Eliminando...' : 'Eliminar'}</span>
        </button>
      </td>
    </tr>
  );
};

export default ReservationItemIA;
