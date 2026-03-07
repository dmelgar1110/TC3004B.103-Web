import React from "react";
const ReservationItem = ({ reservation, onDelete, onEdit }) => {
  return (
    <tr className="reservation-item">
      <td>{reservation.reservation_id}</td>
      <td>{reservation.created_at || "No especificada"}</td>
      <td>{reservation.sala_id || "No especificada"}</td>
      <td>{reservation.user_id || "No especificada"}</td>
      <td>{reservation.people || "No especificada"}</td>
      <td>{reservation.start_time || "No especificada"}</td>
      <td>{reservation.end_time || "No especificada"}</td>
      <td>{reservation.status || "No especificada"}</td>
      <td>
        <button onClick={onEdit} className="edit-btn">Editar</button>
      </td>
      <td>
        <button onClick={onDelete} className="delete-btn">Eliminar</button>
      </td>
    </tr>
  );
};
export default ReservationItem;
