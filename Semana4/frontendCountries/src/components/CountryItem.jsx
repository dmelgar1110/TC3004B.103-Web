import React from "react";
const CountryItem = ({ country, onDelete, onEdit }) => {
  return (
    <tr className="country-item">
      <td>{country.name}</td>
      <td>{country.capital || "No especificada"}</td>
      <td>{country.currency || "No especificada"}</td>
      <td>
        <button onClick={onEdit} className="edit-btn">Editar</button>
      </td>
      <td>
        <button onClick={onDelete} className="delete-btn">Eliminar</button>
      </td>
    </tr>
  );
};
export default CountryItem;
