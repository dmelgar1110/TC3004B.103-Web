import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";

const data = [
  { id: 1, nombre: "Jorge Carranza", empresa: "Tec", edad: "3", rol:"Desarrollador de Software", departamento: "Desarrollo", jefe: "Juan", correo:"jorge.carranza@tec.mx", contrasena:"qwerty123", telefono:"5512345678" },
  { id: 2, nombre: "Ramon Velez", empresa: "Banorte", edad: "28", rol:"Gerente", departamento: "Gerencia", jefe: "Carlos", correo:"ramon.velez@banorte.com", contrasena:"password123", telefono:"5587654321" },
  { id: 3, nombre: "Hugo Sanchez ", empresa: "Real Madrid", edad: "30", rol:"Portero", departamento: "Portería", jefe: "Luis", correo:"hugo.sanchez@realmadrid.es", contrasena:"password123", telefono:"5511111111" },
  { id: 4, nombre: "Rafael Marquez", empresa: "Barcelona", edad: "32", rol:"Defensa", departamento: "Defensa", jefe: "Pedro", correo:"rafael.marquez@barcelona.es", contrasena:"password123", telefono:"5522222222" },
  { id: 5, nombre: "Carlos Alcaraz", empresa: "Mallorca", edad: "25", rol:"Medio Campista", departamento: "Medio Campista", jefe: "Maria", correo:"carlos.alcaraz@mallorca.es", contrasena:"password123", telefono:"5533333333" },
  { id: 6, nombre: "N. Djokovic", empresa: "Serbia", edad: "34", rol:"Tenista Profesional", departamento: "Tenis", jefe: "Ana", correo:"n.djokovic@serbia.rs", contrasena:"password123", telefono:"5544444444" },
  { id: 7, nombre: "Sergio Perez", empresa: "Cadillac", edad: "40", rol:"Gerente", departamento: "Gerencia", jefe: "Luis", correo:"sergio.perez@cadillac.com", contrasena:"password123", telefono:"5555555555" },
  { id: 8, nombre: "Max Verstapen", empresa: "Oracle Red Bull Racing", edad: "24", rol:"Piloto", departamento: "Pilotos", jefe: "Carlos", correo:"max.verstapen@oracledrbullracing.com", contrasena:"password123", telefono:"5566666666" },
  { id: 9, nombre: "Carlos Sainz", empresa: "Williams Racing", edad: "26", rol:"Piloto", departamento: "Pilotos", jefe: "Maria", correo:"carlos.sainz@williamsracing.com", contrasena:"password123", telefono:"5577777777" },
];

class Empleados extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      nombre: "",
      empresa: "",
      edad: "",
      rol: "",
      correo: "",
      contrasena: "",
      telefono: "",
      departamento: "",
      jefe: ""
    },
  };
  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };
  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };
  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };
  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id === registro.id) {
        arreglo[contador].nombre = dato.nombre;
        arreglo[contador].empresa = dato.empresa;
        arreglo[contador].edad = dato.edad;
        arreglo[contador].rol = dato.rol;
        arreglo[contador].correo = dato.correo;
        arreglo[contador].contrasena = dato.contrasena;
        arreglo[contador].telefono = dato.telefono;
        arreglo[contador].departamento = dato.departamento;
        arreglo[contador].jefe = dato.jefe;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };
  eliminar = (dato) => {
    var opcion = window.confirm(
      "Estás Seguro que deseas Eliminar el elemento " + dato.id,
    );
    if (opcion === true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id === registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };
  insertar = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  };
  handleChange = (e) => {
    this.setState({
      form: { ...this.state.form, [e.target.name]: e.target.value },
    });
  };

  render() {
    return (
      <>
        <Container>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            Crear
          </Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Empresa</th>
                <th>Edad</th>
                <th>Rol</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Departamento</th>
                <th>Jefe</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.empresa}</td>
                  <td>{dato.edad}</td>
                  <td>{dato.rol}</td>
                  <td>{dato.correo}</td>
                  <td>{dato.telefono}</td>
                  <td>{dato.departamento}</td>
                  <td>{dato.jefe}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={() => this.eliminar(dato)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div>
              <h3>Editar Registro</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label> Id:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
            <FormGroup>
              <label>Empresa:</label>
              <input
                className="form-control"
                name="empresa"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.empresa}
              />
            </FormGroup>
                <FormGroup>
                <label>Edad:</label>
                <input
                    className="form-control"
                    name="edad"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.edad}
                />
            </FormGroup>
            <FormGroup>
                <label>Rol:</label>
                <input
                    className="form-control"
                    name="rol"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.rol}
                />
            </FormGroup>
            <FormGroup>
                <label>Correo:</label>
                <input
                    className="form-control"
                    name="correo"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.correo}
                />
            </FormGroup>
            <FormGroup>
                <label>Contraseña:</label>
                <input
                    className="form-control"
                    name="contrasena"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.contrasena}
                />
            </FormGroup>
            <FormGroup>
                <label>Teléfono:</label>
                <input
                    className="form-control"
                    name="telefono"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.telefono}
                />
            </FormGroup>
            <FormGroup>
                <label>Departamento:</label>
                <input
                    className="form-control"
                    name="departamento"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.departamento}
                />
            </FormGroup>
            <FormGroup>
                <label>Jefe:</label>
                <input
                    className="form-control"
                    name="jefe"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.jefe}
                />
            </FormGroup>
            </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button color="danger" onClick={() => this.cerrarModalActualizar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar nombre</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id: </label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length + 1}
              />
            </FormGroup>
            <FormGroup>
              <label>Nombre: </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Empresa: </label>
              <input
                className="form-control"
                name="empresa"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          <FormGroup>
                <label>Edad:</label>
                <input
                    className="form-control"
                    name="edad"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.edad}
                />
            </FormGroup>
            <FormGroup>
                <label>Rol:</label>
                <input
                    className="form-control"
                    name="rol"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.rol}
                />
            </FormGroup>
            <FormGroup>
                <label>Correo:</label>
                <input
                    className="form-control"
                    name="correo"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.correo}
                />
            </FormGroup>
            <FormGroup>
                <label>Contraseña:</label>
                <input
                    className="form-control"
                    name="contrasena"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.contrasena}
                />
            </FormGroup>
            <FormGroup>
                <label>Teléfono:</label>
                <input
                    className="form-control"
                    name="telefono"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.telefono}
                />
            </FormGroup>
            <FormGroup>
                <label>Departamento:</label>
                <input
                    className="form-control"
                    name="departamento"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.departamento}
                />
            </FormGroup>
            <FormGroup>
                <label>Jefe:</label>
                <input
                    className="form-control"
                    name="jefe"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.jefe}
                />
            </FormGroup>
            </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>
              Insertar{" "}
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default Empleados;
