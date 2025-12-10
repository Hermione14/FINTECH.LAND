gsap.registerPlugin(ScrollTrigger);

// Z-index invertido
gsap.set(".block", {
  zIndex: (i, target, targets) => targets.length - i,
});

// Bloques que colapsan
gsap.utils.toArray(".block:not(:last-of-type)").forEach((block, i) => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".cases-animated",
        start: () => "top -" + window.innerHeight * (i + 0.5),
        end: () => "+=" + window.innerHeight,
        scrub: true,
        invalidateOnRefresh: true,
      },
    })
    .to(block, { height: 0 });
});

// Text panels animation
gsap.utils.toArray(".panel-text").forEach((panel, i) => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".cases-animated",
        start: () => "top -" + window.innerHeight * i,
        end: () => "+=" + window.innerHeight,
        scrub: true,
        invalidateOnRefresh: true,
      },
    })
    .to(panel, { opacity: 1, y: "5%", duration: 0.3 })
    .to(panel, { opacity: 0, y: "0%", duration: 0.3 }, 0.6);
});

// Pinned section
ScrollTrigger.create({
  trigger: ".cases-animated",
  pin: true,
  scrub: true,
  start: "top top",
  end: () => "+=" + window.innerHeight * 3,
});
