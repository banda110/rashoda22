gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, Draggable);

let ANIM_STATE = { ready: true, hasSplit: typeof SplitType !== "undefined" };

function speedify(dur) {
  const m = CONFIG.animation.multiplier || 1;
  const s = CONFIG.animation.speed === "slow" ? 1.5 : CONFIG.animation.speed === "fast" ? 0.5 : 1;
  return dur * s * m;
}

/* ------------------------------------------------------------
   Section-aware, idempotent animation init.
   - Animations only run for ENABLED sections.
   - Each section initializes ONCE (no duplicated tweens).
   - window.reinitSection(key) re-runs one section (used when an
     owner toggles a section on/off from the page).
   ------------------------------------------------------------ */
const SECTION_INIT = {
  hero: heroAnimations,
  floatingMemories: floatingAnimations,
  marquee: marqueeAnimations,
  stackCards: stackAnimations,
  timeline: timelineAnimations,
  memoryExplosion: explosionAnimations,
  flipCards: flipAnimations,
  loveQuotes: quotesAnimations,
  statistics: statisticsAnimations,
  orbitGallery: orbitAnimations,
  horizontalStory: horizontalAnimations,
  parallaxLayers: parallaxAnimations,
  photoWall: wallAnimations,
  cinematicReveal: cinematicAnimations,
  beforeAfter: initBeforeAfter,
  floatingPolaroids: polaroidAnimations,
  carousel: carouselAnimations,
  spotlight: spotlightAnimations,
  bentoGrid: bentoAnimations,
  splitStory: splitAnimations,
  stickyChapters: chapterAnimations,
  verticalMarquee: vmarqueeAnimations,
  loveNotes: notesAnimations,
  heartbeat: heartbeatAnimations,
  finalEnding: endingAnimations,
};

const INIT_SET = new Set();

function sectionEnabled(key) {
  const s = CONFIG.sections[key];
  return !s || s.enabled !== false;
}

function initSection(key) {
  const fn = SECTION_INIT[key];
  if (!fn) return;
  if (INIT_SET.has(key)) return;
  if (!sectionEnabled(key)) return;
  INIT_SET.add(key);
  try {
    fn();
  } catch (e) {
    console.warn("[anim] section failed:", key, e);
  }
}

function initAllAnimations() {
  Object.keys(SECTION_INIT).forEach(initSection);
}

window.reinitSection = function (key) {
  INIT_SET.delete(key);
  initSection(key);
};

/* ==================== HERO ==================== */
function heroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  if (typeof SplitType !== "undefined") {
    const heroTitle = document.getElementById("heroTitle");
    if (heroTitle) {
      const split = new SplitType(heroTitle, { types: "lines,words,chars" });
      tl.from(split.chars, {
        opacity: 0, y: 80, rotationX: -90,
        stagger: 0.02, duration: speedify(1.2)
      });
    }
    tl.from(".hero-tag", { opacity: 0, y: 60, duration: speedify(0.8) }, "-=0.4");
    tl.from(".hero-desc", { opacity: 0, y: 50, duration: speedify(0.8) }, "-=0.6");
  } else {
    tl.from(".hero-tag", { opacity: 0, y: 60, duration: speedify(1) })
      .from("#heroTitle", { opacity: 0, y: 100, duration: speedify(1.3) }, "-=0.6")
      .from(".hero-desc", { opacity: 0, y: 50, duration: speedify(1) }, "-=0.8");
  }

  tl.from(".hero-btn", { opacity: 0, scale: 0.8, duration: speedify(0.8) }, "-=0.6")
    .from(".scroll-indicator", { opacity: 0, y: 20, duration: speedify(0.8) }, "-=0.4");

  gsap.to(".hero-bg", {
    scale: 1, duration: speedify(10), ease: "none",
    scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 2 }
  });

  gsap.to(".hero-content", {
    y: 120, scale: 0.9, opacity: 0.5,
    scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 1.5 }
  });

  if (typeof MotionPathPlugin !== "undefined" && document.querySelector(".f1")) {
    gsap.to(".f1", {
      motionPath: {
        path: [
          { x: 100, y: -50 },
          { x: -50, y: -100 },
          { x: -100, y: 50 },
          { x: 50, y: 100 },
          { x: 0, y: 0 }
        ],
        curviness: 1.5
      },
      duration: speedify(12), repeat: -1, ease: "none"
    });
  }
}

