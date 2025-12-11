const words = [
  "confianza",
  "rapidez",
  "seguridad",
  "innovación",
  "escalabilidad",
  "experiencia",
];
const colors = [
  "#f43f5e", // rosa intenso
  "#3b82f6", // azul
  "#10b981", // verde
  "#8b5cf6", // morado
  "#f59e0b", // amarillo
  "#ec4899", // rosa claro
];

const el = document.querySelector(".rotating-word");
let i = 0;

function animateWord() {
  const next = words[i % words.length];
  el.textContent = next;
  el.style.color = colors[i % colors.length];

  // Timeline elegante
  const tl = gsap.timeline();

  tl.fromTo(
    el,
    {
      y: "100%",
      opacity: 0,
      filter: "blur(6px)",
    },
    {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.6,
      ease: "power3.out",
    }
  ).to(el, {
    y: "-100%",
    opacity: 0,
    filter: "blur(6px)",
    duration: 0.6,
    ease: "power3.in",
    delay: 1.4, // tiempo visible
    onComplete: () => {
      i++;
      animateWord();
    },
  });
}

animateWord();
