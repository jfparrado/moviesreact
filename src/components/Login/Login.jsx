import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthContext } from "../../context/authContext";
import { GoogleButton } from "react-google-button";
import "./Login.css";

function Login(props) {
  const { loginUsario, loginGoogle, user } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      navigate(`/`);
    }
  }, [user]);
  const onSubmit = async(e) => {
    e.preventDefault();
    const email=e.target.email.value;
    const password=e.target.password.value;
    try {
      await loginUsario(email,password)
      navigate(`/`)
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginGoogle()
      navigate(`/`)
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mainrouter principal-container">
      <h2>Inicio de sesion</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} onChange={e => setEmail(e.target.value)} required />
          {errors.email && <span>This field is required and must be a valid email address</span>}
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" {...register('password', { required: true, minLength: 6 })} onChange={e => setPassword(e.target.value)} required />
          {errors.password && <span>This field is required and must have at least 6 characters</span>}
        </div>
        <p>No tienes cuenta? <a href="/register">Registrate</a></p>
        <button type="submit">Iniciar sesion</button>
        <GoogleButton className="google-button" onClick={handleGoogleLogin}/>
      </form>
    </div>
  );
}
export default Login 