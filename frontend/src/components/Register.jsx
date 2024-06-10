// Importamos las cosas que necesitamos importar
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Register() {
    // Define los estados iniciales para los valores del formulario, los valores de los checkboxes, los errores y los campos tocados
    const [values, setValues] = useState({
        username: "",
        name: "",
        surname: "",
        email: "",
        dateBorn: "",
        password: "",
        pass: ""
    });

    const [checkboxValues, setCheckboxValues] = useState({
        escritor: false,
        editor: false,
        lector: false,
    });

    const [errors, setErrors] = useState({
        username: "",
        name: "",
        surname: "",
        email: "",
        dateBorn: "",
        password: "",
        pass: "",
        checkboxes: ""
    });

    const [touched, setTouched] = useState({
        username: false,
        name: false,
        surname: false,
        email: false,
        dateBorn: false,
        password: false,
        pass: false,
        checkboxes: false
    });

    // Manejamos el cambio en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
        setTouched((prevTouched) => ({
            ...prevTouched,
            [name]: true
        }));
    };

    // Manejamos el cambio en los checkboxes
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setCheckboxValues((prevCheckboxValues) => ({
            ...prevCheckboxValues,
            [name]: checked
        }));
        setTouched((prevTouched) => ({
            ...prevTouched,
            checkboxes: true
        }));
    };

    // Realizamos la validación cuando los valores o los checkboxes cambian
    useEffect(() => {
        const newErrors = {};

        Object.keys(values).forEach((name) => {
            if (touched[name]) {
                const errorMessage = validateInput(name, values[name]);
                if (errorMessage) {
                    newErrors[name] = errorMessage;
                }
            }
        });

        if (touched.checkboxes) {
            const checkboxErrorMessage = validateCheckboxes();
            if (checkboxErrorMessage) {
                newErrors.checkboxes = checkboxErrorMessage;
            }
        }

        setErrors(newErrors);
    }, [values, checkboxValues, touched]);

    // Realizamos la validación de cada campo del formulario
    const validateInput = (name, value) => {
        let errorMessage = "";
        switch (name) {
            case "username":
                errorMessage = validateUsername(value);
                break;
            case "name":
                errorMessage = validateName(value);
                break;
            case "surname":
                errorMessage = validateSurname(value);
                break;
            case "email":
                errorMessage = validateEmail(value);
                break;
            case "dateBorn":
                errorMessage = validateDateBorn(value);
                break;
            case "password":
                errorMessage = validatePassword(value);
                break;
            case "pass":
                errorMessage = validateConfirmPassword(value);
                break;
            default:
                break;
        }
        return errorMessage;
    };

    // Funciones de validación para cada campo del formulario
    const validateUsername = (value) => {
        if (!value.trim()) {
            return "El nombre de usuario es obligatorio";
        }
        if (value.length < 3 || value.length > 16) {
            return "El nombre de usuario debe tener entre 3 y 16 caracteres";
        }
        const regexUsuario = /^[A-Za-zÁÉÍÓÚÄËÏÖÜÑæaø'-záéíóúäëïöüñ]+(?:[- ][A-Za-zÁÉÍÓÚÄËÏÖÜÑæaø'-záéíóúäëïöüñ]+)*$/;
        if (!regexUsuario.test(value)) {
            return "El nombre de usuario no es válido. Asegúrese de que esté bien escrito y no contenga caracteres especiales";
        }
        return "";
    };

    const validateName = (value) => {
        if (!value.trim()) {
            return 'El nombre es obligatorio';
        }
        if (value.length < 2 || value.length > 25) {
            return 'El nombre debe tener entre 2 y 25 caracteres';
        }
        const regexName = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
        if (!regexName.test(value)) {
            return 'El nombre no es válido. Asegúrese de que esté bien escrito y no contenga caracteres especiales';
        }
        return '';
    };

    const validateSurname = (value) => {
        if (!value.trim()) {
            return 'El/los apellido(s) es/son obligatorio(s)';
        }
        if (value.length < 3 || value.length > 25) {
            return 'El/los apellido(s) debe(n) tener entre 3 y 25 caracteres';
        }
        const regexSurname = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
        if (!regexSurname.test(value)) {
            return 'El/los apellido(s) no son válido(s). Asegúrese de que esté(n) bien escrito y no contenga(n) caracteres especiales';
        }
        return '';
    };

    const validateEmail = (value) => {
        if (!value.trim()) {
            return 'El correo electrónico es obligatorio';
        }
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regexEmail.test(value)) {
            return 'El correo electrónico no es válido';
        }
        return '';
    };

    const validateDateBorn = (value) => {
        if (!value) {
            return 'La fecha de nacimiento es obligatoria';
        }
        const age = new Date().getFullYear() - new Date(value).getFullYear();
        if (age < 13) {
            return 'Debes tener más de 13 años';
        }
        return '';
    };

    const validatePassword = (value) => {
        if (!value.trim()) {
            return 'La contraseña es obligatoria';
        }
        if (value.length < 8 || value.length > 25) {
            return 'La contraseña debe tener entre 8 y 25 caracteres';
        }
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/;
        if (!regexPassword.test(value)) {
            return 'La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial';
        }
        return '';
    };

    const validateConfirmPassword = (value) => {
        if (value !== values.password) {
            return 'Las contraseñas no coinciden';
        }
        return '';
    };

    const validateCheckboxes = () => {
        const { escritor, editor, lector } = checkboxValues;
        if (!escritor && !editor && !lector) {
            return "Debes seleccionar al menos un tipo de usuario";
        }
        return "";
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTouched = {};
        Object.keys(values).forEach((key) => {
            newTouched[key] = true;
        });
        newTouched.checkboxes = true;
        setTouched(newTouched);

        const newErrors = {};

        Object.keys(values).forEach((name) => {
            const errorMessage = validateInput(name, values[name]);
            if (errorMessage) {
                newErrors[name] = errorMessage;
            }
        });

        const checkboxErrorMessage = validateCheckboxes();
        if (checkboxErrorMessage) {
            newErrors.checkboxes = checkboxErrorMessage;
        }

        setErrors(newErrors);

        if (Object.values(newErrors).every((error) => error === '')) {
            try {
                const response = await fetch('http://localhost:8081/index.php?action=register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...values, ...checkboxValues }),
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.status === 'success') {
                        alert('Te has registrado correctamente');
                    } else {
                        alert('No te has podido registrar: ' + data.message);
                    }
                } else {
                    throw new Error('Network response was not ok ' + response.status);
                }
            } catch (error) {
                alert('Error: ' + error.message);
            }
        }
    };

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className="col-md-6 text-center">
                    <h3 className='mt-3'>Regístrate</h3>
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
                        <span className="text-danger">{touched.username && errors.username}</span>
                        <div className="form-group mt-3">
                            <input className='form-control'
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                placeholder="Nombre"
                            />
                        </div>
                        <span className="text-danger">{touched.name && errors.name}</span>
                        <div className="form-group mt-3">
                            <input className='form-control'
                                type="text"
                                name="surname"
                                value={values.surname}
                                onChange={handleChange}
                                placeholder="Apellidos"
                            />
                        </div>
                        <span className="text-danger">{touched.surname && errors.surname}</span>
                        <div className="form-group mt-3">
                            <input className='form-control'
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                placeholder="Correo electrónico"
                            />
                        </div>
                        <span className="text-danger">{touched.email && errors.email}</span>
                        <div className="form-group mt-3">
                            <input className='form-control'
                                type="date"
                                name="dateBorn"
                                value={values.dateBorn}
                                onChange={handleChange}
                                placeholder="Fecha de nacimiento"
                            />
                        </div>
                        <span className="text-danger">{touched.dateBorn && errors.dateBorn}</span>
                        <div className="form-group mt-3">
                            <input className='form-control'
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                placeholder="Contraseña"
                            />
                        </div>
                        <span className="text-danger">{touched.password && errors.password}</span>
                        <div className="form-group mt-3">
                            <input className='form-control'
                                type="password"
                                name="pass"
                                value={values.pass}
                                onChange={handleChange}
                                placeholder="Confirmar contraseña"
                            />
                        </div>
                        <span className="text-danger">{touched.pass && errors.pass}</span>
                        <div className="form-group mt-3">
                        <h4>¿Qué tipo de usuario quieres ser?</h4>
                        <p>Puedes elegir más de uno si lo deseas</p>
                            <div className="form-check form-check-inline">
                                <input className='form-check-input'
                                    type="checkbox"
                                    name="escritor"
                                    checked={checkboxValues.escritor}
                                    onChange={handleCheckboxChange}
                                />
                                <label className='form-check-label'>Escritor</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className='form-check-input'
                                    type="checkbox"
                                    name="editor"
                                    checked={checkboxValues.editor}
                                    onChange={handleCheckboxChange}
                                />
                                <label className='form-check-label'>Editor</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className='form-check-input'
                                    type="checkbox"
                                    name="lector"
                                    checked={checkboxValues.lector}
                                    onChange={handleCheckboxChange}
                                />
                                <label className='form-check-label'>Lector</label>
                            </div>
                        </div>
                        <div>
                            <span className="text-danger">{touched.checkboxes && errors.checkboxes}</span>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary mt-3">Registrarse</button>
                        </div> 
                    </form>
                    <p className='mt-3'>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>

                </div>
            </div>
        </div>
    );
}

export default Register;
