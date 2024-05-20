import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

function MainContacto() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    message: "",
  });

  const form = useRef();

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Nombre y apellidos",
      label: "Nombre y apellidos",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Correo electrónico",
      label: "Correo Electrónico",
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMessage: "Por favor, introduce una dirección de correo electrónico válida"
    },
    {
      id: 3,
      name: "message",
      type: "textarea",
      placeholder: "Mensaje",
      label: "Mensaje",
      pattern: /^.*$/,
      errorMessage: "Este campo es obligatorio"
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    validateInput(name, value);
  };

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
    setErrors({ ...errors, [name]: errorMessage });
  };

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

  const validateMensaje = (value) => {
    // Si el mensaje está vacio
      if (!value.trim()) {
        return "El mensaje es obligatorio";
      }
  
      if (value.length < 20) {
        return `El mensaje debe tener un mínimo de 20 caracteres. ${value.length}/500`;
      }
  
      if (value.length > 500) {
        return `El mensaje debe tener un máximo de 500 caracteres.${value.length}/500`;
      }
      
      if (value.length > 20 && value.length < 500)
      {
        
        return "";
      }
      
  };

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
    sendEmail(e);
    } else {
      alert("Lo sentimos, algo ha ido mal.");
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_57t6u1g', 'template_bllkyb5', form.current, 'tZze0QvuYvzD1VAOP')
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          alert('Formulario enviado correctamente.');
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert('Error al enviar el formulario. Por favor, inténtelo de nuevo más tarde.');
        }
      );
  };

  return (
    <div>
      <main>
        <div className="container text-center">
          <h3 className="mb-3 mt-3">Formulario de contacto</h3>
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
              <button type="submit" className="btn btn-primary">
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