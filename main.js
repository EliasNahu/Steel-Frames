// PAGINA DE CONTACTOS

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let validacion = true;

    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("contactMethodError").textContent = "";
    document.getElementById("messageError").textContent = "";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();
    const contactMethod = document.querySelector('input[name="contactMethod"]:checked');

    if (name === "") {
        document.getElementById("nameError").textContent = "El nombre es obligatorio.";
        validacion = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").textContent = "Correo inválido.";
        validacion = false;
    }

    if (phone.length < 8) {
        document.getElementById("phoneError").textContent = "El número de teléfono debe tener al menos 8 dígitos.";
        validacion = false;
    }

    if (!contactMethod) {
        document.getElementById("contactMethodError").textContent = "Selecciona un método de contacto.";
        validacion = false;
    }

    if (message === "") {
        document.getElementById("messageError").textContent = "El mensaje no puede estar vacío.";
        validacion = false;
    }

    if (validacion) {
        alert("Formulario enviado con éxito.");
        document.getElementById("contactForm").reset();
    }
});