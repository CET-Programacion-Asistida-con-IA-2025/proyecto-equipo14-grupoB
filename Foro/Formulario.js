const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');

// Validación en tiempo real
const inputs = form.querySelectorAll('.form-control');
inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearError);
});

function validateField(e) {
    const field = e.target;
    const fieldName = field.name;
    const value = field.value.trim();
    const errorElement = document.getElementById(fieldName + 'Error');

    // Limpiar errores previos
    field.classList.remove('error');
    errorElement.textContent = '';

    // Validaciones específicas
    if (!value) {
        showError(field, errorElement, 'Este campo es obligatorio');
        return false;
    }

    switch (fieldName) {
        case 'nombre':
        case 'apellido':
            if (value.length < 2) {
                showError(field, errorElement, 'Debe tener al menos 2 caracteres');
                return false;
            }
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
                showError(field, errorElement, 'Solo se permiten letras');
                return false;
            }
            break;

        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(field, errorElement, 'Ingresa un email válido');
                return false;
            }
            break;

        case 'celular':
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
            if (!phoneRegex.test(value)) {
                showError(field, errorElement, 'Ingresa un número válido');
                return false;
            }
            break;
    }

    return true;
}

function showError(field, errorElement, message) {
    field.classList.add('error');
    errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
}

function clearError(e) {
    const field = e.target;
    const fieldName = field.name;
    const errorElement = document.getElementById(fieldName + 'Error');
    
    field.classList.remove('error');
    errorElement.textContent = '';
}

// Envío del formulario
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validar todos los campos
    let isValid = true;
    inputs.forEach(input => {
        const event = { target: input };
        if (!validateField(event)) {
            isValid = false;
        }
    });

    if (!isValid) {
        return;
    }

    // Mostrar estado de carga
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simular envío (reemplazar con tu lógica de envío real)
    setTimeout(() => {
        // Mostrar mensaje de éxito
        successMessage.classList.add('show');
        
        // Limpiar formulario
        form.reset();
        
        // Restaurar botón
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }, 2000);
});

// Formatear número de teléfono mientras escribe
document.getElementById('celular').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.startsWith('54')) {
        value = value.substring(2);
    }
    
    // Formatear como +54 9 11 1234-5678
    if (value.length >= 10) {
        const formatted = `+54 9 ${value.substring(0, 2)} ${value.substring(2, 6)}-${value.substring(6, 10)}`;
        e.target.value = formatted;
    }
});