/* ==================== FLOATING MEMORIES ==================== */
function floatingAnimations() {
  const cards = gsap.utils.toArray(".memory-card");
  cards.forEach((card, i) => {
    const x = Math.random() * 70;
    const y = Math.random() * 70;
    const r = (Math.random() - 0.5) * 20;
    gsap.set(card, { left: x + "%", top: y + "%", rotation: r });

    gsap.to(card, {
      y: "+=40", rotation: r + (Math.random() - 0.5) * 10,
      duration: speedify(4 + Math.random() * 4), repeat: -1, yoyo: true,
      ease: "sine.inOut", delay: Math.random() * 2
    });

    gsap.from(card, {
      scale: 0, opacity: 0, duration: speedify(1),
      scrollTrigger: {
        trigger: "#floating-memories", start: "top 85%",
        once: true
      }
    });
  });
}

/* ==================== MARQUEE ==================== */
function marqueeAnimations() {
  const tracks = ["#marqueeTrack1", "#marqueeTrack2", "#marqueeTrack3"];
  const dirs = [-1, -1, -1];
  const durs = [30, 35, 40];

  tracks.forEach((sel, i) => {
    const track = document.querySelector(sel);
    if (!track) return;
    const halfW = track.scrollWidth / 2;

    gsap.fromTo(track,
      { x: 0 },
      {
        x: dirs[i] * halfW,
        duration: speedify(durs[i]),
        ease: "none", repeat: -1
      }
    );
  });
}

/* ==================== STACK CARDS ==================== */
function stackAnimations() {
  const cards = gsap.utils.toArray(".stack-card");
  cards.forEach((card, i) => {
    gsap.from(card, {
      scale: 0.85, opacity: 0.5, y: 100,
      duration: speedify(1.2),
      scrollTrigger: {
        trigger: card, start: "top 85%",
        end: "top 20%", scrub: 1.5
      }
    });
  });
}

/* ==================== TIMELINE ==================== */
function timelineAnimations() {
  gsap.to("#timelineProgress", {
    height: "100%", ease: "none",
    scrollTrigger: {
      trigger: "#timeline", start: "top center",
      end: "bottom center", scrub: 1.5
    }
  });

  const items = gsap.utils.toArray(".timeline-item");
  items.forEach((item, i) => {
    const dir = i % 2 === 0 ? -80 : 80;
    gsap.from(item, {
      opacity: 0, x: dir, y: 60,
      duration: speedify(1.2),
      scrollTrigger: {
        trigger: item, start: "top 85%",
        end: "top 30%", once: true
      }
    });
  });
}

/* ==================== MEMORY EXPLOSION ==================== */
function explosionAnimations() {
  const cards = gsap.utils.toArray(".explosion-card");
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#memory-explosion", start: "top center",
      end: "bottom center", scrub: 1.5
    }
  });

  cards.forEach((card, i) => {
    const angle = (i / cards.length) * Math.PI * 2;
    const dist = 150 + Math.random() * 250;
    const x = Math.cos(angle) * dist;
    const y = Math.sin(angle) * dist;
    const r = (Math.random() - 0.5) * 60;
    const s = 0.5 + Math.random() * 0.8;

    tl.to(card, {
      x, y, rotation: r, scale: s,
      duration: speedify(1.5), ease: "power2.out"
    }, 0);
  });

  cards.forEach(card => {
    gsap.to(card, {
      y: "+=20",
      duration: speedify(3 + Math.random() * 3),
      repeat: -1, yoyo: true, ease: "sine.inOut"
    });
  });
}

/* ==================== FLIP CARDS ==================== */
function flipAnimations() {
  const cards = gsap.utils.toArray(".flip-card");

  cards.forEach((card, i) => {
    gsap.from(card, {
      opacity: 0, y: 80, rotationY: 90,
      duration: speedify(0.8),
      scrollTrigger: {
        trigger: card, start: "top 85%",
        once: true
      }
    });

    card.addEventListener("mouseenter", () => card.classList.add("flipped"));
    card.addEventListener("mouseleave", () => card.classList.remove("flipped"));

    card.addEventListener("touchstart", (e) => {
      e.preventDefault();
      card.classList.toggle("flipped");
    }, { passive: false });
  });
}

