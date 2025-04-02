// PAGINA DE CONTACTOS

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const messageInput = document.getElementById("message");
    const contactMethods = document.querySelectorAll('input[name="contactMethod"]');
    const resultDiv = document.createElement("div");
    resultDiv.id = "resultMessage";
    form.appendChild(resultDiv);

    // Cargar datos almacenados
    loadStoredData();

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        clearErrors();
        let valid = true;
        resultDiv.innerHTML = "";

        // Validaciones
        if (nameInput.value.trim() === "") {
            showError("name", "El nombre es obligatorio.");
            valid = false;
        }

        if (!validateEmail(emailInput.value.trim())) {
            showError("email", "Correo inválido.");
            valid = false;
        }

        if (phoneInput.value.trim().length < 8) {
            showError("phone", "El número de teléfono debe tener al menos 8 dígitos.");
            valid = false;
        }

        let selectedMethod = false;
        contactMethods.forEach((method) => {
            if (method.checked) selectedMethod = true;
        });
        if (!selectedMethod) {
            showErrorForContactMethod("Selecciona un método de contacto.");
            valid = false;
        }

        if (messageInput.value.trim() === "") {
            showError("message", "El mensaje no puede estar vacío.");
            valid = false;
        }

        if (valid) {
            saveDataToLocalStorage();
            showSuccess("Formulario enviado con éxito. Tus datos han sido almacenados.");
            localStorage.removeItem("contactFormData");
            form.reset();
        }
    });

    // Funciones

    function showError(inputId, message) {
        let inputElement = document.getElementById(inputId);
        if (!inputElement) return; 

        let errorDiv = document.getElementById(inputId + "Error");
        if (!errorDiv) {
            errorDiv = document.createElement("div");
            errorDiv.id = inputId + "Error";
            errorDiv.classList.add("text-danger");
            inputElement.insertAdjacentElement("afterend", errorDiv);
        }
        errorDiv.textContent = message;
    }

    function showErrorForContactMethod(message) {
        let errorDiv = document.getElementById("contactMethodError");
        if (!errorDiv) {
            errorDiv = document.createElement("div");
            errorDiv.id = "contactMethodError";
            errorDiv.classList.add("text-danger");
            document.querySelector('input[name="contactMethod"]').parentElement.insertAdjacentElement("afterend", errorDiv);
        }
        errorDiv.textContent = message;
    }

    function clearErrors() {
        document.querySelectorAll(".text-danger").forEach(errorDiv => errorDiv.remove());
    }

    function showSuccess(message) {
        resultDiv.style.color = "green";
        resultDiv.textContent = message;
    }

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function saveDataToLocalStorage() {
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            message: messageInput.value.trim(),
            contactMethod: document.querySelector('input[name="contactMethod"]:checked').value
        };
        localStorage.setItem("contactFormData", JSON.stringify(formData));
    }

    function loadStoredData() {
        const storedData = localStorage.getItem("contactFormData");
        if (storedData) {
            const data = JSON.parse(storedData);
            nameInput.value = data.name;
            emailInput.value = data.email;
            phoneInput.value = data.phone;
            messageInput.value = data.message;

            const contactMethodInput = document.querySelector(`input[name="contactMethod"][value="${data.contactMethod}"]`);
            if (contactMethodInput) {
                contactMethodInput.checked = true;
            }
        }
    }
});