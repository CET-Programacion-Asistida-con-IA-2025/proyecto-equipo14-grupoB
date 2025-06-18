// Primeros Pasos - JavaScript Functionality

// ===== VARIABLES GLOBALES =====
let users = [];
let currentUser = null;
let courses = [];
let opportunities = [];
let contests = [];

// ===== DATOS SIMULADOS =====
const sampleCourses = [
    {
        id: 1,
        title: "Introducción a JavaScript",
        category: "Tecnología",
        duration: "40 horas",
        level: "Principiante",
        rating: 4.8,
        students: 1234,
        free: true
    },
    {
        id: 2,
        title: "Marketing Digital para Principiantes",
        category: "Marketing Digital",
        duration: "30 horas",
        level: "Principiante",
        rating: 4.6,
        students: 892,
        free: true
    },
    {
        id: 3,
        title: "Diseño UX/UI Básico",
        category: "Diseño",
        duration: "35 horas",
        level: "Principiante",
        rating: 4.7,
        students: 654,
        free: false
    },
    {
        id: 4,
        title: "Fundamentos de Administración",
        category: "Negocios",
        duration: "25 horas",
        level: "Principiante",
        rating: 4.5,
        students: 432,
        free: true
    }
];

const sampleOpportunities = [
    {
        id: 1,
        title: "Asistente de Marketing Digital",
        company: "Fundación Educativa",
        type: "Voluntariado",
        location: "Remoto",
        category: "Marketing",
        description: "Apoyo en redes sociales y creación de contenido para programas educativos.",
        requirements: ["Conocimientos básicos de redes sociales", "Disponibilidad 10 hrs/semana"],
        benefits: ["Certificado de participación", "Experiencia real", "Networking"]
    },
    {
        id: 2,
        title: "Desarrollador Junior",
        company: "StartUp Tech",
        type: "Pasantía",
        location: "Híbrido",
        category: "Tecnología",
        description: "Desarrollo de aplicaciones web con mentoreo especializado.",
        requirements: ["Conocimientos básicos de HTML/CSS", "Ganas de aprender"],
        benefits: ["Mentoreo 1:1", "Posibilidad de contratación", "Capacitación continua"]
    }
];

// ===== DOM ELEMENTS =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const searchInput = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-btn');
const filterTags = document.querySelectorAll('.filter-tag');
const heroButtons = document.querySelectorAll('.hero-buttons button');
const ctaButtons = document.querySelectorAll('.cta-buttons button');

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadSampleData();
    setupAnimations();
    setupScrollEffects();
});

// ===== FUNCIONES PRINCIPALES =====

function initializeApp() {
    console.log('🚀 Inicializando Primeros Pasos...');
    
    // Cargar datos del localStorage si existen
    loadUserData();
    
    // Configurar estado inicial
    updateUI();
    
    console.log('✅ Aplicación inicializada correctamente');
}

function setupEventListeners() {
    // Menú móvil
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Búsqueda
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
        
        // Búsqueda en tiempo real
        searchInput.addEventListener('input', debounce(handleLiveSearch, 300));
    }
    
    // Filtros
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => handleFilterClick(tag));
    });
    
    // Botones principales
    heroButtons.forEach(button => {
        button.addEventListener('click', handleHeroButtonClick);
    });
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', handleCTAButtonClick);
    });
    
    // Smooth scroll para navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
    
    // Botones de aplicar a oportunidades
    document.querySelectorAll('.btn-apply').forEach(button => {
        button.addEventListener('click', handleApplyClick);
    });
    
    // Botones de herramientas
    document.querySelectorAll('.btn-tool').forEach(button => {
        button.addEventListener('click', handleToolClick);
    });
    
    // Botones de concursos
    document.querySelectorAll('.btn-contest').forEach(button => {
        button.addEventListener('click', handleContestClick);
    });
    
    // Botón de login
    const loginBtn = document.querySelector('.btn-login');
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
    }
}

// ===== FUNCIONES DE NAVEGACIÓN =====

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animación del hamburger
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

