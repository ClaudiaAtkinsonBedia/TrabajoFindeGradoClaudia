// Importamos las cosas que necesitamos importar
import React from 'react';
import { useLocation } from 'react-router-dom';

const FormularioSuccess = () => {
    // Obtenemos la ubicación actual usando el hook useLocation de React Router
    const location = useLocation();
    // Intentamos obtener el mensaje desde el estado de la ubicación
    // Si no hay un mensaje, utilizamos un mensaje por defecto
    const message = location.state?.message || 'Se ha mandado el formulario con éxito';

    return (
        <div className='d-flex align-items-center justify-content-center mt-5 mb-5'>
            <div className='text-center'>
                <div>
                    <h1 className='display-1'>{message}</h1>
                </div>
            </div>
        </div>
    );
};

export default FormularioSuccess;