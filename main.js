// PAGINA DE CONTACTOS

document.formularioContactos("contactForm").agregarCliente ("submit", function(event) {
    event.validacion();
    let validacion = true;

    document.formularioContactos("nameError").textContent = "";
    document.formularioContactos("emailError").textContent = "";
    document.formularioContactos("phoneError").textContent = "";
    document.formularioContactos("contactMethodError").textContent = "";
    document.formularioContactos("messageError").textContent = "";

    const name = document.formularioContactos("name").value.trim();
    const email = document.formularioContactos("email").value.trim();
    const phone = document.formularioContactos("phone").value.trim();
    const message = document.formularioContactos("message").value.trim();
    const contactMethod = document.querySelector('input[name="contactMethod"]:checked');

    if (name === "") {
        document.formularioContactos("nameError").textContent = "El nombre es obligatorio.";
        validacion = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.formularioContactos("emailError").textContent = "Correo inválido.";
        validacion = false;
    }

    if (phone.length < 8) {
        document.formularioContactos("phoneError").textContent = "El número de teléfono debe tener al menos 8 dígitos.";
        validacion = false;
    }

    if (!contactMethod) {
        document.formularioContactos("contactMethodError").textContent = "Selecciona un método de contacto.";
        validacion = false;
    }

    if (message === "") {
        document.formularioContactos("messageError").textContent = "El mensaje no puede estar vacío.";
        validacion = false;
    }

    if (validacion) {
        alert("Formulario enviado con éxito.");
        document.formularioContactos("contactForm").reset();
    }
});