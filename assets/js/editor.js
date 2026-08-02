/* ============================================================
   INLINE EDIT MODE (editor.js)
   Lets the owner edit texts and photos directly on the page,
   right where they appear. Everything is saved to CONFIG and
   published through the same dashboard publish button.
   ============================================================ */

(function () {
  const AUTH_KEY = "editor_auth";
  const EDIT_CLASS = "edit-mode";
  let active = false;

  const FALLBACK = {
    en: {
      "edit.enter": "Edit site",
      "edit.exit": "Done editing",
      "edit.passTitle": "Enter dashboard password to edit",
      "edit.passBtn": "Enter Edit Mode",
      "edit.wrong": "Wrong password",
      "edit.clickHint": "Click any text or photo to change it.",
      "edit.save": "Save",
      "edit.cancel": "Cancel",
      "edit.remove": "Remove override",
      "edit.reset": "Reset",
      "edit.choose": "Choose images",
      "edit.link": "Or paste an image link:",
      "edit.applyLink": "Apply link",
      "edit.imgHint": "Pick a photo from your library or upload a new one.",
      "edit.openSec": "Open settings",
      "edit.toggleSec": "Show / hide",
      "edit.hidden": "Hidden",
      "edit.publish": "Publish online",
      "edit.published": "Published! Everyone can now see your updates.",
      "edit.publishFail": "Publish failed. Go to GitHub tab and check the token.",
      "edit.none": "No photos yet. Add some in Media Library or use a link.",
      "edit.noDash": "Open settings in the dashboard.",
      "edit.hintNotActive": "To edit, open the dashboard and press the edit button.",
      "edit.sections": "Sections",
      "edit.sectionsHint": "Show / hide the animations of this page. Enable one and it will appear below.",
      "edit.show": "Show",
      "edit.hide": "Hide",
      "edit.close": "Close",
      "edit.statnum": "Edit the number",
      "edit.hbeatnum": "Edit the number",
    },
    ar: {
      "edit.enter": "عدّل الموقع",
      "edit.exit": "إنهاء التعديل",
      "edit.passTitle": "أدخل كلمة سر لوحة التحكم للتعديل",
      "edit.passBtn": "ابدأ وضع التعديل",
      "edit.wrong": "كلمة سر خطأ",
      "edit.clickHint": "اضغط على أي نص أو صورة لتغييرها.",
      "edit.save": "حفظ",
      "edit.cancel": "إلغاء",
      "edit.remove": "إزالة التعديل",
      "edit.reset": "إعادة تعيين",
      "edit.choose": "اختر صوراً",
      "edit.link": "أو الصق رابط صورة:",
      "edit.applyLink": "تطبيق الرابط",
      "edit.imgHint": "اختر صورة من مكتبتك أو ارفع صورة جديدة.",
      "edit.openSec": "فتح الإعدادات",
      "edit.toggleSec": "إظهار / إخفاء",
      "edit.hidden": "مخفي",
      "edit.publish": "انشر أونلاين",
      "edit.published": "تم النشر! الكل هيشوف تحديثاتك الآن.",
      "edit.publishFail": "فشل النشر. افحص الرمز في تبويب جيت هاب.",
      "edit.none": "مفيش صور بعد. ضيف صور في مكتبة الوسائط أو استخدم رابط.",
      "edit.noDash": "افتح الإعدادات من لوحة التحكم.",
      "edit.hintNotActive": "للتعديل افتح لوحة التحكم وادوس زر التعديل على الصفحة.",
      "edit.sections": "الأقسام",
      "edit.sectionsHint": "إظهار / إخفاء أنيميشن الصفحة. فعّل أي قسم وهيظهر تحت.",
      "edit.show": "إظهار",
      "edit.hide": "إخفاء",
      "edit.close": "إغلاق",
      "edit.statnum": "عدّل الرقم",
      "edit.hbeatnum": "عدّل الرقم",
    },
  };

  function L(key) {
    if (typeof t === "function") {
      const v = t(key);
      if (v && v !== key) return v;
    }
    const lang = typeof currentLang !== "undefined" ? currentLang : "en";
    const dict = FALLBACK[lang] || FALLBACK.en;
    return dict[key] || FALLBACK.en[key] || key;
  }

  function getCustom() {
    if (!CONFIG.customText) CONFIG.customText = {};
    return CONFIG.customText;
  }

  /* --------------------------------------------------------
     applyCustomText(): push every stored custom value into the
     live page. Runs LAST so it wins over language defaults.
     -------------------------------------------------------- */
  window.applyCustomText = function () {
    if (typeof CONFIG === "undefined") return;
    const C = getCustom();

    /* section headings */
    document.querySelectorAll("section[data-section]").forEach((sec) => {
      const key = getSectionKeyByDomId(sec.dataset.section);
      const label = sec.querySelector(".section-label");
      const title = sec.querySelector(".section-title");
      const desc = sec.querySelector(".section-desc");
      const pairs = [
        [label, "sec_" + key + "_label"],
        [title, "sec_" + key + "_title"],
        [desc, "sec_" + key + "_desc"],
      ];
      pairs.forEach(([el, k]) => {
        if (el && C[k] !== undefined && C[k] !== "") el.textContent = C[k];
      });
    });

    /* card / list texts */
    applyCardText(C);

    /* photos */
    document.querySelectorAll("img[data-ph]").forEach((img) => {
      const section = img.closest("section[data-section]");
      const domId = section ? section.dataset.section : "";
      const idx = section
        ? Array.prototype.indexOf.call(
            section.querySelectorAll("img[data-ph]"),
            img,
          )
        : 0;
      const k = getCustomImgKey(domId, idx);
      if (C[k] !== undefined && C[k] !== "") {
        img.src = C[k];
        img.style.opacity = "";
        img.style.visibility = "";
      }
    });
  };

  function applyCardText(C) {
    const stack = document.getElementById("stackWrapper");
    if (stack) {
      stack.querySelectorAll(".stack-card").forEach((card, i) => {
        const h = card.querySelector("h3");
        const p = card.querySelector("p");
        if (h && C["stack_" + (i + 1) + "_title"] !== undefined) h.textContent = C["stack_" + (i + 1) + "_title"];
        if (p && C["stack_" + (i + 1) + "_desc"] !== undefined) p.textContent = C["stack_" + (i + 1) + "_desc"];
      });
    }

    const tc = document.getElementById("timelineContainer");
    if (tc) {
      tc.querySelectorAll(".timeline-item").forEach((item, i) => {
        const d = item.querySelector(".timeline-date");
        const h = item.querySelector(".timeline-text h4");
        const p = item.querySelector(".timeline-text p");
        if (d && C["tl_" + (i + 1) + "_date"] !== undefined) d.textContent = C["tl_" + (i + 1) + "_date"];
        if (h && C["tl_" + (i + 1) + "_title"] !== undefined) h.textContent = C["tl_" + (i + 1) + "_title"];
        if (p && C["tl_" + (i + 1) + "_desc"] !== undefined) p.textContent = C["tl_" + (i + 1) + "_desc"];
      });
    }

    const qc = document.getElementById("quotesContainer");
    if (qc) {
      qc.querySelectorAll(".quote-card").forEach((q, i) => {
        const p = q.querySelector("p");
        const c = q.querySelector("cite");
        if (p && C["quote_" + (i + 1) + "_text"] !== undefined) p.textContent = C["quote_" + (i + 1) + "_text"];
        if (c && C["quote_" + (i + 1) + "_author"] !== undefined) c.textContent = C["quote_" + (i + 1) + "_author"];
      });
    }

    const fg = document.getElementById("flipGrid");
    if (fg) {
      fg.querySelectorAll(".flip-card").forEach((card, i) => {
        const b = card.querySelector(".flip-back-content");
        if (!b) return;
        const h = b.querySelector("h3");
        const d = b.querySelector(".flip-date");
        const p = b.querySelector("p:not(.flip-date)");
        if (h && C["flip_" + (i + 1) + "_title"] !== undefined) h.textContent = C["flip_" + (i + 1) + "_title"];
        if (d && C["flip_" + (i + 1) + "_date"] !== undefined) d.textContent = C["flip_" + (i + 1) + "_date"];
        if (p && C["flip_" + (i + 1) + "_desc"] !== undefined) p.textContent = C["flip_" + (i + 1) + "_desc"];
      });
    }

    const ht = document.getElementById("horizontalTrack");
    if (ht) {
      ht.querySelectorAll(".horizontal-panel").forEach((panel, i) => {
        const h = panel.querySelector(".horizontal-text h3");
        const p = panel.querySelector(".horizontal-text p");
        if (h && C["hstory_" + (i + 1) + "_title"] !== undefined) h.textContent = C["hstory_" + (i + 1) + "_title"];
        if (p && C["hstory_" + (i + 1) + "_desc"] !== undefined) p.textContent = C["hstory_" + (i + 1) + "_desc"];
      });
    }

    const ct = document.getElementById("carouselTrack");
    if (ct) {
      ct.querySelectorAll(".carousel-item h3").forEach((h, i) => {
        if (h && C["carousel_" + (i + 1) + "_title"] !== undefined) h.textContent = C["carousel_" + (i + 1) + "_title"];
      });
    }

    const bg = document.getElementById("bentoGrid");
    if (bg) {
      bg.querySelectorAll(".bento-overlay h3").forEach((h, i) => {
        if (h && C["bento_" + (i + 1) + "_title"] !== undefined) h.textContent = C["bento_" + (i + 1) + "_title"];
      });
    }

    const pc = document.getElementById("polaroidContainer");
    if (pc) {
      pc.querySelectorAll(".polaroid-caption").forEach((c, i) => {
        if (c && C["polaroid_" + (i + 1)] !== undefined) c.textContent = C["polaroid_" + (i + 1)];
      });
    }

    const cc = document.getElementById("chaptersContainer");
    if (cc) {
      cc.querySelectorAll(".chapter-content").forEach((item, i) => {
        const h = item.querySelector("h3");
        const p = item.querySelector("p");
        const y = item.querySelector(".chapter-year");
        if (h && C["chapter_" + (i + 1) + "_title"] !== undefined) h.textContent = C["chapter_" + (i + 1) + "_title"];
        if (p && C["chapter_" + (i + 1) + "_desc"] !== undefined) p.textContent = C["chapter_" + (i + 1) + "_desc"];
        if (y && C["chapter_" + (i + 1) + "_year"] !== undefined) y.textContent = C["chapter_" + (i + 1) + "_year"];
      });
    }

    const nc = document.getElementById("notesContainer");
    if (nc) {
      nc.querySelectorAll(".note-inner p").forEach((p, i) => {
        if (p && C["note_" + (i + 1)] !== undefined) p.textContent = C["note_" + (i + 1)];
      });
    }

    const sg = document.getElementById("statsGrid");
    if (sg) {
      sg.querySelectorAll(".stat-label").forEach((s, i) => {
        if (s && C["stat_" + (i + 1)] !== undefined) s.textContent = C["stat_" + (i + 1)];
      });
      sg.querySelectorAll(".stat-number").forEach((n, i) => {
        const v = C["statnum_" + (i + 1)];
        if (v !== undefined && v !== "") {
          if (/^[\d.,]+$/.test(v)) {
            n.dataset.target = String(v).replace(/,/g, "");
            n.textContent = "0";
          } else {
            n.textContent = v;
          }
        }
      });
    }

    const hc = document.getElementById("heartbeatContainer");
    if (hc) {
      hc.querySelectorAll(".hbeat-item span").forEach((s, i) => {
        if (s && C["hbeat_" + (i + 1)] !== undefined) s.textContent = C["hbeat_" + (i + 1)];
      });
      hc.querySelectorAll(".hbeat-num").forEach((n, i) => {
        if (n && C["hbeatnum_" + (i + 1)] !== undefined) n.textContent = C["hbeatnum_" + (i + 1)];
      });
    }

    const rc = document.getElementById("revealContainer");
    if (rc) {
      const rh = rc.querySelector(".reveal-text h3");
      const rp = rc.querySelector(".reveal-text p");
      if (rh && C["reveal_title"] !== undefined) rh.textContent = C["reveal_title"];
      if (rp && C["reveal_desc"] !== undefined) rp.textContent = C["reveal_desc"];
    }

    const sc = document.getElementById("splitContainer");
    if (sc) {
      const sh = sc.querySelector(".split-text h3");
      const ps = sc.querySelectorAll(".split-text p:not(.split-signature)");
      const ss = sc.querySelector(".split-signature");
      if (sh && C["split_title"] !== undefined) sh.textContent = C["split_title"];
      if (ps[0] && C["split_p1"] !== undefined) ps[0].textContent = C["split_p1"];
      if (ps[1] && C["split_p2"] !== undefined) ps[1].textContent = C["split_p2"];
      if (ss && C["split_signature"] !== undefined) ss.textContent = C["split_signature"];
    }
  }

  /* --------------------------------------------------------
     Discover the key for an element (text or image).
     -------------------------------------------------------- */
  function keyFor(el) {
    if (el.closest) {
      const inSec = el.closest("section[data-section]");
      if (inSec) {
        const key = getSectionKeyByDomId(inSec.dataset.section);
        const label = inSec.querySelector(".section-label");
        const title = inSec.querySelector(".section-title");
        const desc = inSec.querySelector(".section-desc");
        if (el === label) return "sec_" + key + "_label";
        if (el === title) return "sec_" + key + "_title";
        if (el === desc) return "sec_" + key + "_desc";

        const stack = inSec.querySelectorAll(".stack-card");
        for (let i = 0; i < stack.length; i++) {
          const h = stack[i].querySelector("h3");
          const p = stack[i].querySelector("p");
          if (el === h) return "stack_" + (i + 1) + "_title";
          if (el === p) return "stack_" + (i + 1) + "_desc";
        }

        const tls = inSec.querySelectorAll(".timeline-item");
        for (let i = 0; i < tls.length; i++) {
          const d = tls[i].querySelector(".timeline-date");
          const h = tls[i].querySelector(".timeline-text h4");
          const p = tls[i].querySelector(".timeline-text p");
          if (el === d) return "tl_" + (i + 1) + "_date";
          if (el === h) return "tl_" + (i + 1) + "_title";
          if (el === p) return "tl_" + (i + 1) + "_desc";
        }

        const qs = inSec.querySelectorAll(".quote-card");
        for (let i = 0; i < qs.length; i++) {
          const p = qs[i].querySelector("p");
          const c = qs[i].querySelector("cite");
          if (el === p) return "quote_" + (i + 1) + "_text";
          if (el === c) return "quote_" + (i + 1) + "_author";
        }

        const flips = inSec.querySelectorAll(".flip-card");
        for (let i = 0; i < flips.length; i++) {
          const b = flips[i].querySelector(".flip-back-content");
          if (!b) continue;
          const h = b.querySelector("h3");
          const d = b.querySelector(".flip-date");
          const p = b.querySelector("p:not(.flip-date)");
          if (el === h) return "flip_" + (i + 1) + "_title";
          if (el === d) return "flip_" + (i + 1) + "_date";
          if (el === p) return "flip_" + (i + 1) + "_desc";
        }

        const panels = inSec.querySelectorAll(".horizontal-panel");
        for (let i = 0; i < panels.length; i++) {
          const h = panels[i].querySelector(".horizontal-text h3");
          const p = panels[i].querySelector(".horizontal-text p");
          if (el === h) return "hstory_" + (i + 1) + "_title";
          if (el === p) return "hstory_" + (i + 1) + "_desc";
        }

        const carols = inSec.querySelectorAll(".carousel-item h3");
        for (let i = 0; i < carols.length; i++) if (el === carols[i]) return "carousel_" + (i + 1) + "_title";

        const bentos = inSec.querySelectorAll(".bento-overlay h3");
        for (let i = 0; i < bentos.length; i++) if (el === bentos[i]) return "bento_" + (i + 1) + "_title";

        const caps = inSec.querySelectorAll(".polaroid-caption");
        for (let i = 0; i < caps.length; i++) if (el === caps[i]) return "polaroid_" + (i + 1);

        const chaps = inSec.querySelectorAll(".chapter-content");
        for (let i = 0; i < chaps.length; i++) {
          const h = chaps[i].querySelector("h3");
          const p = chaps[i].querySelector("p");
          const y = chaps[i].querySelector(".chapter-year");
          if (el === h) return "chapter_" + (i + 1) + "_title";
          if (el === p) return "chapter_" + (i + 1) + "_desc";
          if (el === y) return "chapter_" + (i + 1) + "_year";
        }

        const notes = inSec.querySelectorAll(".note-inner p");
        for (let i = 0; i < notes.length; i++) if (el === notes[i]) return "note_" + (i + 1);

        const stats = inSec.querySelectorAll(".stat-label");
        for (let i = 0; i < stats.length; i++) if (el === stats[i]) return "stat_" + (i + 1);

        const statnums = inSec.querySelectorAll(".stat-number");
        for (let i = 0; i < statnums.length; i++) if (el === statnums[i]) return "statnum_" + (i + 1);

        const hbs = inSec.querySelectorAll(".hbeat-item span");
        for (let i = 0; i < hbs.length; i++) if (el === hbs[i]) return "hbeat_" + (i + 1);

        const hbnums = inSec.querySelectorAll(".hbeat-num");
        for (let i = 0; i < hbnums.length; i++) if (el === hbnums[i]) return "hbeatnum_" + (i + 1);

        if (el === inSec.querySelector(".reveal-text h3")) return "reveal_title";
        if (el === inSec.querySelector(".reveal-text p")) return "reveal_desc";
        if (el === inSec.querySelector(".split-text h3")) return "split_title";
        if (el === inSec.querySelector(".split-signature")) return "split_signature";
        const sps = inSec.querySelectorAll(".split-text p:not(.split-signature)");
        for (let i = 0; i < sps.length; i++) if (el === sps[i]) return "split_p" + (i + 1);
      }

      if (el.classList && el.classList.contains("hero-tag")) return "heroTag";
      if (el.classList && el.classList.contains("hero-title")) return "heroTitle";
      if (el.classList && el.classList.contains("hero-desc")) return "heroDescription";
      if (el.id === "heroBtn") return "heroButton";
      if (el.classList && el.classList.contains("login-title")) return "siteTitle";
      if (el.classList && el.classList.contains("login-subtitle")) return "siteSubtitle";
      if (el.id === "loginBtn") return "loginButton";
      if (el.classList && el.classList.contains("ending-title")) return "endingTitle";
      if (el.classList && el.classList.contains("ending-desc")) return "endingDescription";
      if (el.closest(".ending-footer")) return "endingFooter";
    }
    return "";
  }

  function isContentKey(k) {
    return ["siteTitle", "siteSubtitle", "loginButton", "heroTag", "heroTitle", "heroDescription", "heroButton", "endingTitle", "endingDescription", "endingFooter"].indexOf(k) !== -1;
  }

  /* --------------------------------------------------------
     UI helpers
     -------------------------------------------------------- */
  function makeEl(html) {
    const d = document.createElement("div");
    d.innerHTML = html.trim();
    if (d.childElementCount > 1) return d;
    return d.firstElementChild || d.firstChild;
  }

  let popover = null;

  function closePopover() {
    if (popover) {
      popover.remove();
      popover = null;
    }
  }

  function openPopover(anchor, contentEl) {
    closePopover();
    popover = makeEl('<div class="edit-popover"></div>');
    popover.appendChild(contentEl);
    document.body.appendChild(popover);
    positionPopover(anchor);
    document.addEventListener("mousedown", onDocDown, true);
  }

  function onDocDown(e) {
    if (!popover) return;
    if (!popover.contains(e.target)) {
      closePopover();
      document.removeEventListener("mousedown", onDocDown, true);
    }
  }

  function positionPopover(anchor) {
    const r = anchor.getBoundingClientRect();
    const pw = 320;
    let left = r.left + r.width / 2 - pw / 2;
    left = Math.max(8, Math.min(window.innerWidth - pw - 8, left));
    let top = r.bottom + 10;
    if (top + 260 > window.innerHeight) top = Math.max(8, r.top - 270);
    popover.style.left = left + "px";
    popover.style.top = top + "px";
  }

  /* Text editor */
  function openTextEditor(el, key) {
    const isHtml = (key === "heroTitle" || key === "endingTitle");
    const current = isHtml
      ? el.innerHTML.replace(/<br\s*\/?>/gi, "\n")
      : el.textContent;

    const wrap = makeEl(`
      <div class="edit-popover-head">${L("edit.clickHint")}</div>
      <textarea class="edit-popover-input" rows="4"></textarea>
      <div class="edit-popover-row">
        <button class="edit-popover-btn primary" data-act="save">${L("edit.save")}</button>
        <button class="edit-popover-btn" data-act="cancel">${L("edit.cancel")}</button>
      </div>`);
    const ta = wrap.querySelector("textarea");
    ta.value = current;
    ta.focus();
    ta.select();

    function commit() {
      let value = ta.value;
      if (isHtml) value = value.replace(/\n/g, "<br/>");
      if (isContentKey(key)) {
        if (!CONFIG.content) CONFIG.content = {};
        CONFIG.content[key] = value;
      } else {
        getCustom()[key] = value;
      }
      saveConfig();
      closePopover();
      refreshAfterEdit();
    }

    wrap.addEventListener("click", (e) => {
      const act = e.target.closest("[data-act]")?.dataset.act;
      if (act === "save") commit();
      else if (act === "cancel") closePopover();
    });
    ta.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) commit();
      if (e.key === "Escape") closePopover();
    });

    openPopover(el, wrap);
  }

  /* Image picker */
  function openImageEditor(img, key) {
    const media = (CONFIG.mediaLibrary || []).slice();
    const thumbs = media.length
      ? media.map((m) => `<div class="edit-pick-thumb" data-url="${cssEscape(m.url)}"><img src="${cssEscape(m.url)}" alt="" loading="lazy"></div>`).join("")
      : `<div class="edit-popover-hint">${L("edit.none")}</div>`;

    const wrap = makeEl(`
      <div class="edit-popover-head">${L("edit.imgHint")}</div>
      <div class="edit-pick-grid">${thumbs}</div>
      <input type="file" accept="image/*" id="editImgFile" style="display:none">
      <button class="edit-popover-btn" data-act="upload">${L("edit.choose")}</button>
      <div class="edit-popover-linkrow">
        <input type="url" class="edit-popover-input" placeholder="https://...">
        <button class="edit-popover-btn primary" data-act="link">${L("edit.applyLink")}</button>
      </div>
      <div class="edit-popover-row">
        <button class="edit-popover-btn danger" data-act="reset">${L("edit.reset")}</button>
        <button class="edit-popover-btn" data-act="cancel">${L("edit.cancel")}</button>
      </div>`);

    function apply(url) {
      if (!url) return;
      getCustom()[key] = url;
      saveConfig();
      img.src = url;
      img.style.opacity = "";
      img.style.visibility = "";
      closePopover();
      if (typeof window.refreshSections === "function") window.refreshSections();
    }

    wrap.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-act]");
      const thumb = e.target.closest(".edit-pick-thumb");
      if (thumb) { apply(thumb.dataset.url); return; }
      if (!btn) return;
      const act = btn.dataset.act;
      if (act === "upload") wrap.querySelector("#editImgFile").click();
      else if (act === "link") {
        const inp = wrap.querySelector("input[type=url]");
        apply(inp.value.trim());
      } else if (act === "reset") {
        delete getCustom()[key];
        saveConfig();
        closePopover();
        if (typeof window.refreshSections === "function") window.refreshSections();
      } else if (act === "cancel") closePopover();
    });
    wrap.querySelector("#editImgFile").addEventListener("change", (e) => {
      const files = Array.from(e.target.files || []);
      if (files.length && typeof handleMediaFiles === "function") {
        handleMediaFiles(files).then(() => {
          const lib = CONFIG.mediaLibrary;
          if (lib && lib.length) apply(lib[lib.length - 1].url);
        }).catch(() => {});
      }
    });

    openPopover(img, wrap);
  }

  function cssEscape(str) {
    return String(str).replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function refreshAfterEdit() {
    if (typeof applyContentOverrides === "function") applyContentOverrides();
    if (typeof applyCustomText === "function") applyCustomText();
    if (typeof window.refreshSections === "function") window.refreshSections();
  }

  /* --------------------------------------------------------
     Click handling while in edit mode
     -------------------------------------------------------- */
  function handleEditClick(e) {
    if (!active) return;
    try {
      const tgt = e.target;
      if (tgt.closest && tgt.closest(".edit-sec-tool")) return;
      if (tgt.closest && tgt.closest(".edit-popover")) return;
      if (tgt.closest && tgt.closest("#editModeBar")) return;

      const img = tgt.closest ? tgt.closest("img[data-ph]") : null;
      if (img) {
        e.preventDefault();
        e.stopPropagation();
        const section = img.closest("section[data-section]");
        const domId = section ? section.dataset.section : "";
        const idx = section
          ? Array.prototype.indexOf.call(section.querySelectorAll("img[data-ph]"), img)
          : 0;
        openImageEditor(img, getCustomImgKey(domId, idx));
        return;
      }

      const key = keyFor(tgt);
      if (key) {
        e.preventDefault();
        e.stopPropagation();
        openTextEditor(tgt, key);
      }
    } catch (err) {
      console.error("[editor]", err);
    }
  }

  /* Prevent native text selection while clicking editable text */
  function handleEditMousedown(e) {
    if (!active) return;
    const tgt = e.target;
    if (!tgt || !tgt.closest) return;
    if (tgt.closest(".edit-popover, .edit-gate, .edit-sec-tool, #editModeBar, img[data-ph], a, button, input, textarea, select")) return;
    if (keyFor(tgt)) e.preventDefault();
  }

  /* When NOT in edit mode, guide the owner to the pencil button */
  let lastHint = 0;
  function hintEdit() {
    const now = Date.now();
    if (now - lastHint < 5000) return;
    lastHint = now;
    toast(L("edit.hintNotActive"), false);
  }
  function handleNormalClick(e) {
    if (active) return;
    const tgt = e.target;
    if (!tgt || !tgt.closest) return;
    if (tgt.closest("#editModeBtn, .dash-overlay, .edit-popover, .edit-gate")) return;
    if (tgt.closest("img[data-ph]")) { hintEdit(); return; }
    if (keyFor(tgt)) hintEdit();
  }

  /* --------------------------------------------------------
     Per-section toolbar
     -------------------------------------------------------- */
  function buildSectionTools() {
    document.querySelectorAll("section[data-section]").forEach((sec) => {
      if (sec.querySelector(".edit-sec-tool")) return;
      const key = getSectionKeyByDomId(sec.dataset.section);
      const s = CONFIG.sections[key];
      const domId = sec.dataset.section;
      const tab = (typeof SECTIONS_LIST !== "undefined" && SECTIONS_LIST.find((x) => x.id === domId))
        ? SECTIONS_LIST.find((x) => x.id === domId).tab
        : (domId === "hero" ? "hero" : "general");

      const tool = makeEl(`
        <div class="edit-sec-tool">
          <button class="edit-sec-btn" data-act="toggle" title="${L("edit.toggleSec")}">${s && !s.enabled ? L("edit.hidden") : "&#9679;"}</button>
          <button class="edit-sec-btn" data-act="open" title="${L("edit.openSec")}">&#9881;</button>
        </div>`);
      tool.addEventListener("click", (e) => {
        const act = e.target.closest("[data-act]")?.dataset.act;
        if (!act) return;
        e.preventDefault();
        e.stopPropagation();
        if (act === "toggle") {
          if (CONFIG.sections[key]) {
            CONFIG.sections[key].enabled = !CONFIG.sections[key].enabled;
            sec.style.display = CONFIG.sections[key].enabled ? "" : "none";
            saveConfig();
            toggleSectionLifecycle(key);
          }
        } else if (act === "open") {
          if (typeof window.openDashboardSection === "function") {
            window.openDashboardSection(tab);
          }
        }
      });
      sec.appendChild(tool);
    });
  }

  function clearSectionTools() {
    document.querySelectorAll(".edit-sec-tool").forEach((el) => el.remove());
  }

  /* --------------------------------------------------------
     Entry: called from the dashboard ("Edit on page" button).
     Closes the dashboard and enters edit mode on the page.
     -------------------------------------------------------- */
  let bar = null;

  window.openEditFromDashboard = function () {
    document.querySelector(".dash-overlay")?.remove();
    document.body.classList.remove("dash-open");
    localStorage.setItem(AUTH_KEY, "true");
    sessionStorage.setItem(AUTH_KEY, "true");
    localStorage.setItem("dashboard_auth", "true");
    enterEditMode();
  };

  function enterEditMode() {
    active = true;
    document.body.classList.add(EDIT_CLASS);
    document.querySelector(".edit-gate")?.remove();
    buildBar();
    buildSectionTools();
    if (typeof window.refreshSections === "function") window.refreshSections();
  }

  function exitEditMode() {
    active = false;
    document.body.classList.remove(EDIT_CLASS);
    bar?.remove();
    bar = null;
    closePopover();
    clearSectionTools();
  }

  function buildBar() {
    bar?.remove();
    bar = makeEl(`
      <div id="editModeBar">
        <span class="edit-bar-label">&#9998; ${L("edit.clickHint")}</span>
        <button class="edit-popover-btn" data-act="sections">&#9776; ${L("edit.sections")}</button>
        <button class="edit-popover-btn primary" data-act="publish">&#8593; ${L("edit.publish")}</button>
        <button class="edit-popover-btn" data-act="done">${L("edit.exit")}</button>
      </div>`);
    bar.addEventListener("click", (e) => {
      const act = e.target.closest("[data-act]")?.dataset.act;
      if (act === "done") exitEditMode();
      else if (act === "publish") publishNow();
      else if (act === "sections") openSectionsPanel();
    });
    document.body.appendChild(bar);
  }

  /* Run a section's animation lifecycle after it is shown/hidden. */
  function toggleSectionLifecycle(key) {
    const el = document.getElementById(CONFIG.sections[key] && CONFIG.sections[key].id);
    if (el) el.style.display = CONFIG.sections[key].enabled ? "" : "none";
    if (typeof window.reinitSection === "function") window.reinitSection(key);
    if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
  }

  /* Panel listing every section so the owner can show/hide hidden
     animations even when the section is display:none. */
  function openSectionsPanel() {
    closePopover();
    const rows = (typeof SECTIONS_LIST !== "undefined" ? SECTIONS_LIST : [])
      .map((entry) => {
        const key = getSectionKeyByDomId(entry.id);
        const s = CONFIG.sections[key];
        if (!s) return "";
        const on = s.enabled !== false;
        const label =
          (typeof t === "function" &&
            typeof window !== "undefined" &&
            t("dash.panel." + entry.tab) !== "dash.panel." + entry.tab
            ? t("dash.panel." + entry.tab)
            : entry.label) || entry.label;
        return `
          <div class="edit-sec-row" data-key="${key}">
            <span class="edit-sec-name">${label}</span>
            <label class="edit-sec-switch">
              <input type="checkbox" data-sk="${key}" ${on ? "checked" : ""}>
              <span class="edit-sec-track"></span>
            </label>
          </div>`;
      })
      .join("");

    const wrap = makeEl(`
      <div class="edit-popover-head">${L("edit.sectionsHint")}</div>
      <div class="edit-sec-list">${rows}</div>
      <div class="edit-popover-row">
        <button class="edit-popover-btn" data-act="close">${L("edit.close")}</button>
      </div>`);

    wrap.addEventListener("click", (e) => {
      if (e.target.closest('[data-act="close"]')) closePopover();
    });
    wrap.addEventListener("change", (e) => {
      const cb = e.target.closest('input[data-sk]');
      if (!cb) return;
      const key = cb.dataset.sk;
      if (CONFIG.sections[key]) {
        CONFIG.sections[key].enabled = cb.checked;
        saveConfig();
        toggleSectionLifecycle(key);
      }
    });

    openPopover(bar || document.body, wrap);
    const list = wrap.querySelector(".edit-sec-list");
    if (list) list.scrollTop = list.scrollHeight;
  }

  function publishNow() {
    if (typeof publishConfigToGithub === "function" && CONFIG.github && CONFIG.github.token && CONFIG.github.repo) {
      publishConfigToGithub()
        .then((ok) => {
          if (ok === false) toast(L("edit.publishFail"), true);
          else toast(L("edit.published"));
        })
        .catch(() => toast(L("edit.publishFail"), true));
    } else {
      toast(L("edit.publishFail"), true);
    }
  }

  function toast(msg, isErr) {
    const el = makeEl(`<div class="edit-toast${isErr ? " err" : ""}">${msg}</div>`);
    document.body.appendChild(el);
    setTimeout(() => {
      el.classList.add("out");
      setTimeout(() => el.remove(), 400);
    }, 2600);
  }

  /* --------------------------------------------------------
     Init
     -------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    /* intercept clicks / dblclicks while editing */
    document.addEventListener("click", handleEditClick, true);
    document.addEventListener("mousedown", handleEditMousedown, true);
    document.addEventListener("click", handleNormalClick, true);
    document.addEventListener("keydown", (e) => {
      if (active && e.key === "Escape") {
        closePopover();
        exitEditMode();
      }
    });

    /* restore mode for this session */
    if (sessionStorage.getItem(AUTH_KEY) === "true" && localStorage.getItem(AUTH_KEY) === "true") {
      enterEditMode();
    }
  });
})();
