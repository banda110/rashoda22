const CONFIG = {
  sitePassword: "1/8/2007",
  dashboardPassword: "love",
  theme: {
    background: "#0a0a0a",
    backgroundSecondary: "#111111",
    accent: "#ff4d6d",
    accentSecondary: "#7c4dff",
    accentTertiary: "#00c2ff",
    text: "#ffffff",
    textMuted: "rgba(255,255,255,0.6)",
    glassBg: "rgba(255,255,255,0.05)",
    glassBorder: "rgba(255,255,255,0.08)",
    blur: 20,
    radius: 30,
    backgroundImage: "",
  },
  effects: {
    particles: true,
    aurora: true,
    noise: true,
    grain: true,
    cursor: true,
    mouseGlow: true,
    scrollProgress: true,
  },
  animation: {
    speed: "normal",
    multiplier: 1,
  },
  content: {
    siteTitle: "",
    siteSubtitle: "",
    loginButton: "",
    heroTag: "",
    heroTitle: "Happy birth<br/>day baby ",
    heroDescription: "1/8/2007",
    heroButton: "",
    endingTitle: "",
    endingDescription: "",
    endingFooter: "",
  },
  github: {
    token: "",
    repo: "",
  },
  mediaLibrary: [],
  sections: {
    hero: {
      id: "hero",
      enabled: true,
      title: "Every Memory Tells A Story",
      subtitle: "A Story Worth Remembering",
      description: "Some moments stay with us forever.",
      animationSpeed: 1,
      layout: "center",
      animationStyle: "",
      images: [],
    },
    floatingMemories: {
      id: "floating-memories",
      enabled: true,
      title: "Floating Moments",
      subtitle: "Memories",
      description: "A collection of beautiful memories suspended in time.",
      animationSpeed: 1,
      layout: "floating",
      animationStyle: "",
      images: [],
    },
    marquee: {
      id: "marquee",
      enabled: true,
      title: "Infinite Memories",
      subtitle: "Gallery",
      description: "Moments that never end.",
      animationSpeed: 1,
      layout: "marquee",
      animationStyle: "",
      images: [],
    },
    stackCards: {
      id: "stack-cards",
      enabled: true,
      title: "Stacked Memories",
      subtitle: "Story",
      description: "Every memory reveals the next chapter.",
      animationSpeed: 1,
      layout: "stack",
      animationStyle: "",
      images: [],
    },
    timeline: {
      id: "timeline",
      enabled: true,
      title: "Journey Through Memories",
      subtitle: "Timeline",
      description: "Every moment has its place in our story.",
      animationSpeed: 1,
      layout: "timeline",
      animationStyle: "",
      images: [],
    },
    memoryExplosion: {
      id: "memory-explosion",
      enabled: true,
      title: "Memories Everywhere",
      subtitle: "Explosion",
      description: "Every memory comes alive at once.",
      animationSpeed: 1,
      layout: "explosion",
      animationStyle: "",
      images: [],
    },
    flipCards: {
      id: "flip-cards",
      enabled: true,
      title: "3D Flip Cards",
      subtitle: "Moments",
      description: "Turn the card to reveal the memory.",
      animationSpeed: 1,
      layout: "flip",
      animationStyle: "",
      images: [],
    },
    loveQuotes: {
      id: "love-quotes",
      enabled: true,
      title: "Love Quotes",
      subtitle: "Words",
      description: "Words from the heart.",
      animationSpeed: 1,
      layout: "quotes",
      animationStyle: "",
      images: [],
    },
    statistics: {
      id: "statistics",
      enabled: true,
      title: "Our Story In Numbers",
      subtitle: "Numbers",
      description: "Every moment counts.",
      animationSpeed: 1,
      layout: "stats",
      animationStyle: "",
      images: [],
    },
    orbitGallery: {
      id: "orbit-gallery",
      enabled: true,
      title: "Orbit Gallery",
      subtitle: "Orbit",
      description: "Memories orbiting around us.",
      animationSpeed: 1,
      layout: "orbit",
      animationStyle: "",
      images: [],
    },
    horizontalStory: {
      id: "horizontal-story",
      enabled: true,
      title: "A Horizontal Journey",
      subtitle: "Story",
      description: "Scroll sideways through our story.",
      animationSpeed: 1,
      layout: "horizontal",
      animationStyle: "",
      images: [],
    },
    parallaxLayers: {
      id: "parallax-layers",
      enabled: true,
      title: "Parallax Layers",
      subtitle: "Depth",
      description: "Memories with depth.",
      animationSpeed: 1,
      layout: "parallax",
      animationStyle: "",
      images: [],
    },
    photoWall: {
      id: "photo-wall",
      enabled: true,
      title: "Infinite Photo Wall",
      subtitle: "Wall",
      description: "Every memory on display.",
      animationSpeed: 1,
      layout: "masonry",
      animationStyle: "",
      images: [],
    },
    cinematicReveal: {
      id: "cinematic-reveal",
      enabled: true,
      title: "Cinematic Reveal",
      subtitle: "Reveal",
      description: "A dramatic reveal of our favorite moments.",
      animationSpeed: 1,
      layout: "reveal",
      animationStyle: "",
      images: [],
    },
    beforeAfter: {
      id: "before-after",
      enabled: true,
      title: "Before & After",
      subtitle: "Then & Now",
      description: "How our journey has transformed us.",
      animationSpeed: 1,
      layout: "ba",
      animationStyle: "",
      images: [],
    },
    floatingPolaroids: {
      id: "floating-polaroids",
      enabled: true,
      title: "Floating Polaroids",
      subtitle: "Polaroids",
      description: "Polaroid memories floating freely.",
      animationSpeed: 1,
      layout: "polaroid",
      animationStyle: "",
      images: [],
    },
    carousel: {
      id: "carousel",
      enabled: true,
      title: "Memory Carousel",
      subtitle: "Carousel",
      description: "Drag through the memories.",
      animationSpeed: 1,
      layout: "carousel",
      animationStyle: "",
      images: [],
    },
    spotlight: {
      id: "spotlight",
      enabled: true,
      title: "Spotlight Gallery",
      subtitle: "Spotlight",
      description: "Move your cursor to reveal the light.",
      animationSpeed: 1,
      layout: "spotlight",
      animationStyle: "",
      images: [],
    },
    bentoGrid: {
      id: "bento-grid",
      enabled: true,
      title: "Bento Grid",
      subtitle: "Bento",
      description: "Beautifully arranged memories.",
      animationSpeed: 1,
      layout: "bento",
      animationStyle: "",
      images: [],
    },
    splitStory: {
      id: "split-story",
      enabled: true,
      title: "Split Story",
      subtitle: "Narrative",
      description: "Two perspectives, one story.",
      animationSpeed: 1,
      layout: "split",
      animationStyle: "",
      images: [],
    },
    stickyChapters: {
      id: "sticky-chapters",
      enabled: true,
      title: "Sticky Chapters",
      subtitle: "Chapters",
      description: "A scroll-driven narrative.",
      animationSpeed: 1,
      layout: "chapters",
      animationStyle: "",
      images: [],
    },
    verticalMarquee: {
      id: "vertical-marquee",
      enabled: true,
      title: "Vertical Flow",
      subtitle: "Flow",
      description: "Memories flowing endlessly.",
      animationSpeed: 1,
      layout: "vmarquee",
      animationStyle: "",
      images: [],
    },
    loveNotes: {
      id: "love-notes",
      enabled: true,
      title: "Floating Love Notes",
      subtitle: "Notes",
      description: "Little messages of love floating by.",
      animationSpeed: 1,
      layout: "notes",
      animationStyle: "",
      images: [],
    },
    heartbeat: {
      id: "heartbeat",
      enabled: true,
      title: "Heartbeat Showcase",
      subtitle: "Heartbeat",
      description: "The rhythm of our love.",
      animationSpeed: 1,
      layout: "heartbeat",
      animationStyle: "",
      images: [],
    },
    finalEnding: {
      id: "final-ending",
      enabled: true,
      title: "Final Cinematic Ending",
      subtitle: "Ending",
      description: "A grand finale to our story.",
      animationSpeed: 1,
      layout: "ending",
      animationStyle: "",
      images: [],
    },
  },
  stackCards: [
    {
      title: "First Memory",
      description: "The beginning of everything.",
      image: "",
    },
    {
      title: "Second Memory",
      description: "A beautiful day together.",
      image: "",
    },
    {
      title: "Third Memory",
      description: "Moments worth keeping forever.",
      image: "",
    },
    {
      title: "Fourth Memory",
      description: "Forever in our hearts.",
      image: "",
    },
  ],
  timeline: [
    {
      date: "2021",
      title: "The Beginning",
      description: "Where it all started.",
      image: "",
    },
    {
      date: "2022",
      title: "Growing Together",
      description: "Every day stronger.",
      image: "",
    },
    {
      date: "2023",
      title: "Beautiful Moments",
      description: "Laughter and joy.",
      image: "",
    },
    {
      date: "2024",
      title: "New Adventures",
      description: "Exploring the world.",
      image: "",
    },
    {
      date: "2025",
      title: "Forever Us",
      description: "A story still being written.",
      image: "",
    },
  ],
  quotes: [
    {
      text: "Every moment with you is a beautiful memory.",
      author: "Our Story",
    },
    {
      text: "You are the best thing that ever happened to me.",
      author: "Forever",
    },
    { text: "In your eyes, I found my home.", author: "Endless Love" },
    { text: "Together is the most beautiful place to be.", author: "Us" },
  ],
  loveNotes: [
    { text: "You make my world brighter." },
    { text: "Every day with you is a gift." },
    { text: "I love you more than words can say." },
    { text: "You are my everything." },
    { text: "Forever and always." },
  ],
  animationPresets: [
    {
      id: "split-text",
      name: "Split Text",
      type: "2d",
      category: "hero",
      requiresImages: 0,
      description: "Characters stagger in with 3D rotation",
      defaultSettings: { animationSpeed: 1 },
    },
    {
      id: "ken-burns",
      name: "Ken Burns",
      type: "2d",
      category: "hero",
      requiresImages: 1,
      description: "Slow zoom & pan background",
      defaultSettings: { animationSpeed: 1 },
    },
    {
      id: "floating-cards",
      name: "Floating Cards",
      type: "2d",
      category: "gallery",
      requiresImages: 4,
      description: "Cards drift with parallax float",
      defaultSettings: { animationSpeed: 1, layout: "floating" },
    },
    {
      id: "infinite-marquee",
      name: "Infinite Marquee",
      type: "2d",
      category: "gallery",
      requiresImages: 4,
      description: "Endless horizontal scroll",
      defaultSettings: { animationSpeed: 1, layout: "marquee" },
    },
    {
      id: "stack-reveal",
      name: "Stack Reveal",
      type: "2d",
      category: "story",
      requiresImages: 4,
      description: "Sticky stack cards revealing in order",
      defaultSettings: { animationSpeed: 1, layout: "stack" },
    },
    {
      id: "timeline-progress",
      name: "Timeline Progress",
      type: "2d",
      category: "story",
      requiresImages: 5,
      description: "Scrolling timeline with progress bar",
      defaultSettings: { animationSpeed: 1, layout: "timeline" },
    },
    {
      id: "explosion-burst",
      name: "Explosion Burst",
      type: "2d",
      category: "gallery",
      requiresImages: 6,
      description: "Cards explode from center on scroll",
      defaultSettings: { animationSpeed: 1, layout: "explosion" },
    },
    {
      id: "3d-flip",
      name: "3D Flip",
      type: "3d",
      category: "interactive",
      requiresImages: 4,
      description: "Cards flip with 3D perspective on hover",
      defaultSettings: { animationSpeed: 1, layout: "flip" },
    },
    {
      id: "orbit-rotation",
      name: "Orbit Rotation",
      type: "3d",
      category: "gallery",
      requiresImages: 8,
      description: "Images orbit around a center point",
      defaultSettings: { animationSpeed: 1, layout: "orbit" },
    },
    {
      id: "horizontal-scroll",
      name: "Horizontal Scroll",
      type: "2d",
      category: "story",
      requiresImages: 5,
      description: "Pinned horizontal scroll through panels",
      defaultSettings: { animationSpeed: 1, layout: "horizontal" },
    },
    {
      id: "parallax-depth",
      name: "Parallax Depth",
      type: "2d",
      category: "visual",
      requiresImages: 3,
      description: "Multi-layer parallax with different speeds",
      defaultSettings: { animationSpeed: 1, layout: "parallax" },
    },
    {
      id: "masonry-wall",
      name: "Masonry Wall",
      type: "2d",
      category: "gallery",
      requiresImages: 8,
      description: "Staggered masonry grid with fade-in",
      defaultSettings: { animationSpeed: 1, layout: "masonry" },
    },
    {
      id: "clip-reveal",
      name: "Clip Reveal",
      type: "2d",
      category: "visual",
      requiresImages: 1,
      description: "Circle clip-path reveal on scroll",
      defaultSettings: { animationSpeed: 1, layout: "reveal" },
    },
    {
      id: "before-after",
      name: "Before / After",
      type: "2d",
      category: "interactive",
      requiresImages: 2,
      description: "Slider comparing two images",
      defaultSettings: { animationSpeed: 1, layout: "ba" },
    },
    {
      id: "polaroid-float",
      name: "Polaroid Float",
      type: "2d",
      category: "gallery",
      requiresImages: 5,
      description: "Polaroids scattered with gentle float",
      defaultSettings: { animationSpeed: 1, layout: "polaroid" },
    },
    {
      id: "draggable-carousel",
      name: "Draggable Carousel",
      type: "2d",
      category: "interactive",
      requiresImages: 6,
      description: "Drag horizontally through items",
      defaultSettings: { animationSpeed: 1, layout: "carousel" },
    },
    {
      id: "spotlight-hover",
      name: "Spotlight Hover",
      type: "2d",
      category: "interactive",
      requiresImages: 6,
      description: "Hover dims non-active items",
      defaultSettings: { animationSpeed: 1, layout: "spotlight" },
    },
    {
      id: "bento-grid",
      name: "Bento Grid",
      type: "2d",
      category: "gallery",
      requiresImages: 6,
      description: "Grid with staggered reveal",
      defaultSettings: { animationSpeed: 1, layout: "bento" },
    },
    {
      id: "split-slide",
      name: "Split Slide",
      type: "2d",
      category: "story",
      requiresImages: 1,
      description: "Image & text slide from opposite sides",
      defaultSettings: { animationSpeed: 1, layout: "split" },
    },
    {
      id: "chapter-scroll",
      name: "Chapter Scroll",
      type: "2d",
      category: "story",
      requiresImages: 4,
      description: "Sticky chapter narrative with visual",
      defaultSettings: { animationSpeed: 1, layout: "chapters" },
    },
    {
      id: "vertical-flow",
      name: "Vertical Flow",
      type: "2d",
      category: "gallery",
      requiresImages: 6,
      description: "Endless vertical scrolling images",
      defaultSettings: { animationSpeed: 1, layout: "vmarquee" },
    },
    {
      id: "note-float",
      name: "Note Float",
      type: "2d",
      category: "text",
      requiresImages: 0,
      description: "Floating love note cards",
      defaultSettings: { animationSpeed: 1, layout: "notes" },
    },
    {
      id: "heartbeat-pulse",
      name: "Heartbeat Pulse",
      type: "2d",
      category: "visual",
      requiresImages: 0,
      description: "Pulsing heart with EKG line",
      defaultSettings: { animationSpeed: 1, layout: "heartbeat" },
    },
    {
      id: "ending-reveal",
      name: "Ending Reveal",
      type: "2d",
      category: "text",
      requiresImages: 0,
      description: "Cinematic finale with staggered text",
      defaultSettings: { animationSpeed: 1, layout: "ending" },
    },
    {
      id: "quote-cycle",
      name: "Quote Cycle",
      type: "2d",
      category: "text",
      requiresImages: 0,
      description: "Auto-cycling quote cards",
      defaultSettings: { animationSpeed: 1, layout: "quotes" },
    },
    {
      id: "count-up",
      name: "Count Up Stats",
      type: "2d",
      category: "text",
      requiresImages: 0,
      description: "Number counters that animate on scroll",
      defaultSettings: { animationSpeed: 1, layout: "stats" },
    },
  ],
  pageBundles: [
    {
      id: "romantic-story",
      name: "Romantic Love Story",
      description:
        "A complete love story page — floating memories, timeline, quotes, and a heartbeat finale.",
      sections: [
        "hero",
        "floatingMemories",
        "marquee",
        "timeline",
        "loveQuotes",
        "heartbeat",
        "finalEnding",
      ],
    },
    {
      id: "adventure-gallery",
      name: "Adventure Gallery",
      description:
        "Showcase adventures with explosion gallery, polaroids, carousel, and photo wall.",
      sections: [
        "hero",
        "memoryExplosion",
        "floatingPolaroids",
        "carousel",
        "photoWall",
        "bentoGrid",
        "finalEnding",
      ],
    },
    {
      id: "interactive-showcase",
      name: "Interactive Showcase",
      description:
        "Flip cards, spotlight, orbit gallery, before/after slider and draggable carousel.",
      sections: [
        "hero",
        "flipCards",
        "spotlight",
        "orbitGallery",
        "beforeAfter",
        "carousel",
        "finalEnding",
      ],
    },
    {
      id: "story-narrative",
      name: "Story Narrative",
      description:
        "Scroll-driven narrative with timeline, horizontal panels, sticky chapters, and split story.",
      sections: [
        "hero",
        "horizontalStory",
        "timeline",
        "splitStory",
        "stickyChapters",
        "parallaxLayers",
        "finalEnding",
      ],
    },
    {
      id: "full-experience",
      name: "Full Experience",
      description:
        "Every section enabled — the complete cinematic memory website.",
      sections: [
        "hero",
        "floatingMemories",
        "marquee",
        "stackCards",
        "timeline",
        "memoryExplosion",
        "flipCards",
        "loveQuotes",
        "statistics",
        "orbitGallery",
        "horizontalStory",
        "parallaxLayers",
        "photoWall",
        "cinematicReveal",
        "beforeAfter",
        "floatingPolaroids",
        "carousel",
        "spotlight",
        "bentoGrid",
        "splitStory",
        "stickyChapters",
        "verticalMarquee",
        "loveNotes",
        "heartbeat",
        "finalEnding",
      ],
    },
  ],
};

