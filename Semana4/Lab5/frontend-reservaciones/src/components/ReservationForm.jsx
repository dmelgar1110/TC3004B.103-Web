import React, { useState, useEffect } from "react";
import { createReservation, updateReservation } from "../services/api.js";
const ReservationForm = ({ reservation, onSubmitSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    sala_id: "",
    user_id: "",
    people: "",
    start_time: "",
    end_time: "",
    status: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (reservation) {
      // Convertir timestamps ISO a formato datetime-local (yyyy-MM-ddThh:mm)
      const formatDateTime = (isoString) => {
        if (!isoString) return "";
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      };

      setFormData({
        sala_id: reservation.sala_id || "",
        user_id: reservation.user_id || "",
        people: reservation.people || "",
        start_time: formatDateTime(reservation.start_time),
        end_time: formatDateTime(reservation.end_time),
        status: reservation.status || "",
      });
    }
  }, [reservation]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.sala_id || !formData.user_id || !formData.people || !formData.start_time || !formData.end_time || !formData.status) {
      setError("Los campos son obligatorios");
      return;
    }
    setSubmitting(true);
    setError(null);

    try {
      if (reservation) {
        await updateReservation(reservation.reservation_id, formData);
      } else {
        await createReservation(formData);
      }
      setFormData({ sala_id: "", user_id: "", people: "", start_time: "", end_time: "", status: "" });
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err) {
      setError("Error al guardar la reservación: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="reservation-form">
      {error && <div className="error">{error}</div>}
      <div className="form-group">
        <label htmlFor="sala_id">ID de la Sala*:</label>
        <input
          type="text"
          id="sala_id"
          name="sala_id"
          value={formData.sala_id}
          onChange={handleChange}
          disabled={submitting}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="user_id">ID del Usuario*:</label>
        <input
          type="text"
          id="user_id"
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
          disabled={submitting}
        />
      </div>
      <div className="form-group">
        <label htmlFor="people">Personas*:</label>
        <input
          type="text"
          id="people"
          name="people"
          value={formData.people}
          onChange={handleChange}
          disabled={submitting}
        />
      </div>
      <div className="form-group">
        <label htmlFor="start_time">Hora de Inicio*:</label>
        <input
          type="datetime-local"
          id="start_time"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
          disabled={submitting}
        />
      </div>
      <div className="form-group">
        <label htmlFor="end_time">Hora de Fin*:</label>
        <input
          type="datetime-local"
          id="end_time"
          name="end_time"
          value={formData.end_time}
          onChange={handleChange}
          disabled={submitting}
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status*:</label>
        <input
          type="text"
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          disabled={submitting}
        />
      </div>
      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? "Guardando..." : reservation ? "Actualizar" : "Crear"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={submitting}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};
export default ReservationForm;
