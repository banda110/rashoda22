const urlParams = new URLSearchParams(window.location.search);
const DASHBOARD_ACTIVE = urlParams.has("dash");

if (DASHBOARD_ACTIVE) {
  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("dashboard_auth") === "true") {
      renderDashboard();
    } else {
      renderDashGate();
    }
  });
}

function renderDashGate() {
  const root = document.getElementById("dashboard-root");
  if (!root) return;
  root.innerHTML = `
    <div class="dash-gate">
      <div class="glass-card">
        <h2>${t("dashgate.title")}</h2>
        <p style="color:var(--text-muted);font-size:0.85rem;margin-bottom:0.5rem;">${t("dashgate.subtitle")}</p>
        <input id="dashPass" type="password" placeholder="${t("dashgate.placeholder")}" />
        <button id="dashLoginBtn">${t("dashgate.btn")}</button>
        <p id="dashGateError" class="dash-error"></p>
      </div>
    </div>
  `;

  const btn = document.getElementById("dashLoginBtn");
  const input = document.getElementById("dashPass");
  const err = document.getElementById("dashGateError");

  function tryLogin() {
    if (input.value.trim() === CONFIG.dashboardPassword) {
      localStorage.setItem("dashboard_auth", "true");
      renderDashboard();
    } else {
      err.textContent = t("dashgate.wrong");
      err.style.color = "#ff4d6d";
      err.classList.add("shake");
      setTimeout(() => err.classList.remove("shake"), 500);
      input.style.borderColor = "#ff4d6d";
      input.style.boxShadow = "0 0 20px rgba(255,77,109,0.3)";
      setTimeout(() => {
        input.style.borderColor = "";
        input.style.boxShadow = "";
      }, 1000);
    }
  }

  btn.addEventListener("click", tryLogin);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") tryLogin(); });
}

function renderDashboard() {
  const existing = document.querySelector(".dash-overlay");
  if (existing) existing.remove();

  const root = document.getElementById("dashboard-root");
  if (!root) return;

  root.innerHTML = dashboardHTML();
  bindDashTabs();
  bindDashEvents();
  populateDash();
}

function dashboardHTML() {
  const tabs = [
    "general","theme","animations","content","github","media","library-2d","library-3d","bundles",
    "hero","floating","marquee","stack","timeline","explosion","flip","orbit",
    "statistics","quotes","horizontal","parallax","wall","reveal","ba",
    "polaroids","carousel","spotlight","bento","split","chapters","vmarquee",
    "notes","heartbeat","ending"
  ];
  const tabLabels = [
    "General","Theme","Animations","Site Text","GitHub","Media Library",
    "Animation Library","3D Library","Page Bundles",
    "Hero","Floating Gallery","Marquee","Stack Cards",
    "Timeline","Explosion","Flip Cards","Orbit Gallery",
    "Statistics","Quotes","Horizontal Story","Parallax Layers",
    "Photo Wall","Cinematic Reveal","Before After","Floating Polaroids",
    "Carousel","Spotlight","Bento Grid","Split Story","Sticky Chapters",
    "Vertical Marquee","Love Notes","Heartbeat","Final Ending"
  ];
  const sections = tabs.slice(9);

  let sectionNav = sections.map(tabKey =>
    `<button class="dash-nav-item" data-tab="${tabKey}">${window.t("dash.panel." + tabKey)}</button>`
  ).join("\n");

  return `
    <div class="dash-overlay">
      <div class="dash-sidebar">
        <div class="dash-brand">
          <div class="dash-brand-icon">&#x2699;</div>
          <span>Dashboard</span>
        </div>
        <div class="dash-search-wrap">
          <span class="dash-search-icon">&#x2315;</span>
          <input type="text" id="dashSearch" placeholder='${t("dash.search")}' />
        </div>
        <nav class="dash-nav">
          <div class="dash-nav-group">
            <span class="dash-nav-label">${t("dash.general")}</span>
            <button class="dash-nav-item active" data-tab="general">${t("dash.nav.general")}</button>
            <button class="dash-nav-item" data-tab="theme">${t("dash.nav.theme")}</button>
            <button class="dash-nav-item" data-tab="animations">${t("dash.nav.animations")}</button>
            <button class="dash-nav-item" data-tab="content">${t("dash.nav.content")}</button>
            <button class="dash-nav-item" data-tab="github">${t("dash.nav.github")}</button>
          </div>
          <div class="dash-nav-group">
            <span class="dash-nav-label">${t("dash.media")}</span>
            <button class="dash-nav-item" data-tab="media">${t("dash.nav.media")}</button>
          </div>
          <div class="dash-nav-group">
            <span class="dash-nav-label">${t("dash.presets")}</span>
            <button class="dash-nav-item" data-tab="library-2d">${t("dash.nav.library2d")}</button>
            <button class="dash-nav-item" data-tab="library-3d">${t("dash.nav.library3d")}</button>
            <button class="dash-nav-item" data-tab="bundles">${t("dash.nav.bundles")}</button>
          </div>
          <div class="dash-nav-group">
            <span class="dash-nav-label">${t("dash.sections")}</span>
            ${sectionNav}
          </div>
        </nav>
        <div class="dash-sidebar-footer">
          <button class="dash-logout-btn" id="dashLogout">${t("dash.logout")}</button>
        </div>
      </div>
      <div class="dash-main">
        <div class="dash-topbar">
          <button class="dash-menu-btn" id="dashMenuToggle">&#x2630;</button>
          <h2 id="dashPanelTitle">${t("dash.general.title")}</h2>
          <div style="display:flex;align-items:center;gap:0.5rem;">
            <button class="dash-btn primary dash-edit-live" data-editlive title="${t("dash.editLive")}">&#9998; ${t("dash.editLive")}</button>
            <button class="dash-btn primary dash-publish-quick" data-quickpublish title="${t("dash.github.publishHint")}">&#8593; ${t("dash.github.publish")}</button>
            <button class="lang-switch dash-lang-btn" onclick="toggleLang()">${t("lang.switch")}</button>
            <button class="dash-topbar-close" id="dashClose">&times;</button>
          </div>
        </div>
        <div class="dash-panels-wrap">
          ${generalPanel()}
          ${themePanel()}
          ${animationsPanel()}
          ${contentPanel()}
          ${githubPanel()}
          ${mediaPanel()}
          ${library2dPanel()}
          ${library3dPanel()}
          ${bundlesPanel()}
          ${heroPanel()}
          ${floatingPanel()}
          ${marqueePanel()}
          ${stackPanel()}
          ${timelinePanel()}
          ${explosionPanel()}
          ${flipPanel()}
          ${orbitPanel()}
          ${statisticsPanel()}
          ${quotesPanel()}
          ${horizontalPanel()}
          ${parallaxPanel()}
          ${wallPanel()}
          ${revealPanel()}
          ${baPanel()}
          ${polaroidsPanel()}
          ${carouselPanel()}
          ${spotlightPanel()}
          ${bentoPanel()}
          ${splitPanel()}
          ${chaptersPanel()}
          ${vmarqueePanel()}
          ${notesPanel()}
          ${heartbeatPanel()}
          ${endingPanel()}
        </div>
      </div>
    </div>
  `;
}

function sectionToggleHTML(sectionId, label) {
  const s = CONFIG.sections[sectionId];
  if (!s) return "";
  return `
    <div class="section-item">
      <label>
        <input type="checkbox" class="sec-toggle" data-section="${sectionId}" ${s.enabled ? "checked" : ""}>
        ${label}
      </label>
    </div>
  `;
}

