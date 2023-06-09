import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../context/authContext";
import { app } from '../../fb';
import "./Register.css"

const Register = (props) => {
  const { crearUsario } = useAuthContext();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
        e.preventDefault();
        const email=e.target.email.value;
        const password=e.target.password.value;
        try {
          await crearUsario(email,password)
          navigate(`/`)
        } catch (error) {
          console.log(error.message);
        }

  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="mainrouter principal-container">
      <h2 className='titulologin'>Registro de usuarios</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <p className='simple_paragraph'>Ya tienes cuenta? <a href="/login">Logeate</a></p>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};
export default Register 