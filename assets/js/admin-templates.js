/* ============================================================
   Memory Studio — Template Library
   10 occasions × 10 looks (same engine, different presets)
   Generated configs follow the shape of config.js / config.json
   ============================================================ */

const ADMIN_TEMPLATES = (function () {
  const OCCASIONS = [
    { id: "birthday", en: "Birthday", ar: "عيد ميلاد", emoji: "🎂" },
    { id: "anniversary", en: "Anniversary", ar: "ذكرى سنوية", emoji: "💍" },
    { id: "wedding", en: "Wedding", ar: "زفاف", emoji: "💒" },
    { id: "engagement", en: "Engagement", ar: "خطوبة", emoji: "💞" },
    { id: "love", en: "Love & Crush", ar: "حب و كراش", emoji: "💘" },
    { id: "graduation", en: "Graduation", ar: "تخرج", emoji: "🎓" },
    { id: "baby", en: "New Baby", ar: "مولود جديد", emoji: "🍼" },
    { id: "valentine", en: "Valentine", ar: "فلانتين", emoji: "❤️" },
    { id: "mother", en: "Mother's Day", ar: "عيد الأم", emoji: "🌷" },
    { id: "newyear", en: "Holiday", ar: "أعياد", emoji: "🎉" },
  ];

  const LOOKS = [
    {
      id: "rosy",
      en: "Rosy Classic",
      ar: "وردة كلاسيكية",
      head: "Playfair Display",
      body: "Inter",
      theme: {
        background: "#1a0a10",
        backgroundSecondary: "#241018",
        accent: "#ff4d6d",
        accentSecondary: "#e8a87c",
        accentTertiary: "#ffd166",
        text: "#ffffff",
        textMuted: "rgba(255,255,255,0.62)",
        glassBg: "rgba(255,255,255,0.05)",
        glassBorder: "rgba(255,255,255,0.09)",
        blur: 20,
        radius: 30,
        fontSize: 16,
      },
      disabled: [],
    },
    {
      id: "neon",
      en: "Neon Love",
      ar: "نيون",
      head: "Space Grotesk",
      body: "Inter",
      theme: {
        background: "#0b0514",
        backgroundSecondary: "#150a26",
        accent: "#ff2d95",
        accentSecondary: "#7c4dff",
        accentTertiary: "#00ffc8",
        text: "#ffffff",
        textMuted: "rgba(255,255,255,0.6)",
        glassBg: "rgba(124,77,255,0.12)",
        glassBorder: "rgba(124,77,255,0.3)",
        blur: 16,
        radius: 18,
        fontSize: 16,
      },
      disabled: ["parallax-layers", "before-after"],
    },
    {
      id: "ocean",
      en: "Ocean Breeze",
      ar: "أزرق محيطي",
      head: "Cairo",
      body: "Inter",
      theme: {
        background: "#06121a",
        backgroundSecondary: "#0a1c28",
        accent: "#00c2ff",
        accentSecondary: "#7c4dff",
        accentTertiary: "#2af5a8",
        text: "#ffffff",
        textMuted: "rgba(255,255,255,0.6)",
        glassBg: "rgba(0,194,255,0.08)",
        glassBorder: "rgba(0,194,255,0.22)",
        blur: 22,
        radius: 26,
        fontSize: 16,
      },
      disabled: ["memory-explosion"],
    },
    {
      id: "sunset",
      en: "Golden Sunset",
      ar: "غروب ذهبي",
      head: "Marhey",
      body: "Tajawal",
      theme: {
        background: "#1a0a12",
        backgroundSecondary: "#241017",
        accent: "#ff8c42",
        accentSecondary: "#ff4d6d",
        accentTertiary: "#ffd166",
        text: "#fff7ec",
        textMuted: "rgba(255,247,236,0.6)",
        glassBg: "rgba(255,140,66,0.1)",
        glassBorder: "rgba(255,140,66,0.28)",
        blur: 18,
        radius: 34,
        fontSize: 16,
      },
      disabled: [],
    },
    {
      id: "emerald",
      en: "Emerald Green",
      ar: "زمرد",
      head: "El Messiri",
      body: "Cairo",
      theme: {
        background: "#051410",
        backgroundSecondary: "#0a1d16",
        accent: "#2af5a8",
        accentSecondary: "#00c2ff",
        accentTertiary: "#ffd166",
        text: "#f2fff9",
        textMuted: "rgba(242,255,249,0.62)",
        glassBg: "rgba(42,245,168,0.08)",
        glassBorder: "rgba(42,245,168,0.22)",
        blur: 20,
        radius: 22,
        fontSize: 16,
      },
      disabled: ["marquee", "orbit-gallery"],
    },
    {
      id: "royal",
      en: "Royal Gold",
      ar: "ملكي ذهبي",
      head: "Playfair Display",
      body: "Almarai",
      theme: {
        background: "#120a1e",
        backgroundSecondary: "#1a1130",
        accent: "#b06aff",
        accentSecondary: "#ffd166",
        accentTertiary: "#ff8c42",
        text: "#ffffff",
        textMuted: "rgba(255,255,255,0.6)",
        glassBg: "rgba(176,106,255,0.1)",
        glassBorder: "rgba(255,209,102,0.25)",
        blur: 20,
        radius: 16,
        fontSize: 16,
      },
      disabled: ["bento-grid", "heartbeat"],
    },
    {
      id: "blush",
      en: "Soft Blush",
      ar: "وردي ناعم",
      head: "Lalezar",
      body: "Changa",
      theme: {
        background: "#1c1018",
        backgroundSecondary: "#261820",
        accent: "#ffb3c1",
        accentSecondary: "#ff8fab",
        accentTertiary: "#ffd166",
        text: "#fff5f7",
        textMuted: "rgba(255,245,247,0.62)",
        glassBg: "rgba(255,179,193,0.08)",
        glassBorder: "rgba(255,179,193,0.25)",
        blur: 24,
        radius: 36,
        fontSize: 16,
      },
      disabled: ["marquee", "vertical-marquee"],
    },
    {
      id: "midnight",
      en: "Midnight Violet",
      ar: "بنفسجي ليلي",
      head: "Amiri",
      body: "Tajawal",
      theme: {
        background: "#050814",
        backgroundSecondary: "#0b1020",
        accent: "#7c4dff",
        accentSecondary: "#00c2ff",
        accentTertiary: "#ff2d95",
        text: "#f2f0ff",
        textMuted: "rgba(242,240,255,0.6)",
        glassBg: "rgba(124,77,255,0.1)",
        glassBorder: "rgba(124,77,255,0.26)",
        blur: 20,
        radius: 24,
        fontSize: 16,
      },
      disabled: ["split-story", "floating-polaroids"],
    },
    {
      id: "golden",
      en: "Champagne Gold",
      ar: "شامبين ذهبي",
      head: "Reem Kufi",
      body: "Tajawal",
      theme: {
        background: "#14100a",
        backgroundSecondary: "#1e1810",
        accent: "#ffd166",
        accentSecondary: "#ffb347",
        accentTertiary: "#ff4d6d",
        text: "#fffaf0",
        textMuted: "rgba(255,250,240,0.62)",
        glassBg: "rgba(255,209,102,0.08)",
        glassBorder: "rgba(255,209,102,0.24)",
        blur: 20,
        radius: 14,
        fontSize: 16,
      },
      disabled: ["carousel", "photo-wall"],
    },
    {
      id: "boldred",
      en: "Bold Red",
      ar: "أحمر جريء",
      head: "Archivo Black",
      body: "Inter",
      theme: {
        background: "#120407",
        backgroundSecondary: "#1d0a0e",
        accent: "#ff2b3a",
        accentSecondary: "#ffd166",
        accentTertiary: "#7c4dff",
        text: "#ffffff",
        textMuted: "rgba(255,255,255,0.62)",
        glassBg: "rgba(255,43,58,0.08)",
        glassBorder: "rgba(255,43,58,0.26)",
        blur: 14,
        radius: 10,
        fontSize: 16,
      },
      disabled: ["love-notes", "heartbeat", "vertical-marquee"],
    },
  ];

  const COPY = {
    birthday: {
      siteTitle: "عيد ميلاد سعيد 🎂",
      loginButton: "ادخل لتشوف المفاجأة",
      heroTitle: "كل سنة وأنتِ<br/>أجمل حاجة في حياتي",
      heroDescription: "عيد ميلاد سعيد حبيبتي",
      endingTitle: "كل سنة وانتِ طيبة",
      endingDescription: "أتمنى لكِ سنة مليانة فرح ونجاح",
      endingFooter: "مع حبي دائماً",
    },
    anniversary: {
      siteTitle: "ذكرى سنوية 💍",
      loginButton: "افتح ذكرياتنا",
      heroTitle: "سنة جديدة<br/>معاك",
      heroDescription: "ذكرى سنوية سعيدة",
      endingTitle: "سنين كتير جاية",
      endingDescription: "كل سنة وحكايتنا أجمل",
      endingFooter: "بحبك",
    },
    wedding: {
      siteTitle: "زفافنا 💒",
      loginButton: "ادخل للذكريات",
      heroTitle: "زواجنا<br/>بداية الحكاية",
      heroDescription: "أجمل يوم في حياتنا",
      endingTitle: "شكراً لأنكِ وافقتِ",
      endingDescription: "أعدك بحياة مليانة حب",
      endingFooter: "بالحب",
    },
    engagement: {
      siteTitle: "خطوبتنا 💞",
      loginButton: "افتح الحكاية",
      heroTitle: "خطبتنا<br/>أحلى حكاية",
      heroDescription: "كتبناه على بعض",
      endingTitle: "لأجمل بداية",
      endingDescription: "كل يوم معاكِ أجمل من اللي قبله",
      endingFooter: "بحبك",
    },
    love: {
      siteTitle: "لكِ أنتِ 💘",
      loginButton: "افتح الرسالة",
      heroTitle: "من أول يوم<br/>شفتك",
      heroDescription: "أجمل حاجة حصلتلي",
      endingTitle: "أنتِ الحب كله",
      endingDescription: "كل لحظة معاكِ هدية",
      endingFooter: "كل اللي عندي",
    },
    graduation: {
      siteTitle: "مبروك التخرج 🎓",
      loginButton: "ادخل لشوف المفاجأة",
      heroTitle: "يوم النجاح<br/>وصّلنا",
      heroDescription: "مبروك، فخور بيك جداً",
      endingTitle: "دا أول مشوار",
      endingDescription: "وراكِ مستقبل مشرق",
      endingFooter: "مبروك",
    },
    baby: {
      siteTitle: "أهلاً بالحلو 🍼",
      loginButton: "افتح الذكريات",
      heroTitle: "أهلاً<br/>بالحلو الجديد",
      heroDescription: "مولود جديد … بسمة و ضحكة",
      endingTitle: "أجمل حاجة حصلت",
      endingDescription: "نور بيتنا",
      endingFooter: "أهلاً وسهلاً",
    },
    valentine: {
      siteTitle: "عيد الحب ❤️",
      loginButton: "افتح الهدية",
      heroTitle: "في يوم الحب<br/>بتمنالك",
      heroDescription: "أنتِ الحب",
      endingTitle: "كل سنة وإنتِ حبي",
      endingDescription: "الحب الحقيقي أنتِ",
      endingFooter: "في كل لحظة",
    },
    mother: {
      siteTitle: "عيد الأم 🌷",
      loginButton: "افتح الهدية",
      heroTitle: "أمي<br/>نور حياتي",
      heroDescription: "كل سنة وأنتِ طيبة",
      endingTitle: "أنتِ أجمل حاجة",
      endingDescription: "شكراً على كل حاجة",
      endingFooter: "بحبك يا أمي",
    },
    newyear: {
      siteTitle: "أعياد سعيدة 🎉",
      loginButton: "افتح المفاجأة",
      heroTitle: "سنة سعيدة<br/>وجاية أحلى",
      heroDescription: "سنوات أجمل معاك",
      endingTitle: "لكل سنة جاية",
      endingDescription: "معاكِ وأحلى",
      endingFooter: "سنة سعيدة",
    },
  };

  const SECTION_TITLES = {
    birthday: {
      statistics: { title: "أيام مع بعض" },
    },
    anniversary: {
      statistics: { title: "أيام حب" },
    },
    wedding: {
      statistics: { title: "حكايتنا بالأرقام" },
    },
    engagement: {
      statistics: { title: "أيام الخطوبة" },
    },
    love: {
      statistics: { title: "حكايتنا بالأرقام" },
    },
    graduation: {
      statistics: { title: "سنيين التعب" },
    },
    baby: {
      statistics: { title: "أول أيامه" },
    },
    valentine: {
      statistics: { title: "حكايتنا بالأرقام" },
    },
    mother: {
      statistics: { title: "أيام جميلة" },
    },
    newyear: {
      statistics: { title: "لحظات السنة" },
    },
  };

  function fontCss(head, body) {
    const fam = {
      "Playfair Display": "Playfair+Display:wght@500;600;700",
      "Space Grotesk": "Space+Grotesk:wght@400;500;700",
      Cairo: "Cairo:wght@400;600;700",
      Marhey: "Marhey:wght@400;600",
      "El Messiri": "El+Messiri:wght@500;600;700",
      Almarai: "Almarai:wght@300;400;700",
      Lalezar: "Lalezar:wght@400",
      Changa: "Changa:wght@400;600",
      Amiri: "Amiri:wght@400;700",
      "Reem Kufi": "Reem+Kufi:wght@400;600",
      "Archivo Black": "Archivo+Black:wght@400",
    };
    return (
      "@import url('https://fonts.googleapis.com/css2?family=" +
      (fam[head] || fam.Cairo) +
      "&family=" +
      (fam[body] || fam.Cairo) +
      "&display=swap');\n" +
      ":root{--font-sans:'" +
      body +
      "',sans-serif;--font-serif:'" +
      head +
      "',serif;}"
    );
  }

  function buildTemplate(occasion, look) {
    const copy = COPY[occasion.id] || COPY.love;
    const sectTitles = SECTION_TITLES[occasion.id] || {};
    const sections = {};
    (look.disabled || []).forEach((id) => {
      sections[id] = { enabled: false };
    });
    const config = {
      sitePassword: "",
      content: {
        siteTitle: copy.siteTitle,
        siteSubtitle: copy.heroDescription,
        loginButton: copy.loginButton,
        heroTitle: copy.heroTitle,
        heroDescription: copy.heroDescription,
        heroButton: copy.loginButton,
        endingTitle: copy.endingTitle,
        endingDescription: copy.endingDescription,
        endingFooter: copy.endingFooter,
      },
      theme: Object.assign({}, look.theme, {
        customCSS: fontCss(look.head, look.body),
      }),
      sections: sections,
    };
    if (Object.keys(sectTitles).length) {
      config.sections = Object.assign({}, sections, sectTitles);
    }
    return {
      id: occasion.id + "-" + look.id,
      occasion: occasion.id,
      lookId: look.id,
      nameAr: occasion.ar + " — " + look.ar,
      nameEn: occasion.en + " — " + look.en,
      emoji: occasion.emoji,
      head: look.head,
      body: look.body,
      swatches: [
        look.theme.background,
        look.theme.accent,
        look.theme.accentSecondary,
        look.theme.accentTertiary,
      ],
      config: config,
    };
  }

  return {
    occasions: OCCASIONS,
    looks: LOOKS,
    getTemplates: function (occasionId) {
      const occ =
        OCCASIONS.find((o) => o.id === occasionId) || OCCASIONS[0];
      return LOOKS.map((look) => buildTemplate(occ, look));
    },
    getTemplate: function (templateId) {
      for (const o of OCCASIONS) {
        const t = this.getTemplates(o.id).find((x) => x.id === templateId);
        if (t) return t;
      }
      return null;
    },
  };
})();