function handleSmoothScroll(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Cerrar menú móvil si está abierto
        if (navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
}

// ===== FUNCIONES DE BÚSQUEDA =====

function handleSearch() {
    const query = searchInput.value.trim();
    if (query) {
        performSearch(query);
        showNotification(`Buscando: "${query}"`, 'info');
    } else {
        showNotification('Por favor ingresa un término de búsqueda', 'warning');
    }
}

function handleLiveSearch() {
    const query = searchInput.value.trim();
    if (query.length >= 3) {
        performSearch(query);
    }
}

function performSearch(query) {
    const results = {
        courses: sampleCourses.filter(course => 
            course.title.toLowerCase().includes(query.toLowerCase()) ||
            course.category.toLowerCase().includes(query.toLowerCase())
        ),
        opportunities: sampleOpportunities.filter(opp => 
            opp.title.toLowerCase().includes(query.toLowerCase()) ||
            opp.category.toLowerCase().includes(query.toLowerCase())
        )
    };
    
    console.log('Resultados de búsqueda:', results);
    displaySearchResults(results);
}

function displaySearchResults(results) {
    // Aquí se implementaría la lógica para mostrar resultados
    console.log(`Encontrados: ${results.courses.length} cursos, ${results.opportunities.length} oportunidades`);
}

// ===== FUNCIONES DE FILTROS =====

function handleFilterClick(clickedTag) {
    // Remover clase active de todos los filtros
    filterTags.forEach(tag => tag.classList.remove('active'));
    
    // Agregar clase active al filtro clickeado
    clickedTag.classList.add('active');
    
    const category = clickedTag.textContent.trim();
    filterContent(category);
    
    // Animación de feedback
    clickedTag.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clickedTag.style.transform = 'scale(1)';
    }, 150);
}

function filterContent(category) {
    if (category === 'Todos') {
        showAllContent();
    } else {
        filterByCategory(category);
    }
    
    showNotification(`Filtrando por: ${category}`, 'info');
}

function showAllContent() {
    // Mostrar todo el contenido
    console.log('Mostrando todo el contenido');
}

function filterByCategory(category) {
    console.log(`Filtrando por categoría: ${category}`);
}

// ===== FUNCIONES DE INTERACCIÓN =====

function handleHeroButtonClick(e) {
    const buttonText = e.target.textContent;
    
    if (buttonText.includes('Comenzar')) {
        showRegistrationModal();
    } else if (buttonText.includes('Explorar')) {
        document.querySelector('#oportunidades').scrollIntoView({
            behavior: 'smooth'
        });
    }
    
    // Animación de click
    animateButtonClick(e.target);
}

function handleCTAButtonClick(e) {
    const buttonText = e.target.textContent;
    
    if (buttonText.includes('Registrarse')) {
        showRegistrationModal();
    } else if (buttonText.includes('Asesor')) {
        showContactModal();
    }
    
    animateButtonClick(e.target);
}

function handleApplyClick(e) {
    const opportunityCard = e.target.closest('.opportunity-card');
    const jobTitle = opportunityCard.querySelector('h3').textContent;
    
    if (currentUser) {
        showNotification(`¡Aplicación enviada para: ${jobTitle}!`, 'success');
        e.target.textContent = 'Aplicado ✓';
        e.target.disabled = true;
        e.target.style.background = '#28a745';
    } else {
        showNotification('Debes iniciar sesión para aplicar', 'warning');
        showRegistrationModal();
    }
}

function handleToolClick(e) {
    const toolCard = e.target.closest('.tool-card');
    const toolTitle = toolCard.querySelector('h3').textContent;
    
    switch(toolTitle) {
        case 'Creador de CV':
            showCVBuilder();
            break;
        case 'Simulador de Entrevistas':
            showInterviewSimulator();
            break;
        case 'Test de Habilidades':
            showSkillsTest();
            break;
        case 'Guías Prácticas':
            showGuidesLibrary();
            break;
        default:
            showNotification(`Abriendo: ${toolTitle}`, 'info');
    }
}

function handleContestClick(e) {
    const contestCard = e.target.closest('.contest-card');
    const contestTitle = contestCard.querySelector('h3').textContent;
    
    showNotification(`Redirigiendo a: ${contestTitle}`, 'info');
    
    // Simular redirección
    setTimeout(() => {
        showNotification('Funcionalidad en desarrollo', 'info');
    }, 1000);
}

function handleLogin() {
    if (currentUser) {
        // Logout
        currentUser = null;
        updateLoginButton();
        showNotification('Sesión cerrada', 'info');
    } else {
        // Login
        showLoginModal();
    }
}

// ===== FUNCIONES DE MODALES =====

function showRegistrationModal() {
    const modal = createModal('Registro', `
        <form id="registrationForm">
            <div class="form-group">
                <label>Nombre completo:</label>
                <input type="text" id="fullName" required>
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input type="email" id="email" required>
            </div>
            <div class="form-group">
                <label>Edad:</label>
                <input type="number" id="age" min="17" max="25" required>
            </div>
            <div class="form-group">
                <label>Área de interés:</label>
                <select id="interest" required>
                    <option value="">Seleccionar...</option>
                    <option value="Tecnología">Tecnología</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Diseño">Diseño</option>
                    <option value="Negocios">Negocios</option>
                </select>
            </div>
            <div class="form-buttons">
                <button type="submit" class="btn-primary">Registrarse</button>
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
            </div>
        </form>
    `);
    
    document.getElementById('registrationForm').addEventListener('submit', handleRegistration);
}