function sectionSettingsHTML(sectionId) {
  const s = CONFIG.sections[sectionId];
  if (!s) return "";
  const bg = s.backgroundColor || "transparent";
  const accent = s.accentColor || "";
  return `
    <label>${t("dash.ssec.title")}</label>
    <input type="text" class="sec-title" data-section="${sectionId}" value="${escHtml(s.title)}">
    <label>${t("dash.ssec.subtitle")}</label>
    <input type="text" class="sec-subtitle" data-section="${sectionId}" value="${escHtml(s.subtitle)}">
    <label>${t("dash.ssec.desc")}</label>
    <textarea class="sec-desc" data-section="${sectionId}">${escHtml(s.description)}</textarea>
    <label>${t("dash.ssec.speed")}</label>
    <input type="range" min="0.3" max="3" step="0.1" class="sec-speed" data-section="${sectionId}" value="${s.animationSpeed}">
    <span class="sec-speed-val" data-section="${sectionId}">${s.animationSpeed}x</span>
    <label>${t("dash.ssec.bg")}</label>
    <input type="color" class="sec-bg" data-section="${sectionId}" value="${bg}">
    <label>${t("dash.ssec.accent")}</label>
    <input type="color" class="sec-accent" data-section="${sectionId}" value="${accent}">
    <label>${t("dash.ssec.images")}</label>
    <div class="sec-images" data-section="${sectionId}">
      ${renderSectionImages(sectionId)}
    </div>
    <label style="margin-top:0.5rem;font-size:0.7rem;">${t("dash.ssec.hint")}</label>
    <div class="media-grid sec-picker" data-section="${sectionId}">
      ${CONFIG.mediaLibrary.map(m => `
        <div class="media-item picker-thumb" data-id="${m.id}" data-section="${sectionId}" title="${t("dash.ssec.hint")}">
          <img src="${m.url}" alt="" loading="lazy">
        </div>
      `).join("")}
    </div>
    <label style="margin-top:0.5rem;font-size:0.7rem;">${t("dash.ssec.urlHint")}</label>
    <div style="display:flex;gap:6px;">
      <input type="url" class="sec-img-url" data-section="${sectionId}" placeholder="${t("dash.ssec.urlPlaceholder")}" style="flex:1;">
      <button class="dash-btn small sec-img-add" data-section="${sectionId}">${t("dash.ssec.addBtn")}</button>
    </div>
  `;
}

function renderSectionImages(sectionKey) {
  const s = CONFIG.sections[sectionKey];
  const images = (s && s.images) || [];
  if (!images.length) {
    const fallback = getSectionImages(sectionKey);
    if (fallback.length) {
      const tiles = fallback.slice(0, 8).map(url => `
        <div class="media-item" style="cursor:default;">
          <img src="${url}" alt="" loading="lazy">
        </div>
      `).join("");
      return `<div class="media-grid">${tiles}</div><div style="font-size:0.6rem;color:var(--text-muted);margin-top:4px;">${t("dash.content.backgroundImage")}</div>`;
    }
    return `<span style="color:var(--text-muted);font-size:0.75rem;">${t("dash.ssec.noImages")}</span>`;
  }
  return `<div class="media-grid sec-media-grid" data-section="${sectionKey}">${images.map(url => `
    <div class="media-item sec-img-item" data-url="${url}">
      <img src="${url}" alt="" loading="lazy">
      <div class="media-del sec-img-del" data-url="${url}" title="${t("dash.ssec.remove")}">&times;</div>
    </div>
  `).join("")}</div>`;
}

