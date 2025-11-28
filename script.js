// script.js

// --- DATOS DE LOS CASOS DE ESTUDIO ---
const casesData = {
    finsus: {
        client: "FINSUS",
        bg: "bg-blue-900",
        project: "Transformación a Banco Digital",
        challenge: "Migrar una operación financiera tradicional a un modelo 'Branchless' capaz de soportar alta concurrencia.",
        tech: ["React Native", "Node.js", "AWS Lambda"],
        kpis: [
            { label: "Usuarios Activos", value: "+200k" },
            { label: "Tiempo de Alta", value: "< 7 min" }
        ]
    },
    montepio: {
        client: "MONTEPÍO",
        bg: "bg-slate-900",
        project: "Digitalización de Activos",
        challenge: "Algoritmos de visión por computadora para valuar prendas y autos remotamente.",
        tech: ["Python", "TensorFlow", "React"],
        kpis: [
            { label: "Precisión", value: "94.5%" },
            { label: "Productos", value: "+150 tipos" }
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LÓGICA DEL MENÚ MÓVIL ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // --- 2. LÓGICA DEL MODAL ---
    const modal = document.getElementById('case-modal');
    const triggers = document.querySelectorAll('.case-trigger');
    const closeBtn = document.getElementById('close-modal');
    const closeTextBtn = document.getElementById('close-modal-text');

    // Elementos internos del modal para rellenar
    const mSidebar = document.getElementById('modal-sidebar');
    const mClient = document.getElementById('modal-client');
    const mTech = document.getElementById('modal-tech');
    const mProject = document.getElementById('modal-project');
    const mChallenge = document.getElementById('modal-challenge');
    const mKpis = document.getElementById('modal-kpis');

    // Abrir Modal
    triggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const caseId = this.getAttribute('data-id');
            const data = casesData[caseId];

            if(data) {
                // Rellenar datos
                mClient.textContent = data.client;
                mProject.textContent = data.project;
                mChallenge.textContent = data.challenge;
                
                // Limpiar y aplicar clases de color al sidebar
                mSidebar.className = `md:w-1/3 p-8 text-white flex flex-col justify-end ${data.bg}`;

                // Rellenar Tech Tags
                mTech.innerHTML = data.tech.map(t => 
                    `<div class="text-xs font-mono bg-white/10 px-2 py-1 w-max backdrop-blur">${t}</div>`
                ).join('');

                // Rellenar KPIs
                mKpis.innerHTML = data.kpis.map(kpi => `
                    <div>
                        <div class="text-2xl font-bold font-display text-slate-900">${kpi.value}</div>
                        <div class="text-xs text-slate-500 uppercase font-medium">${kpi.label}</div>
                    </div>
                `).join('');

                // Mostrar modal
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
            }
        });
    });

    // Cerrar Modal
    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);
    closeTextBtn.addEventListener('click', closeModal);
    
    // Cerrar al hacer click fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // --- 3. ANIMACIÓN CANVAS (FONDO DE RED) ---
    const canvas = document.getElementById('network-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let w, h, particles = [];

        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };
        
        class Particle {
            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > w) this.vx *= -1;
                if (this.y < 0 || this.y > h) this.vy *= -1;
            }
            draw() {
                ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for(let i=0; i<45; i++) particles.push(new Particle());
        };

        const animate = () => {
            ctx.clearRect(0, 0, w, h);
            particles.forEach((p, i) => {
                p.update();
                p.draw();
                // Dibujar líneas
                for(let j=i; j<particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    if(dist < 150) {
                        ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 - dist/1000})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        init();
        animate();
    }
    // --- 4. VALIDACIÓN DE FORMULARIO (B2B) ---
    const contactForm = document.getElementById('contact-form');
    const emailInput = document.getElementById('business-email');
    const emailError = document.getElementById('email-error');
    
    // Lista de dominios gratuitos a bloquear
    const blockedDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'live.com', 'icloud.com'];

    if (contactForm) {
        // Validar en tiempo real (al escribir)
        emailInput.addEventListener('input', function() {
            const email = this.value.toLowerCase();
            let isBlocked = false;

            // Revisar si el correo contiene alguno de los dominios bloqueados
            blockedDomains.forEach(domain => {
                if (email.includes('@' + domain)) {
                    isBlocked = true;
                }
            });

            if (isBlocked) {
                // Mostrar error y pintar borde rojo
                emailError.classList.remove('hidden');
                emailInput.classList.add('border-red-500', 'text-red-600');
                emailInput.classList.remove('border-slate-200', 'focus:border-blue-600');
            } else {
                // Ocultar error y restaurar estilos
                emailError.classList.add('hidden');
                emailInput.classList.remove('border-red-500', 'text-red-600');
                emailInput.classList.add('border-slate-200', 'focus:border-blue-600');
            }
        });

        // Validar al enviar el formulario
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evitar envío real por ahora

            const email = emailInput.value.toLowerCase();
            const isBlocked = blockedDomains.some(domain => email.includes('@' + domain));

            if (isBlocked) {
                // Efecto de "sacudida" si intentan enviar con error
                emailInput.classList.add('animate-[pulse_0.2s_ease-in-out_2]');
                setTimeout(() => emailInput.classList.remove('animate-[pulse_0.2s_ease-in-out_2]'), 500);
                alert("Por favor utilice un correo corporativo para continuar.");
            } else {
                // Aquí iría la lógica de envío real (backend)
                alert("Solicitud enviada correctamente. Un asesor le contactará pronto.");
                contactForm.reset();
            }
        });
    }
});