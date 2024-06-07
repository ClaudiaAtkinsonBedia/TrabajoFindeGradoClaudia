import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';

function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({ username: "", password: "" });
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
        validateInput(name, value);
    };

    const validateInput = (name, value) => {
        let errorMessage = "";
        switch (name) {
            case "username":
                errorMessage = validateUsername(value);
                break;
            case "password":
                errorMessage = validatePassword(value);
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

    const validateUsername = (value) => {
        if (!value.trim()) {
            return "El nombre de usuario es obligatorio";
        }
        return "";
    };

    const validatePassword = (value) => {
        if (!value.trim()) {
            return 'La contraseña es obligatoria';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        let hasErrors = false;
        Object.keys(values).forEach((name) => {
            const errorMessage = validateInput(name, values[name]);
            if (errorMessage) {
                newErrors[name] = errorMessage;
                hasErrors = true;
            }
        });

        setErrors(newErrors);

        if (hasErrors) return;

        try {
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
                    login(data.token, data.role, data.username);
                    alert('Inicio de sesión exitoso');
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
                    alert('Inicio de sesión fallido: ' + data.message);
                }
            } else {
                const errorText = await response.text();
                throw new Error('Network response was not ok ' + response.status + ': ' + errorText);
            }
        } catch (error) {
            alert('Error: ' + error.message);
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