function escHtml(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

function generalPanel() {
  const sectionRows = SECTIONS_LIST.map(entry => {
    const key = getSectionKeyByDomId(entry.id);
    const s = CONFIG.sections[key];
    if (!s) return "";
    return `<div class="sec-switch-row">
      <span class="sec-switch-name">${t("dash.panel." + entry.tab) || entry.label}</span>
      <label class="sec-switch">
        <input type="checkbox" class="sec-toggle" data-section="${key}" ${s.enabled ? "checked" : ""}>
        <span class="sec-switch-track"></span>
      </label>
    </div>`;
  }).join("");

  return `<div class="dash-panel active" data-panel="general">
    <h3>${t("dash.general.title")}</h3>
    <div class="dash-help-card">
      <strong>${t("dash.general.helpTitle")}</strong>
      <p>1. ${t("dash.general.help1")}</p>
      <p>2. ${t("dash.general.help2")}</p>
      <p>3. ${t("dash.general.help3")}</p>
    </div>
    <button class="dash-btn primary dash-edit-live" data-editlive style="width:100%;margin-bottom:0.5rem;">&#9998; ${t("dash.editLiveBtn")}</button>
    <button class="dash-btn primary" data-quickpublish style="width:100%;margin-bottom:0.5rem;">&#8593; ${t("dash.github.publish")}</button>
    <button class="dash-btn" id="exportBtn">${t("dash.general.export")}</button>
    <button class="dash-btn" id="importBtn">${t("dash.general.import")}</button>
    <input type="file" id="importFile" accept=".json" style="display:none">
    <button class="dash-btn danger" id="resetBtn">${t("dash.general.reset")}</button>
    <div style="margin:1.2rem 0;border-top:1px solid var(--glass-border);"></div>
    <label style="font-size:0.85rem;">${t("dash.general.quickToggle")}</label>
    <div class="sec-switch-list">${sectionRows}</div>
  </div>`;
}

function themePanel() {
  const presets = [
    ["#ff4d6d", "#7c4dff"],
    ["#ff6b9d", "#ff9671"],
    ["#00c2ff", "#7c4dff"],
    ["#22d3ee", "#a78bfa"],
    ["#f59e0b", "#ef4444"],
    ["#10b981", "#14b8a6"],
    ["#f43f5e", "#f97316"],
    ["#eab308", "#22c55e"]
  ];
  const presetBtns = presets.map(p =>
    `<button class="accent-preset" data-accent="${p[0]}" data-accent2="${p[1]}" style="background:linear-gradient(135deg,${p[0]},${p[1]});" title="${t("dash.theme.presets")}"></button>`
  ).join("");
  return `<div class="dash-panel" data-panel="theme">
    <h3>${t("dash.theme.title")}</h3>
    <label>${t("dash.theme.presets")}</label>
    <div class="accent-preset-row">${presetBtns}</div>
    <label>${t("dash.theme.accent")}</label>
    <input type="color" id="themeAccent" value="${CONFIG.theme.accent}">
    <label>${t("dash.theme.accent2")}</label>
    <input type="color" id="themeAccentSecondary" value="${CONFIG.theme.accentSecondary}">
    <label>${t("dash.theme.bg")}</label>
    <input type="color" id="themeBg" value="${CONFIG.theme.background}">
    <label>${t("dash.theme.text")}</label>
    <input type="color" id="themeText" value="${CONFIG.theme.text}">
    <label>${t("dash.theme.blur")}</label>
    <input type="range" min="0" max="50" id="themeBlur" value="${CONFIG.theme.blur}">
    <label>${t("dash.theme.radius")}</label>
    <input type="range" min="8" max="50" id="themeRadius" value="${CONFIG.theme.radius}">
    <label>${t("dash.theme.fontSize")}</label>
    <input type="range" min="12" max="20" step="0.5" id="themeFontSize" value="${CONFIG.theme.fontSize || 16}">
    <span id="themeFontSizeVal">${CONFIG.theme.fontSize || 16}px</span>
    <label>${t("dash.theme.customCSS")}</label>
    <textarea id="themeCustomCss" rows="6" placeholder="body { }">${escHtml(CONFIG.theme.customCSS || "")}</textarea>
  </div>`;
}

function animationsPanel() {
  return `<div class="dash-panel" data-panel="animations">
    <h3>${t("dash.animations.title")}</h3>
    <label>${t("dash.anim.speed")}</label>
    <select id="animSpeed">
      <option value="slow" ${CONFIG.animation.speed === "slow" ? "selected" : ""}>${t("dash.anim.slow")}</option>
      <option value="normal" ${CONFIG.animation.speed === "normal" ? "selected" : ""}>${t("dash.anim.normal")}</option>
      <option value="fast" ${CONFIG.animation.speed === "fast" ? "selected" : ""}>${t("dash.anim.fast")}</option>
    </select>
    <label>${t("dash.anim.multiplier")}</label>
    <input type="range" min="0.2" max="3" step="0.1" id="animMultiplier" value="${CONFIG.animation.multiplier}">
    <span id="animMultiplierVal">${CONFIG.animation.multiplier}x</span>
  </div>`;
}

function contentField(key, labelKey) {
  const val = (CONFIG.content && CONFIG.content[key]) || "";
  return `
    <label>${t(labelKey)}</label>
    <input type="text" class="content-field" data-field="${key}" value="${escHtml(val)}">
  `;
}

function contentPanel() {
  const C = CONFIG.content || {};
  return `<div class="dash-panel" data-panel="content">
    <h3>${t("dash.panel.content")}</h3>
    <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:1.5rem;">${t("dash.content.desc")}</p>
    <label>${t("dash.content.backgroundImage")}</label>
    <input type="url" class="content-field" data-field="backgroundImage" value="${escHtml(CONFIG.theme.backgroundImage || "")}" placeholder="https://...">
    <div style="display:flex;gap:0.5rem;align-items:center;">
      <span style="font-size:0.75rem;color:var(--text-muted);">${t("dash.theme.bg")}:</span>
      <img id="bgImgPreview" src="${escHtml(CONFIG.theme.backgroundImage || "")}" style="width:70px;height:50px;object-fit:cover;border-radius:8px;border:1px solid var(--glass-border);${CONFIG.theme.backgroundImage ? "" : "display:none;"}" onerror="this.style.display='none'">
    </div>
    ${contentField("siteTitle", "dash.content.siteTitle")}
    ${contentField("siteSubtitle", "dash.content.siteSubtitle")}
    ${contentField("loginButton", "dash.content.loginButton")}
    ${contentField("heroTag", "dash.content.heroTag")}
    ${contentField("heroTitle", "dash.content.heroTitle")}
    ${contentField("heroDescription", "dash.content.heroDescription")}
    ${contentField("heroButton", "dash.content.heroButton")}
    ${contentField("endingTitle", "dash.content.endingTitle")}
    ${contentField("endingDescription", "dash.content.endingDescription")}
    ${contentField("endingFooter", "dash.content.endingFooter")}
  </div>`;
}

function githubPanel() {
  const G = CONFIG.github || {};
  const ghReady = !!(G.token && G.repo);
  return `<div class="dash-panel" data-panel="github">
    <h3>${t("dash.panel.github")}</h3>
    <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:1.5rem;">${t("dash.github.desc")}</p>
    <label>${t("dash.github.token")}</label>
    <input type="password" id="ghToken" value="${escHtml(G.token || "")}" placeholder="${t("dash.github.tokenPlaceholder")}" autocomplete="off">
    <label>${t("dash.github.repo")}</label>
    <input type="text" id="ghRepo" value="${escHtml(G.repo || "")}" placeholder="${t("dash.github.repoPlaceholder")}">
    <div class="media-upload-hint" id="ghStatus" style="color:var(--accent);">${ghReady ? t("dash.media.ghOnline") : t("dash.media.ghNotSet")}</div>
    <div class="media-upload-hint">${t("dash.github.publicHint")}</div>
    <button class="dash-btn primary" id="ghPublishBtn" style="margin-top:0.5rem;width:100%;">${t("dash.github.publish")}</button>
    <div class="media-upload-hint" style="margin-top:0.5rem;">${t("dash.github.publishHint")}</div>
    <div style="border-top:1px solid var(--glass-border);margin:1.2rem 0;"></div>
    <label>${t("dash.github.folder")}</label>
    <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
      <input type="file" id="ghFolder" webkitdirectory directory style="display:none">
      <button class="dash-btn" id="ghFolderBtn">📁 ${t("dash.github.choose")}</button>
      <span id="ghFolderName" style="font-size:0.75rem;color:var(--text-muted);"></span>
    </div>
    <button class="dash-btn primary" id="ghUploadBtn" style="margin-top:0.5rem;">${t("dash.github.upload")}</button>
    <div id="ghProgress" class="gh-progress" style="display:none;">
      <div class="gh-progress-bar"><div id="ghProgressFill" class="gh-progress-fill" style="width:0%"></div></div>
      <div id="ghLog" class="gh-log"></div>
    </div>
  </div>`;
}

function mediaPanel() {
  return `<div class="dash-panel" data-panel="media">
    <h3>${t("dash.media.title")}</h3>
    <div class="media-upload" id="mediaDrop">
      <input type="file" id="mediaFileInput" accept="image/*" multiple style="display:none;">
      <button class="dash-btn" id="mediaFileBtn">${t("dash.media.browse")}</button>
      <div class="media-drop-hint">${t("dash.media.drop")}</div>
      <div id="mediaUploadInfo" class="media-upload-info"></div>
    </div>
    <div class="media-upload-hint">${t("dash.media.uploadHint")}</div>
    <div id="mediaGhStatus" class="media-upload-hint" style="margin:0.75rem 0;color:var(--accent);"></div>
    <label>${t("dash.media.url")}</label>
    <input type="url" id="mediaUrlInput" placeholder="${t("dash.media.urlPlaceholder")}">
    <label>${t("dash.media.title")}</label>
    <input type="text" id="mediaTitleInput" placeholder="${t("dash.media.titlePlaceholder")}">
    <label>${t("dash.media.category")}</label>
    <input type="text" id="mediaCategoryInput" placeholder="${t("dash.media.catPlaceholder")}">
    <button class="dash-btn primary" id="addMediaBtn">${t("dash.media.add")}</button>
    <div id="mediaLibraryList" class="media-grid"></div>
  </div>`;
}

function heroPanel() {
  const h = "hero";
  return `<div class="dash-panel" data-panel="${h}">
    <h3>${t("dash.panel.hero")}</h3>
    ${sectionToggleHTML(h, t("dash.toggle.hero"))}
    ${sectionSettingsHTML(h)}
    <label>${t("dash.ssec.btnText")}</label>
    <input type="text" id="heroBtnText" value="${t("hero.btn")}">
    <label>${t("dash.ssec.bgUrl")}</label>
    <input type="url" id="heroBgUrl" placeholder="${t("dash.ssec.bgPlaceholder")}">
  </div>`;
}

function floatingPanel() {
  const k = "floatingMemories";
  return `<div class="dash-panel" data-panel="floating"><h3>${t("dash.panel.floating")}</h3>${sectionToggleHTML(k, t("dash.toggle.floating"))}${sectionSettingsHTML(k)}</div>`;
}
function marqueePanel() {
  const k = "marquee";
  return `<div class="dash-panel" data-panel="marquee"><h3>${t("dash.panel.marquee")}</h3>${sectionToggleHTML(k, t("dash.toggle.marquee"))}${sectionSettingsHTML(k)}</div>`;
}
function stackPanel() {
  const k = "stackCards";
  return `<div class="dash-panel" data-panel="stack"><h3>${t("dash.panel.stack")}</h3>${sectionToggleHTML(k, t("dash.toggle.stack"))}${sectionSettingsHTML(k)}</div>`;
}
function timelinePanel() {
  const k = "timeline";
  return `<div class="dash-panel" data-panel="timeline"><h3>${t("dash.panel.timeline")}</h3>${sectionToggleHTML(k, t("dash.toggle.timeline"))}${sectionSettingsHTML(k)}</div>`;
}
function explosionPanel() {
  const k = "memoryExplosion";
  return `<div class="dash-panel" data-panel="explosion"><h3>${t("dash.panel.explosion")}</h3>${sectionToggleHTML(k, t("dash.toggle.explosion"))}${sectionSettingsHTML(k)}</div>`;
}
function flipPanel() {
  const k = "flipCards";
  return `<div class="dash-panel" data-panel="flip"><h3>${t("dash.panel.flip")}</h3>${sectionToggleHTML(k, t("dash.toggle.flip"))}${sectionSettingsHTML(k)}</div>`;
}
function orbitPanel() {
  const k = "orbitGallery";
  return `<div class="dash-panel" data-panel="orbit"><h3>${t("dash.panel.orbit")}</h3>${sectionToggleHTML(k, t("dash.toggle.orbit"))}${sectionSettingsHTML(k)}</div>`;
}
function statisticsPanel() {
  const k = "statistics";
  return `<div class="dash-panel" data-panel="statistics"><h3>${t("dash.panel.statistics")}</h3>${sectionToggleHTML(k, t("dash.toggle.statistics"))}${sectionSettingsHTML(k)}</div>`;
}
function quotesPanel() {
  const k = "loveQuotes";
  return `<div class="dash-panel" data-panel="quotes"><h3>${t("dash.panel.quotes")}</h3>${sectionToggleHTML(k, t("dash.toggle.quotes"))}${sectionSettingsHTML(k)}</div>`;
}
function horizontalPanel() {
  const k = "horizontalStory";
  return `<div class="dash-panel" data-panel="horizontal"><h3>${t("dash.panel.horizontal")}</h3>${sectionToggleHTML(k, t("dash.toggle.horizontal"))}${sectionSettingsHTML(k)}</div>`;
}
function parallaxPanel() {
  const k = "parallaxLayers";
  return `<div class="dash-panel" data-panel="parallax"><h3>${t("dash.panel.parallax")}</h3>${sectionToggleHTML(k, t("dash.toggle.parallax"))}${sectionSettingsHTML(k)}</div>`;
}
function wallPanel() {
  const k = "photoWall";
  return `<div class="dash-panel" data-panel="wall"><h3>${t("dash.panel.wall")}</h3>${sectionToggleHTML(k, t("dash.toggle.wall"))}${sectionSettingsHTML(k)}</div>`;
}
function revealPanel() {
  const k = "cinematicReveal";
  return `<div class="dash-panel" data-panel="reveal"><h3>${t("dash.panel.reveal")}</h3>${sectionToggleHTML(k, t("dash.toggle.reveal"))}${sectionSettingsHTML(k)}</div>`;
}
function baPanel() {
  const k = "beforeAfter";
  return `<div class="dash-panel" data-panel="ba"><h3>${t("dash.panel.ba")}</h3>${sectionToggleHTML(k, t("dash.toggle.ba"))}${sectionSettingsHTML(k)}</div>`;
}
function polaroidsPanel() {
  const k = "floatingPolaroids";
  return `<div class="dash-panel" data-panel="polaroids"><h3>${t("dash.panel.polaroids")}</h3>${sectionToggleHTML(k, t("dash.toggle.polaroids"))}${sectionSettingsHTML(k)}</div>`;
}
function carouselPanel() {
  const k = "carousel";
  return `<div class="dash-panel" data-panel="carousel"><h3>${t("dash.panel.carousel")}</h3>${sectionToggleHTML(k, t("dash.toggle.carousel"))}${sectionSettingsHTML(k)}</div>`;
}
function spotlightPanel() {
  const k = "spotlight";
  return `<div class="dash-panel" data-panel="spotlight"><h3>${t("dash.panel.spotlight")}</h3>${sectionToggleHTML(k, t("dash.toggle.spotlight"))}${sectionSettingsHTML(k)}</div>`;
}
function bentoPanel() {
  const k = "bentoGrid";
  return `<div class="dash-panel" data-panel="bento"><h3>${t("dash.panel.bento")}</h3>${sectionToggleHTML(k, t("dash.toggle.bento"))}${sectionSettingsHTML(k)}</div>`;
}
function splitPanel() {
  const k = "splitStory";
  return `<div class="dash-panel" data-panel="split"><h3>${t("dash.panel.split")}</h3>${sectionToggleHTML(k, t("dash.toggle.split"))}${sectionSettingsHTML(k)}</div>`;
}
function chaptersPanel() {
  const k = "stickyChapters";
  return `<div class="dash-panel" data-panel="chapters"><h3>${t("dash.panel.chapters")}</h3>${sectionToggleHTML(k, t("dash.toggle.chapters"))}${sectionSettingsHTML(k)}</div>`;
}
function vmarqueePanel() {
  const k = "verticalMarquee";
  return `<div class="dash-panel" data-panel="vmarquee"><h3>${t("dash.panel.vmarquee")}</h3>${sectionToggleHTML(k, t("dash.toggle.vmarquee"))}${sectionSettingsHTML(k)}</div>`;
}
function notesPanel() {
  const k = "loveNotes";
  return `<div class="dash-panel" data-panel="notes"><h3>${t("dash.panel.notes")}</h3>${sectionToggleHTML(k, t("dash.toggle.notes"))}${sectionSettingsHTML(k)}</div>`;
}
function heartbeatPanel() {
  const k = "heartbeat";
  return `<div class="dash-panel" data-panel="heartbeat"><h3>${t("dash.panel.heartbeat")}</h3>${sectionToggleHTML(k, t("dash.toggle.heartbeat"))}${sectionSettingsHTML(k)}</div>`;
}
function endingPanel() {
  const k = "finalEnding";
  return `<div class="dash-panel" data-panel="ending"><h3>${t("dash.panel.ending")}</h3>${sectionToggleHTML(k, t("dash.toggle.ending"))}${sectionSettingsHTML(k)}</div>`;
}

function sectionOptionHTML() {
  const shortNames = {
    hero: "Hero", floatingMemories: "Floating Gallery", marquee: "Marquee",
    stackCards: "Stack Cards", timeline: "Timeline", memoryExplosion: "Explosion",
    flipCards: "Flip Cards", loveQuotes: "Love Quotes", statistics: "Statistics",
    orbitGallery: "Orbit Gallery", horizontalStory: "Horizontal Story",
    parallaxLayers: "Parallax Layers", photoWall: "Photo Wall",
    cinematicReveal: "Cinematic Reveal", beforeAfter: "Before & After",
    floatingPolaroids: "Polaroids", carousel: "Carousel", spotlight: "Spotlight",
    bentoGrid: "Bento Grid", splitStory: "Split Story",
    stickyChapters: "Sticky Chapters", verticalMarquee: "Vertical Marquee",
    loveNotes: "Love Notes", heartbeat: "Heartbeat", finalEnding: "Final Ending"
  };
  return Object.entries(CONFIG.sections).filter(([k,v]) => v.enabled)
    .map(([k,v]) => `<option value="${k}">${shortNames[k] || v.title}</option>`).join("");
}

/* === ANIMATION LIBRARY (2D) === */
function library2dPanel() {
  const presets = CONFIG.animationPresets.filter(p => p.type === "2d");
  return `<div class="dash-panel" data-panel="library-2d">
    <h3>2D Animation Library</h3>
    <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:1.5rem;">${t("dash.library2d.desc")}</p>
    <div class="presets-grid">${presets.map(p => `
      <div class="preset-card" data-preset="${p.id}">
        <div class="preset-badge ${p.category}">${p.category}</div>
        <h4>${p.name}</h4>
        <p>${p.description}</p>
        <div class="preset-meta">
          <span>${p.requiresImages > 0 ? p.requiresImages + ' images' : 'No images'}</span>
          <select class="preset-section-pick" data-preset="${p.id}">
            <option value="">${t("dash.selectSection")}</option>
            ${sectionOptionHTML()}
          </select>
        </div>
        <div style="display:flex;gap:6px;margin-top:0.5rem;">
          <button class="dash-btn small preset-apply" data-preset="${p.id}">${t("dash.applyBtn")}</button>
          <button class="dash-btn small preset-preview" data-preset="${p.id}" style="background:rgba(255,255,255,0.06);flex:1;">&#x25B6; Preview</button>
        </div>
      </div>
    `).join("")}</div>
  </div>`;
}

/* === 3D ANIMATION LIBRARY === */
function library3dPanel() {
  const presets = CONFIG.animationPresets.filter(p => p.type === "3d");
  return `<div class="dash-panel" data-panel="library-3d">
    <h3>3D Animation Library</h3>
    <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:1.5rem;">${t("dash.library3d.desc")}</p>
    <div class="presets-grid">${presets.map(p => `
      <div class="preset-card">
        <div class="preset-badge three-d">3D</div>
        <h4>${p.name}</h4>
        <p>${p.description}</p>
        <div class="preset-meta">
          <span>${p.requiresImages > 0 ? p.requiresImages + ' images' : 'No images'}</span>
          <select class="preset-section-pick" data-preset="${p.id}">
            <option value="">${t("dash.selectSection")}</option>
            ${sectionOptionHTML()}
          </select>
        </div>
        <div style="display:flex;gap:6px;margin-top:0.5rem;">
          <button class="dash-btn small preset-apply" data-preset="${p.id}">${t("dash.applyBtn")}</button>
          <button class="dash-btn small preset-preview" data-preset="${p.id}" style="background:rgba(255,255,255,0.06);flex:1;">&#x25B6; Preview</button>
        </div>
      </div>
    `).join("")}</div>
  </div>`;
}

/* === PAGE BUNDLES === */
function bundlesPanel() {
  return `<div class="dash-panel" data-panel="bundles">
    <h3>${t("dash.bundles.title")}</h3>
    <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:1.5rem;">${t("dash.bundles.desc")}</p>
    <div class="bundles-grid">${CONFIG.pageBundles.map(b => `
      <div class="bundle-card">
        <div class="bundle-header">
          <span class="bundle-icon">&#x25A8;</span>
          <h4>${b.name}</h4>
        </div>
        <p>${b.description}</p>
        <div class="bundle-sections">
          ${b.sections.map(sk => {
            const sec = CONFIG.sections[sk];
            const shortNames = {
              hero: "Hero", floatingMemories: "Floating Gallery", marquee: "Marquee",
              stackCards: "Stack Cards", timeline: "Timeline", memoryExplosion: "Explosion",
              flipCards: "Flip Cards", loveQuotes: "Love Quotes", statistics: "Statistics",
              orbitGallery: "Orbit Gallery", horizontalStory: "Horizontal Story",
              parallaxLayers: "Parallax Layers", photoWall: "Photo Wall",
              cinematicReveal: "Cinematic Reveal", beforeAfter: "Before & After",
              floatingPolaroids: "Polaroids", carousel: "Carousel", spotlight: "Spotlight",
              bentoGrid: "Bento Grid", splitStory: "Split Story",
              stickyChapters: "Sticky Chapters", verticalMarquee: "Vertical Marquee",
              loveNotes: "Love Notes", heartbeat: "Heartbeat", finalEnding: "Final Ending"
            };
            return sec ? `<span class="bundle-tag">${shortNames[sk] || sec.title}</span>` : '';
          }).join("")}
        </div>
        <button class="dash-btn primary bundle-install" data-bundle="${b.id}">${t("dash.installBtn")}</button>
      </div>
    `).join("")}</div>
  </div>`;
}

/* === TAB SYSTEM === */
const TAB_LABELS = {
  general: "General", theme: "Theme", animations: "Animations", content: "Site Text", github: "GitHub",
  media: "Media Library",
  "library-2d": "Animation Library", "library-3d": "3D Library", bundles: "Page Bundles",
  hero: "Hero", floating: "Floating Gallery", marquee: "Marquee", stack: "Stack Cards",
  timeline: "Timeline", explosion: "Memory Explosion", flip: "Flip Cards",
  orbit: "Orbit Gallery", statistics: "Statistics", quotes: "Love Quotes",
  horizontal: "Horizontal Story", parallax: "Parallax Layers", wall: "Photo Wall",
  reveal: "Cinematic Reveal", ba: "Before & After", polaroids: "Floating Polaroids",
  carousel: "Carousel", spotlight: "Spotlight", bento: "Bento Grid",
  split: "Split Story", chapters: "Sticky Chapters", vmarquee: "Vertical Marquee",
  notes: "Love Notes", heartbeat: "Heartbeat", ending: "Final Ending"
};

function bindDashTabs() {
  const panelTitle = document.getElementById("dashPanelTitle");

  document.querySelectorAll(".dash-nav-item").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".dash-nav-item").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".dash-panel").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      const tab = btn.dataset.tab;
      const panel = document.querySelector(`[data-panel="${tab}"]`);
      if (panel) panel.classList.add("active");
      if (panelTitle) panelTitle.textContent = t("dash.panel." + tab) || TAB_LABELS[tab] || tab;
      if (tab === "media") renderMediaLibrary();
    });
  });

  const searchInput = document.getElementById("dashSearch");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      document.querySelectorAll(".dash-nav-item").forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(q) ? "" : "none";
      });
      document.querySelectorAll(".dash-nav-group").forEach(group => {
        const visible = [...group.querySelectorAll(".dash-nav-item")].some(el => el.style.display !== "none");
        group.style.display = visible ? "" : "none";
      });
    });
  }

  const closeBtn = document.getElementById("dashClose");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      const overlay = document.querySelector(".dash-overlay");
      if (overlay) overlay.remove();
      document.body.classList.remove("dash-open");
    });
  }

  const menuBtn = document.getElementById("dashMenuToggle");
  const sidebar = document.querySelector(".dash-sidebar");
  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
    document.querySelectorAll(".dash-nav-item").forEach(btn => {
      btn.addEventListener("click", () => {
        if (window.innerWidth <= 768) sidebar.classList.remove("open");
      });
    });
  }
}

