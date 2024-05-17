import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

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
      case "mensaje":
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
      return "El nombre de usuario es requerido";
    }

    // Para verificar la longitud del nombre
    if (value.length < 10 || value.length > 50) {
      return "El nombre debe tener entre 10 y 50 caracteres";
    }

    // Para verificar el formato del nombre
    const regex = /^[A-ZÁÉÍÓÚÄËÏÖÜÑa-záéíóúäëïöüñ\s'-]+$/;
    if (!regex.test(value)) {
      return "El nombre no es válido. Asegúrese de que esté bien escrito y no contenga caracteres especiales";
    }

    // Si pasa todas las validaciones, no hay error
    return "";
  };

  const validateEmail = (value) => {
    // Lógica de validación para el correo electrónico
  };

  const validateMensaje = (value) => {
    // Lógica de validación para el mensaje
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validamos todos los campos antes de enviar el formulario
    const newErrors = {};
    Object.keys(values).forEach((name) => {
      const errorMessage = validateInput(name, values[name]);
      if (errorMessage) {
        newErrors[name] = errorMessage;
      }
    });

    setErrors(newErrors);

    // Si no hay errores, enviar el formulario
    if (!validateUsername(values.username) && !validateEmail(values.email) && !validateMensaje(values.message)) {
      // Envío del formulario
      alert("Formulario enviado correctamente.");
    }
  };

  return (
    <div>

      <main>
        <div className="container text-center">
          <form className="row" onSubmit={handleSubmit} noValidate>
            {inputs.map((input) => (
              <div key={input.id} className="col-10 mx-auto">
                <label htmlFor={input.id}>{input.label}</label>
                {input.type === "textarea" ? (
                  <textarea
                    name={input.name}
                    value={values[input.name]}
                    onChange={handleChange}
                    className="form-control"
                    placeholder={input.placeholder}
                  ></textarea>
                ) : (
                  <input
                    type={input.type}
                    name={input.name}
                    value={values[input.name]}
                    onChange={handleChange}
                    className="form-control"
                    placeholder={input.placeholder}
                  />
                )}
                <span className="text-danger">{errors[input.name]}</span>
              </div>
            ))}
            <div className="col-12 mt-2">
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