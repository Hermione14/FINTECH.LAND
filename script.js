const casesData = {
  finsus: {
    client: "FINSUS",
    bg: "bg-blue-900",
    project: "Transformación a Banco Digital",
    challenge:
      "Migrar una operación financiera tradicional a un modelo 'Branchless' capaz de soportar alta concurrencia.",
    tech: ["React Native", "Node.js", "AWS Lambda"],
    kpis: [
      { label: "Usuarios Activos", value: "+200k" },
      { label: "Tiempo de Alta", value: "< 7 min" },
    ],
  },
  montepio: {
    client: "MONTEPÍO",
    bg: "bg-slate-900",
    project: "Digitalización de Activos",
    challenge:
      "Algoritmos de visión por computadora para valuar prendas y autos remotamente.",
    tech: ["Python", "TensorFlow", "React"],
    kpis: [
      { label: "Precisión", value: "94.5%" },
      { label: "Productos", value: "+150 tipos" },
    ],
  },
  crediquincena: {
    client: "CREDIQUINCENA",
    bg: "bg-emerald-900",
    project: "App de Prospección y Originación de Crédito",
    challenge:
      "Crear una herramienta móvil para fuerza de ventas que verifique identidad, elimine papel y produzca expedientes digitales en campo.",
    tech: [
      "Validación INE / RENAPO",
      "FaceMatch (Biometría)",
      "Automatización Documental",
      "Integración Core Financiero",
    ],
    kpis: [
      { label: "Expedientes Digitales", value: "+6,000 en 1.5 años" },
      { label: "Eficiencia Operativa", value: "Reducción de tiempos y costos" },
      { label: "Seguridad", value: "Validación biométrica avanzada" },
    ],
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");

      const isHidden = mobileMenu.classList.contains("hidden");
      if (!isHidden) {
        menuBtn.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
      } else {
        menuBtn.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");

        menuBtn.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
      });
    });
  }

  const modal = document.getElementById("case-modal");
  const triggers = document.querySelectorAll(".case-trigger");
  const closeBtn = document.getElementById("close-modal");
  const closeTextBtn = document.getElementById("close-modal-text");

  const mSidebar = document.getElementById("modal-sidebar");
  const mClient = document.getElementById("modal-client");
  const mTech = document.getElementById("modal-tech");
  const mProject = document.getElementById("modal-project");
  const mChallenge = document.getElementById("modal-challenge");
  const mKpis = document.getElementById("modal-kpis");

  if (modal && triggers.length > 0) {
    triggers.forEach((trigger) => {
      trigger.addEventListener("click", function () {
        const caseId = this.getAttribute("data-id");
        const data = casesData[caseId];

        if (data) {
          mClient.textContent = data.client;
          mProject.textContent = data.project;
          mChallenge.textContent = data.challenge;

          if (mSidebar) mSidebar.className = `modal-sidebar-content ${data.bg}`;

          // Rellenar Tech Tags
          if (mTech) {
            mTech.innerHTML = data.tech
              .map((t) => `<div class="tech-tag">${t}</div>`)
              .join("");
          }

          if (mKpis) {
            mKpis.innerHTML = data.kpis
              .map(
                (kpi) => `
                            <div>
                                <div class="kpi-value">${kpi.value}</div>
                                <div class="kpi-label">${kpi.label}</div>
                            </div>
                        `
              )
              .join("");
          }

          // Mostrar modal
          modal.classList.remove("hidden");
          document.body.style.overflow = "hidden"; // Evitar scroll de fondo
        }
      });
    });

    function closeModal() {
      modal.classList.add("hidden");
      document.body.style.overflow = "";
    }

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (closeTextBtn) closeTextBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  const canvas = document.getElementById("network-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let w,
      h,
      particles = [];

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
        ctx.fillStyle = "rgba(59, 130, 246, 0.5)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 45; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p, i) => {
        p.update();
        p.draw();
        // Dibujar líneas
        for (let j = i; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 - dist / 1000})`;
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

    window.addEventListener("resize", resize);
    resize();
    init();
    animate();
  }

  const contactForm = document.getElementById("contact-form");
  const emailInput = document.getElementById("business-email");
  const emailError = document.getElementById("email-error");

  const blockedDomains = [
    "gmail.com",
    "hotmail.com",
    "outlook.com",
    "yahoo.com",
    "live.com",
    "icloud.com",
  ];

  if (contactForm && emailInput) {
    emailInput.addEventListener("input", function () {
      const email = this.value.toLowerCase();
      let isBlocked = false;

      blockedDomains.forEach((domain) => {
        if (email.includes("@" + domain)) {
          isBlocked = true;
        }
      });

      if (isBlocked) {
        if (emailError) emailError.classList.remove("hidden");
        emailInput.classList.add("input-error");
      } else {
        if (emailError) emailError.classList.add("hidden");
        emailInput.classList.remove("input-error");
      }
    });

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = emailInput.value.toLowerCase();
      const isBlocked = blockedDomains.some((domain) =>
        email.includes("@" + domain)
      );

      if (isBlocked) {
        emailInput.classList.add("shake-animation");
        setTimeout(() => emailInput.classList.remove("shake-animation"), 500);
        alert("Por favor utilice un correo corporativo para continuar.");
      } else {
        alert(
          "Solicitud enviada correctamente. Un asesor le contactará pronto."
        );
        contactForm.reset();
      }
    });
  }
});