/* === POPULATE & BIND === */

function populateDash() {
  renderMediaLibrary();
}

/* Open the dashboard overlay directly on a section tab (used by edit mode) */
window.openDashboardSection = function (tab) {
  const overlay = document.querySelector(".dash-overlay");
  if (overlay) {
    document.body.classList.add("dash-open");
    const btn = document.querySelector(`.dash-nav-item[data-tab="${tab}"]`);
    if (btn) btn.click();
    return;
  }
  renderDashboard();
  document.body.classList.add("dash-open");
  const btn = document.querySelector(`.dash-nav-item[data-tab="${tab}"]`);
  if (btn) btn.click();
};

function bindDashEvents() {
  /* General */
  document.getElementById("exportBtn")?.addEventListener("click", exportConfig);
  document.getElementById("importBtn")?.addEventListener("click", () => document.getElementById("importFile")?.click());
  document.getElementById("importFile")?.addEventListener("change", (e) => {
    if (e.target.files.length) importConfig(e.target.files[0]);
  });
  document.getElementById("resetBtn")?.addEventListener("click", resetConfig);

  /* Theme */
  document.getElementById("themeAccent")?.addEventListener("input", (e) => {
    CONFIG.theme.accent = e.target.value;
    document.documentElement.style.setProperty("--accent", e.target.value);
    saveConfig();
  });
  document.getElementById("themeAccentSecondary")?.addEventListener("input", (e) => {
    CONFIG.theme.accentSecondary = e.target.value;
    document.documentElement.style.setProperty("--accent-secondary", e.target.value);
    saveConfig();
  });
  document.getElementById("themeBg")?.addEventListener("input", (e) => {
    CONFIG.theme.background = e.target.value;
    document.documentElement.style.setProperty("--bg", e.target.value);
    saveConfig();
  });
  document.getElementById("themeText")?.addEventListener("input", (e) => {
    CONFIG.theme.text = e.target.value;
    document.documentElement.style.setProperty("--text", e.target.value);
    saveConfig();
  });
  document.getElementById("themeBlur")?.addEventListener("input", (e) => {
    CONFIG.theme.blur = parseInt(e.target.value);
    saveConfig();
  });
  document.getElementById("themeRadius")?.addEventListener("input", (e) => {
    CONFIG.theme.radius = parseInt(e.target.value);
    document.documentElement.style.setProperty("--radius-xl", e.target.value + "px");
    saveConfig();
  });
  document.querySelectorAll(".accent-preset").forEach(btn => {
    btn.addEventListener("click", () => {
      CONFIG.theme.accent = btn.dataset.accent;
      CONFIG.theme.accentSecondary = btn.dataset.accent2;
      if (typeof applyTheme === "function") applyTheme();
      saveConfig();
      const a = document.getElementById("themeAccent");
      const a2 = document.getElementById("themeAccentSecondary");
      if (a) a.value = CONFIG.theme.accent;
      if (a2) a2.value = CONFIG.theme.accentSecondary;
    });
  });
  document.getElementById("themeFontSize")?.addEventListener("input", (e) => {
    CONFIG.theme.fontSize = parseFloat(e.target.value);
    document.getElementById("themeFontSizeVal").textContent = e.target.value + "px";
    document.documentElement.style.fontSize = e.target.value + "px";
    saveConfig();
  });
  document.getElementById("themeCustomCss")?.addEventListener("input", (e) => {
    CONFIG.theme.customCSS = e.target.value;
    applyCustomCss(e.target.value);
    saveConfig();
  });

  /* Animations */
  document.getElementById("animSpeed")?.addEventListener("change", (e) => {
    CONFIG.animation.speed = e.target.value;
    saveConfig();
  });
  document.getElementById("animMultiplier")?.addEventListener("input", (e) => {
    CONFIG.animation.multiplier = parseFloat(e.target.value);
    document.getElementById("animMultiplierVal").textContent = e.target.value + "x";
    saveConfig();
  });

  /* Content (site text + background image) */
  function applyContentChanges() {
    if (typeof applyContentOverrides === "function") applyContentOverrides();
    if (typeof applyTheme === "function") applyTheme();
    if (typeof applyFallbackImages === "function") applyFallbackImages();
    if (typeof applyCustomText === "function") applyCustomText();
    if (typeof window.refreshSections === "function") window.refreshSections();
  }

  document.querySelectorAll(".content-field").forEach(inp => {
    inp.addEventListener("input", () => {
      const key = inp.dataset.field;
      if (key === "backgroundImage") {
        CONFIG.theme.backgroundImage = inp.value.trim();
        const prev = document.getElementById("bgImgPreview");
        if (prev) {
          if (inp.value.trim()) { prev.src = inp.value.trim(); prev.style.display = ""; }
          else prev.style.display = "none";
        }
      } else {
        if (!CONFIG.content) CONFIG.content = {};
        CONFIG.content[key] = inp.value;
      }
      saveConfig();
      applyContentChanges();
    });
  });

  /* GitHub upload */
  document.getElementById("ghToken")?.addEventListener("input", (e) => {
    if (!CONFIG.github) CONFIG.github = {};
    CONFIG.github.token = e.target.value;
    saveConfig();
  });
  document.getElementById("ghRepo")?.addEventListener("input", (e) => {
    if (!CONFIG.github) CONFIG.github = {};
    CONFIG.github.repo = e.target.value;
    saveConfig();
    updateMediaGhStatus();
  });
  document.getElementById("ghFolderBtn")?.addEventListener("click", () => {
    document.getElementById("ghFolder")?.click();
  });
  document.getElementById("ghFolder")?.addEventListener("change", (e) => {
    const name = document.getElementById("ghFolderName");
    if (name) name.textContent = e.target.files.length ? e.target.files.length + " files selected" : "";
  });
  document.getElementById("ghUploadBtn")?.addEventListener("click", uploadToGithub);
  document.getElementById("ghPublishBtn")?.addEventListener("click", publishConfigToGithub);
  document.querySelectorAll("[data-quickpublish]").forEach(btn =>
    btn.addEventListener("click", publishConfigToGithub)
  );
  document.querySelectorAll("[data-editlive]").forEach(btn =>
    btn.addEventListener("click", () => {
      if (typeof window.openEditFromDashboard === "function") {
        window.openEditFromDashboard();
      } else {
        alert("editor.js is not loaded.");
      }
    })
  );

  /* Media Library */
  document.getElementById("addMediaBtn")?.addEventListener("click", addMediaItem);

  /* Media upload from device */
  document.getElementById("mediaFileBtn")?.addEventListener("click", () => {
    document.getElementById("mediaFileInput")?.click();
  });
  document.getElementById("mediaFileInput")?.addEventListener("change", (e) => {
    handleMediaFiles(Array.from(e.target.files || []));
    e.target.value = "";
  });
  const mediaDrop = document.getElementById("mediaDrop");
  if (mediaDrop) {
    mediaDrop.addEventListener("dragover", (e) => {
      e.preventDefault();
      mediaDrop.classList.add("dragover");
    });
    mediaDrop.addEventListener("dragleave", () => mediaDrop.classList.remove("dragover"));
    mediaDrop.addEventListener("drop", (e) => {
      e.preventDefault();
      mediaDrop.classList.remove("dragover");
      handleMediaFiles(Array.from(e.dataTransfer?.files || []));
    });
  }

  /* Section toggles */
  document.querySelectorAll(".sec-toggle").forEach(cb => {
    cb.addEventListener("change", (e) => {
      const section = CONFIG.sections[e.target.dataset.section];
      if (section) {
        section.enabled = e.target.checked;
        const el = document.getElementById(section.id);
        if (el) el.style.display = e.target.checked ? "" : "none";
        saveConfig();
        if (typeof window.reinitSection === "function") {
          window.reinitSection(e.target.dataset.section);
        }
        if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
      }
    });
  });

  /* Section bg/accent colors */
  document.querySelectorAll(".sec-bg").forEach(inp => {
    inp.addEventListener("input", (e) => {
      const section = CONFIG.sections[e.target.dataset.section];
      if (section) {
        section.backgroundColor = e.target.value;
        const el = document.getElementById(section.id);
        if (el && e.target.value && e.target.value !== "#000000" && e.target.value !== "#0a0a0a") {
          el.style.backgroundColor = e.target.value;
        }
        saveConfig();
      }
    });
  });
  document.querySelectorAll(".sec-accent").forEach(inp => {
    inp.addEventListener("input", (e) => {
      const section = CONFIG.sections[e.target.dataset.section];
      if (section) {
        section.accentColor = e.target.value;
        const el = document.getElementById(section.id);
        if (el && e.target.value) {
          el.style.setProperty("--section-accent", e.target.value);
        }
        saveConfig();
      }
    });
  });

  /* Section settings */
  document.querySelectorAll(".sec-title").forEach(inp => {
    inp.addEventListener("input", (e) => {
      const section = CONFIG.sections[e.target.dataset.section];
      if (section) {
        section.title = e.target.value;
        if (!CONFIG.customText) CONFIG.customText = {};
        CONFIG.customText["sec_" + e.target.dataset.section + "_title"] = e.target.value;
        saveConfig();
        if (typeof applyCustomText === "function") applyCustomText();
      }
    });
  });
  document.querySelectorAll(".sec-subtitle").forEach(inp => {
    inp.addEventListener("input", (e) => {
      const section = CONFIG.sections[e.target.dataset.section];
      if (section) {
        section.subtitle = e.target.value;
        if (!CONFIG.customText) CONFIG.customText = {};
        CONFIG.customText["sec_" + e.target.dataset.section + "_subtitle"] = e.target.value;
        saveConfig();
        if (typeof applyCustomText === "function") applyCustomText();
      }
    });
  });
  document.querySelectorAll(".sec-desc").forEach(inp => {
    inp.addEventListener("input", (e) => {
      const section = CONFIG.sections[e.target.dataset.section];
      if (section) {
        section.description = e.target.value;
        if (!CONFIG.customText) CONFIG.customText = {};
        CONFIG.customText["sec_" + e.target.dataset.section + "_desc"] = e.target.value;
        saveConfig();
        if (typeof applyCustomText === "function") applyCustomText();
      }
    });
  });
  document.querySelectorAll(".sec-speed").forEach(inp => {
    inp.addEventListener("input", (e) => {
      const section = CONFIG.sections[e.target.dataset.section];
      if (section) {
        section.animationSpeed = parseFloat(e.target.value);
        const val = document.querySelector(`.sec-speed-val[data-section="${e.target.dataset.section}"]`);
        if (val) val.textContent = parseFloat(e.target.value).toFixed(1) + "x";
        saveConfig();
      }
    });
  });

  /* Per-section image picker */
  document.querySelectorAll(".picker-thumb").forEach(el => {
    el.addEventListener("click", () => {
      const sectionKey = el.dataset.section;
      const item = CONFIG.mediaLibrary.find(m => m.id === el.dataset.id);
      const url = item ? item.url : "";
      if (!sectionKey || !url) return;
      const s = CONFIG.sections[sectionKey];
      if (!s) return;
      if (!s.images) s.images = [];
      if (s.images.includes(url)) return;
      s.images.push(url);
      saveConfig();
      const container = document.querySelector(`.sec-images[data-section="${sectionKey}"]`);
      if (container) container.innerHTML = renderSectionImages(sectionKey);
    });
  });
  document.addEventListener("click", (e) => {
    const del = e.target.closest(".sec-img-del");
    if (!del) return;
    const sectionKey = del.closest("[data-section]")?.dataset.section;
    const url = del.dataset.url;
    if (!sectionKey || !url) return;
    const s = CONFIG.sections[sectionKey];
    if (s && s.images) {
      s.images = s.images.filter(u => u !== url);
      saveConfig();
      const container = document.querySelector(`.sec-images[data-section="${sectionKey}"]`);
      if (container) container.innerHTML = renderSectionImages(sectionKey);
    }
  });
  document.querySelectorAll(".sec-img-add").forEach(btn => {
    btn.addEventListener("click", () => {
      const sectionKey = btn.dataset.section;
      const input = document.querySelector(`.sec-img-url[data-section="${sectionKey}"]`);
      if (!input || !input.value.trim() || !sectionKey) return;
      const s = CONFIG.sections[sectionKey];
      if (!s) return;
      if (!s.images) s.images = [];
      s.images.push(input.value.trim());
      saveConfig();
      input.value = "";
      const container = document.querySelector(`.sec-images[data-section="${sectionKey}"]`);
      if (container) container.innerHTML = renderSectionImages(sectionKey);
    });
  });

  /* Animation Preset Apply (direct) */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".preset-apply");
    if (!btn) return;
    const presetId = btn.dataset.preset;
    const select = document.querySelector(`.preset-section-pick[data-preset="${presetId}"]`);
    if (!select || !select.value) { alert(t("dash.noSection")); return; }
    const sectionKey = select.value;
    applyPresetToSection(presetId, sectionKey);
  });

  /* Animation Preset Preview */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".preset-preview");
    if (!btn) return;
    const presetId = btn.dataset.preset;
    const select = document.querySelector(`.preset-section-pick[data-preset="${presetId}"]`);
    if (!select || !select.value) { alert(t("dash.noSection")); return; }
    const sectionKey = select.value;
    previewPreset(presetId, sectionKey);
  });

  /* Page Bundle Install */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".bundle-install");
    if (!btn) return;
    const bundleId = btn.dataset.bundle;
    const bundle = CONFIG.pageBundles.find(b => b.id === bundleId);
    if (!bundle) return;
    Object.keys(CONFIG.sections).forEach(k => {
      CONFIG.sections[k].enabled = bundle.sections.includes(k);
    });
    saveConfig();
    alert(t("dash.bundleInstalled"));
    location.reload();
  });

  /* Hero extra */
  document.getElementById("heroBtnText")?.addEventListener("input", (e) => {
    CONFIG.heroBtnText = e.target.value;
    const btn = document.querySelector("#hero .hero-btn");
    if (btn) btn.textContent = e.target.value;
    saveConfig();
  });
  document.getElementById("heroBgUrl")?.addEventListener("input", (e) => {
    if (e.target.value) {
      const bg = document.getElementById("heroBg");
      if (bg) bg.style.backgroundImage = `url('${e.target.value}')`;
    }
  });

  /* Logout */
  document.getElementById("dashLogout")?.addEventListener("click", () => {
    localStorage.removeItem("dashboard_auth");
    localStorage.removeItem("editor_auth");
    sessionStorage.removeItem("editor_auth");
    document.querySelector(".dash-overlay")?.remove();
    renderDashGate();
  });
}

