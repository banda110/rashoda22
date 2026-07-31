document.addEventListener("DOMContentLoaded", () => {
  if (CONFIG.effects.scrollProgress) initScrollProgress();
});

function initCursor() {
  const main = document.getElementById("cursor-main");
  const follower = document.getElementById("cursor-follower");
  if (!main || !follower) return;

  let mx = 0, my = 0;
  let fx = 0, fy = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    main.style.left = mx + "px";
    main.style.top = my + "px";
  });

  function followSmooth() {
    fx += (mx - fx) * 0.15;
    fy += (my - fy) * 0.15;
    follower.style.left = fx + "px";
    follower.style.top = fy + "px";
    requestAnimationFrame(followSmooth);
  }
  followSmooth();

  document.addEventListener("mouseleave", () => {
    main.style.opacity = "0";
    follower.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    main.style.opacity = "1";
    follower.style.opacity = "1";
  });

  const hoverTargets = document.querySelectorAll("a, button, .memory-card, .flip-card, .polaroid, .hero-btn, .note-card, .marquee-card");
  hoverTargets.forEach(el => {
    el.addEventListener("mouseenter", () => {
      main.style.width = "4px";
      main.style.height = "4px";
      main.style.background = "white";
      follower.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
      main.style.width = "8px";
      main.style.height = "8px";
      main.style.background = "var(--accent)";
      follower.classList.remove("hover");
    });
  });
}

function initMouseGlow() {
  const glow = document.getElementById("mouse-glow");
  if (!glow) return;

  document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
    glow.style.opacity = "1";
  });

  document.addEventListener("mouseleave", () => {
    glow.style.opacity = "0";
  });

  const links = document.querySelectorAll("a, button, .memory-card, .flip-card");
  links.forEach(el => {
    el.addEventListener("mouseenter", () => {
      glow.style.width = "500px";
      glow.style.height = "500px";
      glow.style.opacity = "0.1";
    });
    el.addEventListener("mouseleave", () => {
      glow.style.width = "400px";
      glow.style.height = "400px";
      glow.style.opacity = "0.06";
    });
  });
}

function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;

  window.addEventListener("scroll", () => {
    const h = document.documentElement;
    const p = (h.scrollTop || document.body.scrollTop) / ((h.scrollHeight - h.clientHeight) || 1) * 100;
    bar.style.width = p + "%";
  }, { passive: true });
}

function initParticles(containerId, count = 50) {
  const container = document.getElementById(containerId);
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.style.cssText = `
      position:absolute;width:${2 + Math.random() * 4}px;height:${2 + Math.random() * 4}px;
      background:rgba(255,255,255,${0.2 + Math.random() * 0.3});
      border-radius:50%;left:${Math.random() * 100}%;top:${Math.random() * 100}%;
      animation:particleFloat ${5 + Math.random() * 10}s ease-in-out infinite;
      animation-delay:${Math.random() * 5}s;
    `;
    container.appendChild(p);
  }

  if (!document.getElementById("particle-style")) {
    const style = document.createElement("style");
    style.id = "particle-style";
    style.textContent = `
      @keyframes particleFloat {
        0%,100%{transform:translateY(0) translateX(0);opacity:0.3}
        25%{transform:translateY(-40px) translateX(15px);opacity:0.6}
        50%{transform:translateY(-80px) translateX(-15px);opacity:0.1}
        75%{transform:translateY(-40px) translateX(20px);opacity:0.4}
      }
    `;
    document.head.appendChild(style);
  }
}

if (typeof CONFIG !== "undefined" && CONFIG.effects && CONFIG.effects.particles) {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => initParticles("heroParticles", 30), 100);
    setTimeout(() => initParticles("endingParticles", 40), 100);
  });
}