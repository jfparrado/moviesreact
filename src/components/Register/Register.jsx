import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { app } from '../../fb';
import "./Register.css"

const Register = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const crearUsario=(email,password)=>{
    app
    .auth()
    .createUserWithEmailAndPassword(email,password)
    .then((usuarioFirebase)=>{
        props.setUsuario(usuarioFirebase)
        navigate(`/`)
        console.log("registrado");
    })
}
  const handleSubmit = (e) => {
        e.preventDefault();
        const email=e.target.email.value;
        const password=e.target.password.value;
        crearUsario(email,password)
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro de usuarios</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <p>Ya tienes cuenta? <a href="/login">Logeate</a></p>
      <button type="submit">Registrar</button>
    </form>
  );
};
export default Register 