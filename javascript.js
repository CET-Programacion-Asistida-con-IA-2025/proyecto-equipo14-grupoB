// Primeros Pasos - JavaScript Principal
// Funcionalidades para mejorar la experiencia del usuario

// === NAVEGACIÓN MÓVIL ===
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// === SCROLL SUAVE ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// === ANIMACIONES AL HACER SCROLL ===
function animateOnScroll() {
    const elements = document.querySelectorAll('.category-card, .opportunity-card, .tool-card, .contest-card, .community-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

// Ejecutar animación al cargar y al hacer scroll
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// === BOTONES INTERACTIVOS ===
document.addEventListener('DOMContentLoaded', function() {
    // Botones de aplicar a oportunidades
    const applyButtons = document.querySelectorAll('.btn-apply');
    applyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const opportunityTitle = this.closest('.opportunity-card').querySelector('h3').textContent;
            showNotification(`¡Aplicación enviada para: ${opportunityTitle}!`, 'success');
        });
    });

    // Botones de herramientas
    const toolButtons = document.querySelectorAll('.btn-tool');
    toolButtons.forEach(button => {
        button.addEventListener('click', function() {
            const toolName = this.closest('.tool-card').querySelector('h3').textContent;
            showNotification(`Próximamente: ${toolName}`, 'info');
        });
    });

    // Botones de concursos/becas
    const contestButtons = document.querySelectorAll('.btn-contest');
    contestButtons.forEach(button => {
        button.addEventListener('click', function() {
            const contestTitle = this.closest('.contest-card').querySelector('h3').textContent;
            showNotification(`¡Registrado en: ${contestTitle}!`, 'success');
        });
    });
});

// === SISTEMA DE NOTIFICACIONES ===
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}
            </span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Añadir estilos si no existen
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.innerHTML = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                max-width: 400px;
                padding: 15px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                animation: slideIn 0.3s ease-out;
            }
            .notification-success {
                background: #4CAF50;
                color: white;
            }
            .notification-error {
                background: #f44336;
                color: white;
            }
            .notification-info {
                background: #2196F3;
                color: white;
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .notification-icon {
                font-weight: bold;
                font-size: 18px;
            }
            .notification-message {
                flex: 1;
            }
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(styles);
    }

    // Añadir al DOM
    document.body.appendChild(notification);

    // Botón cerrar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        closeNotification(notification);
    });

    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(notification);
        }
    }, 5000);
}

function closeNotification(notification) {
    notification.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// === CONTADOR DE ESTADÍSTICAS ===
function animateCounters() {
    const counters = document.querySelectorAll('.floating-card span');
    
    counters.forEach(counter => {
        const text = counter.textContent;
        const number = parseInt(text.replace(/[^0-9]/g, ''));
        
        if (number > 0) {
            let current = 0;
            const increment = number / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    current = number;
                    clearInterval(timer);
                }
                counter.textContent = text.replace(number, Math.floor(current));
            }, 30);
        }
    });
}

// === EFECTOS VISUALES ===
// Efecto parallax suave para el hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Efecto hover para las tarjetas
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.category-card, .opportunity-card, .tool-card, .contest-card, .community-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// === FORMULARIO DE BÚSQUEDA SIMPLE ===

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initSearch();
    
    // Animar contadores después de un breve delay
    setTimeout(animateCounters, 1000);
    
    // Añadir clase de carga completada
    document.body.classList.add('loaded');
    
    console.log('Primeros Pasos - JavaScript iniciado correctamente');
});

// === UTILIDADES ===
// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para formatear fechas
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(date).toLocaleDateString('es-ES', options);
}

// Función para generar ID único
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}