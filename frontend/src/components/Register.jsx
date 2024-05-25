import React, { useState } from 'react';

function Register() {
    const [values, setValues] = useState({
        username: "",
        name: "",
        surname: "",
        email: "",
        dateBorn: "",
        password: "",
        pass: "",
        escritor:"false",
        editor:"false",
        lector:"false",
    });

    const [errors, setErrors] = useState({
        username: "",
        name: "",
        surname: "",
        email: "",
        dateBorn: "",
        password: "",
        pass: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
        validateInput(name, value);
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: checked
        }));
    };

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
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage
        }));
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(values).forEach((name) => {
            const errorMessage = validateInput(name, values[name]);
            if (errorMessage) {
                newErrors[name] = errorMessage;
            }
        });
    
        setErrors(newErrors);
    
        if (Object.values(newErrors).every((error) => error === '')) {
            try {
                const response = await fetch('http://localhost:8081/index.php?action=register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
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
                        <span className="text-danger">{errors.username}</span>
                        <div className="form-group mt-3">
                            <input className='form-control'
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                placeholder="Nombre"
                            />
                        </div>
                        <span className="text-danger">{errors.name}</span>
                        <div className="form-group mt-3">
                            <input className='form-control'
                                type="text"
                                name="surname"
                                value={values.surname}
                                onChange={handleChange}
                                placeholder="Apellidos"
                            />
                        </div>
                        <span className="text-danger">{errors.surname}</span>
                        <div className="form-group mt-3">
                            <input className='form-control'
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                placeholder="Correo electrónico"
                            />
                        </div>
                        <span className="text-danger">{errors.email}</span>
                        <div className="form-group mt-3">
                            <input className='form-control'
                                type="date"
                                name="dateBorn"
                                value={values.dateBorn}
                                onChange={handleChange}
                                placeholder="Fecha de nacimiento"
                            />
                        </div>
                        <span className="text-danger">{errors.dateBorn}</span>
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
                        <div className="form-group mt-3">
                            <input className='form-control'
                                type="password"
                                name="pass"
                                value={values.pass}
                                onChange={handleChange}
                                placeholder="Confirmar contraseña"
                            />
                        </div>
                        <span className="text-danger">{errors.pass}</span>
                        <div className="form-group mt-3">
                        <h4>¿Qué tipo de usuario quieres ser?</h4>
                        <p>Puedes elegir más de uno si lo deseas</p>
                            <div className="d-flex justify-content-around mt-2">
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label"> 
                                    <input className="form-check-input"
                                    type="checkbox"
                                    name="escritor"
                                    checked={values.escritor}
                                    onChange={handleCheckboxChange}
                                    />
                                    Escritor</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                    <input className="form-check-input"
                                    type="checkbox"
                                    name="editor"
                                    checked={values.editor}
                                    onChange={handleCheckboxChange}
                                    />
                                    Editor</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                    <input className="form-check-input"
                                    type="checkbox"
                                    name="lector"
                                    checked={values.lector}
                                    onChange={handleCheckboxChange}
                                    />
                                    Lector</label>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3 mb-3">Regístrate</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;