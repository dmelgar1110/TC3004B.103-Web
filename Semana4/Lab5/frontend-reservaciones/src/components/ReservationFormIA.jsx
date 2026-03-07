import React, { useState, useEffect } from "react";
import { createReservation, updateReservation } from "../services/api.js";
import "./ReservationFormIA.css";

const ReservationFormIA = ({ reservation, onSubmitSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    sala_id: "",
    user_id: "",
    people: "",
    start_time: "",
    end_time: "",
    status: "pendiente",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (reservation) {
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
        status: reservation.status || "pendiente",
      });
    }
  }, [reservation]);

  const validateField = (name, value) => {
    const errors = {};
    
    switch(name) {
      case 'sala_id':
        if (!value) errors.sala_id = "La sala es requerida";
        else if (value < 1) errors.sala_id = "ID de sala debe ser mayor a 0";
        break;
      case 'user_id':
        if (!value) errors.user_id = "El usuario es requerido";
        else if (value < 1) errors.user_id = "ID de usuario debe ser mayor a 0";
        break;
      case 'people':
        if (!value) errors.people = "El número de personas es requerido";
        else if (value < 1) errors.people = "Debe haber al menos 1 persona";
        else if (value > 100) errors.people = "Máximo 100 personas";
        break;
      case 'start_time':
        if (!value) errors.start_time = "La fecha de inicio es requerida";
        else if (new Date(value) < new Date() && !reservation) {
          errors.start_time = "La fecha no puede ser en el pasado";
        }
        break;
      case 'end_time':
        if (!value) errors.end_time = "La fecha de fin es requerida";
        else if (formData.start_time && new Date(value) <= new Date(formData.start_time)) {
          errors.end_time = "La fecha de fin debe ser posterior al inicio";
        }
        break;
      case 'status':
        if (!value) errors.status = "El status es requerido";
        break;
      default:
        break;
    }
    
    return errors;
  };

  const validateForm = () => {
    let errors = {};
    Object.keys(formData).forEach(key => {
      const fieldErrors = validateField(key, formData[key]);
      errors = { ...errors, ...fieldErrors };
    });
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Validar en tiempo real si el campo ya fue tocado
    if (touched[name]) {
      const errors = validateField(name, value);
      setFieldErrors(prev => ({
        ...prev,
        ...errors,
        [name]: errors[name] || undefined
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const errors = validateField(name, value);
    setFieldErrors(prev => ({
      ...prev,
      ...errors
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Marcar todos los campos como tocados
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (!validateForm()) {
      setError("Por favor corrige los errores en el formulario");
      return;
    }

    setSubmitting(true);

    try {
      if (reservation) {
        await updateReservation(reservation.reservation_id, formData);
      } else {
        await createReservation(formData);
      }
      
      setSuccess(true);
      setFormData({ 
        sala_id: "", 
        user_id: "", 
        people: "", 
        start_time: "", 
        end_time: "", 
        status: "pendiente" 
      });
      setTouched({});
      setFieldErrors({});
      
      setTimeout(() => {
        if (onSubmitSuccess) onSubmitSuccess();
      }, 1000);
    } catch (err) {
      setError("Error al guardar la reservación: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const getFieldClassName = (fieldName) => {
    let className = "form-input";
    if (touched[fieldName] && !fieldErrors[fieldName]) className += " valid";
    if (touched[fieldName] && fieldErrors[fieldName]) className += " invalid";
    return className;
  };

  return (
    <div className="reservation-form-ia-container">
      <form onSubmit={handleSubmit} className="reservation-form-ia">
        {error && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠️</span>
            <span className="alert-message">{error}</span>
          </div>
        )}
        
        {success && (
          <div className="alert alert-success">
            <span className="alert-icon">✅</span>
            <span className="alert-message">
              ¡Reservación {reservation ? 'actualizada' : 'creada'} exitosamente!
            </span>
          </div>
        )}

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="sala_id" className="form-label">
              <span className="label-icon">🏢</span>
              ID de la Sala
              <span className="required">*</span>
            </label>
            <input
              type="number"
              id="sala_id"
              name="sala_id"
              value={formData.sala_id}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={submitting}
              className={getFieldClassName('sala_id')}
              placeholder="Ej: 101"
              min="1"
            />
            {touched.sala_id && fieldErrors.sala_id && (
              <span className="field-error">{fieldErrors.sala_id}</span>
            )}
            {touched.sala_id && !fieldErrors.sala_id && formData.sala_id && (
              <span className="field-success">✓ Válido</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="user_id" className="form-label">
              <span className="label-icon">👤</span>
              ID del Usuario
              <span className="required">*</span>
            </label>
            <input
              type="number"
              id="user_id"
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={submitting}
              className={getFieldClassName('user_id')}
              placeholder="Ej: 42"
              min="1"
            />
            {touched.user_id && fieldErrors.user_id && (
              <span className="field-error">{fieldErrors.user_id}</span>
            )}
            {touched.user_id && !fieldErrors.user_id && formData.user_id && (
              <span className="field-success">✓ Válido</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="people" className="form-label">
              <span className="label-icon">👥</span>
              Número de Personas
              <span className="required">*</span>
            </label>
            <input
              type="number"
              id="people"
              name="people"
              value={formData.people}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={submitting}
              className={getFieldClassName('people')}
              placeholder="Ej: 5"
              min="1"
              max="100"
            />
            {touched.people && fieldErrors.people && (
              <span className="field-error">{fieldErrors.people}</span>
            )}
            {touched.people && !fieldErrors.people && formData.people && (
              <span className="field-success">✓ Válido</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="status" className="form-label">
              <span className="label-icon">📊</span>
              Status
              <span className="required">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={submitting}
              className={getFieldClassName('status')}
            >
              <option value="">Seleccionar...</option>
              <option value="pendiente">Pendiente</option>
              <option value="confirmada">Confirmada</option>
              <option value="cancelada">Cancelada</option>
              <option value="completada">Completada</option>
            </select>
            {touched.status && fieldErrors.status && (
              <span className="field-error">{fieldErrors.status}</span>
            )}
          </div>

          <div className="form-group full-width">
            <label htmlFor="start_time" className="form-label">
              <span className="label-icon">🕐</span>
              Hora de Inicio
              <span className="required">*</span>
            </label>
            <input
              type="datetime-local"
              id="start_time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={submitting}
              className={getFieldClassName('start_time')}
            />
            {touched.start_time && fieldErrors.start_time && (
              <span className="field-error">{fieldErrors.start_time}</span>
            )}
            {touched.start_time && !fieldErrors.start_time && formData.start_time && (
              <span className="field-success">✓ Válido</span>
            )}
          </div>

          <div className="form-group full-width">
            <label htmlFor="end_time" className="form-label">
              <span className="label-icon">🕑</span>
              Hora de Fin
              <span className="required">*</span>
            </label>
            <input
              type="datetime-local"
              id="end_time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={submitting}
              className={getFieldClassName('end_time')}
            />
            {touched.end_time && fieldErrors.end_time && (
              <span className="field-error">{fieldErrors.end_time}</span>
            )}
            {touched.end_time && !fieldErrors.end_time && formData.end_time && (
              <span className="field-success">✓ Válido</span>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={submitting} className="submit-btn">
            {submitting ? (
              <>
                <span className="spinner"></span>
                <span>Guardando...</span>
              </>
            ) : (
              <>
                <span className="btn-icon">{reservation ? '💾' : '✨'}</span>
                <span>{reservation ? 'Actualizar Reservación' : 'Crear Reservación'}</span>
              </>
            )}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} disabled={submitting} className="cancel-btn">
              <span className="btn-icon">❌</span>
              <span>Cancelar</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReservationFormIA;
