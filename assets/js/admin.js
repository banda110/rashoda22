/* ============================================================
   Memory Studio — Admin Panel Logic
   Sites CRUD + GitHub create/push + Vercel analytics & cache
   ============================================================ */

(function () {
  "use strict";

  const ADMIN_VERSION = "7";

  const LS_SITES = "admin_sites";
  const LS_SETTINGS = "admin_settings";
  const LS_AUTH = "admin_auth";
  const LS_TS = "admin_updatedAt";
  const ADMIN_DATA_PATH = "AdminData.json";

  const ENGINE_FILES = [
    "index.html",
    "assets/css/style.css",
    "assets/js/config.js",
    "assets/js/i18n.js",
    "assets/js/effects.js",
    "assets/js/dashboard.js",
    "assets/js/animations.js",
    "assets/js/main.js",
    "assets/js/editor.js",
    "admin.html",
    "assets/css/admin.css",
    "assets/js/admin-templates.js",
    "assets/js/admin.js",
  ];

  /* ---------- State ---------- */

  let wizard = {
    occasion: null,
    template: null,
  };

  let _syncTimer = null;
  let _pulling = false;

  /* ---------- Storage helpers ---------- */

  function defaultSettings() {
    return {
      adminPassword: "admin123",
      githubToken: "",
      templateRepo: "banda110/Saas-all",
      dataRepo: "banda110/rashoda22-data",
      vercelToken: "",
      vercelTeam: "",
      psiKey: "",
    };
  }

  function getSettings() {
    try {
      const raw = localStorage.getItem(LS_SETTINGS);
      if (!raw) return defaultSettings();
      return Object.assign(defaultSettings(), JSON.parse(raw));
    } catch (e) {
      return defaultSettings();
    }
  }

  function saveSettings(s) {
    const prev = getSettings().githubToken;
    localStorage.setItem(LS_SETTINGS, JSON.stringify(s));
    if (!prev && s.githubToken) {
      localStorage.setItem(LS_TS, "0");
      cloudPull().then(function (changed) {
        if (changed && isAuthed()) renderAll();
      });
    } else {
      touchLocalTs();
      scheduleCloudPush();
    }
  }

  function getSites() {
    try {
      const raw = localStorage.getItem(LS_SITES);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveSites(list) {
    localStorage.setItem(LS_SITES, JSON.stringify(list));
    touchLocalTs();
    scheduleCloudPush();
  }

  function touchLocalTs() {
    const t = Date.now();
    localStorage.setItem(LS_TS, String(t));
    return t;
  }

  function getLocalTs() {
    const n = parseInt(localStorage.getItem(LS_TS) || "0", 10);
    return isNaN(n) ? 0 : n;
  }

  /* ---------- Shared data sync (private GitHub repo) ----------
     The admin sites list + non-secret settings live in a private repo
     (AdminData.json) so every origin shows the same data.
     Secrets (githubToken / vercelToken) stay local-only. */

  function cloudOwnerRepo() {
    const tr = String(getSettings().dataRepo || "banda110/rashoda22-data").trim().replace(/\/+$/, "");
    const parts = tr.split("/");
    if (parts.length >= 2 && parts[0] && parts[1]) return { owner: parts[0], repo: parts[1] };
    return { owner: "banda110", repo: "rashoda22-data" };
  }

  function cloudPublicSettings(s) {
    return {
      adminPassword: s.adminPassword,
      templateRepo: s.templateRepo,
      dataRepo: s.dataRepo,
      vercelTeam: s.vercelTeam,
    };
  }

  function buildCloudData() {
    return {
      version: 1,
      sites: getSites(),
      settings: cloudPublicSettings(getSettings()),
      updatedAt: Date.now(),
    };
  }

  async function cloudRead() {
    const settings = getSettings();
    const p = cloudOwnerRepo();
    if (settings.githubToken) {
      const res = await gh(settings.githubToken, "/repos/" + p.owner + "/" + p.repo + "/contents/" + ADMIN_DATA_PATH);
      if (!res.ok) return null;
      const j = await res.json().catch(function () {
        return null;
      });
      if (!j || !j.content) return null;
      return JSON.parse(decodeURIComponent(escape(atob(j.content))));
    }
    const res = await jfetch(
      "https://raw.githubusercontent.com/" + p.owner + "/" + p.repo + "/main/" + ADMIN_DATA_PATH,
      {},
      "GitHub"
    );
    if (!res.ok) return null;
    return res.json().catch(function () {
      return null;
    });
  }

  async function cloudPush(data, token) {
    const settings = getSettings();
    const t = token || settings.githubToken;
    if (!t) return false;
    const p = cloudOwnerRepo();
    const body = JSON.stringify(data, null, 2);
    try {
      await pushFile(t, p.owner, p.repo, ADMIN_DATA_PATH, body, "Sync admin data");
      return true;
    } catch (e) {
      try {
        await createRepo(t, p.repo, "Memory Studio — مشترك بيانات لوحة الإدارة");
        await pushFile(t, p.owner, p.repo, ADMIN_DATA_PATH, body, "Sync admin data");
        return true;
      } catch (e2) {
        return false;
      }
    }
  }

  function scheduleCloudPush() {
    clearTimeout(_syncTimer);
    _syncTimer = setTimeout(function () {
      cloudPush(buildCloudData());
    }, 1500);
  }

  async function cloudPull() {
    if (_pulling) return false;
    _pulling = true;
    let changed = false;
    try {
      const data = await cloudRead();
      if (data && Array.isArray(data.sites)) {
        if (data.updatedAt > getLocalTs()) {
          localStorage.setItem(LS_SITES, JSON.stringify(data.sites));
          if (data.settings && data.settings.templateRepo) {
            const local = getSettings();
            const merged = defaultSettings();
            Object.assign(merged, data.settings);
            merged.githubToken = local.githubToken || "";
            merged.vercelToken = local.vercelToken || "";
            merged.psiKey = local.psiKey || "";
            localStorage.setItem(LS_SETTINGS, JSON.stringify(merged));
          }
          localStorage.setItem(LS_TS, String(data.updatedAt));
          changed = true;
        }
      } else if (getSettings().githubToken && (getSites().length || getLocalTs())) {
        await cloudPush(buildCloudData(), getSettings().githubToken);
        touchLocalTs();
      }
    } catch (e) {
      /* offline — use local cache */
    } finally {
      _pulling = false;
    }
    return changed;
  }

  /* ---------- DOM helpers ---------- */

  function $(id) {
    return document.getElementById(id);
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function toast(msg, isErr) {
    const t = $("toast");
    t.textContent = msg;
    t.classList.toggle("err", !!isErr);
    t.classList.remove("hidden");
    clearTimeout(t._tm);
    t._tm = setTimeout(function () {
      t.classList.add("hidden");
    }, 3500);
  }

  function b64(text) {
    return btoa(unescape(encodeURIComponent(text)));
  }

  function slugify(name) {
    return String(name || "")
      .toLowerCase()
      .replace(/[^a-z0-9\u0621-\u064a]+/gi, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40);
  }

  function fmtDate(ts) {
    if (!ts) return "—";
    try {
      return new Date(ts).toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return String(ts);
    }
  }

  function timeAgo(ts) {
    if (!ts) return "—";
    const s = Math.floor((Date.now() - ts) / 1000);
    if (s < 60) return "الآن";
    if (s < 3600) return "منذ " + Math.floor(s / 60) + " دقيقة";
    if (s < 86400) return "منذ " + Math.floor(s / 3600) + " ساعة";
    return fmtDate(ts);
  }

  /* ---------- Auth ---------- */

  function isAuthed() {
    return sessionStorage.getItem(LS_AUTH) === "1";
  }

  function doLogin() {
    const pass = $("loginPass").value;
    if (pass === getSettings().adminPassword) {
      sessionStorage.setItem(LS_AUTH, "1");
      $("loginGate").classList.add("hidden");
      $("app").classList.remove("hidden");
      $("loginError").classList.add("hidden");
      renderAll();
    } else {
      $("loginError").textContent = "كلمة السر غير صحيحة";
      $("loginError").classList.remove("hidden");
    }
  }

  function doLogout() {
    sessionStorage.removeItem(LS_AUTH);
    $("app").classList.add("hidden");
    $("loginGate").classList.remove("hidden");
    $("loginPass").value = "";
  }

  /* ---------- Tabs ---------- */

  function switchTab(name) {
    document.querySelectorAll(".tab-btn").forEach(function (b) {
      b.classList.toggle("active", b.dataset.tab === name);
    });
    document.querySelectorAll(".tab-panel").forEach(function (p) {
      p.classList.toggle("active", p.id === "tab-" + name);
    });
    if (name === "sites") renderSites();
    if (name === "analytics") renderAnalytics();
    if (name === "settings") renderSettings();
  }

  /* ---------- GitHub API ---------- */

  async function jfetch(url, opts, label) {
    try {
      return await fetch(url, opts);
    } catch (e) {
      throw new Error(
        "فشل الاتصال بـ " +
          label +
          " (" +
          String(url).replace(/^https:\/\/[^/]+/, "").slice(0, 80) +
          ") — " +
          e.message
      );
    }
  }

  async function gh(token, path, opts) {
    const headers = { Authorization: "token " + token };
    if (opts && opts.body) headers["Content-Type"] = "application/json";
    const res = await jfetch("https://api.github.com" + path, {
      method: (opts && opts.method) || "GET",
      headers: headers,
      body: opts && opts.body ? JSON.stringify(opts.body) : undefined,
    }, "GitHub API");
    return res;
  }

  async function ghGetUsername(token) {
    const res = await gh(token, "/user");
    if (!res.ok) {
      const j = await res.json().catch(function () {});
      throw new Error("فشل قراءة حساب GitHub: " + (j && j.message ? j.message : res.status));
    }
    const j = await res.json();
    return j.login;
  }

  async function repoExists(owner, name, token) {
    const res = await gh(token, "/repos/" + owner + "/" + name);
    return res.status !== 404;
  }

  async function createRepo(token, name, description) {
    const res = await gh(token, "/user/repos", {
      method: "POST",
      body: { name: name, private: true, description: description || "Memory site" },
    });
    const j = await res.json().catch(function () {
      return {};
    });
    if (!res.ok) {
      throw new Error("فشل إنشاء الريبو: " + (j.message || res.status));
    }
    return j;
  }

  async function fetchEngineFile(templateRepo, path) {
    const settings = getSettings();
    if (settings.githubToken) {
      const res = await gh(settings.githubToken, "/repos/" + templateRepo + "/contents/" + path);
      if (res.ok) {
        const j = await res.json().catch(function () {
          return null;
        });
        if (j && j.content) return decodeURIComponent(escape(atob(j.content)));
      }
      throw new Error("ملف المحرك مفقود: " + path + " (" + res.status + ")");
    }
    const url = "https://raw.githubusercontent.com/" + templateRepo + "/HEAD/" + path;
    const res = await fetch(url);
    if (!res.ok) throw new Error("ملف المحرك مفقود: " + path + " (" + res.status + ")");
    return res.text();
  }

  async function pushFile(token, owner, repo, path, content, message) {
    let sha = null;
    const getRes = await gh(token, "/repos/" + owner + "/" + repo + "/contents/" + path);
    if (getRes.ok) {
      const j = await getRes.json();
      sha = j.sha;
    }
    const body = {
      message: message || "Update " + path,
      content: b64(content),
    };
    if (sha) body.sha = sha;
    const putRes = await gh(token, "/repos/" + owner + "/" + repo + "/contents/" + path, {
      method: "PUT",
      body: body,
    });
    if (!putRes.ok) {
      const j = await putRes.json().catch(function () {
        return {};
      });
      throw new Error("فشل رفع " + path + ": " + (j.message || putRes.status));
    }
    return true;
  }

  function patchConfigJs(text, ownerRepo, dashPass) {
    let out = text;
    out = out.replace(/dashboardPassword:\s*"[^"]*"/, 'dashboardPassword: "' + escJs(dashPass) + '"');
    out = out.replace(/repo:\s*""/, 'repo: "' + escJs(ownerRepo) + '"');
    return out;
  }

  function escJs(s) {
    return String(s == null ? "" : s).replace(/["\\\n\r]/g, function (c) {
      return c === '"' ? '\\"' : c === "\\" ? "\\\\" : "\\n";
    });
  }

  function buildClientConfig(tpl, owner, repoName, sitePass, dashPass) {
    const config = JSON.parse(JSON.stringify(tpl.config));
    config.sitePassword = sitePass;
    config.dashboardPassword = dashPass;
    config.github = { token: "", repo: owner + "/" + repoName };
    return config;
  }

  function buildReadme(owner, repoName, liveUrl) {
    const repoFull = owner + "/" + repoName;
    return (
      "# " + repoFull + "\n\n" +
      "موقع ذكريات لمناسبة خاصة — مبني على محرك Memory Studio.\n\n" +
      "## 🚀 النشر على Vercel\n\n" +
      "1. افتح [Vercel](https://vercel.com) وسجّل الدخول بحسابك المربوط بـ GitHub.\n" +
      "2. اضغط **Add New → Project** واختار هذا الريبو من القائمة (هيبان تلقائياً لأنه خاص بك).\n" +
      "3. اضغط **Deploy** — لا حاجة لأي إعدادات.\n" +
      "4. الرابط النهائي هيبقى زي: `https://" + repoName + ".vercel.app`\n\n" +
      "[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=" +
      "https://github.com/" + repoFull + ")\n\n" +
      "## 🔒 الحماية\n\n" +
      "- صفحة الزائر محمية بكلمة سر محددة من لوحة الإدارة.\n" +
      "- أي تعديلات من لوحة التعديل المدمجة تنشر عبر مالك الموقع (لوحة الأدمن).\n"
    );
  }

  async function ghRepoId(token, owner, repo) {
    const res = await gh(token, "/repos/" + owner + "/" + repo);
    if (!res.ok) throw new Error("قراءة معلومات الريبو فشلت: " + res.status);
    const j = await res.json();
    return j.id;
  }

  async function deployToVercel(owner, repoName, settings) {
    const auth = { Authorization: "Bearer " + settings.vercelToken };
    const team = vq(settings, {});
    const repoId = await ghRepoId(settings.githubToken, owner, repoName);
    const dep = await jfetch("https://api.vercel.com/v13/deployments" + team, {
      method: "POST",
      headers: Object.assign({}, auth, { "Content-Type": "application/json" }),
      body: JSON.stringify({
        name: repoName,
        gitSource: { type: "github", repoId: repoId, ref: "main" },
        target: "production",
        projectSettings: {
          framework: null,
          installCommand: "",
          buildCommand: "",
          outputDirectory: "",
        },
      }),
    }, "Vercel API");
    if (!dep.ok) {
      const j = await dep.json().catch(function () {
        return {};
      });
      throw new Error(
        "نشر Vercel فشل (" + (j.error && j.error.message ? j.error.message : dep.status) + ")"
      );
    }
    return dep.json();
  }

  async function redeploySite(site) {
    const settings = getSettings();
    if (!settings.vercelToken) throw new Error("حط Vercel Token في الإعدادات الأول");
    await deployToVercel(site.owner, site.repo, settings);
    site.liveUrl = "https://" + site.repo + ".vercel.app";
    site.vercelDeployed = true;
    site.vercel = { lastDeploy: Date.now() };
    saveSites(getSites());
    return site.liveUrl;
  }

  /* ---------- Create wizard ---------- */

  function renderOccasions() {
    const grid = $("occasionGrid");
    grid.innerHTML = "";
    ADMIN_TEMPLATES.occasions.forEach(function (o) {
      const el = document.createElement("div");
      el.className = "occ-card" + (wizard.occasion === o.id ? " selected" : "");
      el.innerHTML =
        '<span class="occ-emoji">' + o.emoji + "</span>" +
        '<div class="occ-name">' + esc(o.ar) + "</div>" +
        '<div class="occ-sub">' + esc(o.en) + "</div>";
      el.onclick = function () {
        wizard.occasion = o.id;
        wizard.template = null;
        renderOccasions();
        stepTo(2);
      };
      grid.appendChild(el);
    });
  }

  function renderTemplates() {
    const grid = $("templateGrid");
    grid.innerHTML = "";
    $("step2Occasion").textContent = "";
    if (!wizard.occasion) return;
    const occ = ADMIN_TEMPLATES.occasions.find(function (o) {
      return o.id === wizard.occasion;
    });
    if (occ) $("step2Occasion").textContent = occ.emoji + " " + occ.ar;
    ADMIN_TEMPLATES.getTemplates(wizard.occasion).forEach(function (tpl) {
      const el = document.createElement("div");
      el.className = "tpl-card" + (wizard.template === tpl.id ? " selected" : "");
      const sw = tpl.swatches
        .map(function (c) {
          return '<div class="swatch" style="background:' + esc(c) + '"></div>';
        })
        .join("");
      el.innerHTML =
        sw +
        '<div class="tpl-name">' + esc(tpl.nameAr) + "</div>" +
        '<div class="tpl-fonts">' + esc(tpl.head) + " / " + esc(tpl.body) + "</div>";
      el.onclick = function () {
        wizard.template = tpl.id;
        renderTemplates();
        stepTo(3);
      };
      grid.appendChild(el);
    });
  }

  function stepTo(n) {
    wizard.step = n;
    [1, 2, 3].forEach(function (i) {
      $("step" + i).classList.toggle("hidden", i !== n);
    });
    document.querySelectorAll(".wstep").forEach(function (w) {
      const s = parseInt(w.dataset.step, 10);
      w.classList.toggle("active", s === n);
      w.classList.toggle("done", s < n);
    });
    if (n === 2) renderTemplates();
    if (n === 3) renderSummary();
  }

  function renderSummary() {
    const tpl = ADMIN_TEMPLATES.getTemplate(wizard.template);
    const occ = ADMIN_TEMPLATES.occasions.find(function (o) {
      return o.id === wizard.occasion;
    });
    $("createSummary").innerHTML =
      (occ ? occ.emoji + " " + esc(occ.ar) : "") +
      " • " +
      (tpl ? esc(tpl.nameAr) : "") +
      " — نعم، هيتعمل ريبو GitHub خاص + هتاخد لينك Vercel بعده.";
  }

  function logCreate(msg, cls) {
    const box = $("createLog");
    box.classList.remove("hidden");
    const line = document.createElement("div");
    line.className = cls || "";
    line.textContent = "> " + msg;
    box.appendChild(line);
    box.scrollTop = box.scrollHeight;
  }

  function resetLog() {
    $("createLog").innerHTML = "";
    $("createLog").classList.add("hidden");
  }

  async function runCreate() {
    const settings = getSettings();
    const name = $("fSiteName").value.trim();
    const sitePass = $("fSitePass").value.trim();
    const dashPass = $("fDashPass").value.trim() || "love";

    if (!settings.githubToken) {
      toast("حط GitHub token في الإعدادات الأول", true);
      switchTab("settings");
      return;
    }
    if (!name) {
      toast("اكتب اسم الموقع", true);
      return;
    }
    if (!sitePass) {
      toast("اكتب باسورد صفحة الزائر", true);
      return;
    }
    if (!wizard.occasion || !wizard.template) {
      toast("اختار المناسبة والمظهر", true);
      return;
    }

    const tpl = ADMIN_TEMPLATES.getTemplate(wizard.template);
    const btn = $("btnCreate");
    btn.disabled = true;
    resetLog();

    try {
      logCreate("بدء إنشاء الموقع \u201C" + name + "\u201D ...", "info");
      const owner = await ghGetUsername(settings.githubToken);
      logCreate("حساب GitHub: " + owner);

      let base = "site-" + slugify(name);
      let repoName = base;
      let counter = 1;
      while (await repoExists(owner, repoName, settings.githubToken)) {
        repoName = base + "-" + counter;
        counter++;
      }
      logCreate("الريبو الخاص: " + owner + "/" + repoName);

      const repo = await createRepo(settings.githubToken, repoName, "Memory site — " + name);
      logCreate("تم إنشاء الريبو ✓", "ok");

      const ownerRepo = owner + "/" + repoName;

      for (const path of ENGINE_FILES) {
        const text = await fetchEngineFile(settings.templateRepo, path);
        const finalText =
          path === "assets/js/config.js"
            ? patchConfigJs(text, ownerRepo, dashPass)
            : text;
        await pushFile(settings.githubToken, owner, repoName, path, finalText, "Init " + path);
        logCreate("رفع " + path + " ✓", "ok");
      }

      const config = buildClientConfig(tpl, owner, repoName, sitePass, dashPass);
      const configJson = JSON.stringify(config, null, 2);
      await pushFile(
        settings.githubToken,
        owner,
        repoName,
        "config.json",
        configJson,
        "Add site config"
      );
      logCreate("رفع config.json ✓", "ok");

      const liveUrl = "https://" + repoName + ".vercel.app";
      await pushFile(
        settings.githubToken,
        owner,
        repoName,
        "README.md",
        buildReadme(owner, repoName, liveUrl),
        "Add README"
      );
      logCreate("رفع README ✓", "ok");

      let vercelDeployed = false;
      if (settings.vercelToken) {
        try {
          await deployToVercel(owner, repoName, settings);
          vercelDeployed = true;
          logCreate("تم النشر على Vercel مباشرة ✓ — " + liveUrl, "ok");
        } catch (err) {
          logCreate("تنبيه: نشر Vercel فشل (" + err.message + ")", "err");
          logCreate("هتسويها يدوي: Vercel ← Add New Project ← اختر " + repoName, "info");
        }
      } else {
        logCreate("مفيش Vercel Token في الإعدادات — انشر يدوي من README", "info");
      }

      const site = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        name: name,
        occasion: wizard.occasion,
        template: wizard.template,
        templateName: tpl.nameAr,
        emoji: tpl.emoji,
        sitePassword: sitePass,
        dashPassword: dashPass,
        owner: owner,
        repo: repoName,
        repoUrl: "https://github.com/" + ownerRepo,
        liveUrl: liveUrl,
        vercelProjectId: "",
        vercelDeployed: vercelDeployed,
        createdAt: Date.now(),
        psi: null,
        vercel: null,
      };
      const sites = getSites();
      sites.unshift(site);
      saveSites(sites);

      logCreate("تم إنشاء الموقع ونشره بالكامل 🎉", "ok");
      logCreate("اللينك المباشر: " + liveUrl, "info");
      toast("تم إنشاء الموقع ونشره ✓");
      setTimeout(function () {
        switchTab("sites");
      }, 800);
    } catch (err) {
      logCreate("خطأ: " + err.message, "err");
      toast(err.message, true);
    } finally {
      btn.disabled = false;
    }
  }

  /* ---------- Sites list ---------- */

  function occasionLabel(id) {
    const o = ADMIN_TEMPLATES.occasions.find(function (x) {
      return x.id === id;
    });
    return o ? o.ar : id;
  }

  function renderSites() {
    const q = ($("siteSearch").value || "").trim().toLowerCase();
    let sites = getSites();
    if (q) {
      sites = sites.filter(function (s) {
        return (
          (s.name || "").toLowerCase().indexOf(q) !== -1 ||
          occasionLabel(s.occasion).indexOf(q) !== -1 ||
          (s.repo || "").toLowerCase().indexOf(q) !== -1
        );
      });
    }
    $("sitesCount").textContent = sites.length + " موقع";
    const box = $("sitesTable");
    if (!sites.length) {
      box.innerHTML =
        '<div class="empty">مفيش مواقع لسه — اضغط \u201C+ إنشاء موقع\u201D عشان تبدأ 🚀</div>';
      return;
    }
    box.innerHTML = "";
    sites.forEach(function (s) {
      const row = document.createElement("div");
      row.className = "site-row";
      row.innerHTML =
        '<div class="site-main">' +
        '<div class="site-icon">' + esc(s.emoji || "💌") + "</div>" +
        '<div class="site-info">' +
        '<div class="site-name">' + esc(s.name) +
        '<span class="badge ok">' + esc(occasionLabel(s.occasion)) + "</span>" +
        '<span class="badge">' + esc(s.templateName || "") + "</span></div>" +
        '<div class="site-links">' +
        '<a href="' + esc(s.repoUrl) + '" target="_blank" rel="noopener">🔒 ' + esc(s.repo) + "</a>" +
        '<a href="' + esc(s.liveUrl || "#") + '" target="_blank" rel="noopener">🌐 ' +
        esc((s.liveUrl || "").replace(/^https?:\/\//, "")) + "</a>" +
        "</div></div></div>" +
        '<div class="site-meta">أنشئ ' + fmtDate(s.createdAt) +
        "<br/>" + (s.vercelDeployed ? '<span class="badge ok">▲ منشور</span>' : '<span class="badge err">▲ غير منشور</span>') +
        " " + cacheLabel(s) + "</div>" +
        '<div class="site-actions">' +
        '<button class="btn btn-sm" data-act="copy" data-live="' + esc(s.liveUrl || "") + '">📋 نسخ اللينك</button>' +
        '<button class="btn btn-sm" data-act="deploy" data-id="' + s.id + '">▲ نشر</button>' +
        '<button class="btn btn-sm" data-act="open" data-id="' + s.id + '">فتح</button>' +
        '<button class="btn btn-sm" data-act="edit" data-id="' + s.id + '">تعديل</button>' +
        '<button class="btn btn-sm btn-danger" data-act="del" data-id="' + s.id + '">حذف</button>' +
        "</div>";
      box.appendChild(row);
    });
  }

  function cacheLabel(s) {
    if (s.vercel && s.vercel.lastDeploy) return "آخر نشر " + timeAgo(s.vercel.lastDeploy);
    if (s.vercel && s.vercel.error) return "؟";
    return "لم يُفحص";
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () {
          toast("تم نسخ اللينك ✓");
        },
        function () {
          toast("اضغط كودياً: " + text);
        }
      );
    } else {
      toast("اللينك: " + text);
    }
  }

  function openSite(id) {
    const s = getSites().find(function (x) {
      return x.id === id;
    });
    if (!s) return;
    if (s.liveUrl) window.open(s.liveUrl, "_blank");
    else toast("مفيش لينك مباشر لسه", true);
  }

  function showEditModal(id) {
    const s = getSites().find(function (x) {
      return x.id === id;
    });
    if (!s) return;
    const box = $("modal");
    box.innerHTML =
      '<div class="modal-box">' +
      "<h3>تعديل الموقع — " + esc(s.name) + "</h3>" +
      '<label>اسم الموقع</label><input id="eName" value="' + esc(s.name) + '" />' +
      '<label>باسورد صفحة الزائر</label><input id="eSitePass" value="' + esc(s.sitePassword || "") + '" />' +
      '<label>باسورد لوحة التعديل</label><input id="eDashPass" value="' + esc(s.dashPassword || "love") + '" />' +
      '<label>اللينك المباشر (Vercel)</label><input id="eLive" value="' + esc(s.liveUrl || "") + '" />' +
      '<label>Vercel Project ID (اختياري — لتنظيف الكاش)</label><input id="eVercelId" value="' + esc(s.vercelProjectId || "") + '" />' +
      '<div class="modal-actions">' +
      '<button class="btn btn-ghost" id="mCancel">إلغاء</button>' +
      '<button class="btn btn-primary" id="mSave">حفظ وإعادة نشر</button>' +
      "</div></div>";
    box.classList.remove("hidden");
    $("mCancel").onclick = function () {
      box.classList.add("hidden");
    };
    $("mSave").onclick = function () {
      saveEdit(id);
    };
  }

  async function saveEdit(id) {
    const sites = getSites();
    const s = sites.find(function (x) {
      return x.id === id;
    });
    if (!s) return;
    s.name = $("eName").value.trim() || s.name;
    s.sitePassword = $("eSitePass").value.trim();
    s.dashPassword = $("eDashPass").value.trim() || "love";
    s.liveUrl = $("eLive").value.trim() || s.liveUrl;
    s.vercelProjectId = $("eVercelId").value.trim() || "";
    saveSites(sites);

    const settings = getSettings();
    const btn = $("mSave");
    btn.disabled = true;
    btn.textContent = "يتم النشر...";
    try {
      if (settings.githubToken) {
        const tpl = ADMIN_TEMPLATES.getTemplate(s.template);
        if (tpl) {
          const config = buildClientConfig(
            tpl,
            s.owner,
            s.repo,
            s.sitePassword,
            s.dashPassword
          );
          await pushFile(
            settings.githubToken,
            s.owner,
            s.repo,
            "config.json",
            JSON.stringify(config, null, 2),
            "Update config"
          );
          const cfgJs = await fetchEngineFile(
            settings.templateRepo,
            "assets/js/config.js"
          );
          const patched = patchConfigJs(cfgJs, s.owner + "/" + s.repo, s.dashPassword);
          await pushFile(
            settings.githubToken,
            s.owner,
            s.repo,
            "assets/js/config.js",
            patched,
            "Update auth"
          );
        }
      }
      if (settings.vercelToken) {
        await deployToVercel(s.owner, s.repo, settings);
        s.liveUrl = "https://" + s.repo + ".vercel.app";
        s.vercelDeployed = true;
        s.vercel = { lastDeploy: Date.now() };
        saveSites(sites);
      }
      toast("تم الحفظ وإعادة النشر ✓");
    } catch (err) {
      toast(err.message, true);
    } finally {
      $("modal").classList.add("hidden");
      btn.disabled = false;
      btn.textContent = "حفظ وإعادة نشر";
      renderSites();
    }
  }

  function deleteSite(id) {
    const sites = getSites().filter(function (x) {
      return x.id !== id;
    });
    saveSites(sites);
    renderSites();
    toast("تم حذف الموقع من اللوحة (الريبو باقي على GitHub)");
  }

  function handleManualDeploy(btn) {
    const s = getSites().find(function (x) {
      return x.id === btn.dataset.id;
    });
    if (!s) return;
    btn.disabled = true;
    const old = btn.textContent;
    btn.textContent = "جارِ النشر...";
    redeploySite(s)
      .then(function (url) {
        toast("تم النشر على Vercel ✓ " + url);
        renderSites();
      })
      .catch(function (err) {
        toast(err.message, true);
        btn.disabled = false;
        btn.textContent = old;
      });
  }

  /* ---------- Analytics ---------- */

  function renderAnalytics() {
    const sites = getSites();
    const box = $("analyticsTable");
    const alert = $("analyticsAlert");
    if (!sites.length) {
      box.innerHTML = '<div class="empty">مفيش مواقع بعد</div>';
      alert.classList.add("hidden");
      return;
    }
    if (!getSettings().vercelToken) {
      alert.className = "alert warn";
      alert.textContent =
        "لتفعيل فحص الكاش والنشر، حط Vercel Token في الإعدادات. فحص السرعة (PageSpeed) شغال من غير key لكن بمعدل محدود.";
      alert.classList.remove("hidden");
    } else {
      alert.classList.add("hidden");
    }
    box.innerHTML = "";
    sites.forEach(function (s) {
      const row = document.createElement("div");
      row.className = "ana-row";
      const perf = s.psi && s.psi.perf;
      const scoreCls =
        perf == null ? "" : perf >= 0.9 ? "good" : perf >= 0.6 ? "mid" : "bad";
      const vc = s.vercel || {};
      row.innerHTML =
        '<div class="ana-site"><div class="ana-name">' + esc(s.name) + "</div>" +
        '<div class="ana-url">' + esc(s.liveUrl || "لا يوجد لينك") + "</div></div>" +
        '<div class="ana-cell"><div class="ana-label">السرعة (موبايل)</div>' +
        '<div class="score ' + scoreCls + '">' +
        (perf == null ? "—" : Math.round(perf * 100)) + "</div></div>" +
        '<div class="ana-cell"><div class="ana-label">آخر نشر Vercel</div><div>' +
        (vc.lastDeploy ? timeAgo(vc.lastDeploy) : vc.error || "—") + "</div></div>" +
        '<div class="ana-cell"><div class="ana-label">عدد النشرات</div><div>' +
        (vc.deployments != null ? vc.deployments : "—") + "</div></div>" +
        '<div class="ana-actions" style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">' +
        '<button class="btn btn-sm" data-ana="psi" data-id="' + s.id + '">فحص السرعة</button>' +
        '<button class="btn btn-sm" data-ana="vercel" data-id="' + s.id + '">حالة Vercel</button>' +
        '<button class="btn btn-sm btn-danger" data-ana="purge" data-id="' + s.id + '">تنظيف الكاش</button>' +
        "</div>";
      box.appendChild(row);
    });
  }

  async function runPsi(s) {
    const settings = getSettings();
    const url = s.liveUrl;
    if (!url) throw new Error("مفيش لينك مباشر للموقع " + s.name);
    const qs = "?url=" + encodeURIComponent(url) + "&strategy=mobile";
    const key = settings.psiKey ? "&key=" + encodeURIComponent(settings.psiKey) : "";
    const res = await fetch("https://www.googleapis.com/pagespeedonline/v5/runPagespeed" + qs + key);
    if (!res.ok) {
      throw new Error("PageSpeed فشل: " + res.status + " — جرّب بعد شوية");
    }
    const j = await res.json();
    const cat = j.lighthouseResult && j.lighthouseResult.categories.performance;
    const audits = (j.lighthouseResult && j.lighthouseResult.audits) || {};
    const lcp = audits["largest-contentful-paint"];
    const cls = audits["cumulative-layout-shift"];
    return {
      perf: cat ? cat.score : null,
      lcp: lcp && lcp.displayValue ? lcp.displayValue : null,
      cls: cls && cls.displayValue ? cls.displayValue : null,
      date: Date.now(),
    };
  }

  function vq(settings, extra) {
    const parts = [];
    if (settings.vercelTeam) {
      const t = String(settings.vercelTeam).trim();
      parts.push((/^team_/.test(t) ? "teamId=" : "slug=") + encodeURIComponent(t));
    }
    for (const k in extra) parts.push(k + "=" + encodeURIComponent(extra[k]));
    return parts.length ? "?" + parts.join("&") : "";
  }

  async function runVercel(s) {
    const settings = getSettings();
    if (!settings.vercelToken) throw new Error("حط Vercel Token في الإعدادات الأول");
    const auth = { Authorization: "Bearer " + settings.vercelToken };
    let projectId = s.vercelProjectId;
    if (!projectId) {
      const pr = await jfetch(
        "https://api.vercel.com/v9/projects/" + encodeURIComponent(s.repo) + vq(settings, {}),
        { headers: auth },
        "Vercel API"
      );
      if (pr.ok) {
        const pj = await pr.json();
        projectId = pj.id;
      }
    }
    if (!projectId) {
      throw new Error("مش لاقي مشروع Vercel باسم " + s.repo + " — افتح التعديل وحدّد Project ID");
    }
    s.vercelProjectId = projectId;
    const depRes = await jfetch(
      "https://api.vercel.com/v6/deployments" + vq(settings, { projectId: projectId, limit: 1 }),
      { headers: auth },
      "Vercel API"
    );
    if (!depRes.ok) throw new Error("قراءة النشرات فشلت: " + depRes.status);
    const depJ = await depRes.json();
    const first = depJ.deployments && depJ.deployments[0];
    s.vercel = {
      lastDeploy: first ? first.created : null,
      deployments: depJ.deployments ? depJ.deployments.length : 0,
    };
    saveSites(getSites());
    return s.vercel;
  }

  async function purgeCache(s) {
    const settings = getSettings();
    if (!settings.vercelToken) throw new Error("حط Vercel Token في الإعدادات الأول");
    if (!s.vercelProjectId) await runVercel(s);
    if (!s.vercelProjectId) throw new Error("محددش Vercel Project ID للموقع");
    const res = await jfetch(
      "https://api.vercel.com/v1/edge-cache/invalidate-by-tags" +
        vq(settings, { projectIdOrName: s.vercelProjectId }),
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + settings.vercelToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tags: ["*"] }),
      },
      "Vercel API"
    );
    if (!res.ok) throw new Error("تنظيف الكاش فشل: " + res.status);
    return true;
  }

  function runAllAnalytics() {
    const sites = getSites();
    if (!sites.length) {
      toast("مفيش مواقع", true);
      return;
    }
    const btn = $("btnRunAnalytics");
    btn.disabled = true;
    toast("جارِ الفحص...");
    let done = 0;
    sites.forEach(function (s) {
      const tasks = [];
      if (s.liveUrl) tasks.push(runPsi(s));
      if (getSettings().vercelToken) tasks.push(runVercel(s));
      if (!tasks.length) {
        done++;
        if (done === sites.length) {
          btn.disabled = false;
          renderAnalytics();
          toast("تم الفحص ✓");
        }
        return;
      }
      Promise.all(tasks.map(function (p) {
        return p.catch(function (err) {
          s.psi = null;
          if (s.liveUrl) s.psi = { error: err.message };
          else s.psi = { error: err.message };
          return null;
        });
      })).then(function () {
        s.psi = s.psi || null;
        saveSites(getSites());
        done++;
        if (done === sites.length) {
          btn.disabled = false;
          renderAnalytics();
          toast("تم الفحص ✓");
        }
      });
    });
  }

  /* ---------- Settings ---------- */

  function renderSettings() {
    const s = getSettings();
    $("sAdminPass").value = s.adminPassword;
    $("sGhToken").value = s.githubToken;
    $("sTemplateRepo").value = s.templateRepo;
    $("sDataRepo").value = s.dataRepo;
    $("sVercelToken").value = s.vercelToken;
    $("sVercelTeam").value = s.vercelTeam;
    $("sPsiKey").value = s.psiKey;
  }

  function saveSettingsUi() {
    const s = getSettings();
    s.adminPassword = $("sAdminPass").value.trim() || s.adminPassword;
    s.githubToken = $("sGhToken").value.trim();
    s.templateRepo = $("sTemplateRepo").value.trim() || s.templateRepo;
    s.dataRepo = $("sDataRepo").value.trim() || "banda110/rashoda22-data";
    s.vercelToken = $("sVercelToken").value.trim();
    s.vercelTeam = $("sVercelTeam").value.trim();
    s.psiKey = $("sPsiKey").value.trim();
    saveSettings(s);
    toast("تم حفظ الإعدادات ✓");
  }

  /* ---------- Events ---------- */

  function bindEvents() {
    $("btnLogin").onclick = doLogin;
    $("loginPass").addEventListener("keydown", function (e) {
      if (e.key === "Enter") doLogin();
    });
    $("btnLogout").onclick = doLogout;

    document.querySelectorAll(".tab-btn").forEach(function (b) {
      b.onclick = function () {
        switchTab(b.dataset.tab);
      };
    });
    document.querySelectorAll("[data-goto]").forEach(function (b) {
      b.onclick = function () {
        switchTab(b.dataset.goto);
      };
    });

    $("btnBack").onclick = function () {
      const n = wizard.step && wizard.step > 2 ? 2 : 1;
      stepTo(n);
    };
    $("btnCreate").onclick = runCreate;
    $("siteSearch").addEventListener("input", renderSites);

    $("btnSaveSettings").onclick = saveSettingsUi;
    $("btnRunAnalytics").onclick = runAllAnalytics;

    $("sitesTable").addEventListener("click", function (e) {
      const btn = e.target.closest("button[data-act]");
      if (!btn) return;
      const act = btn.dataset.act;
      if (act === "copy") copyText(btn.dataset.live || "");
      else if (act === "open") openSite(btn.dataset.id);
      else if (act === "edit") showEditModal(btn.dataset.id);
      else if (act === "deploy") handleManualDeploy(btn);
      else if (act === "del") {
        if (confirm("حذف الموقع من اللوحة؟ (الريبو هيفضل على GitHub)")) deleteSite(btn.dataset.id);
      }
    });

    $("analyticsTable").addEventListener("click", function (e) {
      const btn = e.target.closest("button[data-ana]");
      if (!btn) return;
      const s = getSites().find(function (x) {
        return x.id === btn.dataset.id;
      });
      if (!s) return;
      btn.disabled = true;
      const act = btn.dataset.ana;
      const job = act === "psi" ? runPsi(s) : act === "vercel" ? runVercel(s) : purgeCache(s);
      job.then(function (r) {
        if (act === "psi") {
          s.psi = r;
          toast(
            r.perf == null
              ? "فشل فحص السرعة"
              : "السرعة: " + Math.round(r.perf * 100) + " (LCP " + (r.lcp || "—") + ")"
          );
        } else if (act === "vercel") {
          toast("آخر نشر: " + timeAgo(r.lastDeploy));
        } else {
          toast("تم تنظيف كاش Vercel ✓");
        }
        saveSites(getSites());
        renderAnalytics();
        btn.disabled = false;
      }).catch(function (err) {
        toast(err.message, true);
        btn.disabled = false;
      });
    });
  }

  /* ---------- Init ---------- */

  function renderAll() {
    renderOccasions();
    renderSites();
    renderAnalytics();
    renderSettings();
  }

  function init() {
    const stale = window.__ADMIN_HTML_VERSION && window.__ADMIN_HTML_VERSION !== ADMIN_VERSION;
    if (stale) {
      document.body.insertAdjacentHTML(
        "afterbegin",
        '<div style="position:fixed;inset:0;z-index:99999;background:#111;color:#ff5252;display:flex;align-items:center;justify-content:center;font:600 18px/1.6 system-ui;text-align:center;padding:30px;direction:rtl">' +
          "النسخة قديمة (HTML " + window.__ADMIN_HTML_VERSION + " / JS " + ADMIN_VERSION + ")." +
          "<br>اعمل Ctrl+F5 (أو اقفل التبويب وافتح الملف من جديد).</div>"
      );
      return;
    }
    const sub = document.querySelector(".brand-sub");
    if (sub) sub.textContent = "لوحة الإدارة — v" + ADMIN_VERSION;
    bindEvents();
    cloudPull().then(function (changed) {
      if (isAuthed()) {
        renderAll();
        if (changed) toast("تمت مزامنة البيانات المشتركة ✓");
      }
    });
    if (isAuthed()) {
      $("loginGate").classList.add("hidden");
      $("app").classList.remove("hidden");
      renderAll();
    } else {
      $("loginGate").classList.remove("hidden");
      renderOccasions();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