/* ==================== LOVE QUOTES ==================== */
function quotesAnimations() {
  const quotes = gsap.utils.toArray(".quote-card");
  let current = 0;

  function showQuote(index) {
    quotes.forEach((q, i) => {
      q.classList.toggle("active", i === index);
    });
  }

  gsap.to(".quotes-container", {
    scrollTrigger: {
      trigger: "#love-quotes", start: "top center",
      onEnter: () => {
        const interval = setInterval(() => {
          current = (current + 1) % quotes.length;
          showQuote(current);
        }, 3000);
        ScrollTrigger.create({
          trigger: "#love-quotes", start: "bottom bottom",
          onEnter: () => clearInterval(interval),
          once: true
        });
      }, once: true
    }
  });

  quotes.forEach((q, i) => {
    gsap.from(q, {
      opacity: 0, y: 60, duration: speedify(1),
      scrollTrigger: {
        trigger: "#love-quotes", start: "top 80%",
        once: true
      }
    });
  });
}

/* ==================== STATISTICS ==================== */
function statisticsAnimations() {
  const numbers = gsap.utils.toArray(".stat-number");

  numbers.forEach(num => {
    const target = num.dataset.target;
    if (target === "∞") {
      num.textContent = "∞";
      return;
    }

    ScrollTrigger.create({
      trigger: "#statistics", start: "top 75%",
      onEnter: () => {
        gsap.to(num, {
          innerText: parseInt(target),
          duration: speedify(2),
          ease: "power2.out",
          snap: { innerText: 1 },
          onUpdate: () => {
            const val = Math.round(parseFloat(num.textContent || "0"));
            num.textContent = val.toLocaleString();
          }
        });
      }, once: true
    });
  });

  gsap.from(".stat-card", {
    opacity: 0, y: 80, scale: 0.9, stagger: 0.15,
    duration: speedify(0.8),
    scrollTrigger: {
      trigger: "#statistics", start: "top 80%",
      once: true
    }
  });
}

/* ==================== ORBIT GALLERY ==================== */
function orbitAnimations() {
  const items = gsap.utils.toArray(".orbit-item");
  items.forEach((item, i) => {
    const angle = (i / items.length) * 360;
    const radius = 140 + Math.random() * 40;
    gsap.set(item, { rotation: 0 });

    gsap.to(item, {
      rotation: 360,
      duration: speedify(10 + Math.random() * 10),
      repeat: -1, ease: "none"
    });
  });

  gsap.from(".orbit-container", {
    scale: 0, opacity: 0, rotation: 180,
    duration: speedify(1.5),
    scrollTrigger: {
      trigger: "#orbit-gallery", start: "top 80%",
      once: true
    }
  });
}

/* ==================== HORIZONTAL STORY ==================== */
function horizontalAnimations() {
  const track = document.getElementById("horizontalTrack");
  if (!track) return;

  const distance = () => track.scrollWidth - window.innerWidth + 80;

  const trackTween = gsap.to(track, {
    x: () => -distance(),
    ease: "none",
    scrollTrigger: {
      trigger: "#horizontal-story",
      start: "top top",
      end: () => "+=" + distance(),
      pin: true,
      scrub: 1.5,
      invalidateOnRefresh: true,
      id: "horizontalStory"
    }
  });

  gsap.utils.toArray(".horizontal-panel").forEach((panel, i) => {
    gsap.from(panel, {
      opacity: 0, scale: 0.8, duration: speedify(0.6),
      scrollTrigger: {
        trigger: panel, start: "left 80%",
        containerAnimation: trackTween,
        once: true
      }
    });
  });
}

/* ==================== PARALLAX LAYERS ==================== */
function parallaxAnimations() {
  const layers = gsap.utils.toArray(".parallax-layer");
  layers.forEach((layer) => {
    const speed = parseFloat(layer.dataset.speed || "0.2");
    gsap.fromTo(layer,
      { y: -50 * speed },
      {
        y: 50 * speed, ease: "none",
        scrollTrigger: {
          trigger: "#parallax-layers",
          start: "top bottom", end: "bottom top",
          scrub: 1.5
        }
      }
    );
  });
}

/* ==================== PHOTO WALL ==================== */
function wallAnimations() {
  gsap.utils.toArray(".wall-item").forEach((item, i) => {
    gsap.from(item, {
      opacity: 0, scale: 0.6, y: 60,
      duration: speedify(0.6),
      scrollTrigger: {
        trigger: item, start: "top 90%",
        once: true
      },
      delay: i * 0.05
    });
  });
}