function showLoginModal() {
    const modal = createModal('Iniciar Sesión', `
        <form id="loginForm">
            <div class="form-group">
                <label>Email:</label>
                <input type="email" id="loginEmail" required>
            </div>
            <div class="form-group">
                <label>Contraseña:</label>
                <input type="password" id="loginPassword" required>
            </div>
            <div class="form-buttons">
                <button type="submit" class="btn-primary">Iniciar Sesión</button>
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
            </div>
        </form>
    `);
    
    document.getElementById('loginForm').addEventListener('submit', handleLoginSubmit);
}

function showContactModal() {
    const modal = createModal('Contactar Asesor', `
        <form id="contactForm">
            <div class="form-group">
                <label>Nombre:</label>
                <input type="text" id="contactName" required>
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input type="email" id="contactEmail" required>
            </div>
            <div class="form-group">
                <label>Mensaje:</label>
                <textarea id="contactMessage" rows="4" required></textarea>
            </div>
            <div class="form-buttons">
                <button type="submit" class="btn-primary">Enviar</button>
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
            </div>
        </form>
    `);
    
    document.getElementById('contactForm').addEventListener('submit', handleContactSubmit);
}

function createModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animación de entrada
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
    
    return modal;
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// ===== FUNCIONES DE HERRAMIENTAS =====

function showCVBuilder() {
    const modal = createModal('Creador de CV', `
        <div class="cv-builder">
            <h4>Selecciona una plantilla:</h4>
            <div class="cv-templates">
                <div class="cv-template" onclick="selectTemplate('modern')">
                    <div class="template-preview modern"></div>
                    <p>Moderno</p>
                </div>
                <div class="cv-template" onclick="selectTemplate('classic')">
                    <div class="template-preview classic"></div>
                    <p>Clásico</p>
                </div>
                <div class="cv-template" onclick="selectTemplate('creative')">
                    <div class="template-preview creative"></div>
                    <p>Creativo</p>
                </div>
            </div>
        </div>
    `);
}

function showInterviewSimulator() {
    const questions = [
        "Cuéntame sobre ti",
        "¿Por qué quieres trabajar aquí?",
        "¿Cuáles son tus fortalezas?",
        "¿Dónde te ves en 5 años?",
        "¿Por qué deberíamos contratarte?"
    ];
    
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    
    const modal = createModal('Simulador de Entrevistas', `
        <div class="interview-simulator">
            <h4>Pregunta de práctica:</h4>
            <div class="question-card">
                <p>"${randomQuestion}"</p>
            </div>
            <textarea placeholder="Escribe tu respuesta aquí..." rows="5"></textarea>
            <div class="simulator-buttons">
                <button class="btn-primary" onclick="nextQuestion()">Siguiente Pregunta</button>
                <button class="btn-secondary" onclick="getTips()">Obtener Tips</button>
            </div>
        </div>
    `);
}

function showSkillsTest() {
    const modal = createModal('Test de Habilidades', `
        <div class="skills-test">
            <h4>Evalúa tus habilidades:</h4>
            <div class="skill-categories">
                <button class="skill-btn" onclick="startTest('technical')">Habilidades Técnicas</button>
                <button class="skill-btn" onclick="startTest('soft')">Habilidades Blandas</button>
                <button class="skill-btn" onclick="startTest('language')">Idiomas</button>
                <button class="skill-btn" onclick="startTest('leadership')">Liderazgo</button>
            </div>
        </div>
    `);
}

function showGuidesLibrary() {
    const modal = createModal('Guías Prácticas', `
        <div class="guides-library">
            <h4>Biblioteca de Guías:</h4>
            <div class="guides-list">
                <div class="guide-item">
                    <h5>📝 Cómo escribir un CV sin experiencia</h5>
                    <p>Consejos para destacar tus habilidades y logros académicos</p>
                </div>
                <div class="guide-item">
                    <h5>🎯 Preparación para entrevistas</h5>
                    <p>Todo lo que necesitas saber para tu primera entrevista</p>
                </div>
                <div class="guide-item">
                    <h5>🌐 Networking para jóvenes</h5>
                    <p>Cómo construir una red profesional desde cero</p>
                </div>
                <div class="guide-item">
                    <h5>💼 Primeros pasos en LinkedIn</h5>
                    <p>Optimiza tu perfil profesional en redes sociales</p>
                </div>
            </div>
        </div>
    `);
}

