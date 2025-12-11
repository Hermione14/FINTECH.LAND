gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll(".split").forEach((el) => {
  const words = el.innerText.split(" ");
  el.innerHTML = words.map((w) => `<span class="word">${w}</span>`).join(" ");

  gsap.from(el.querySelectorAll(".word"), {
    scrollTrigger: {
      trigger: el,
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 20,
    stagger: 0.05,
    duration: 0.4,
    ease: "power3.out",
  });
});