/* ==================== CINEMATIC REVEAL ==================== */
function cinematicAnimations() {
  const overlay = document.getElementById("revealOverlay");
  if (!overlay) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#cinematic-reveal",
      start: "top center",
      end: "center center",
      scrub: 1.5
    }
  });

  tl.to(overlay, {
    clipPath: "circle(70.7% at 50% 50%)",
    duration: speedify(1)
  });

  gsap.from(".reveal-text", {
    opacity: 0, y: 60, duration: speedify(1),
    scrollTrigger: {
      trigger: "#cinematic-reveal", start: "top 70%",
      once: true
    }
  });
}

/* ==================== BEFORE AFTER ==================== */
function initBeforeAfter() {
  gsap.from(".ba-container", {
    opacity: 0, y: 80, duration: speedify(1),
    scrollTrigger: {
      trigger: "#before-after", start: "top 80%",
      once: true
    }
  });
}

/* ==================== FLOATING POLAROIDS ==================== */
function polaroidAnimations() {
  const polaroids = gsap.utils.toArray(".polaroid");
  polaroids.forEach((p, i) => {
    gsap.to(p, {
      y: "+=20",
      rotation: () => parseFloat(p.style.getPropertyValue("--r")) + (Math.random() - 0.5) * 6,
      duration: speedify(3 + Math.random() * 4),
      repeat: -1, yoyo: true, ease: "sine.inOut",
      delay: i * 0.3
    });

    gsap.from(p, {
      opacity: 0, scale: 0, rotation: 45,
      duration: speedify(0.8),
      scrollTrigger: {
        trigger: "#floating-polaroids", start: "top 85%",
        once: true
      }
    });
  });
}

/* ==================== CAROUSEL ==================== */
function carouselAnimations() {
  const track = document.getElementById("carouselTrack");
  if (!track || typeof Draggable === "undefined") return;

  let maxX = 0;
  function updateMax() {
    maxX = -(track.scrollWidth - track.parentElement.clientWidth);
  }
  updateMax();
  window.addEventListener("resize", updateMax);

  Draggable.create(track, {
    type: "x",
    bounds: { minX: maxX - 40, maxX: 40 },
    edgeResistance: 0.2,
    inertia: true,
    onDrag: updateMax
  });

  gsap.from(".carousel-item", {
    opacity: 0, scale: 0.8, stagger: 0.1,
    duration: speedify(0.6),
    scrollTrigger: {
      trigger: "#carousel", start: "top 85%",
      once: true
    }
  });
}

/* ==================== SPOTLIGHT ==================== */
function spotlightAnimations() {
  gsap.utils.toArray(".spotlight-item").forEach((item, i) => {
    gsap.from(item, {
      opacity: 0, y: 60, scale: 0.9,
      duration: speedify(0.6),
      scrollTrigger: {
        trigger: item, start: "top 85%",
        once: true
      },
      delay: i * 0.08
    });
  });
}

/* ==================== BENTO GRID ==================== */
function bentoAnimations() {
  gsap.utils.toArray(".bento-item").forEach((item, i) => {
    gsap.from(item, {
      opacity: 0, y: 80, scale: 0.8,
      duration: speedify(0.7),
      scrollTrigger: {
        trigger: item, start: "top 85%",
        once: true
      },
      delay: i * 0.1
    });
  });
}

/* ==================== SPLIT STORY ==================== */
function splitAnimations() {
  gsap.from(".split-image", {
    opacity: 0, x: -100, scale: 0.9,
    duration: speedify(1),
    scrollTrigger: {
      trigger: "#split-story", start: "top 80%",
      once: true
    }
  });

  gsap.from(".split-text", {
    opacity: 0, x: 100, duration: speedify(1),
    scrollTrigger: {
      trigger: "#split-story", start: "top 80%",
      once: true
    }
  });
}

/* ==================== STICKY CHAPTERS ==================== */
function chapterAnimations() {
  const chapters = gsap.utils.toArray(".chapter");
  chapters.forEach((ch, i) => {
    const sticky = ch.querySelector(".chapter-sticky");
    if (!sticky) return;

    gsap.from(sticky.querySelector(".chapter-content"), {
      opacity: 0, x: -80, duration: speedify(0.8),
      scrollTrigger: {
        trigger: ch, start: "top 70%",
        end: "top 20%", scrub: 1.5
      }
    });

    gsap.from(sticky.querySelector(".chapter-visual"), {
      opacity: 0, scale: 0.8, duration: speedify(0.8),
      scrollTrigger: {
        trigger: ch, start: "top 70%",
        end: "top 20%", scrub: 1.5
      }
    });
  });
}