function saveConfig() {
  try {
    localStorage.setItem("memory_config", JSON.stringify(CONFIG));
  } catch (e) {
    console.warn("memory_config: save failed", e);
    try {
      alert(typeof t === "function" ? t("dash.media.storageFull") : "Storage is full.");
    } catch (_) {}
  }
}

function getGithubRawBase() {
  if (typeof window !== "undefined" && window.location) {
    const host = window.location.hostname;
    const io = host.indexOf("github.io");
    if (io !== -1) {
      const owner = host.slice(0, io);
      const parts = window.location.pathname.split("/").filter(Boolean);
      const repo = parts[0] || (owner + ".github.io");
      return "https://raw.githubusercontent.com/" + owner + "/" + repo + "/HEAD";
    }
  }
  const repo = (CONFIG.github && CONFIG.github.repo) || "";
  if (repo) {
    let r = repo.includes("github.com/") ? repo.split("github.com/")[1] : repo;
    r = r.replace(/\/+$/, "");
    if (r.includes("/")) {
      const parts = r.split("/");
      return "https://raw.githubusercontent.com/" + parts[0] + "/" + parts[1] + "/HEAD";
    }
  }
  return "";
}

function emitConfigReady() {
  const fire = () => document.dispatchEvent(new CustomEvent("memory:config-ready"));
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fire);
  } else {
    fire();
  }
}

