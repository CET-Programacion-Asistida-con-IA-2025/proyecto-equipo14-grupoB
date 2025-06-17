// Primeros Pasos - JavaScript Principal
document.addEventListener('DOMContentLoaded', function() {
    
    // ===============================
    // MENÚ HAMBURGUESA
    // ===============================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    // ===============================
    // NAVEGACIÓN SUAVE
    // ===============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // ===============================
    // ANIMACIÓN DE NÚMEROS (ESTADÍSTICAS)
    // ===============================
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 segundos
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current).toLocaleString();
            }, 16);
        });
    }

    // Intersection Observer para activar animaciones cuando sean visibles
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(statsSection);
    }

    // ===============================
    // FUNCIONALIDAD DE BÚSQUEDA
    // ===============================
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const filterSelects = document.querySelectorAll('.filter-select');

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            const filters = Array.from(filterSelects).map(select => select.value);
            
            if (searchTerm || filters.some(filter => filter !== 'todas')) {
                showLoading();
                
                // Simular búsqueda
                setTimeout(() => {
                    hideLoading();
                    showSearchResults(searchTerm, filters);
                }, 1500);
            } else {
                showNotification('Por favor, ingresa un término de búsqueda o selecciona un filtro', 'warning');
            }
        });
    }

    // Búsqueda al presionar Enter
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }

    // ===============================
    // FORMULARIO NEWSLETTER
    // ===============================
    const newsletterForm = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('emailInput');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (isValidEmail(email)) {
                showLoading();
                
                // Simular envío
                setTimeout(() => {
                    hideLoading();
                    showNotification('¡Gracias! Te has suscrito correctamente. Recibirás las mejores oportunidades en tu email.', 'success');
                    emailInput.value = '';
                }, 1000);
            } else {
                showNotification('Por favor, ingresa un email válido', 'error');
            }
        });
    }

    // ===============================
    // BOTÓN REGISTRO PRINCIPAL
    // ===============================
    const registerBtn = document.getElementById('registerBtn');
    if (registerBtn) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showRegistrationModal();
        });
    }

    // ===============================
    // BOTONES "EXPLORAR"
    // ===============================
    document.querySelectorAll('.explore-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.closest('.section-card');
            const sectionTitle = section.querySelector('h3').textContent;
            
            showLoading();
            setTimeout(() => {
                hideLoading();
                showNotification(`Explorando ${sectionTitle}... ¡Próximamente!`, 'info');
            }, 800);
        });
    });

    // ===============================
    // EFECTO PARALLAX SIMPLE
    // ===============================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // ===============================
    // ANIMACIONES DE ENTRADA
    // ===============================
    function animateOnScroll() {
        const elements = document.querySelectorAll('.section-card, .testimonial-card, .stat-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate-in');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar al cargar

    // ===============================
    // FUNCIONES AUXILIARES
    // ===============================
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.style.display = 'flex';
        }
    }

    function hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }

    function showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // Estilos inline para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            z-index: 10000;
            max-width: 400px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;

        // Colores según el tipo
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Cerrar notificación
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            removeNotification(notification);
        });

        // Auto-cerrar después de 5 segundos
        setTimeout(() => {
            removeNotification(notification);
        }, 5000);
    }

    function removeNotification(notification) {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    function showSearchResults(searchTerm, filters) {
        const results = generateMockResults(searchTerm, filters);
        const message = `Se encontraron ${results.length} resultados para "${searchTerm}"`;
        showNotification(message, 'success');
        
        // Aquí podrías mostrar los resultados en una modal o redirigir a una página de resultados
        console.log('Resultados de búsqueda:', results);
    }

    function generateMockResults(searchTerm, filters) {
        // Simular resultados de búsqueda
        const mockResults = [
            { title: 'Curso de JavaScript para Principiantes', type: 'curso', area: 'tecnologia' },
            { title: 'Pasantía en Marketing Digital', type: 'trabajo', area: 'marketing' },
            { title: 'Voluntariado en ONG Educativa', type: 'voluntariado', area: 'comunicacion' },
            { title: 'Beca para Diseño UX/UI', type: 'beca', area: 'diseno' },
            { title: 'Junior Developer - Sin Experiencia', type: 'trabajo', area: 'tecnologia' }
        ];

        return mockResults.filter(result => {
            const matchesSearch = !searchTerm || 
                result.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilters = filters.every(filter => 
                filter === 'todas' || result.area === filter || result.type === filter
            );
            return matchesSearch && matchesFilters;
        });
    }

    function showRegistrationModal() {
        // Crear modal de registro
        const modal = document.createElement('div');
        modal.className = 'registration-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <h2>¡Comienza tu camino profesional!</h2>
                <form class="registration-form">
                    <input type="text" placeholder="Nombre completo" required>
                    <input type="email" placeholder="Email" required>
                    <input type="tel" placeholder="Teléfono">
                    <select required>
                        <option value="">Área de interés</option>
                        <option value="tecnologia">Tecnología</option>
                        <option value="marketing">Marketing</option>
                        <option value="diseno">Diseño</option>
                        <option value="administracion">Administración</option>
                        <option value="ventas">Ventas</option>
                        <option value="comunicacion">Comunicación</option>
                        <option value="finanzas">Finanzas</option>
                    </select>
                    <button type="submit">Registrarme Gratis 🚀</button>
                </form>
            </div>
        `;

        // Estilos del modal
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;

        document.body.appendChild(modal);

        // Cerrar modal
        modal.querySelector('.modal-close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        // Manejar formulario de registro
        modal.querySelector('.registration-form').addEventListener('submit', (e) => {
            e.preventDefault();
            showLoading();
            setTimeout(() => {
                hideLoading();
                document.body.removeChild(modal);
                showNotification('¡Registro exitoso! Te contactaremos pronto con oportunidades personalizadas.', 'success');
            }, 1500);
        });
    }

    // ===============================
    // INICIALIZACIÓN FINAL
    // ===============================
    console.log('🚀 Primeros Pasos - JavaScript cargado correctamente');
    
    // Agregar clase para animaciones CSS
    document.body.classList.add('js-loaded');
});