// ===== FUNCIONES DE DATOS =====

function handleRegistration(e) {
    e.preventDefault();
    
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        age: document.getElementById('age').value,
        interest: document.getElementById('interest').value
    };
    
    // Simular registro
    const newUser = {
        id: Date.now(),
        ...formData,
        registrationDate: new Date().toISOString()
    };
    
    users.push(newUser);
    currentUser = newUser;
    
    saveUserData();
    updateUI();
    closeModal();
    
    showNotification(`¡Bienvenido/a ${formData.fullName}!`, 'success');
}

function handleLoginSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simular autenticación
    const user = users.find(u => u.email === email);
    
    if (user) {
        currentUser = user;
        updateUI();
        closeModal();
        showNotification(`¡Bienvenido/a de vuelta ${user.fullName}!`, 'success');
    } else {
        showNotification('Usuario no encontrado', 'error');
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        message: document.getElementById('contactMessage').value
    };
    
    // Simular envío
    console.log('Mensaje enviado:', formData);
    closeModal();
    showNotification('Mensaje enviado. Te contactaremos pronto.', 'success');
}

function loadUserData() {
    const userData = localStorage.getItem('primerosPasosUsers');
    const currentUserData = localStorage.getItem('primerosPasosCurrentUser');
    
    if (userData) {
        users = JSON.parse(userData);
    }
    
    if (currentUserData) {
        currentUser = JSON.parse(currentUserData);
    }
}

function saveUserData() {
    localStorage.setItem('primerosPasosUsers', JSON.stringify(users));
    localStorage.setItem('primerosPasosCurrentUser', JSON.stringify(currentUser));
}

function loadSampleData() {
    courses = sampleCourses;
    opportunities = sampleOpportunities;
}

// ===== FUNCIONES DE UI =====

function updateUI() {
    updateLoginButton();
    updateUserProfile();
}

function updateLoginButton() {
    const loginBtn = document.querySelector('.btn-login');
    if (loginBtn) {
        if (currentUser) {
            loginBtn.textContent = 'Mi Perfil';
            loginBtn.style.background = 'var(--gradient-secondary)';
        } else {
            loginBtn.textContent = 'Iniciar Sesión';
            loginBtn.style.background = 'var(--gradient-primary)';
        }
    }
}

function updateUserProfile() {
    // Actualizar información del usuario en la interfaz
    if (currentUser) {
        console.log('Usuario logueado:', currentUser.fullName);
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function animateButtonClick(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

// ===== FUNCIONES DE ANIMACIÓN =====

function setupAnimations() {
    // Animaciones de entrada para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos animables
    document.querySelectorAll('.category-card, .opportunity-card, .tool-card, .community-card').forEach(el => {
        observer.observe(el);
    });
}

function setupScrollEffects() {
    // Efecto parallax suave en el hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Cambiar opacidad del header
        const header = document.querySelector('.header');
        if (header) {
            const opacity = Math.min(scrolled / 100, 0.95);
            header.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
        }
    });
}

// ===== FUNCIONES AUXILIARES =====

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Funciones adicionales para herramientas
function selectTemplate(templateType) {
    showNotification(`Plantilla ${templateType} seleccionada`, 'success');
    closeModal();
}

function nextQuestion() {
    showNotification('Cargando siguiente pregunta...', 'info');
    // Aquí se cargaría la siguiente pregunta
}

function getTips() {
    showNotification('Consejos: Sé específico, usa ejemplos concretos y mantén una actitud positiva', 'info');
}

function startTest(category) {
    showNotification(`Iniciando test de ${category}...`, 'info');
    closeModal();
}

// ===== ESTILOS ADICIONALES PARA JAVASCRIPT =====
const additionalStyles = `
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .modal-content {
        background: white;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    }
    
    .modal-header {
        padding: 1.5rem;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #999;
    }
    
    .modal-body {
        padding: 1.5rem;
    }
    
    .form-group {
        margin-bottom: 1rem;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #333;
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 0.8rem;
        border: 2px solid #e9ecef;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--primary-blue);
    }
    
    .form-buttons {
        display: flex;
        gap: 1rem;
        margin-top: 1.5rem;
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .notification.success {
        background: #28a745;
    }
    
    .notification.error {
        background: #dc3545;
    }
    
    .notification.warning {
        background: #ffc107;
        color: #212529;
    }
    
    .notification.info {
        background: var(--primary-blue);
    }
    
    .notification button {
        background: none;
        border: none;
        color: inherit;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin: 0;
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inyectar