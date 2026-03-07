import React, { useState, useEffect } from "react";
import { getReservations, deleteReservation } from "../services/api";
import ReservationItem from "./ReservationItem";
import ReservationForm from "./ReservationForm";
const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
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
  };
  const handleCancelEdit = () => {
    setEditingId(null);
  };
  const handleFormSubmit = () => {
    fetchReservations();
    setEditingId(null);
  };

  if (loading) return <div>Cargando reservaciones...</div>;
  if (error) return <div className="error">{error}</div>;
  return (
    <div className="reservation-list">
      <h2>Lista de Reservaciones</h2>
      {!editingId && (
        <div className="new-reservation">
          <h3>Agregar Nueva Reservación</h3>
          <ReservationForm onSubmitSuccess={handleFormSubmit} />
        </div>
      )}
      <div className="reservations">
        {reservations.length === 0 ? (
          <p>No hay reservaciones registradas.</p>
        ) : (
          <table className="reservations-table" border="1" cellPadding="5" cellSpacing="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha de Creación</th>
                <th>Sala ID</th>
                <th>Reservada por</th>
                <th>Personas</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Status</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <React.Fragment key={reservation.reservation_id}>
                  {editingId === reservation.reservation_id ? (
                    <tr>
                      <td colSpan="5">
                        <div className="edit-form">
                          <h3>Editar Reservación</h3>
                          <ReservationForm
                            reservation={reservation}
                            onSubmitSuccess={handleFormSubmit}
                            onCancel={handleCancelEdit}
                          />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <ReservationItem
                      reservation={reservation}
                      onDelete={() => handleDelete(reservation.reservation_id)}
                      onEdit={() => handleEdit(reservation.reservation_id)}
                    />
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default ReservationList;
