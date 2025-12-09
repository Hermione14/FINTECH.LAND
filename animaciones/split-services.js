gsap.registerPlugin(SplitText, ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".split");

  elements.forEach((el) => {
    // Split per lines
    const split = new SplitText(el, {
      type: "lines",
      linesClass: "line-mask",
    });

    gsap.from(split.lines, {
      yPercent: 100,
      opacity: 0,
      duration: 0.7,
      ease: "expo.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: el,
        start: "top 85%", // cuando 85% del viewport llega al texto
        toggleActions: "play none none reverse",
      },
    });
  });
});
