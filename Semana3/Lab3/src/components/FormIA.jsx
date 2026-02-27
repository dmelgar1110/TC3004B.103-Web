import { useEffect, useRef, useState } from "react";
import "./formStyle.css";

export const FormIA = () => {

  const [formState, setFormState] = useState({
    matricula: "",
    nombre: "",
    apellidos: "",
    edad: "",
    universidad: "",
    carrera: ""
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const matriculaRef = useRef();

  const { matricula, nombre, apellidos, edad, universidad, carrera } = formState;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const onSubmit = () => {
    setSubmittedData(formState);
    setExpanded(true);
  };

  // Se ejecuta al montar
  useEffect(() => {
    matriculaRef.current.focus();
  }, []);

  // Se ejecuta cuando cambia el formulario
  useEffect(() => {
    console.log("Formulario actualizado:", formState);
  }, [formState]);

  return (
    <>
      <form className={`login ${expanded ? "expand" : ""}`} onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">

          <input
            ref={matriculaRef}
            type="text"
            placeholder="Matricula"
            name="matricula"
            value={matricula}
            onChange={onInputChange}
          />

          <input
            type="text"
            placeholder="Nombre"
            name="nombre"
            value={nombre}
            onChange={onInputChange}
          />

          <input
            type="text"
            placeholder="Apellidos"
            name="apellidos"
            value={apellidos}
            onChange={onInputChange}
          />

          <input
            type="text"
            placeholder="Edad"
            name="edad"
            value={edad}
            onChange={onInputChange}
          />

          <input
            type="text"
            placeholder="Universidad"
            name="universidad"
            value={universidad}
            onChange={onInputChange}
          />

          <input
            type="text"
            placeholder="Carrera"
            name="carrera"
            value={carrera}
            onChange={onInputChange}
          />

        </div>

        <button type="button" className="btn" onClick={onSubmit}>
          Enviar
        </button>
      </form>

      {submittedData && (
        <div className="result">
          <h2>Datos Enviados:</h2>
          <p><strong>Matricula:</strong> {submittedData.matricula}</p>
          <p><strong>Nombre:</strong> {submittedData.nombre}</p>
          <p><strong>Apellidos:</strong> {submittedData.apellidos}</p>
          <p><strong>Edad:</strong> {submittedData.edad}</p>
          <p><strong>Universidad:</strong> {submittedData.universidad}</p>
          <p><strong>Carrera:</strong> {submittedData.carrera}</p>
        </div>
      )}
    </>
  );
};