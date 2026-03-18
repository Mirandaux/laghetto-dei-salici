document.addEventListener('DOMContentLoaded', () => {

    lucide.createIcons();


    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });


    const mobileBtn = document.getElementById('mobile-menu-btn');
    mobileBtn.addEventListener('click', () => {

        const contactSection = document.getElementById('contatti');
        window.scrollTo({
            top: contactSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });


    const menuContainer = document.getElementById('menu-container');
    const tabs = document.querySelectorAll('.menu-tab');
    

    const fallbackMenu = {
        "antipasti": [
            { "name": "Lardo e Polenta", "desc": "Lardo aromatizzato con miele e polenta calda di Storo", "price": "10" },
            { "name": "Soppressa Veneta", "desc": "Accompagnata da verdure in agrodolce fatte in casa", "price": "12" },
            { "name": "Baccalà Mantecato", "desc": "Su crostoni di polenta grigliata", "price": "14" }
        ],
        "primi": [
            { "name": "Risotto all'Isolana", "desc": "Specialità con vitello, maiale, cannella e rosmarino", "price": "14" },
            { "name": "Risotto al Tastasal", "desc": "Tradizione veronese con macinato di maiale speziato", "price": "13" },
            { "name": "Tortellini di Valeggio", "desc": "I celebri 'Nodini d'Amore' fatti a mano", "price": "15" }
        ],
        "secondi": [
            { "name": "Pastissada de Caval", "desc": "Stufato di cavallo tipico con polenta gialla", "price": "18" },
            { "name": "Bollito Misto", "desc": "Servito con salsa Pearà artigianale", "price": "20" },
            { "name": "Luccio in Salsa", "desc": "Luccio del Garda con polenta morbida", "price": "17" }
        ],
        "dolci": [
            { "name": "Torta Russa di Verona", "desc": "Dolce tipico con mandorle e amaretti", "price": "7" },
            { "name": "Risini Caldi", "desc": "Cestini di frolla con riso e crema pasticcera", "price": "6" },
            { "name": "Sfogliatine di Villafranca", "desc": "Croccanti e leggere, servite con crema", "price": "6" }
        ],
        "vini": [
            { "name": "Amarone Classico", "desc": "DOCG della Valpolicella - Rosso intenso", "price": "45" },
            { "name": "Lugana DOC", "desc": "Bianco fresco e sapido del Lago di Garda", "price": "24" },
            { "name": "Valpolicella Ripasso", "desc": "Struttura ed eleganza veronese", "price": "28" }
        ]
    };

    async function loadMenu(category) {
        menuContainer.classList.add('opacity-0');
        
        setTimeout(() => {
            const items = fallbackMenu[category] || [];
            menuContainer.innerHTML = '';
            
            items.forEach((item, index) => {
                const itemEl = document.createElement('div');
                itemEl.className = 'flex justify-between items-start border-b border-sage-100 pb-6 menu-item-entry';
                itemEl.style.animationDelay = `${index * 0.08}s`;
                itemEl.innerHTML = `
                    <div class="max-w-[80%]">
                        <h4 class="text-xl font-serif text-sage-900">${item.name}</h4>
                        <p class="text-sm text-charcoal/60 mt-1 italic">${item.desc}</p>
                    </div>
                    <span class="font-serif text-lg text-terracotta">€${item.price}</span>
                `;
                menuContainer.appendChild(itemEl);
            });
            
            menuContainer.classList.remove('opacity-0');
            menuContainer.classList.add('opacity-100');
        }, 300);
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            loadMenu(tab.dataset.category);
        });
    });

    loadMenu('antipasti');


    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-scroll-reveal]').forEach(el => observer.observe(el));


    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.getElementById('close-lightbox');
    
    document.querySelectorAll('.gallery-img').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.remove('hidden');
            setTimeout(() => {
                lightbox.classList.remove('opacity-0');
                lightbox.classList.add('opacity-100');
            }, 10);
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.classList.add('opacity-0');
        setTimeout(() => {
            lightbox.classList.add('hidden');
        }, 300);
    });


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