/* === PRESET FUNCTIONS === */
function applyPresetToSection(presetId, sectionKey) {
  const preset = CONFIG.animationPresets.find(p => p.id === presetId);
  const s = CONFIG.sections[sectionKey];
  if (!s || !preset) return;
  s.animationStyle = presetId;
  if (preset.defaultSettings) Object.assign(s, preset.defaultSettings);
  saveConfig();
  alert(t("dash.animApplied"));
  if (typeof window.refreshSections === "function") window.refreshSections();
}

let _previewState = null;

function previewPreset(presetId, sectionKey) {
  const preset = CONFIG.animationPresets.find(p => p.id === presetId);
  const s = CONFIG.sections[sectionKey];
  if (!s || !preset) return;

  _previewState = {
    sectionKey,
    oldStyle: s.animationStyle,
    oldSettings: { ...s },
  };

  s.animationStyle = presetId;
  if (preset.defaultSettings) Object.assign(s, preset.defaultSettings);

  const dash = document.querySelector(".dash-overlay");
  const app = document.getElementById("app");
  if (dash) dash.style.display = "none";

  if (typeof window.refreshSections === "function") window.refreshSections();

  const el = document.getElementById(s.id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });

  const bar = document.createElement("div");
  bar.id = "previewBar";
  bar.style.cssText = "position:fixed;top:0;left:0;right:0;z-index:10000;display:flex;align-items:center;justify-content:center;gap:1rem;padding:0.75rem 1.5rem;background:rgba(10,10,10,0.92);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,0.08);animation:dashFadeIn 0.3s ease;";
  bar.innerHTML = `
    <span style="font-size:0.8rem;color:var(--text-muted);">${preset.name} → ${s.title}</span>
    <button class="dash-btn primary" id="previewConfirm" style="padding:6px 18px;font-size:0.75rem;">&#x2713; Confirm</button>
    <button class="dash-btn" id="previewCancel" style="padding:6px 18px;font-size:0.75rem;">&#x2717; Cancel</button>
  `;
  document.body.appendChild(bar);

  document.getElementById("previewConfirm").addEventListener("click", () => {
    saveConfig();
    bar.remove();
    if (dash) dash.style.display = "flex";
    alert(t("dash.animApplied"));
    _previewState = null;
  });

  document.getElementById("previewCancel").addEventListener("click", () => {
    const ps = _previewState;
    if (ps) {
      const sec = CONFIG.sections[ps.sectionKey];
      if (sec) {
        sec.animationStyle = ps.oldStyle;
        if (ps.oldSettings) {
          Object.keys(ps.oldSettings).forEach(k => {
            if (k !== "id" && k !== "enabled") sec[k] = ps.oldSettings[k];
          });
        }
      }
    }
    bar.remove();
    if (dash) dash.style.display = "flex";
    if (typeof window.refreshSections === "function") window.refreshSections();
    _previewState = null;
  });
}

