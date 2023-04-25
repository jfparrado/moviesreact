import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { app } from '../../fb';
// import { UserService } from 'src/app/services/user.service';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

    const crearUsario=(email,password)=>{
        app
        .auth()
        .signInWithEmailAndPassword(email,password)
        .then((usuarioFirebase)=>{
            this.props.setUsuario(usuarioFirebase)
            navigate(`/`)
            console.log("sesion ad");
        })
    }

  const onSubmit = (e) => {
    e.preventDefault();
    const email=e.target.email.value;
    const password=e.target.password.value;
    crearUsario(email,password)
  };

  const handleGoogleLogin = () => {
    // UserService.loginWithGoogle()
    //   .then(response => {
    //     console.log(response);
    //     history.push('/');
    //   })
    //   .catch(error=> console.log(error));
  };

  return (
    <div>
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
        <button type="button" onClick={handleGoogleLogin}>Iniciar sesion con google</button>
      </form>
    </div>
  );
}
export default Login 