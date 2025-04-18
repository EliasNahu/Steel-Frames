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

    // Cargar datos guardados del formulario
    loadStoredData();

    // Cargar horarios desde JSON
    loadHorarios();

    // Validación y envío del formulario
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        clearErrors();
        resultDiv.innerHTML = "";

        let valid = true;

        nameInput.value.trim() === "" && (showError("name", "El nombre es obligatorio."), valid = false);
        !validateEmail(emailInput.value.trim()) && (showError("email", "Correo inválido."), valid = false);
        phoneInput.value.trim().length < 8 && (showError("phone", "El número de teléfono debe tener al menos 8 dígitos."), valid = false);

        const selectedMethod = [...contactMethods].some(method => method.checked);
        !selectedMethod && (showErrorForContactMethod("Selecciona un método de contacto."), valid = false);

        messageInput.value.trim() === "" && (showError("message", "El mensaje no puede estar vacío."), valid = false);

        if (valid) {
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim(),
                message: messageInput.value.trim(),
                contactMethod: document.querySelector('input[name="contactMethod"]:checked').value
            };

            // Uso de spread operator
            const extendedData = {
                ...formData,
                enviadoEn: new Date().toLocaleString()
            };

            localStorage.setItem("contactFormData", JSON.stringify(extendedData));

            Swal.fire({
                title: '¡Mensaje enviado!',
                text: 'Nos contactaremos contigo a la brevedad.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            localStorage.removeItem("contactFormData");
            form.reset();
        }
    });

    // Funciones auxiliares

    function showError(inputId, message) {
        const inputElement = document.getElementById(inputId);
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
        document.querySelectorAll(".text-danger").forEach(div => div.remove());
    }

    function showSuccess(message) {
        resultDiv.style.color = "green";
        resultDiv.textContent = message;
    }

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function loadStoredData() {
        const storedData = localStorage.getItem("contactFormData");
        if (storedData) {
            const { name, email, phone, message, contactMethod } = JSON.parse(storedData);

            nameInput.value = name;
            emailInput.value = email;
            phoneInput.value = phone;
            messageInput.value = message;

            const contactInput = document.querySelector(`input[name="contactMethod"][value="${contactMethod}"]`);
            contactInput && (contactInput.checked = true);
        }
    }

    function loadHorarios() {
        fetch('../horarios.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudo cargar el archivo de horarios.");
                }
                return response.json();
            })
            .then(data => {
                const horariosTable = document.querySelector('tbody');
                if (!horariosTable) {
                    console.warn("No se encontró la tabla para cargar horarios.");
                    return;
                }
                horariosTable.innerHTML = '';
                data.forEach(horario => {
                    const row = document.createElement('tr');
                    row.innerHTML = `<td>${horario.dia}</td><td>${horario.horario}</td>`;
                    horariosTable.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error al cargar los horarios:', error);
            });
    }

    function loadFraseInspiradora() {
        const existing = document.getElementById("fraseInspiradora");
        if (existing) existing.remove();
    
        fetch("../frases.json") // Ruta al archivo local
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudo cargar el archivo de frases.");
                }
                return response.json();
            })
            .then(data => {
                const randomQuote = data[Math.floor(Math.random() * data.length)];
                const frase = document.createElement("blockquote");
                frase.id = "fraseInspiradora";
                frase.textContent = `"${randomQuote.text}" — ${randomQuote.author || "Anónimo"}`;
                frase.classList.add("my-3", "text-secondary", "fst-italic", "animate__animated", "animate__fadeIn");
                const container = document.getElementById("fraseContainer");
                container.prepend(frase);
            })
            .catch(error => {
                console.error("Error al cargar la frase inspiradora:", error);
            });
    }
    
    
    loadHorarios();
    loadFraseInspiradora();

    const nuevaFraseBtn = document.getElementById("nuevaFraseBtn");
    nuevaFraseBtn.addEventListener("click", (e) => {
        e.preventDefault();
        loadFraseInspiradora();
    });

});