function loadConfig() {
  let local = null;
  try {
    const saved = localStorage.getItem("memory_config");
    if (saved) local = JSON.parse(saved);
  } catch (e) {
    console.warn("Config load error:", e);
  }

  const origPassword = CONFIG.dashboardPassword;

  function applyMerged(online) {
    if (online && typeof online === "object") deepMerge(CONFIG, online);
    if (local && typeof local === "object") deepMerge(CONFIG, local);
    CONFIG.dashboardPassword = origPassword;
    if (CONFIG.github) {
      const localToken = local && local.github ? local.github.token : "";
      if (localToken) CONFIG.github.token = localToken;
      else delete CONFIG.github.token;
    }
    emitConfigReady();
  }

  const candidates = [];
  const base = getGithubRawBase();
  if (base) candidates.push(base + "/config.json");
  if (window.location && window.location.origin) {
    candidates.push(window.location.origin + "/config.json");
  }

  function tryFetch(i) {
    if (i >= candidates.length) { applyMerged(null); return; }
    fetch(candidates[i], { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data === "object") applyMerged(data);
        else tryFetch(i + 1);
      })
      .catch(() => tryFetch(i + 1));
  }

  tryFetch(0);
}

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}

function exportConfig() {
  const blob = new Blob([JSON.stringify(CONFIG, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "memory-config.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importConfig(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      deepMerge(CONFIG, data);
      saveConfig();
      location.reload();
    } catch (err) {
      alert("Invalid JSON file"); /* TODO: translate */
    }
  };
  reader.readAsText(file);
}

function resetConfig() {
  if (confirm("Reset all configuration?")) {
    localStorage.removeItem("memory_config");
    location.reload();
  }
}

function getAnimSpeed() {
  const m = CONFIG.animation.multiplier;
  return CONFIG.animation.speed === "slow"
    ? 1.5 * m
    : CONFIG.animation.speed === "fast"
      ? 0.5 * m
      : 1 * m;
}

function getMediaUrl(id) {
  const item = CONFIG.mediaLibrary.find((m) => m.id === id);
  return item ? item.url : "";
}

function getMediaUrls() {
  return CONFIG.mediaLibrary.map((m) => m.url);
}

function getBackgroundImage() {
  return (CONFIG.theme && CONFIG.theme.backgroundImage) || "";
}

function getSectionImages(sectionKey) {
  const section = CONFIG.sections[sectionKey];
  if (section && section.images && section.images.length) return section.images;
  const media = getMediaUrls();
  if (media.length) return media;
  const bg = getBackgroundImage();
  if (bg) return [bg];
  return [];
}

const SECTIONS_LIST = [
  { id: "hero", label: "Hero", tab: "hero" },
  { id: "floating-memories", label: "Floating Gallery", tab: "floating" },
  { id: "marquee", label: "Marquee", tab: "marquee" },
  { id: "stack-cards", label: "Stack Cards", tab: "stack" },
  { id: "timeline", label: "Timeline", tab: "timeline" },
  { id: "memory-explosion", label: "Explosion", tab: "explosion" },
  { id: "flip-cards", label: "Flip Cards", tab: "flip" },
  { id: "love-quotes", label: "Quotes", tab: "quotes" },
  { id: "statistics", label: "Statistics", tab: "statistics" },
  { id: "orbit-gallery", label: "Orbit Gallery", tab: "orbit" },
  { id: "horizontal-story", label: "Horizontal Story", tab: "horizontal" },
  { id: "parallax-layers", label: "Parallax Layers", tab: "parallax" },
  { id: "photo-wall", label: "Photo Wall", tab: "wall" },
  { id: "cinematic-reveal", label: "Cinematic Reveal", tab: "reveal" },
  { id: "before-after", label: "Before After", tab: "ba" },
  { id: "floating-polaroids", label: "Floating Polaroids", tab: "polaroids" },
  { id: "carousel", label: "Carousel", tab: "carousel" },
  { id: "spotlight", label: "Spotlight", tab: "spotlight" },
  { id: "bento-grid", label: "Bento Grid", tab: "bento" },
  { id: "split-story", label: "Split Story", tab: "split" },
  { id: "sticky-chapters", label: "Sticky Chapters", tab: "chapters" },
  { id: "vertical-marquee", label: "Vertical Marquee", tab: "vmarquee" },
  { id: "love-notes", label: "Love Notes", tab: "notes" },
  { id: "heartbeat", label: "Heartbeat", tab: "heartbeat" },
  { id: "final-ending", label: "Final Ending", tab: "ending" },
];

loadConfig();
