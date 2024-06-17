// Importamos las cosas que necesitamos importar
import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import letrasfap from './img/letrasfap.png';

// Definimos el componente MainContacto
function MainContacto() {
  // Definimos el estado inicial para los valores del formulario
  const [values, setValues] = useState({
    username: "", // Nombre de usuario
    email: "", // Correo electrónico
    message: "", // Mensaje
  });

  // Definimos el estado inicial para los errores del formulario
  const [errors, setErrors] = useState({
    username: "", // Error del nombre de usuario
    email: "", // Error del correo electrónico
    message: "", // Error del mensaje
  });
  
  // Para navegar a los mensajes de success o de error
  const navigate = useNavigate();

  const form = useRef(); // Referencia al formulario

  // Manejamos el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    validateInput(name, value); // Validamos el campo modificado
  };

  // Validamos la entrada del formulario basada en el nombre del campo
  const validateInput = (name, value) => {
    let errorMessage = "";
    switch (name) {
      case "username":
        errorMessage = validateUsername(value);
        break;
      case "email":
        errorMessage = validateEmail(value);
        break;
      case "message":
        errorMessage = validateMensaje(value);
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: errorMessage }); // Actualiza los errores
  };

  // Valida el nombre de usuario
  const validateUsername = (value) => {
    // Si el nombre está vacio
    if (!value.trim()) {
      return "El nombre de usuario es obligatorio";
    }

    // Para verificar la longitud del nombre
    if (value.length < 10 || value.length > 50) {
      return "El nombre debe tener entre 10 y 50 caracteres";
    }

    // Para verificar el formato del nombre
    const regexNombre = /^[A-ZÁÉÍÓÚÄËÏÖÜÑæaø'-záéíóúäëïöüñ?]+(?:[- ][A-ZÁÉÍÓÚÄËÏÖÜÑæaø'-záéíóúäëïöüñ]+)+$/; // /^[A-ZÁÉÍÓÚÄËÏÖÜÑæaø'-záéíóúäëïöüñ]+(?:[- ][A-ZÁÉÍÓÚÄËÏÖÜÑæaø'-záéíóúäëïöüñ]+)+$/i;
    if (!regexNombre.test(value)) {
      return "El nombre no es válido. Asegúrese de que esté bien escrito y no contenga caracteres especiales";
    }

    // Si pasa todas las validaciones, no hay error
    return "";
  };

  // Valida el correo electrónico
  const validateEmail = (value) => {
    // Si el email está vacio
    if (!value.trim()) {
      return "El correo electrónico es obligatorio";
    }

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // La expresión regular del correo electrónico
    if (!regexEmail.test(value)) {
      return "El correo electrónico no es válido";
    }

    // Si pasa todas las validaciones, no hay error
    return "";
  };

  // Valida el mensaje
  const validateMensaje = (value) => {
    // Si el mensaje está vacio
      if (!value.trim()) {
        return "El mensaje es obligatorio";
      }
  
      // Si el mensaje es menor de 20 caracteres
      if (value.length < 20) {
        return `El mensaje debe tener un mínimo de 20 caracteres. ${value.length}/500`;
      }
  
      // Si es mayor de 500
      if (value.length > 500) {
        return `El mensaje debe tener un máximo de 500 caracteres.${value.length}/500`;
      }
      
      // Si está entre 20 y 500 caracteres
      if (value.length > 20 && value.length < 500)
      {
        
        return ""; // Si no hay errores, retorna una cadena vacía
      }
      
  };

  // Manejamos el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const isUsernameValid = validateUsername(values.username) === "";
    const isEmailValid = validateEmail(values.email) === "";
    const isMessageValid = validateMensaje(values.message) === "";

    setErrors({
      username: validateUsername(values.username),
      email: validateEmail(values.email),
      message: validateMensaje(values.message),
    });


  if (isUsernameValid && isEmailValid && isMessageValid) {
    sendEmail(e);  // Envíamos el correo si todos los campos son válidos
    } else {
      alert("Lo sentimos, algo ha ido mal.");
    }
  };

  // Función para enviar el correo utilizando emailjs
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_57t6u1g', 'template_bllkyb5', form.current, 'tZze0QvuYvzD1VAOP')
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          navigate('/successF', { state: { message: 'Se ha mandado el formulario con éxito' } });
        },
        (error) => {
          console.log('FAILED...', error.text);
          navigate('/errorF', { state: { message: 'No se ha podido mandar el formulario: ' + data.message } });
        }
      );
  };

  const backgroundStyle = {
    backgroundImage: `url(${letrasfap})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  };

  return (
    <div>
      <main style={backgroundStyle} className='bg-image'>
        <div className="container text-center">
          <h3 className="mb-3 pt-3">Formulario de contacto</h3>
          <form className="row" ref={form} onSubmit={handleSubmit} noValidate>
            <div className="col-10 mx-auto">
              <label htmlFor="username">Nombre y apellidos</label>
              <input
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                className="form-control"
                placeholder="Nombre y apellidos"
              />
              <span className="text-danger">
                {errors.username}
              </span>
            </div>
            <div className="col-10 mx-auto">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Correo electrónico"
              />
              <span className="text-danger">
                {errors.email}
              </span>
            </div>
            <div className="col-10 mx-auto">
              <label htmlFor="message">Mensaje</label>
              <textarea
                name="message"
                value={values.message}
                onChange={handleChange}
                className="form-control"
                placeholder="Mensaje"
              ></textarea>
              <span className={errors.message ? "text-danger" : "text-success"}>
                {errors.message || (values.message.length > 0 && `${values.message.length}/500`)}
              </span>
            </div>
            <div className="col-12 mt-3 mb-3">
              <button type="submit" id='button' className="btn">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default MainContacto;