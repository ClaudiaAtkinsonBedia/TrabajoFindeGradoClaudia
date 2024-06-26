// Importamos las cosas que necesitamos importar
import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import letrasfap from './img/letrasfap.png';

function MainEscritor() {
    const [values, setValues] = useState({ storyName: "", text: "" });
    const [errors, setErrors] = useState({ storyName: "", text: "" });
    const { jwt } = useContext(AuthContext); // Obtener el token JWT del contexto
    const [sidebarActive, setSidebarActive] = useState(false);

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };

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
            case "storyName":
                errorMessage = validateStoryName(value);
                break;
            case "text":
                errorMessage = validateText(value);
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

    const validateStoryName = (value) => {
        if (!value.trim()) {
            return "El nombre de la historia es obligatorio";
        }
        return "";
    };

    const validateText = (value) => {
        if (!value.trim()) {
            return 'La historia es obligatoria';
        }
        return "";
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
            const response = await fetch('http://localhost:8081/index.php?action=publicarHistorias', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}` // Enviar el token JWT
                },
                body: JSON.stringify(values)
            });

            const data = await response.json();
            if (data.status === 'success') {
                alert('Historia publicada exitosamente');
            } else {
                alert('Error: ' + data.message);
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const backgroundStyle = {
        backgroundImage: `url(${letrasfap})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      };

    return (
        <main style={backgroundStyle} className='bg-image'>
            <div>
                <button className={`sidebar-toggle ${sidebarActive ? 'active' : ''}`} onClick={toggleSidebar}>
                    <i className="bi bi-list"></i>
                </button>
                <aside id="sidebar" className={sidebarActive ? 'active' : ''}>
                    <div className="sidebar-title">
                        <div className="sidebar-brand d-flex justify-content-between">
                            <h5 className="mx-2">Ajustes</h5><i className="bi bi-gear icon_header"></i>
                        </div>
                        <span className="icon close_icon" onClick={toggleSidebar}>X</span>
                    </div>
                    <ul className="sidebar-list">
                        <li className="sidebar-list-item">
                            <i className="bi bi-person-gear icon"></i>Cambiar tipo de cuenta
                        </li>
                        <li className="sidebar-list-item">
                            <i className="bi bi-person-gear icon"></i>Ajustes de cuenta
                        </li>
                        <li className="sidebar-list-item">
                            <i className="bi bi-person-gear icon"></i>Borrar cuenta
                        </li>
                    </ul>
                </aside>
                <div className="container main-content">
                    <h2 className="justify-items-center text-center">Menú de Escritor</h2>
                    <div>
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="form-group mt-3">
                                <input className='form-control'
                                    type="text"
                                    name="storyName"
                                    value={values.storyName}
                                    onChange={handleChange}
                                    placeholder="Nombre de la historia"
                                />
                            </div>
                            <span className="text-danger">{errors.username}</span>
                            <div className="form-group mt-3">
                                <textarea className='form-control'
                                    name="text"
                                    value={values.text}
                                    onChange={handleChange}
                                    placeholder="Historia"
                                />
                            </div>
                            <span className="text-danger">{errors.username}</span>
                            <button type="submit" id='button' className="btn mt-3 mb-3">Publicar historia</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}


export default MainEscritor;

