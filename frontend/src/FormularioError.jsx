// Importamos las cosas que necesitamos importar
import React from 'react';
import { useLocation } from 'react-router-dom';
import letrasfap from './img/letrasfap.png';

const FormularioError = () => {

    const backgroundStyle = {
        backgroundImage: `url(${letrasfap})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
    };

    // Obtenemos la ubicación actual usando el hook useLocation de React Router
    const location = useLocation();
    // Intentamos obtener el mensaje desde el estado de la ubicación
    // Si no hay un mensaje, utilizamos un mensaje por defecto
    const message = location.state?.message || 'Ha ocurrido un error al mandar el formulario. Inténtelo de nuevo.';

    return (
        <main style={backgroundStyle} className='bg-image'>
            <div className='d-flex align-items-center justify-content-center pt-5 pb-5'>
                <div className='text-center'>
                    <div>
                        <h1 className='display-1'>{message}</h1>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default FormularioError;