/* === MEDIA LIBRARY === */

function addMediaItem() {
  const url = document.getElementById("mediaUrlInput")?.value.trim();
  const title = document.getElementById("mediaTitleInput")?.value.trim() || "Image";
  const category = document.getElementById("mediaCategoryInput")?.value.trim() || "memories";
  if (!url) return;

  CONFIG.mediaLibrary.push({
    id: "med_" + Date.now(),
    title,
    url,
    category
  });
  saveConfig();
  renderMediaLibrary();
  if (typeof window.refreshSections === "function") window.refreshSections();
  document.getElementById("mediaUrlInput").value = "";
  document.getElementById("mediaTitleInput").value = "";
  document.getElementById("mediaCategoryInput").value = "";
}

async function handleMediaFiles(files) {
  const info = document.getElementById("mediaUploadInfo");
  if (!files || !files.length) return;
  if (info) info.textContent = t("dash.media.uploading");
  const ghReady = !!(CONFIG.github && CONFIG.github.token && CONFIG.github.repo);
  let added = 0;
  let online = 0;
  for (const file of files) {
    if (!file.type || !file.type.startsWith("image/")) continue;
    const dataUrl = await resizeImage(file);
    if (!dataUrl) continue;
    let url = dataUrl;
    if (ghReady) {
      const ext = file.type === "image/png" ? "png" : "jpg";
      const filename = "img_" + Date.now() + "_" + Math.floor(Math.random() * 1000) + "." + ext;
      const pushed = await pushImageToGithub(dataUrl, filename);
      if (pushed) { url = pushed; online++; }
    }
    CONFIG.mediaLibrary.push({
      id: "med_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      title: (file.name || "Image").replace(/\.[^.]+$/, "") || "Image",
      url: url,
      category: "memories"
    });
    added++;
  }
  if (added) {
    saveConfig();
    renderMediaLibrary();
    if (typeof window.refreshSections === "function") window.refreshSections();
  }
  if (info) {
    info.textContent = added
      ? "+" + added + " ✓" + (online ? " (" + t("dash.media.ghOnlineShort") + ")" : "")
      : "";
    setTimeout(() => { if (info) info.textContent = ""; }, 2500);
  }
}

