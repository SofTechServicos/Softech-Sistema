document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica do Menu Hamburger ---
    const hamburger = document.getElementById('hamburger-menu');
    const mainNav = document.getElementById('main-nav');

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            document.body.classList.toggle('no-scroll');
        });
    }

    // --- Lógica do Header que encolhe com o scroll ---
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Lógica de Animação de Fade-in para Seções ---
    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Lógica do Botão "Voltar ao Topo" ---
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // --- Atualiza o ano no rodapé ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Popula a seção de principais serviços na Home ---
    const servicesContainer = document.querySelector('#servicos .services');
    if (servicesContainer && typeof servicos !== 'undefined') {
        // Pega os 4 primeiros serviços como destaque
        const servicosDestaque = servicos.slice(0, 4); 
        
        const iconMap = {
            "Serviços Essenciais e de Escritório": "fas fa-file-alt",
            "Manutenção e Suporte Técnico": "fas fa-tools",
            "Serviços Gráficos e de Papelaria": "fas fa-print",
            "Soluções para Negócios e Presença Online": "fas fa-globe",
            "Consultoria e Treinamento": "fas fa-chalkboard-teacher"
        };

        servicosDestaque.forEach(servico => {
            const card = document.createElement('div');
            card.className = 'service-card';
            
            const iconClass = iconMap[servico.categoria] || "fas fa-star";

            card.innerHTML = `
                <i class="${iconClass} service-icon"></i>
                <h3>${servico.nome}</h3>
                <p>${servico.descricao}</p>
            `;
            servicesContainer.appendChild(card);
        });
    }
});