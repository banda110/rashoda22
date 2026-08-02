document.addEventListener("DOMContentLoaded", () => {
  initLang();
  applyTheme();
  applySectionVisibility();
  applyLang();
  applyFallbackImages();
  initLogin();
  initHamburger();
  initHeaderScroll();
  buildMarqueeTracks();
  buildVerticalMarquee();
  buildFloatingGallery();
  setupBeforeAfter();
  initImageModal();
  if (typeof applyCustomText === "function") applyCustomText();
  setTimeout(() => {
    if (typeof initAllAnimations === "function") {
      initAllAnimations();
    }
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  }, 150);

  /* Recalculate ScrollTrigger once images/fonts finish loading so
     reveal positions are correct and nothing stays invisible. */
  if (typeof window.addEventListener === "function") {
    window.addEventListener("load", () => {
      if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh(true);
    });
  }
  if (document.fonts && typeof document.fonts.ready === "object") {
    document.fonts.ready.then(() => {
      if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
    }).catch(() => {});
  }
  /* Safety net: a second refresh shortly after load. */
  setTimeout(() => {
    if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh(true);
  }, 800);
});

function applyTheme() {
  const root = document.documentElement;
  const t = CONFIG.theme;
  root.style.setProperty("--bg", t.background);
  root.style.setProperty("--bg-secondary", t.backgroundSecondary);
  root.style.setProperty("--accent", t.accent);
  root.style.setProperty("--accent-secondary", t.accentSecondary);
  root.style.setProperty("--accent-tertiary", t.accentTertiary);
  root.style.setProperty("--text", t.text);
  root.style.setProperty("--text-muted", t.textMuted);
  root.style.setProperty("--glass", t.glassBg);
  root.style.setProperty("--glass-border", t.glassBorder);
  root.style.setProperty("--radius-xl", t.radius + "px");
  if (t.fontSize) root.style.fontSize = t.fontSize + "px";
  else root.style.fontSize = "";
  applyCustomCss(t.customCSS);
  const bgUrl = getBackgroundImage();
  if (bgUrl) {
    document.body.style.backgroundImage = `linear-gradient(rgba(10,10,10,0.55), rgba(10,10,10,0.85)), url('${bgUrl}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
  } else {
    document.body.style.backgroundImage = "";
  }
}

function applyCustomCss(css) {
  let st = document.getElementById("custom-css");
  if (css && css.trim()) {
    if (!st) {
      st = document.createElement("style");
      st.id = "custom-css";
      document.head.appendChild(st);
    }
    st.textContent = css;
  } else if (st) {
    st.remove();
  }
}

function applyFallbackImages() {
  document.querySelectorAll("img[data-ph]").forEach((img) => {
    const section = img.closest("section[data-section]");
    const domId = section ? section.dataset.section : "";
    const key = getSectionKeyByDomId(domId);
    const s = CONFIG.sections[key];
    let src = "";
    const idx = section
      ? Array.prototype.indexOf.call(
          section.querySelectorAll("img[data-ph]"),
          img,
        )
      : 0;
    const customKey = getCustomImgKey(domId, idx);
    if (CONFIG.customText && CONFIG.customText[customKey]) {
      src = CONFIG.customText[customKey];
    } else if (s && s.images && s.images.length) {
      src = s.images[idx % s.images.length];
    } else {
      const media = getMediaUrls();
      if (media.length) {
        src = media[idx % media.length];
      } else {
        src = getBackgroundImage();
      }
    }
    if (src) {
      img.src = src;
      img.style.opacity = "";
      img.style.visibility = "";
    } else {
      img.style.visibility = "hidden";
    }
  });
}

function applySectionVisibility() {
  Object.values(CONFIG.sections).forEach((s) => {
    const el = document.getElementById(s.id);
    if (el) {
      el.style.display = s.enabled ? "" : "none";
    }
  });
}

/* === LOGIN === */
function initLogin() {
  const loginScreen = document.getElementById("login-screen");
  const app = document.getElementById("app");
  const loginBtn = document.getElementById("loginBtn");
  const passwordInput = document.getElementById("sitePassword");
  const errorText = document.getElementById("loginError");

  if (!loginScreen || !app) return;

  function checkSession() {
    if (sessionStorage.getItem("site_auth") === "true") {
      loginScreen.style.display = "none";
      app.classList.remove("hidden");
      gsap.from("#app", { opacity: 0, duration: 0.8, ease: "power3.out" });
    }
  }

  gsap.from(".login-card", {
    opacity: 0,
    y: 60,
    scale: 0.9,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.2,
  });
  gsap.from(".login-card-inner", {
    opacity: 0,
    duration: 0.8,
    delay: 0.4,
    ease: "power3.out",
  });

  checkSession();

  if (loginBtn && passwordInput) {
    function tryLogin() {
      const value = passwordInput.value.trim();
      if (value === CONFIG.sitePassword) {
        sessionStorage.setItem("site_auth", "true");
        gsap.to(loginScreen, {
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            loginScreen.style.display = "none";
            app.classList.remove("hidden");
            gsap.from("#app", {
              opacity: 0,
              y: 20,
              duration: 0.8,
              ease: "power3.out",
            });
            if (typeof ScrollTrigger !== "undefined") {
              ScrollTrigger.refresh();
            }
          },
        });
      } else {
        if (errorText) {
          errorText.textContent = t("login.wrong");
          errorText.classList.add("shake");
          setTimeout(() => errorText.classList.remove("shake"), 500);
        }
        passwordInput.style.borderColor = "#ff4d6d";
        passwordInput.style.boxShadow =
          "0 0 20px rgba(255,77,109,0.3), inset 0 0 20px rgba(255,77,109,0.1)";
        setTimeout(() => {
          passwordInput.style.borderColor = "";
          passwordInput.style.boxShadow = "";
        }, 1000);
        gsap.fromTo(
          loginScreen,
          { filter: "blur(0px)" },
          { filter: "blur(4px)", duration: 0.1, yoyo: true, repeat: 1 },
        );
      }
    }

    loginBtn.addEventListener("click", tryLogin);
    passwordInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") tryLogin();
    });
  }
}

/* === HAMBURGER === */
function initHamburger() {
  const hamburger = document.getElementById("hamburger");
  const nav = document.querySelector(".header-nav");
  if (!hamburger || !nav) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      nav.classList.remove("open");
    });
  });
}

/* === HEADER SCROLL === */
function initHeaderScroll() {
  const header = document.getElementById("main-header");
  if (!header) return;

  window.addEventListener(
    "scroll",
    () => {
      header.classList.toggle("scrolled", window.scrollY > 50);
    },
    { passive: true },
  );
}

/* === BUILD MARQUEE TRACKS === */
function buildMarqueeTracks() {
  const trackIds = ["marqueeTrack1", "marqueeTrack2", "marqueeTrack3"];
  const urls = getSectionImages("marquee");
  if (!urls.length) return;

  trackIds.forEach((id) => {
    const track = document.getElementById(id);
    if (!track) return;
    track.innerHTML = "";
    const cards = [...urls, ...urls]
      .map(
        (url) =>
          `<div class="marquee-card"><img src="${url}" alt="" loading="lazy"></div>`,
      )
      .join("");
    track.innerHTML = cards;
  });
}

/* === BUILD VERTICAL MARQUEE === */
function buildVerticalMarquee() {
  const trackIds = ["vmarqueeTrack1", "vmarqueeTrack2", "vmarqueeTrack3"];
  const urls = getSectionImages("verticalMarquee");
  if (!urls.length) return;

  trackIds.forEach((id) => {
    const track = document.getElementById(id);
    if (!track) return;
    track.innerHTML = "";
    const imgs = [...urls, ...urls]
      .map((url) => `<img src="${url}" alt="" loading="lazy">`)
      .join("");
    track.innerHTML = imgs;
  });
}

/* === BUILD FLOATING GALLERY === */
function buildFloatingGallery() {
  const container = document.getElementById("floatingGallery");
  if (!container) return;
  container.innerHTML = "";

  const urls = getSectionImages("floatingMemories");
  if (!urls.length) return;

  urls.forEach((url, i) => {
    const card = document.createElement("div");
    card.className = "memory-card";
    card.style.left = 10 + Math.random() * 60 + "%";
    card.style.top = 5 + Math.random() * 60 + "%";
    card.style.transform = `rotate(${(Math.random() - 0.5) * 20}deg)`;
    card.innerHTML = `<img src="${url}" alt="" loading="lazy">`;
    container.appendChild(card);
  });
}

/* === BEFORE AFTER SETUP === */
function setupBeforeAfter() {
  const slider = document.getElementById("baSlider");
  const before = document.getElementById("baBefore");
  const handle = document.getElementById("baHandle");

  if (!slider || !before || !handle) return;

  function update(val) {
    const p = val + "%";
    before.style.width = p;
    handle.style.left = p;
  }

  slider.addEventListener("input", (e) => update(e.target.value));
  update(slider.value);
}

/* === SMOOTH SCROLL FOR ANCHOR LINKS === */
document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (link) {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
});

/* === HERO BUTTON SCROLL === */
document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("hero-btn") ||
    e.target.closest(".hero-btn")
  ) {
    const next = document.querySelector("#hero + section");
    if (next) next.scrollIntoView({ behavior: "smooth" });
  }
});

/* === REFRESH SECTIONS (called from dashboard) === */
window.refreshSections = function () {
  buildMarqueeTracks();
  buildVerticalMarquee();
  buildFloatingGallery();
  applyFallbackImages();
  if (typeof initAllAnimations === "function") {
    initAllAnimations();
  }
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.refresh();
  }
};

/* === APPLY ONLINE (published) CONFIG === */
document.addEventListener("memory:config-ready", () => {
  if (typeof applyTheme === "function") applyTheme();
  if (typeof applySectionVisibility === "function") applySectionVisibility();
  if (typeof applyContentOverrides === "function") applyContentOverrides();
  if (typeof applyLang === "function") applyLang();
  if (typeof applyFallbackImages === "function") applyFallbackImages();
  if (typeof buildMarqueeTracks === "function") buildMarqueeTracks();
  if (typeof buildVerticalMarquee === "function") buildVerticalMarquee();
  if (typeof buildFloatingGallery === "function") buildFloatingGallery();
  if (typeof applyCustomText === "function") applyCustomText();
  window.refreshSections();

  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.refresh(true);
  }
});

/* === FULLSCREEN ENTER/EXIT === */
document.addEventListener("dblclick", (e) => {
  if (e.target.closest("#hero") || e.target.closest("#final-ending")) {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    }
  }
});

/* === MAGNETIC BUTTON EFFECT === */
document.addEventListener("mousemove", (e) => {
  document
    .querySelectorAll(".hero-btn, .login-btn, .dash-btn, .magnetic")
    .forEach((btn) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 150;
      if (dist < maxDist) {
        const strength = 0.3;
        const x = dx * strength;
        const y = dy * strength;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      } else {
        btn.style.transform = "";
      }
    });
});

/* === IMAGE MODAL === */
function initImageModal() {
  const modal = document.getElementById("image-modal");
  if (!modal) return;
  const backdrop = modal.querySelector(".modal-backdrop");
  const closeBtn = modal.querySelector(".modal-close");
  const modalImg = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");

  function openModal(img) {
    if (!img) return;
    modalImg.src = img.src;
    modalCaption.textContent =
      img.getAttribute("alt") ||
      img.closest('[class*="-card"], [class*="-item"]')?.querySelector("h3")
        ?.textContent ||
      "";
    modal.classList.add("open");
    gsap.fromTo(
      modal,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" },
    );
    gsap.fromTo(
      modal.querySelector(".modal-content"),
      { scale: 0.85, y: 30 },
      { scale: 1, y: 0, duration: 0.4, ease: "power3.out", delay: 0.05 },
    );
  }

  function closeModal() {
    gsap.to(modal, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => modal.classList.remove("open"),
    });
  }

  document.addEventListener("click", (e) => {
    const card = e.target.closest(
      ".memory-card, .marquee-card, .explosion-card, .flip-card, .polaroid, .wall-item, .carousel-item, .spotlight-item, .orbit-item, .horizontal-panel, .chapter-visual",
    );
    if (!card) return;
    const img = card.querySelector("img");
    if (img) openModal(img);
  });

  if (backdrop) backdrop.addEventListener("click", closeModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
}

/* === LOG ERROR HANDLER === */
window.addEventListener("error", (e) => {
  console.warn("Runtime error (non-critical):", e.message);
});
