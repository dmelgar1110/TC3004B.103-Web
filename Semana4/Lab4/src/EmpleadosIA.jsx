import { useState, useEffect } from "react";

export const EmpleadosIA = () => {

  const initialData = [
    { id: 1, nombre: "Daniel Melgar", email: "daniel@techhub.com", rol: "Developer", startup: "UntotenNacht", ciudad: "Monterrey" },
    { id: 2, nombre: "Ana Lopez", email: "ana@techhub.com", rol: "Founder", startup: "GreenAI", ciudad: "Guadalajara" },
    { id: 3, nombre: "Luis Torres", email: "luis@techhub.com", rol: "Mentor", startup: "CloudBoost", ciudad: "CDMX" }
  ];

  const [members, setMembers] = useState(initialData);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    console.log("Members updated:", members);
  }, [members]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const openCreate = () => {
    setForm({});
    setEditing(false);
    setShowForm(true);
  };

  const openEdit = (member) => {
    setForm(member);
    setEditing(true);
    setShowForm(true);
  };

  const saveMember = () => {

    if(editing){
      const updated = members.map(m =>
        m.id === form.id ? form : m
      );
      setMembers(updated);
    }else{
      const newMember = {
        ...form,
        id: members.length + 1
      };
      setMembers([...members, newMember]);
    }

    setShowForm(false);
  };

  const deleteMember = (member) => {
    if(window.confirm("Delete " + member.nombre + "?")){
      setMembers(members.filter(m => m.id !== member.id));
    }
  };

  return (
    <div className="container">

      <style>{`

      *{
        box-sizing:border-box;
      }

      body{
        margin:0;
        font-family: "Segoe UI", sans-serif;
        background: linear-gradient(135deg,#0f2027,#203a43,#2c5364);
      }

      .container{
        padding:40px;
        color:white;
      }

      h1{
        text-align:center;
        margin-bottom:40px;
        font-weight:600;
        letter-spacing:1px;
      }

      .card{
        backdrop-filter: blur(12px);
        background: rgba(255,255,255,0.08);
        border-radius:12px;
        padding:25px;
        box-shadow:0 10px 30px rgba(0,0,0,0.4);
      }

      table{
        width:100%;
        border-collapse:collapse;
      }

      th{
        text-align:left;
        padding:15px;
        font-size:14px;
        letter-spacing:1px;
        border-bottom:1px solid rgba(255,255,255,0.2);
      }

      td{
        padding:15px;
        border-bottom:1px solid rgba(255,255,255,0.1);
      }

      tr{
        transition:all .3s;
      }

      tr:hover{
        background:rgba(255,255,255,0.08);
      }

      .btn{
        padding:8px 14px;
        border:none;
        border-radius:6px;
        cursor:pointer;
        font-size:13px;
        margin-right:5px;
        transition:.3s;
      }

      .btn-create{
        background:#00c896;
        color:white;
        margin-bottom:20px;
      }

      .btn-create:hover{
        background:#00a67d;
        transform:translateY(-2px);
      }

      .btn-edit{
        background:#3498db;
        color:white;
      }

      .btn-edit:hover{
        background:#2c7ac0;
      }

      .btn-delete{
        background:#e74c3c;
        color:white;
      }

      .btn-delete:hover{
        background:#c0392b;
      }

      .badge{
        padding:4px 10px;
        border-radius:20px;
        font-size:12px;
        background:rgba(255,255,255,0.15);
      }

      .modal{
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.6);
        display:flex;
        align-items:center;
        justify-content:center;
      }

      .modal-content{
        background:#1e293b;
        padding:30px;
        border-radius:10px;
        width:350px;
        animation:fadeIn .3s ease;
      }

      input{
        width:100%;
        padding:10px;
        margin-bottom:10px;
        border:none;
        border-radius:5px;
        background:#334155;
        color:white;
      }

      input::placeholder{
        color:#94a3b8;
      }

      .modal-buttons{
        margin-top:10px;
        text-align:right;
      }

      .btn-save{
        background:#00c896;
        color:white;
      }

      .btn-cancel{
        background:#64748b;
        color:white;
      }

      @keyframes fadeIn{
        from{
          transform:scale(.8);
          opacity:0;
        }
        to{
          transform:scale(1);
          opacity:1;
        }
      }

      `}</style>

      <h1>🚀 TechHub MTY Members Directory</h1>

      <div className="card">

        <button className="btn btn-create" onClick={openCreate}>
          + Add Member
        </button>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Startup</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {members.map(member => (
              <tr key={member.id}>

                <td>{member.id}</td>
                <td>{member.nombre}</td>
                <td>{member.email}</td>

                <td>
                  <span className="badge">{member.rol}</span>
                </td>

                <td>{member.startup}</td>
                <td>{member.ciudad}</td>

                <td>
                  <button
                    className="btn btn-edit"
                    onClick={()=>openEdit(member)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-delete"
                    onClick={()=>deleteMember(member)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}

          </tbody>
        </table>

      </div>

      {showForm && (

        <div className="modal">

          <div className="modal-content">

            <h3>{editing ? "Edit Member" : "Add Member"}</h3>

            <input
              placeholder="Name"
              name="nombre"
              value={form.nombre || ""}
              onChange={handleChange}
            />

            <input
              placeholder="Email"
              name="email"
              value={form.email || ""}
              onChange={handleChange}
            />

            <input
              placeholder="Role"
              name="rol"
              value={form.rol || ""}
              onChange={handleChange}
            />

            <input
              placeholder="Startup"
              name="startup"
              value={form.startup || ""}
              onChange={handleChange}
            />

            <input
              placeholder="City"
              name="ciudad"
              value={form.ciudad || ""}
              onChange={handleChange}
            />

            <div className="modal-buttons">

              <button
                className="btn btn-save"
                onClick={saveMember}
              >
                Save
              </button>

              <button
                className="btn btn-cancel"
                onClick={()=>setShowForm(false)}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};