function resizeImage(file, maxDim, quality) {
  maxDim = maxDim || 1200;
  quality = quality || 0.8;
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let w = img.naturalWidth;
        let h = img.naturalHeight;
        if (!w || !h) return resolve(null);
        if (w > maxDim || h > maxDim) {
          const s = Math.min(maxDim / w, maxDim / h);
          w = Math.round(w * s);
          h = Math.round(h * s);
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
        try {
          resolve(canvas.toDataURL(mime, quality));
        } catch (err) {
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}

function deleteMediaItem(id) {
  CONFIG.mediaLibrary = CONFIG.mediaLibrary.filter(m => m.id !== id);
  saveConfig();
  renderMediaLibrary();
  if (typeof window.refreshSections === "function") window.refreshSections();
}

function renderMediaLibrary() {
  const list = document.getElementById("mediaLibraryList");
  if (list) {
    list.innerHTML = CONFIG.mediaLibrary.map(m => `
      <div class="media-item" title="${escHtml(m.title)} (${escHtml(m.category)})">
        <img src="${m.url}" alt="${escHtml(m.title)}" loading="lazy">
        <div class="media-del" onclick="deleteMediaItem('${m.id}')">&times;</div>
      </div>
    `).join("");
  }
  updateMediaGhStatus();
}

/* === GITHUB UPLOAD === */
function ghLog(msg) {
  const log = document.getElementById("ghLog");
  if (log) {
    const line = document.createElement("div");
    line.textContent = msg;
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
  }
}

function ghSetProgress(pct) {
  const fill = document.getElementById("ghProgressFill");
  if (fill) fill.style.width = pct + "%";
}

function parseGhRepo(repoInput) {
  if (!repoInput) return { owner: "", repo: "" };
  let r = repoInput.includes("github.com/") ? repoInput.split("github.com/")[1] : repoInput;
  r = r.replace(/\/+$/, "").trim();
  if (r.includes("/")) {
    const parts = r.split("/");
    return { owner: parts[0], repo: parts[1] };
  }
  return { owner: "", repo: r };
}

function updateMediaGhStatus() {
  const el = document.getElementById("mediaGhStatus");
  if (el) {
    const ok = !!(CONFIG.github && CONFIG.github.token && CONFIG.github.repo);
    el.textContent = ok ? t("dash.media.ghOnline") : t("dash.media.ghNotSet");
  }
}

async function pushImageToGithub(dataUrl, filename) {
  try {
    const token = CONFIG.github.token;
    const parsed = parseGhRepo(CONFIG.github.repo);
    if (!token || !parsed.repo) return "";
    let owner = parsed.owner;
    const headers = { Authorization: "Bearer " + token, Accept: "application/vnd.github+json" };

    if (!owner) {
      const userRes = await fetch("https://api.github.com/user", { headers });
      if (!userRes.ok) return "";
      owner = (await userRes.json()).login;
    }

    const repoRes = await fetch("https://api.github.com/repos/" + owner + "/" + parsed.repo, { headers });
    if (repoRes.status === 404) {
      const createRes = await fetch("https://api.github.com/user/repos", {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ name: parsed.repo, private: false })
      });
      if (!createRes.ok) return "";
    } else if (repoRes.ok) {
      await fetch("https://api.github.com/repos/" + owner + "/" + parsed.repo, {
        method: "PATCH",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ private: false })
      }).catch(() => {});
    } else {
      return "";
    }

    const path = "assets/uploads/" + filename;
    const base64 = dataUrl.split(",")[1];
    if (!base64) return "";
    const putRes = await fetch(
      "https://api.github.com/repos/" + owner + "/" + parsed.repo + "/contents/" + path,
      {
        method: "PUT",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Upload image " + filename, content: base64 })
      }
    );
    if (!putRes.ok) return "";

    if (!CONFIG.github) CONFIG.github = {};
    if (CONFIG.github.repo.indexOf(owner) !== 0) {
      CONFIG.github.repo = owner + "/" + parsed.repo;
    }
    saveConfig();
    return "https://raw.githubusercontent.com/" + owner + "/" + parsed.repo + "/HEAD/" + path;
  } catch (e) {
    return "";
  }
}

