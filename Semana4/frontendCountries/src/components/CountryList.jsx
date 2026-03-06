import React, { useState, useEffect } from "react";
import { getCountries, deleteCountry } from "../services/api";
import CountryItem from "./CountryItem";
import CountryForm from "./CountryForm";
const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const fetchCountries = async () => {
    setLoading(true);
    try {
      const data = await getCountries();
      setCountries(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar los países");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCountries();
  }, []);
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este país?")) {
      try {
        await deleteCountry(id);
        setCountries(countries.filter((country) => country.id !== id));
      } catch (err) {
        setError("Error al eliminar el país");
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
    fetchCountries();
    setEditingId(null);
  };

  if (loading) return <div>Cargando países...</div>;
  if (error) return <div className="error">{error}</div>;
  return (
    <div className="country-list">
      <h2>Lista de Países</h2>
      {!editingId && (
        <div className="new-country">
          <h3>Agregar Nuevo País</h3>
          <CountryForm onSubmitSuccess={handleFormSubmit} />
        </div>
      )}
      <div className="countries">
        {countries.length === 0 ? (
          <p>No hay países registrados.</p>
        ) : (
          <table className="countries-table">
            <thead>
              <tr>
                <th>País</th>
                <th>Capital</th>
                <th>Moneda</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((country) => (
                <React.Fragment key={country.id}>
                  {editingId === country.id ? (
                    <tr>
                      <td colSpan="5">
                        <div className="edit-form">
                          <h3>Editar País</h3>
                          <CountryForm
                            country={country}
                            onSubmitSuccess={handleFormSubmit}
                            onCancel={handleCancelEdit}
                          />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <CountryItem
                      country={country}
                      onDelete={() => handleDelete(country.id)}
                      onEdit={() => handleEdit(country.id)}
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
export default CountryList;