/* ==================== VERTICAL MARQUEE ==================== */
function vmarqueeAnimations() {
  ["#vmarqueeTrack1", "#vmarqueeTrack2", "#vmarqueeTrack3"].forEach((sel, i) => {
    const track = document.querySelector(sel);
    if (!track) return;

    const items = track.querySelectorAll("img");
    if (!items.length) return;

    const clone = track.cloneNode(true);
    track.parentNode.appendChild(clone);

    const dir = i === 1 ? 1 : -1;
    const dur = 8 + i * 2;
    const halfH = track.scrollHeight / 2;

    gsap.fromTo(track,
      { y: 0 },
      { y: dir * halfH, duration: speedify(dur), ease: "none", repeat: -1 }
    );
    gsap.fromTo(clone,
      { y: dir * -halfH },
      { y: 0, duration: speedify(dur), ease: "none", repeat: -1 }
    );
  });

  gsap.from("#vertical-marquee", {
    opacity: 0, duration: speedify(0.8),
    scrollTrigger: {
      trigger: "#vertical-marquee", start: "top 85%",
      once: true
    }
  });
}

/* ==================== LOVE NOTES ==================== */
function notesAnimations() {
  gsap.utils.toArray(".note-card").forEach((note, i) => {
    const yMove = 20 + Math.random() * 30;
    gsap.to(note, {
      y: yMove,
      duration: speedify(3 + Math.random() * 3),
      repeat: -1, yoyo: true, ease: "sine.inOut"
    });

    gsap.from(note, {
      opacity: 0, y: 40, scale: 0.8,
      duration: speedify(0.6),
      scrollTrigger: {
        trigger: "#love-notes", start: "top 80%",
        once: true
      },
      delay: i * 0.15
    });
  });
}

/* ==================== HEARTBEAT ==================== */
function heartbeatAnimations() {
  gsap.from(".heartbeat-container", {
    opacity: 0, y: 80, duration: speedify(1),
    scrollTrigger: {
      trigger: "#heartbeat", start: "top 80%",
      once: true
    }
  });

  gsap.utils.toArray(".hbeat-item").forEach((item, i) => {
    gsap.from(item, {
      opacity: 0, y: 40, duration: speedify(0.6),
      scrollTrigger: {
        trigger: "#heartbeat", start: "top 70%",
        once: true
      },
      delay: 0.2 + i * 0.15
    });
  });
}

/* ==================== FINAL ENDING ==================== */
function endingAnimations() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#final-ending",
      start: "top 80%",
      end: "bottom 20%",
      once: true
    }
  });

  tl.from(".ending-icon", { opacity: 0, scale: 0, rotation: -180, duration: speedify(1) })
    .from(".ending-title", { opacity: 0, y: 80, duration: speedify(1.2) }, "-=0.6")
    .from(".ending-desc", { opacity: 0, y: 40, duration: speedify(0.8) }, "-=0.6")
    .from(".ending-footer", { opacity: 0, y: 20, duration: speedify(0.6) }, "-=0.4");

  gsap.to(".ending-icon", {
    scale: 1.15, duration: speedify(2),
    repeat: -1, yoyo: true, ease: "sine.inOut"
  });

  gsap.from("#final-ending .ending-overlay", {
    opacity: 0, duration: speedify(2),
    scrollTrigger: {
      trigger: "#final-ending", start: "top 80%",
      end: "center center", scrub: 1.5
    }
  });
}

/* === EXPOSE FOR RE-INIT === */
window.reinitAnimations = initAllAnimations;

/* Extra stagger effect for section reveals */
function addStaggerReveal(selector, trigger, staggerVal) {
  const items = document.querySelectorAll(selector);
  if (!items.length) return;
  gsap.from(items, {
    opacity: 0, y: 60, scale: 0.92,
    stagger: staggerVal || 0.08,
    duration: speedify(0.8),
    scrollTrigger: {
      trigger: trigger,
      start: "top 85%",
      once: true
    }
  });
}

