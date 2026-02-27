import { useEffect, useRef, useState } from "react";
import "./formStyle.css";

export const Form = () => {

  const [formState, setFormState] = useState({
    matricula: "",
    nombre: "",
    apellidos: "",
    edad: "",
    universidad: "",
    carrera: ""
  });

  const [submitData, setSubmit] = useState(null);
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
    setSubmit(formState);
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
      <form onSubmit={(e) => e.preventDefault()}>
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
            type="number"
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

        <button type="button" onClick={onSubmit}>
          Enviar
        </button>
      </form>

      {submitData && (
        <div className="result">
          <h2>Datos Enviados:</h2>
          <p>Matricula: {submitData.matricula}</p>
          <p>Nombre:{submitData.nombre}</p>
          <p>Apellidos:{submitData.apellidos}</p>
          <p>Edad:{submitData.edad}</p>
          <p>Universidad:{submitData.universidad}</p>
          <p>Carrera:{submitData.carrera}</p>
        </div>
      )}
    </>
  );
};