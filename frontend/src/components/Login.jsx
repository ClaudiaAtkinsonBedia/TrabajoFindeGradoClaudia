// Importamos las cosas que necesitamos importar
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';

function Login() {
    const navigate = useNavigate(); // Hook para la redirección 
    const [values, setValues] = useState({ username: "", password: "" }); // Estado para los valores del formulario
    const [errors, setErrors] = useState({ username: "", password: "" }); // Estado para los mensajes de error
    const { login } = useContext(AuthContext); // Extraemos la función de login del contexto de autenticación

    // Manejamos los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
        validateInput(name, value);
    };

    // Validamos la entrada de los campos del formulario
    const validateInput = (name, value) => {
        let errorMessage = "";
        switch (name) {
            case "username":
                errorMessage = validateUsername(value); // Validamos el nombre de usuario
                break;
            case "password":
                errorMessage = validatePassword(value); // Validamos la contraseña
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage
        }));
        return errorMessage;
    };

    // Validamos el nombre de usuario
    const validateUsername = (value) => {
        if (!value.trim()) {
            return "El nombre de usuario es obligatorio";
        }
        return "";
    };

    // Validamos la contraseña
    const validatePassword = (value) => {
        if (!value.trim()) {
            return 'La contraseña es obligatoria';
        }
        return "";
    };

    // Manejamos el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Con esto prevenimos el comportamiento predeterminado del formulario
        const newErrors = {};
        let hasErrors = false;
        // Validamos todos los campos del formulario
        Object.keys(values).forEach((name) => {
            const errorMessage = validateInput(name, values[name]);
            if (errorMessage) {
                newErrors[name] = errorMessage;
                hasErrors = true;
            }
        });

        setErrors(newErrors);

        if (hasErrors) return; // Si hay errores, no continúa

        try {
            // Enviamos la solicitud de inicio de sesión al servidor
            const response = await fetch('http://localhost:8081/index.php?action=login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login response data:', data);
                if (data.status === 'success') {
                    login(data.token, data.role, data.username); // Llamamos a la función de login del contexto
                    alert('Inicio de sesión exitoso');
                    // Redirige según el rol de usuario
                    switch (data.role) {
                        case 'administrador':
                            navigate('/admin');
                            break;
                        case 'escritor':
                            navigate('/escritor');
                            break;
                        case 'editor':
                            navigate('/editor');
                            break;
                        case 'lector':
                            navigate('/lector');
                            break;
                        default:
                            navigate('/'); // Ruta predeterminada
                            break;
                    }
                } else {
                    alert('Inicio de sesión fallido: ' + data.message); // Muestra un mensaje de error si la autenticación falla
                }
            } else {
                const errorText = await response.text();
                throw new Error('Network response was not ok ' + response.status + ': ' + errorText);
            }
        } catch (error) {
            alert('Error: ' + error.message); // Muestra un mensaje de error si ocurre un problema en la solicitud
        }
    }

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className="col-md-6 text-center">
                    <h3 className='mt-3'>Iniciar Sesión</h3>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-group mt-3">
                            <input className='form-control'
                                type="text"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                placeholder="Nombre de usuario"
                            />
                        </div>
                        <span className="text-danger">{errors.username}</span>
                        <div className="form-group mt-3">
                            <input className='form-control'
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                placeholder="Contraseña"
                            />
                        </div>
                        <span className="text-danger">{errors.password}</span>
                        <div>
                            <button type="submit" className="btn btn-primary mt-3 mb-3">Iniciar Sesión</button>
                        </div>
                    </form>
                    <p>¿No tienes una cuenta? <Link to="/register">Regístrate</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;