async function publishConfigToGithub() {
  const token = document.getElementById("ghToken")?.value.trim() || (CONFIG.github && CONFIG.github.token) || "";
  const repoInput = document.getElementById("ghRepo")?.value.trim() || (CONFIG.github && CONFIG.github.repo) || "";
  if (!token) { alert(t("dash.github.noToken")); return false; }
  if (!repoInput) { alert(t("dash.github.noRepo")); return false; }

  const parsed = parseGhRepo(repoInput);
  const headers = { Authorization: "Bearer " + token, Accept: "application/vnd.github+json" };

  try {
    if (!CONFIG.github) CONFIG.github = {};
    CONFIG.github.token = token;
    CONFIG.github.repo = parsed.repo;

    let owner = parsed.owner;
    if (!owner) {
      const userRes = await fetch("https://api.github.com/user", { headers });
      if (!userRes.ok) throw new Error(t("dash.github.authFail"));
      owner = (await userRes.json()).login;
    }
    CONFIG.github.repo = owner + "/" + parsed.repo;

    let migrated = 0;
    for (const m of CONFIG.mediaLibrary) {
      if (m.url && m.url.indexOf("data:") === 0) {
        const isPng = m.url.indexOf("data:image/png") === 0;
        const ext = isPng ? "png" : "jpg";
        const filename = "img_" + Date.now() + "_" + migrated + "." + ext;
        const pushed = await pushImageToGithub(m.url, filename);
        if (pushed) { m.url = pushed; migrated++; }
      }
    }
    if (migrated) saveConfig();

    const repoRes = await fetch("https://api.github.com/repos/" + owner + "/" + parsed.repo, { headers });
    if (repoRes.status === 404) {
      const createRes = await fetch("https://api.github.com/user/repos", {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ name: parsed.repo, private: false })
      });
      if (!createRes.ok) throw new Error(t("dash.github.repoFail"));
    } else if (repoRes.ok) {
      await fetch("https://api.github.com/repos/" + owner + "/" + parsed.repo, {
        method: "PATCH",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ private: false })
      }).catch(() => {});
    } else {
      throw new Error(t("dash.github.repoFail"));
    }

    const data = JSON.parse(JSON.stringify(CONFIG));
    if (data.github) delete data.github.token;
    const json = JSON.stringify(data, null, 2);
    const bytes = new TextEncoder().encode(json);
    let binary = "";
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    }
    const content = btoa(binary);

    let sha = "";
    const getRes = await fetch("https://api.github.com/repos/" + owner + "/" + parsed.repo + "/contents/config.json", { headers });
    if (getRes.ok) {
      const meta = await getRes.json();
      if (meta.sha) sha = meta.sha;
    }
    const body = { message: "Publish site data", content };
    if (sha) body.sha = sha;

    const putRes = await fetch("https://api.github.com/repos/" + owner + "/" + parsed.repo + "/contents/config.json", {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!putRes.ok) throw new Error(t("dash.github.publishErr") + putRes.status);

    if (!CONFIG.github) CONFIG.github = {};
    CONFIG.github.repo = owner + "/" + parsed.repo;
    saveConfig();
    alert(t("dash.github.published"));
    return true;
  } catch (err) {
    alert(t("dash.github.publishErr") + err.message);
    return false;
  }
}

async function uploadToGithub() {
  const token = document.getElementById("ghToken")?.value.trim();
  let repoInput = document.getElementById("ghRepo")?.value.trim();
  const files = document.getElementById("ghFolder")?.files || [];

  if (!token) { alert(t("dash.github.noToken")); return; }
  if (!repoInput) { alert(t("dash.github.noRepo")); return; }
  if (!files.length) { alert(t("dash.github.noFiles")); return; }

  const parsed = parseGhRepo(repoInput);
  let owner = parsed.owner;
  const repo = parsed.repo;

  const wrap = document.getElementById("ghProgress");
  if (wrap) wrap.style.display = "block";
  ghSetProgress(0);
  ghLog(t("dash.github.start"));
  document.getElementById("ghUploadBtn").disabled = true;

  const headers = { Authorization: "Bearer " + token, Accept: "application/vnd.github+json" };

  try {
    if (!owner) {
      const userRes = await fetch("https://api.github.com/user", { headers });
      if (!userRes.ok) throw new Error(t("dash.github.authFail"));
      const user = await userRes.json();
      owner = user.login;
    }

    const repoRes = await fetch("https://api.github.com/repos/" + owner + "/" + repo, { headers });
    if (repoRes.status === 404) {
      const createRes = await fetch("https://api.github.com/user/repos", {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ name: repo, private: false })
      });
      if (!createRes.ok) throw new Error(t("dash.github.repoFail"));
    } else if (!repoRes.ok) {
      throw new Error(t("dash.github.repoFail"));
    } else {
      await fetch("https://api.github.com/repos/" + owner + "/" + repo, {
        method: "PATCH",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ private: false })
      }).catch(() => {});
    }

    const skipDirs = /(^|\/)(\.git|node_modules|\.next|dist|build)\//;
    const uploadable = [];
    for (let i = 0; i < files.length; i++) {
      const rel = files[i].webkitRelativePath || files[i].name;
      const path = rel.replace(/^[^/]+\//, "");
      if (!path || skipDirs.test(rel)) continue;
      uploadable.push({ file: files[i], path });
    }

    for (let i = 0; i < uploadable.length; i++) {
      const { file, path } = uploadable[i];
      const buf = await file.arrayBuffer();
      const bytes = new Uint8Array(buf);
      let binary = "";
      const chunk = 0x8000;
      for (let c = 0; c < bytes.length; c += chunk) {
        binary += String.fromCharCode.apply(null, bytes.subarray(c, c + chunk));
      }
      const content = btoa(binary);

      const putRes = await fetch(
        "https://api.github.com/repos/" + owner + "/" + repo + "/contents/" + path,
        {
          method: "PUT",
          headers: { ...headers, "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Upload via dashboard", content })
        }
      );
      if (!putRes.ok) {
        const errBody = await putRes.text().catch(() => "");
        throw new Error(path + " — " + putRes.status + " " + errBody.slice(0, 120));
      }
      ghSetProgress(Math.round(((i + 1) / uploadable.length) * 100));
      ghLog(path);
    }

    if (owner && repo) {
      if (!CONFIG.github) CONFIG.github = {};
      CONFIG.github.repo = owner + "/" + repo;
      saveConfig();
    }

    let siteUrl = "https://github.com/" + owner + "/" + repo;
    try {
      const infoRes = await fetch("https://api.github.com/repos/" + owner + "/" + repo, { headers });
      if (infoRes.ok) {
        const info = await infoRes.json();
        const branch = info.default_branch || "main";
        const pageRes = await fetch("https://api.github.com/repos/" + owner + "/" + repo + "/pages", {
          method: "POST",
          headers: { ...headers, "Content-Type": "application/json" },
          body: JSON.stringify({ source: { branch, path: "/" } })
        }).catch(() => null);
        if (pageRes && (pageRes.ok || pageRes.status === 409)) {
          siteUrl = "https://" + owner + ".github.io/" + repo + "/";
        }
      }
    } catch (e) {}

    try { await publishConfigToGithub(); } catch (e) {}

    ghLog(t("dash.github.done") + " " + siteUrl);
    alert(t("dash.github.done") + " " + siteUrl);
  } catch (err) {
    ghLog(t("dash.github.err") + err.message);
    alert(t("dash.github.err") + err.message);
  } finally {
    document.getElementById("ghUploadBtn").disabled = false;
  }
}