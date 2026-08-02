const LANG_KEY = "memory-site-lang";
let currentLang = localStorage.getItem(LANG_KEY) || "en";

const translations = {
  en: {
    /* Login screen */
    "login.title": "A Memory Story",
    "login.subtitle": "Enter the password to begin",
    "login.placeholder": "•••••••••",
    "login.btn": "Unlock Memories",
    "login.wrong": "Wrong password",

    /* Header */
    "header.logo": "❤ Memories",
    "header.gallery": "Gallery",
    "header.story": "Story",
    "header.words": "Words",

    /* Hero */
    "hero.title": "Every Memory<br/>Tells A Story",
    "hero.tag": "A Story Worth Remembering",
    "hero.desc": "Some moments stay with us forever.",
    "hero.btn": "Explore Memories",
    "hero.scroll": "Scroll to explore",

    /* Page title */
    "page.title": "Memories — A Cinematic Experience",

    /* Section labels */
    "sec.label.memories": "Memories",
    "sec.label.gallery": "Gallery",
    "sec.label.story": "Story",
    "sec.label.timeline": "Timeline",
    "sec.label.explosion": "Explosion",
    "sec.label.moments": "Moments",
    "sec.label.words": "Words",
    "sec.label.numbers": "Numbers",
    "sec.label.orbit": "Orbit",
    "sec.label.depth": "Depth",
    "sec.label.wall": "Wall",
    "sec.label.reveal": "Reveal",
    "sec.label.thenNow": "Then & Now",
    "sec.label.polaroids": "Polaroids",
    "sec.label.carousel": "Carousel",
    "sec.label.spotlight": "Spotlight",
    "sec.label.bento": "Bento",
    "sec.label.narrative": "Narrative",
    "sec.label.chapters": "Chapters",
    "sec.label.flow": "Flow",
    "sec.label.notes": "Notes",
    "sec.label.heartbeat": "Heartbeat",
    "sec.label.ending": "Ending",

    /* Section titles */
    "sec.title.hero": "Every Memory Tells A Story",
    "sec.title.floating": "Floating Moments",
    "sec.title.marquee": "Infinite Memories",
    "sec.title.stack": "Stacked Memories",
    "sec.title.timeline": "Journey Through Memories",
    "sec.title.explosion": "Memories Everywhere",
    "sec.title.flip": "3D Flip Cards",
    "sec.title.quotes": "Love Quotes",
    "sec.title.statistics": "Our Story In Numbers",
    "sec.title.orbit": "Orbit Gallery",
    "sec.title.horizontal": "A Horizontal Journey",
    "sec.title.parallax": "Parallax Layers",
    "sec.title.wall": "Infinite Photo Wall",
    "sec.title.reveal": "Cinematic Reveal",
    "sec.title.ba": "Before & After",
    "sec.title.polaroids": "Floating Polaroids",
    "sec.title.carousel": "Memory Carousel",
    "sec.title.spotlight": "Spotlight Gallery",
    "sec.title.bento": "Bento Grid",
    "sec.title.split": "Split Story",
    "sec.title.chapters": "Sticky Chapters",
    "sec.title.vmarquee": "Vertical Flow",
    "sec.title.notes": "Floating Love Notes",
    "sec.title.heartbeat": "Heartbeat Showcase",
    "sec.title.ending": "Final Cinematic Ending",

    /* Section subtitles */
    "sec.sub.hero": "A Story Worth Remembering",
    "sec.sub.floating": "Memories",
    "sec.sub.marquee": "Gallery",
    "sec.sub.stack": "Story",
    "sec.sub.timeline": "Timeline",
    "sec.sub.explosion": "Explosion",
    "sec.sub.flip": "Moments",
    "sec.sub.quotes": "Words",
    "sec.sub.statistics": "Numbers",
    "sec.sub.orbit": "Orbit",
    "sec.sub.horizontal": "Story",
    "sec.sub.parallax": "Depth",
    "sec.sub.wall": "Wall",
    "sec.sub.reveal": "Reveal",
    "sec.sub.ba": "Then & Now",
    "sec.sub.polaroids": "Polaroids",
    "sec.sub.carousel": "Carousel",
    "sec.sub.spotlight": "Spotlight",
    "sec.sub.bento": "Bento",
    "sec.sub.split": "Narrative",
    "sec.sub.chapters": "Chapters",
    "sec.sub.vmarquee": "Flow",
    "sec.sub.notes": "Notes",
    "sec.sub.heartbeat": "Heartbeat",
    "sec.sub.ending": "Ending",

    /* Section descriptions */
    "sec.desc.hero": "Some moments stay with us forever.",
    "sec.desc.floating": "A collection of beautiful memories suspended in time.",
    "sec.desc.marquee": "Moments that never end.",
    "sec.desc.stack": "Every memory reveals the next chapter.",
    "sec.desc.timeline": "Every moment has its place in our story.",
    "sec.desc.explosion": "Every memory comes alive at once.",
    "sec.desc.flip": "Turn the card to reveal the memory.",
    "sec.desc.quotes": "Words from the heart.",
    "sec.desc.statistics": "Every moment counts.",
    "sec.desc.orbit": "Memories orbiting around us.",
    "sec.desc.horizontal": "Scroll sideways through our story.",
    "sec.desc.parallax": "Memories with depth.",
    "sec.desc.wall": "Every memory on display.",
    "sec.desc.reveal": "A dramatic reveal of our favorite moments.",
    "sec.desc.ba": "How our journey has transformed us.",
    "sec.desc.polaroids": "Polaroid memories floating freely.",
    "sec.desc.carousel": "Drag through the memories.",
    "sec.desc.spotlight": "Move your cursor to reveal the light.",
    "sec.desc.bento": "Beautifully arranged memories.",
    "sec.desc.split": "Two perspectives, one story.",
    "sec.desc.chapters": "A scroll-driven narrative.",
    "sec.desc.vmarquee": "Memories flowing endlessly.",
    "sec.desc.notes": "Little messages of love floating by.",
    "sec.desc.heartbeat": "The rhythm of our love.",
    "sec.desc.ending": "A grand finale to our story.",

    /* Dash gate */
    "dashgate.title": "Dashboard",
    "dashgate.subtitle": "Enter password to access",
    "dashgate.placeholder": "Password",
    "dashgate.btn": "Unlock Dashboard",
    "dashgate.wrong": "Wrong password",

    /* Dashboard sidebar */
    "dash.search": "Search settings...",
    "dash.general": "General",
    "dash.media": "Media",
    "dash.presets": "Animation Presets",
    "dash.sections": "Sections",
    "dash.logout": "→ Logout",

    /* Dashboard nav items (static) */
    "dash.nav.general": "⚙ General",
    "dash.nav.theme": "◐ Theme",
    "dash.nav.animations": "△ Animations",
    "dash.nav.media": "▣ Media Library",
    "dash.nav.library2d": "△ 2D Animations",
    "dash.nav.library3d": "◆ 3D Animations",
    "dash.nav.bundles": "▨ Page Bundles",
    "dash.nav.content": "✎ Site Text",
    "dash.nav.github": "⬆ GitHub",

    /* Dashboard panels */
    "dash.general.title": "General Settings",
    "dash.theme.title": "Theme Manager",
    "dash.animations.title": "Animation Manager",
    "dash.media.title": "Media Library",
    "dash.library2d.title": "2D Animation Library",
    "dash.library3d.title": "3D Animation Library",
    "dash.bundles.title": "Page Bundles",
    "dash.panel.content": "Site Text (Occasion)",
    "dash.panel.github": "Upload to GitHub",

    "dash.content.desc": "Edit the site text here for your occasion (birthday, anniversary, etc.). Empty fields keep the default text.",
    "dash.content.siteTitle": "Login Title",
    "dash.content.siteSubtitle": "Login Subtitle",
    "dash.content.loginButton": "Login Button",
    "dash.content.heroTag": "Hero Tag",
    "dash.content.heroTitle": "Hero Title",
    "dash.content.heroDescription": "Hero Description",
    "dash.content.heroButton": "Hero Button",
    "dash.content.endingTitle": "Ending Title",
    "dash.content.endingDescription": "Ending Description",
    "dash.content.endingFooter": "Ending Footer",
    "dash.content.backgroundImage": "Background Image URL (used for all images until you add photos)",

    "dash.github.desc": "Upload this whole project to GitHub from your browser.",
    "dash.github.token": "GitHub Personal Access Token (Settings → Developer settings → Tokens, scope: repo)",
    "dash.github.tokenPlaceholder": "ghp_xxxxxxxxxxxx",
    "dash.github.repo": "Repository (username/repo, or a new repo name)",
    "dash.github.repoPlaceholder": "username/my-memory-site",
    "dash.github.folder": "Choose the project folder (the whole folder)",
    "dash.github.upload": "⬆ Upload to GitHub",
    "dash.github.choose": "Choose folder...",
    "dash.github.noToken": "Please enter your GitHub token.",
    "dash.github.noRepo": "Please enter a repository name.",
    "dash.github.noFiles": "Please choose the project folder first.",
    "dash.github.authFail": "GitHub auth failed. Check your token.",
    "dash.github.repoFail": "Could not create/find the repository.",
    "dash.github.start": "Uploading...",
    "dash.github.done": "Done! Open: ",
    "dash.github.err": "Error: ",
    "dash.github.publish": "Publish site data (config.json)",
    "dash.github.publishHint": "Uploads the site settings to GitHub so every visitor sees the same content and photos. Press after any change.",
    "dash.github.published": "Site data published! Everyone will now see your updates.",
    "dash.github.publishErr": "Publish failed: ",
    "dash.github.publicHint": "Important: the repository must be PUBLIC so photos and data are visible to everyone.",

    "dash.general.export": "Export JSON",
    "dash.general.import": "Import JSON",
    "dash.general.reset": "Reset All",

    "dash.theme.accent": "Accent Color",
    "dash.theme.accent2": "Secondary Accent",
    "dash.theme.bg": "Background",
    "dash.theme.text": "Text",
    "dash.theme.blur": "Blur Amount",
    "dash.theme.radius": "Border Radius",
    "dash.theme.presets": "Quick color themes",
    "dash.theme.fontSize": "Text size",
    "dash.theme.customCSS": "Custom CSS (advanced)",

    "dash.general.helpTitle": "How to use",
    "dash.general.help1": "Upload your photos in the Media Library (photos go online automatically).",
    "dash.general.help2": "Edit texts here, or press 'Edit on page' to edit directly on the site.",
    "dash.general.help3": "Press 'Publish' so every visitor sees your changes.",
    "dash.general.quickToggle": "Show / hide sections",
    "dash.editLive": "Edit on page",
    "dash.editLiveBtn": "Edit directly on the page (click any text or photo)",

    "dash.anim.speed": "Global Speed",
    "dash.anim.multiplier": "Speed Multiplier",
    "dash.anim.slow": "Slow",
    "dash.anim.normal": "Normal",
    "dash.anim.fast": "Fast",

    "dash.media.url": "Image URL",
    "dash.media.title": "Title",
    "dash.media.category": "Category",
    "dash.media.urlPlaceholder": "https://example.com/image.jpg",
    "dash.media.titlePlaceholder": "Image title",
    "dash.media.catPlaceholder": "memories, travel, nature...",
    "dash.media.add": "+ Add Image",
    "dash.media.uploadTitle": "Upload from device",
    "dash.media.uploadHint": "Images are compressed and saved inside the site, then added to the library automatically.",
    "dash.media.browse": "Choose Images",
    "dash.media.drop": "or drop images here",
    "dash.media.uploading": "Processing images...",
    "dash.media.storageFull": "Storage is full. Try smaller images or delete some from the library.",
    "dash.media.ghOnline": "GitHub is connected — new photos are uploaded online automatically and visible to everyone.",
    "dash.media.ghOnlineShort": "online",
    "dash.media.ghNotSet": "GitHub is not set up yet — photos stay on this browser only. Go to the GitHub tab to make them visible online.",

    "dash.library2d.desc": "Click an animation to apply it to a section. Each preset shows required images.",
    "dash.library3d.desc": "3D animations using CSS 3D transforms and Three.js ready presets.",
    "dash.bundles.desc": "Install a complete page template with coordinated sections and animations.",
    "dash.selectSection": "— Select section —",
    "dash.applyBtn": "Apply to Section",
    "dash.installBtn": "Install Bundle",
    "dash.noSection": "Please select a section first.",
    "dash.animApplied": "Animation applied to section!",
    "dash.bundleInstalled": "Bundle installed! All sections have been configured. Refreshing page...",

    /* Section settings labels */
    "dash.ssec.title": "Title",
    "dash.ssec.subtitle": "Subtitle",
    "dash.ssec.desc": "Description",
    "dash.ssec.speed": "Animation Speed",
    "dash.ssec.bg": "Background Color",
    "dash.ssec.accent": "Accent Color",
    "dash.ssec.images": "Section Images",
    "dash.ssec.hint": "Click media below to add to this section",
    "dash.ssec.urlHint": "Or paste image URL",
    "dash.ssec.urlPlaceholder": "https://...",
    "dash.ssec.addBtn": "Add",
    "dash.ssec.noImages": "No images assigned. Click media thumbnails below to add.",
    "dash.ssec.remove": "Remove",
    "dash.ssec.btnText": "Button Text",
    "dash.ssec.bgUrl": "Background Image URL",
    "dash.ssec.bgPlaceholder": "https://...",

    /* Section panel titles */
    "dash.panel.hero": "Hero Section",
    "dash.panel.floating": "Floating Gallery",
    "dash.panel.marquee": "Marquee Gallery",
    "dash.panel.stack": "Stack Cards",
    "dash.panel.timeline": "Timeline",
    "dash.panel.explosion": "Memory Explosion",
    "dash.panel.flip": "3D Flip Cards",
    "dash.panel.orbit": "Orbit Gallery",
    "dash.panel.statistics": "Statistics",
    "dash.panel.quotes": "Love Quotes",
    "dash.panel.horizontal": "Horizontal Story",
    "dash.panel.parallax": "Parallax Layers",
    "dash.panel.wall": "Photo Wall",
    "dash.panel.reveal": "Cinematic Reveal",
    "dash.panel.ba": "Before & After",
    "dash.panel.polaroids": "Floating Polaroids",
    "dash.panel.carousel": "Carousel",
    "dash.panel.spotlight": "Spotlight Gallery",
    "dash.panel.bento": "Bento Grid",
    "dash.panel.split": "Split Story",
    "dash.panel.chapters": "Sticky Chapters",
    "dash.panel.vmarquee": "Vertical Marquee",
    "dash.panel.notes": "Love Notes",
    "dash.panel.heartbeat": "Heartbeat",
    "dash.panel.ending": "Final Ending",

    /* Section toggle labels */
    "dash.toggle.hero": "Show Hero",
    "dash.toggle.floating": "Show Floating Gallery",
    "dash.toggle.marquee": "Show Marquee",
    "dash.toggle.stack": "Show Stack Cards",
    "dash.toggle.timeline": "Show Timeline",
    "dash.toggle.explosion": "Show Explosion",
    "dash.toggle.flip": "Show Flip Cards",
    "dash.toggle.orbit": "Show Orbit Gallery",
    "dash.toggle.statistics": "Show Statistics",
    "dash.toggle.quotes": "Show Quotes",
    "dash.toggle.horizontal": "Show Horizontal Story",
    "dash.toggle.parallax": "Show Parallax",
    "dash.toggle.wall": "Show Photo Wall",
    "dash.toggle.reveal": "Show Cinematic Reveal",
    "dash.toggle.ba": "Show Before/After",
    "dash.toggle.polaroids": "Show Polaroids",
    "dash.toggle.carousel": "Show Carousel",
    "dash.toggle.spotlight": "Show Spotlight",
    "dash.toggle.bento": "Show Bento Grid",
    "dash.toggle.split": "Show Split Story",
    "dash.toggle.chapters": "Show Sticky Chapters",
    "dash.toggle.vmarquee": "Show Vertical Marquee",
    "dash.toggle.notes": "Show Love Notes",
    "dash.toggle.heartbeat": "Show Heartbeat",
    "dash.toggle.ending": "Show Final Ending",

    /* Stack cards content */
    "stack.1.title": "First Memory",
    "stack.1.desc": "The beginning of everything.",
    "stack.2.title": "Second Memory",
    "stack.2.desc": "A beautiful day together.",
    "stack.3.title": "Third Memory",
    "stack.3.desc": "Moments worth keeping forever.",
    "stack.4.title": "Fourth Memory",
    "stack.4.desc": "Forever in our hearts.",

    /* Timeline content */
    "tl.1.date": "2021",
    "tl.1.title": "The Beginning",
    "tl.1.desc": "Where it all started.",
    "tl.2.date": "2022",
    "tl.2.title": "Growing Together",
    "tl.2.desc": "Every day stronger.",
    "tl.3.date": "2023",
    "tl.3.title": "Beautiful Moments",
    "tl.3.desc": "Laughter and joy.",
    "tl.4.date": "2024",
    "tl.4.title": "New Adventures",
    "tl.4.desc": "Exploring the world.",
    "tl.5.date": "2025",
    "tl.5.title": "Forever Us",
    "tl.5.desc": "A story still being written.",

    /* Quotes */
    "quote.1.text": "\"Every moment with you is a beautiful memory.\"",
    "quote.1.author": "— Our Story",
    "quote.2.text": "\"You are the best thing that ever happened to me.\"",
    "quote.2.author": "— Forever",
    "quote.3.text": "\"In your eyes, I found my home.\"",
    "quote.3.author": "— Endless Love",
    "quote.4.text": "\"Together is the most beautiful place to be.\"",
    "quote.4.author": "— Us",

    /* Statistics */
    "stat.days": "Days Together",
    "stat.adventures": "Adventures",
    "stat.memories": "Memories",
    "stat.love": "Love Forever",

    /* Cards */
    "card.sunset": "Sunset",
    "card.sunsetDate": "June 2024",
    "card.sunsetDesc": "A beautiful evening by the shore.",
    "card.adventure": "Adventure",
    "card.adventureDate": "March 2024",
    "card.adventureDesc": "Exploring new places together.",
    "card.celebration": "Celebration",
    "card.celebrationDate": "December 2024",
    "card.celebrationDesc": "Joyful moments that matter.",
    "card.quiet": "Quiet Time",
    "card.quietDate": "January 2025",
    "card.quietDesc": "Peaceful mornings together.",

    /* Horizontal story */
    "hstory.ch1": "Chapter 1",
    "hstory.ch1desc": "How it all began.",
    "hstory.ch2": "Chapter 2",
    "hstory.ch2desc": "Growing together.",
    "hstory.ch3": "Chapter 3",
    "hstory.ch3desc": "Beautiful moments.",
    "hstory.ch4": "Chapter 4",
    "hstory.ch4desc": "New adventures.",
    "hstory.ch5": "Chapter 5",
    "hstory.ch5desc": "Forever begins.",

    /* Carousel items */
    "carousel.adventure": "Adventure",
    "carousel.joy": "Joy",
    "carousel.love": "Love",
    "carousel.peace": "Peace",
    "carousel.dream": "Dream",
    "carousel.forever": "Forever",

    /* Bento items */
    "bento.elegance": "Elegance",
    "bento.serenity": "Serenity",
    "bento.joy": "Joy",
    "bento.peace": "Peace",
    "bento.wonder": "Wonder",
    "bento.magic": "Magic",

    /* Polaroid captions */
    "polaroid.summer": "Summer 2024",
    "polaroid.spring": "Spring Days",
    "polaroid.autumn": "Autumn Walk",
    "polaroid.winter": "Winter Nights",
    "polaroid.newBeg": "New Beginnings",

    /* Split story */
    "split.title": "Our Journey",
    "split.p1": "From the moment we met, everything changed. The world became brighter, the days became fuller, and every moment became a memory worth keeping.",
    "split.p2": "Through laughter and tears, adventures and quiet moments, we built a story that is uniquely ours.",
    "split.signature": "— Together, Forever",

    /* Sticky chapters */
    "chapter.1.title": "Chapter One: Hello",
    "chapter.1.desc": "The day our eyes met for the first time.",
    "chapter.1.year": "2021",
    "chapter.2.title": "Chapter Two: Together",
    "chapter.2.desc": "Building a life, one day at a time.",
    "chapter.2.year": "2022",
    "chapter.3.title": "Chapter Three: Grow",
    "chapter.3.desc": "Flourishing in each other's love.",
    "chapter.3.year": "2023",
    "chapter.4.title": "Chapter Four: Forever",
    "chapter.4.desc": "And so the story continues.",
    "chapter.4.year": "2024+",

    /* Reveal */
    "reveal.title": "The Most Beautiful Memory",
    "reveal.desc": "Some moments are worth a thousand words.",

    /* Heartbeat */
    "hbeat.1": "Heartbeats per moment",
    "hbeat.2": "Love without end",
    "hbeat.3": "Always in my heart",

    /* Ending */
    "ending.title": "Every Memory<br/>Is A Piece Of Us",
    "ending.desc": "This is just the beginning of our story.",
    "ending.footer": "Made with love — A Memory Story © 2025",

    /* Love notes */
    "note.1": "You make my world brighter.",
    "note.2": "Every day with you is a gift.",
    "note.3": "I love you more than words can say.",
    "note.4": "You are my everything.",
    "note.5": "Forever and always.",

    /* Language */
    "lang.switch": "العربية",
    "lang.en": "English",
    "lang.ar": "العربية",
  },

  ar: {
    "login.title": "قصة ذكريات",
    "login.subtitle": "أدخل كلمة السر للبدء",
    "login.placeholder": "•••••••••",
    "login.btn": "افتح الذكريات",
    "login.wrong": "كلمة سر خطأ",

    "header.logo": "❤ ذكريات",
    "header.gallery": "معرض",
    "header.story": "قصة",
    "header.words": "كلمات",

    "hero.title": "كل ذكرى<br/>تروي قصة",
    "hero.tag": "قصة تستحق التذكر",
    "hero.desc": "بعض اللحظات تبقى معنا للأبد.",
    "hero.btn": "استكشف الذكريات",
    "hero.scroll": "اسحب لاستكشاف المزيد",

    "page.title": "ذكريات — تجربة سينمائية",

    "sec.label.memories": "ذكريات",
    "sec.label.gallery": "معرض",
    "sec.label.story": "قصة",
    "sec.label.timeline": "خط زمني",
    "sec.label.explosion": "انفجار",
    "sec.label.moments": "لحظات",
    "sec.label.words": "كلمات",
    "sec.label.numbers": "أرقام",
    "sec.label.orbit": "مدار",
    "sec.label.depth": "عمق",
    "sec.label.wall": "جدار",
    "sec.label.reveal": "كشف",
    "sec.label.thenNow": "ثم والآن",
    "sec.label.polaroids": "صور بولارويد",
    "sec.label.carousel": "دوار",
    "sec.label.spotlight": "تسليط الضوء",
    "sec.label.bento": "بينتو",
    "sec.label.narrative": "سرد",
    "sec.label.chapters": "فصول",
    "sec.label.flow": "تدفق",
    "sec.label.notes": "ملاحظات",
    "sec.label.heartbeat": "نبض",
    "sec.label.ending": "نهاية",

    "sec.title.hero": "كل ذكرى تروي قصة",
    "sec.title.floating": "لحظات عائمة",
    "sec.title.marquee": "ذكريات لا نهائية",
    "sec.title.stack": "ذكريات متراكمة",
    "sec.title.timeline": "رحلة عبر الذكريات",
    "sec.title.explosion": "ذكريات في كل مكان",
    "sec.title.flip": "بطاقات ثلاثية الأبعاد",
    "sec.title.quotes": "اقتباسات حب",
    "sec.title.statistics": "قصتنا بالأرقام",
    "sec.title.orbit": "معرض دائري",
    "sec.title.horizontal": "رحلة أفقية",
    "sec.title.parallax": "طبقات متوازية",
    "sec.title.wall": "جدار صور لا نهائي",
    "sec.title.reveal": "كشف سينمائي",
    "sec.title.ba": "قبل وبعد",
    "sec.title.polaroids": "صور بولارويد عائمة",
    "sec.title.carousel": "دوامة الذكريات",
    "sec.title.spotlight": "معرض الضوء",
    "sec.title.bento": "شبكة بينتو",
    "sec.title.split": "قصة منقسمة",
    "sec.title.chapters": "فصول لاصقة",
    "sec.title.vmarquee": "تدفق عمودي",
    "sec.title.notes": "ملاحظات حب عائمة",
    "sec.title.heartbeat": "عرض نبضات القلب",
    "sec.title.ending": "نهاية سينمائية",

    "sec.sub.hero": "قصة تستحق التذكر",
    "sec.sub.floating": "ذكريات",
    "sec.sub.marquee": "معرض",
    "sec.sub.stack": "قصة",
    "sec.sub.timeline": "خط زمني",
    "sec.sub.explosion": "انفجار",
    "sec.sub.flip": "لحظات",
    "sec.sub.quotes": "كلمات",
    "sec.sub.statistics": "أرقام",
    "sec.sub.orbit": "مدار",
    "sec.sub.horizontal": "قصة",
    "sec.sub.parallax": "عمق",
    "sec.sub.wall": "جدار",
    "sec.sub.reveal": "كشف",
    "sec.sub.ba": "ثم والآن",
    "sec.sub.polaroids": "بولارويد",
    "sec.sub.carousel": "دوار",
    "sec.sub.spotlight": "تسليط الضوء",
    "sec.sub.bento": "بينتو",
    "sec.sub.split": "سرد",
    "sec.sub.chapters": "فصول",
    "sec.sub.vmarquee": "تدفق",
    "sec.sub.notes": "ملاحظات",
    "sec.sub.heartbeat": "نبض",
    "sec.sub.ending": "نهاية",

    "sec.desc.hero": "بعض اللحظات تبقى معنا للأبد.",
    "sec.desc.floating": "مجموعة من الذكريات الجميلة المعلقة في الزمن.",
    "sec.desc.marquee": "لحظات لا تنتهي.",
    "sec.desc.stack": "كل ذكرى تكشف الفصل التالي.",
    "sec.desc.timeline": "كل لحظة لها مكانها في قصتنا.",
    "sec.desc.explosion": "كل الذكريات تحيا في آن واحد.",
    "sec.desc.flip": "اقلب البطاقة لتكشف الذكرى.",
    "sec.desc.quotes": "كلمات من القلب.",
    "sec.desc.statistics": "كل لحظة لها قيمتها.",
    "sec.desc.orbit": "ذكريات تدور حولنا.",
    "sec.desc.horizontal": "اسحب جانبياً عبر قصتنا.",
    "sec.desc.parallax": "ذكريات ذات عمق.",
    "sec.desc.wall": "كل ذكرى معروضة.",
    "sec.desc.reveal": "كشف درامي للحظاتنا المفضلة.",
    "sec.desc.ba": "كيف غيرتنا رحلتنا.",
    "sec.desc.polaroids": "ذكريات بولارويد تطفو بحرية.",
    "sec.desc.carousel": "اسحب عبر الذكريات.",
    "sec.desc.spotlight": "حرك المؤشر ليكشف الضوء.",
    "sec.desc.bento": "ذكريات مرتبة بشكل جميل.",
    "sec.desc.split": "وجهتا نظر، قصة واحدة.",
    "sec.desc.chapters": "سرد يعتمد على التمرير.",
    "sec.desc.vmarquee": "ذكريات تتدفق بلا نهاية.",
    "sec.desc.notes": "رسائل حب صغيرة تطفو.",
    "sec.desc.heartbeat": "إيقاع حبنا.",
    "sec.desc.ending": "خاتمة عظيمة لقصتنا.",

    "dashgate.title": "لوحة التحكم",
    "dashgate.subtitle": "أدخل كلمة السر للوصول",
    "dashgate.placeholder": "كلمة السر",
    "dashgate.btn": "افتح لوحة التحكم",
    "dashgate.wrong": "كلمة سر خطأ",

    "dash.search": "ابحث في الإعدادات...",
    "dash.general": "عام",
    "dash.media": "الوسائط",
    "dash.presets": "الإعدادات المسبقة للرسوم المتحركة",
    "dash.sections": "الأقسام",
    "dash.logout": "→ تسجيل الخروج",

    "dash.nav.general": "⚙ عام",
    "dash.nav.theme": "◐ المظهر",
    "dash.nav.animations": "△ الرسوم المتحركة",
    "dash.nav.media": "▣ مكتبة الوسائط",
    "dash.nav.library2d": "△ رسوم ثنائية الأبعاد",
    "dash.nav.library3d": "◆ رسوم ثلاثية الأبعاد",
    "dash.nav.bundles": "▨ حزم الصفحات",
    "dash.nav.content": "✎ نصوص الموقع",
    "dash.nav.github": "⬆ جيت هاب",

    "dash.general.title": "الإعدادات العامة",
    "dash.theme.title": "إدارة المظهر",
    "dash.animations.title": "إدارة الرسوم المتحركة",
    "dash.media.title": "مكتبة الوسائط",
    "dash.library2d.title": "مكتبة الرسوم ثنائية الأبعاد",
    "dash.library3d.title": "مكتبة الرسوم ثلاثية الأبعاد",
    "dash.bundles.title": "حزم الصفحات",
    "dash.panel.content": "نصوص الموقع (المناسبة)",
    "dash.panel.github": "الرفع إلى جيت هاب",

    "dash.content.desc": "عدّل نصوص الموقع هنا حسب مناسبتك (عيد ميلاد، ذكرى، ...). الحقول الفارغة تحتفظ بالنص الافتراضي.",
    "dash.content.siteTitle": "عنوان تسجيل الدخول",
    "dash.content.siteSubtitle": "العنوان الفرعي لتسجيل الدخول",
    "dash.content.loginButton": "زر تسجيل الدخول",
    "dash.content.heroTag": "وسم الواجهة",
    "dash.content.heroTitle": "عنوان الواجهة",
    "dash.content.heroDescription": "وصف الواجهة",
    "dash.content.heroButton": "زر الواجهة",
    "dash.content.endingTitle": "عنوان النهاية",
    "dash.content.endingDescription": "وصف النهاية",
    "dash.content.endingFooter": "نص أسفل النهاية",
    "dash.content.backgroundImage": "رابط صورة الخلفية (تُستخدم في كل الصور حتى تضيف صوراً)",

    "dash.github.desc": "ارفع المشروع كاملاً إلى جيت هاب من المتصفح.",
    "dash.github.token": "رمز GitHub الشخصي (Settings ← Developer settings ← Tokens، الصلاحية: repo)",
    "dash.github.tokenPlaceholder": "ghp_xxxxxxxxxxxx",
    "dash.github.repo": "المستودع (username/repo أو اسم مستودع جديد)",
    "dash.github.repoPlaceholder": "username/my-memory-site",
    "dash.github.folder": "اختر مجلد المشروع (المجلد كاملاً)",
    "dash.github.upload": "⬆ ارفع إلى جيت هاب",
    "dash.github.choose": "اختر المجلد...",
    "dash.github.noToken": "من فضلك أدخل رمز GitHub.",
    "dash.github.noRepo": "من فضلك أدخل اسم المستودع.",
    "dash.github.noFiles": "من فضلك اختر مجلد المشروع أولاً.",
    "dash.github.authFail": "فشل تسجيل الدخول لجيت هاب. تحقق من الرمز.",
    "dash.github.repoFail": "تعذّر إنشاء/العثور على المستودع.",
    "dash.github.start": "جارٍ الرفع...",
    "dash.github.done": "تم! افتح: ",
    "dash.github.err": "خطأ: ",
    "dash.github.publish": "انشر بيانات الموقع (config.json)",
    "dash.github.publishHint": "بيرفع إعدادات الموقع لجيت هاب عشان كل زائر يشوف نفس المحتوى والصور. اضغط بعد أي تعديل.",
    "dash.github.published": "تم نشر بيانات الموقع! الكل هيشوف التحديثات دلوقتي.",
    "dash.github.publishErr": "فشل النشر: ",
    "dash.github.publicHint": "مهم: المستودع لازم يكون عام (Public) عشان الصور والبيانات تتشاف من الكل.",

    "dash.general.export": "تصدير JSON",
    "dash.general.import": "استيراد JSON",
    "dash.general.reset": "إعادة تعيين الكل",

    "dash.theme.accent": "لون التمييز",
    "dash.theme.accent2": "التمييز الثانوي",
    "dash.theme.bg": "الخلفية",
    "dash.theme.text": "النص",
    "dash.theme.blur": "مقدار التمويه",
    "dash.theme.radius": "نصف قطر الحدود",
    "dash.theme.presets": "ألوان جاهزة",
    "dash.theme.fontSize": "حجم الخط",
    "dash.theme.customCSS": "CSS مخصص (متقدم)",

    "dash.general.helpTitle": "طريقة الاستخدام",
    "dash.general.help1": "ارفع صورك من مكتبة الوسائط (الصور بتترفع اونلاين تلقائياً).",
    "dash.general.help2": "عدّل النصوص من هنا، أو اضغط زر 'عدّل على الصفحة' للتعديل مباشرة على الموقع.",
    "dash.general.help3": "اضغط 'نشر' عشان كل زائر يشوف تعديلاتك.",
    "dash.general.quickToggle": "إظهار / إخفاء الأقسام",
    "dash.editLive": "عدّل على الصفحة",
    "dash.editLiveBtn": "عدّل مباشرة على الصفحة (اضغط أي نص أو صورة)",

    "dash.anim.speed": "السرعة العامة",
    "dash.anim.multiplier": "مضاعف السرعة",
    "dash.anim.slow": "بطيء",
    "dash.anim.normal": "عادي",
    "dash.anim.fast": "سريع",

    "dash.media.url": "رابط الصورة",
    "dash.media.title": "العنوان",
    "dash.media.category": "التصنيف",
    "dash.media.urlPlaceholder": "https://example.com/image.jpg",
    "dash.media.titlePlaceholder": "عنوان الصورة",
    "dash.media.catPlaceholder": "ذكريات، سفر، طبيعة...",
    "dash.media.add": "+ إضافة صورة",
    "dash.media.uploadTitle": "ارفع صورة من جهازك",
    "dash.media.uploadHint": "الصور بتتضغط وتتحفظ جوه الموقع وبالتالي بتتضاف للمكتبة تلقائياً.",
    "dash.media.browse": "اختر الصور",
    "dash.media.drop": "أو اسحب الصور وأسقطها هنا",
    "dash.media.uploading": "جاري معالجة الصور...",
    "dash.media.storageFull": "المساحة ممتلئة. جرّب صور أصغر أو امسح صور من المكتبة.",
    "dash.media.ghOnline": "جيت هاب متصل — الصور الجديدة بتترفع اونلاين تلقائياً وتتشاف من الكل.",
    "dash.media.ghOnlineShort": "اونلاين",
    "dash.media.ghNotSet": "لسه مفيش جيت هاب — الصور هتفضل على المتصفح ده بس. روح لسكشن جيت هاب عشان تظهر اونلاين.",

    "dash.library2d.desc": "انقر على حركة لتطبيقها على القسم. كل إعداد مسبق يظهر الصور المطلوبة.",
    "dash.library3d.desc": "رسوم متحركة ثلاثية الأبعاد باستخدام CSS 3D transforms وإعدادات Three.js الجاهزة.",
    "dash.bundles.desc": "قم بتثبيت قالب صفحة كامل مع أقسام ورسوم متحركة منسقة.",
    "dash.selectSection": "— اختر القسم —",
    "dash.applyBtn": "تطبيق على القسم",
    "dash.installBtn": "تثبيت الحزمة",
    "dash.noSection": "الرجاء اختيار قسم أولاً.",
    "dash.animApplied": "تم تطبيق الحركة على القسم!",
    "dash.bundleInstalled": "تم تثبيت الحزمة! تم تكوين جميع الأقسام. جارٍ تحديث الصفحة...",

    "dash.ssec.title": "العنوان",
    "dash.ssec.subtitle": "العنوان الفرعي",
    "dash.ssec.desc": "الوصف",
    "dash.ssec.speed": "سرعة الحركة",
    "dash.ssec.bg": "لون الخلفية",
    "dash.ssec.accent": "لون التمييز",
    "dash.ssec.images": "صور القسم",
    "dash.ssec.hint": "انقر على الصورة أدناه لإضافتها إلى هذا القسم",
    "dash.ssec.urlHint": "أو الصق رابط الصورة",
    "dash.ssec.urlPlaceholder": "https://...",
    "dash.ssec.addBtn": "إضافة",
    "dash.ssec.noImages": "لم يتم تعيين صور. انقر على الصور المصغرة أدناه للإضافة.",
    "dash.ssec.remove": "حذف",
    "dash.ssec.btnText": "نص الزر",
    "dash.ssec.bgUrl": "رابط صورة الخلفية",
    "dash.ssec.bgPlaceholder": "https://...",

    "dash.panel.hero": "قسم البطل",
    "dash.panel.floating": "معرض عائم",
    "dash.panel.marquee": "معرض متحرك",
    "dash.panel.stack": "بطاقات متراكمة",
    "dash.panel.timeline": "خط زمني",
    "dash.panel.explosion": "انفجار الذكريات",
    "dash.panel.flip": "بطاقات ثلاثية الأبعاد",
    "dash.panel.orbit": "معرض دائري",
    "dash.panel.statistics": "إحصائيات",
    "dash.panel.quotes": "اقتباسات حب",
    "dash.panel.horizontal": "قصة أفقية",
    "dash.panel.parallax": "طبقات متوازية",
    "dash.panel.wall": "جدار الصور",
    "dash.panel.reveal": "كشف سينمائي",
    "dash.panel.ba": "قبل وبعد",
    "dash.panel.polaroids": "صور بولارويد عائمة",
    "dash.panel.carousel": "دوار",
    "dash.panel.spotlight": "معرض الضوء",
    "dash.panel.bento": "شبكة بينتو",
    "dash.panel.split": "قصة منقسمة",
    "dash.panel.chapters": "فصول لاصقة",
    "dash.panel.vmarquee": "شريط عمودي",
    "dash.panel.notes": "ملاحظات حب",
    "dash.panel.heartbeat": "نبضات القلب",
    "dash.panel.ending": "النهاية",

    "dash.toggle.hero": "إظهار البطل",
    "dash.toggle.floating": "إظهار المعرض العائم",
    "dash.toggle.marquee": "إظهار المعرض المتحرك",
    "dash.toggle.stack": "إظهار البطاقات المتراكمة",
    "dash.toggle.timeline": "إظهار الخط الزمني",
    "dash.toggle.explosion": "إظهار الانفجار",
    "dash.toggle.flip": "إظهار البطاقات ثلاثية الأبعاد",
    "dash.toggle.orbit": "إظهار المعرض الدائري",
    "dash.toggle.statistics": "إظهار الإحصائيات",
    "dash.toggle.quotes": "إظهار الاقتباسات",
    "dash.toggle.horizontal": "إظهار القصة الأفقية",
    "dash.toggle.parallax": "إظهار الطبقات المتوازية",
    "dash.toggle.wall": "إظهار جدار الصور",
    "dash.toggle.reveal": "إظهار الكشف السينمائي",
    "dash.toggle.ba": "إظهار قبل/بعد",
    "dash.toggle.polaroids": "إظهار البولارويد",
    "dash.toggle.carousel": "إظهار الدوار",
    "dash.toggle.spotlight": "إظهار تسليط الضوء",
    "dash.toggle.bento": "إظهار شبكة بينتو",
    "dash.toggle.split": "إظهار القصة المنقسمة",
    "dash.toggle.chapters": "إظهار الفصول اللاصقة",
    "dash.toggle.vmarquee": "إظهار الشريط العمودي",
    "dash.toggle.notes": "إظهار ملاحظات الحب",
    "dash.toggle.heartbeat": "إظهار نبضات القلب",
    "dash.toggle.ending": "إظهار النهاية",

    "stack.1.title": "الذاكرة الأولى",
    "stack.1.desc": "بداية كل شيء.",
    "stack.2.title": "الذاكرة الثانية",
    "stack.2.desc": "يوم جميل معاً.",
    "stack.3.title": "الذاكرة الثالثة",
    "stack.3.desc": "لحظات تستحق الحفظ للأبد.",
    "stack.4.title": "الذاكرة الرابعة",
    "stack.4.desc": "إلى الأبد في قلوبنا.",

    "tl.1.date": "2021",
    "tl.1.title": "البداية",
    "tl.1.desc": "حيث بدأ كل شيء.",
    "tl.2.date": "2022",
    "tl.2.title": "ننمو معاً",
    "tl.2.desc": "كل يوم أقوى.",
    "tl.3.date": "2023",
    "tl.3.title": "لحظات جميلة",
    "tl.3.desc": "ضحك وفرح.",
    "tl.4.date": "2024",
    "tl.4.title": "مغامرات جديدة",
    "tl.4.desc": "نستكشف العالم.",
    "tl.5.date": "2025",
    "tl.5.title": "نحن للأبد",
    "tl.5.desc": "قصة لا تزال تُكتب.",

    "quote.1.text": "\"كل لحظة معك هي ذكرى جميلة.\"",
    "quote.1.author": "— قصتنا",
    "quote.2.text": "\"أنت أفضل شيء حدث لي.\"",
    "quote.2.author": "— للأبد",
    "quote.3.text": "\"في عينيك، وجدت منزلي.\"",
    "quote.3.author": "— حب لا ينتهي",
    "quote.4.text": "\"معاً هو أجمل مكان.\"",
    "quote.4.author": "— نحن",

    "stat.days": "أيام معاً",
    "stat.adventures": "مغامرات",
    "stat.memories": "ذكريات",
    "stat.love": "حب للأبد",

    "card.sunset": "غروب",
    "card.sunsetDate": "يونيو 2024",
    "card.sunsetDesc": "أمسية جميلة على الشاطئ.",
    "card.adventure": "مغامرة",
    "card.adventureDate": "مارس 2024",
    "card.adventureDesc": "نستكشف أماكن جديدة معاً.",
    "card.celebration": "احتفال",
    "card.celebrationDate": "ديسمبر 2024",
    "card.celebrationDesc": "لحظات فرح لا تُنسى.",
    "card.quiet": "وقت هادئ",
    "card.quietDate": "يناير 2025",
    "card.quietDesc": "صباحات هادئة معاً.",

    "hstory.ch1": "الفصل 1",
    "hstory.ch1desc": "كيف بدأ كل شيء.",
    "hstory.ch2": "الفصل 2",
    "hstory.ch2desc": "ننمو معاً.",
    "hstory.ch3": "الفصل 3",
    "hstory.ch3desc": "لحظات جميلة.",
    "hstory.ch4": "الفصل 4",
    "hstory.ch4desc": "مغامرات جديدة.",
    "hstory.ch5": "الفصل 5",
    "hstory.ch5desc": "الأبد يبدأ.",

    "carousel.adventure": "مغامرة",
    "carousel.joy": "فرح",
    "carousel.love": "حب",
    "carousel.peace": "سلام",
    "carousel.dream": "حلم",
    "carousel.forever": "أبد",

    "bento.elegance": "أناقة",
    "bento.serenity": "هدوء",
    "bento.joy": "فرح",
    "bento.peace": "سلام",
    "bento.wonder": "دهشة",
    "bento.magic": "سحر",

    "polaroid.summer": "صيف 2024",
    "polaroid.spring": "أيام الربيع",
    "polaroid.autumn": "نزهة الخريف",
    "polaroid.winter": "ليالي الشتاء",
    "polaroid.newBeg": "بدايات جديدة",

    "split.title": "رحلتنا",
    "split.p1": "منذ أول لحظة التقينا، تغير كل شيء. أصبح العالم أكثر إشراقاً، وأيامنا أكثر امتلاءً، وكل لحظة أصبحت ذكرى تستحق الاحتفاظ.",
    "split.p2": "خلال الضحك والدموع، والمغامرات واللحظات الهادئة، بنينا قصة فريدة لنا.",
    "split.signature": "— معاً، إلى الأبد",

    "chapter.1.title": "الفصل الأول: مرحباً",
    "chapter.1.desc": "اليوم الذي التقينا فيه لأول مرة.",
    "chapter.1.year": "2021",
    "chapter.2.title": "الفصل الثاني: معاً",
    "chapter.2.desc": "نبني حياة، يوماً بعد يوم.",
    "chapter.2.year": "2022",
    "chapter.3.title": "الفصل الثالث: ننمو",
    "chapter.3.desc": "نزدهر في حب بعضنا.",
    "chapter.3.year": "2023",
    "chapter.4.title": "الفصل الرابع: للأبد",
    "chapter.4.desc": "وهكذا تستمر القصة.",
    "chapter.4.year": "2024+",

    "reveal.title": "أجمل ذكرى",
    "reveal.desc": "بعض اللحظات تساوي ألف كلمة.",

    "hbeat.1": "نبضة لكل لحظة",
    "hbeat.2": "حب بلا نهاية",
    "hbeat.3": "دائماً في قلبي",

    "ending.title": "كل ذكرى<br/>هي جزء منا",
    "ending.desc": "هذه مجرد بداية قصتنا.",
    "ending.footer": "صنع بحب — قصة ذكريات © 2025",

    "note.1": "أنت تجعل عالمي أكثر إشراقاً.",
    "note.2": "كل يوم معك هو هدية.",
    "note.3": "أحبك أكثر مما تستطيع الكلمات وصفه.",
    "note.4": "أنت كل شيء بالنسبة لي.",
    "note.5": "إلى الأبد ودائماً.",

    "lang.switch": "English",
    "lang.en": "English",
    "lang.ar": "العربية",
  }
};

function t(key) {
  const lang = translations[currentLang];
  return lang && lang[key] !== undefined ? lang[key] : translations.en[key] || key;
}

function setLang(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang === "ar" ? "ar" : "en";
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  if (typeof applyLang === "function") applyLang();
}

function toggleLang() {
  setLang(currentLang === "en" ? "ar" : "en");
}

function initLang() {
  document.documentElement.lang = currentLang === "ar" ? "ar" : "en";
  document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
}

function applyContentOverrides() {
  const C = (typeof CONFIG !== "undefined" && CONFIG.content) || {};

  const loginTitle = document.querySelector(".login-title");
  if (loginTitle) loginTitle.textContent = C.siteTitle || t("login.title");
  const loginSub = document.querySelector(".login-subtitle");
  if (loginSub) loginSub.textContent = C.siteSubtitle || t("login.subtitle");
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) loginBtn.textContent = C.loginButton || t("login.btn");

  const heroTag = document.getElementById("heroTag");
  if (heroTag) heroTag.textContent = C.heroTag || t("hero.tag");
  const heroTitle = document.getElementById("heroTitle");
  if (heroTitle) heroTitle.innerHTML = C.heroTitle || t("hero.title");
  const heroDesc = document.getElementById("heroDesc");
  if (heroDesc) heroDesc.textContent = C.heroDescription || t("hero.desc");
  const heroBtn = document.getElementById("heroBtn");
  if (heroBtn) heroBtn.textContent = C.heroButton || t("hero.btn");

  const endingTitle = document.querySelector(".ending-title");
  if (endingTitle) endingTitle.innerHTML = C.endingTitle || t("ending.title");
  const endingDesc = document.querySelector(".ending-desc");
  if (endingDesc) endingDesc.textContent = C.endingDescription || t("ending.desc");
  const endingFooter = document.querySelector(".ending-footer p");
  if (endingFooter) endingFooter.textContent = C.endingFooter || t("ending.footer");
}

function applyLang() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });
  document.title = t("page.title");

  const loginInput = document.getElementById("sitePassword");
  if (loginInput) loginInput.placeholder = t("login.placeholder");

  const logo = document.querySelector(".header-logo");
  if (logo) logo.textContent = t("header.logo");

  const scrollSpan = document.querySelector(".scroll-indicator span");
  if (scrollSpan) scrollSpan.textContent = t("hero.scroll");

  const langBtn = document.getElementById("langSwitch");
  if (langBtn) langBtn.textContent = t("lang.switch");

  applyContentOverrides();
  applySectionLang();
  applyCardLang();

  if (typeof renderDashboard === "function") {
    const existing = document.querySelector(".dash-overlay");
    if (existing) { renderDashboard(); }
  }
}

function applySectionLang() {
  const sectionKeys = {
    "floating-memories": { label: "sec.label.memories", title: "sec.title.floating", desc: "sec.desc.floating" },
    "marquee": { label: "sec.label.gallery", title: "sec.title.marquee", desc: "sec.desc.marquee" },
    "stack-cards": { label: "sec.label.story", title: "sec.title.stack", desc: "sec.desc.stack" },
    "timeline": { label: "sec.label.timeline", title: "sec.title.timeline", desc: "sec.desc.timeline" },
    "memory-explosion": { label: "sec.label.explosion", title: "sec.title.explosion", desc: "sec.desc.explosion" },
    "flip-cards": { label: "sec.label.moments", title: "sec.title.flip", desc: "sec.desc.flip" },
    "love-quotes": { label: "sec.label.words", title: "sec.title.quotes", desc: "sec.desc.quotes" },
    "statistics": { label: "sec.label.numbers", title: "sec.title.statistics", desc: "sec.desc.statistics" },
    "orbit-gallery": { label: "sec.label.orbit", title: "sec.title.orbit", desc: "sec.desc.orbit" },
    "horizontal-story": { label: "sec.label.story", title: "sec.title.horizontal", desc: "sec.desc.horizontal" },
    "parallax-layers": { label: "sec.label.depth", title: "sec.title.parallax", desc: "sec.desc.parallax" },
    "photo-wall": { label: "sec.label.wall", title: "sec.title.wall", desc: "sec.desc.wall" },
    "cinematic-reveal": { label: "sec.label.reveal", title: "sec.title.reveal", desc: "sec.desc.reveal" },
    "before-after": { label: "sec.label.thenNow", title: "sec.title.ba", desc: "sec.desc.ba" },
    "floating-polaroids": { label: "sec.label.polaroids", title: "sec.title.polaroids", desc: "sec.desc.polaroids" },
    "carousel": { label: "sec.label.carousel", title: "sec.title.carousel", desc: "sec.desc.carousel" },
    "spotlight": { label: "sec.label.spotlight", title: "sec.title.spotlight", desc: "sec.desc.spotlight" },
    "bento-grid": { label: "sec.label.bento", title: "sec.title.bento", desc: "sec.desc.bento" },
    "split-story": { label: "sec.label.narrative", title: "sec.title.split", desc: "sec.desc.split" },
    "sticky-chapters": { label: "sec.label.chapters", title: "sec.title.chapters", desc: "sec.desc.chapters" },
    "vertical-marquee": { label: "sec.label.flow", title: "sec.title.vmarquee", desc: "sec.desc.vmarquee" },
    "love-notes": { label: "sec.label.notes", title: "sec.title.notes", desc: "sec.desc.notes" },
    "heartbeat": { label: "sec.label.heartbeat", title: "sec.title.heartbeat", desc: "sec.desc.heartbeat" },
    "final-ending": { label: "sec.label.ending", title: null, desc: null },
  };

  Object.entries(sectionKeys).forEach(([id, keys]) => {
    const section = document.getElementById(id);
    if (!section) return;
    const label = section.querySelector(".section-label");
    if (label && keys.label) label.textContent = t(keys.label);
    const title = section.querySelector(".section-title");
    if (title && keys.title) title.textContent = t(keys.title);
    const desc = section.querySelector(".section-desc");
    if (desc && keys.desc) desc.textContent = t(keys.desc);
  });

  /* Quotes */
  const qc = document.getElementById("quotesContainer");
  if (qc) {
    const qs = qc.querySelectorAll(".quote-card");
    if (qs.length >= 4) {
      qs[0].querySelector("p").textContent = t("quote.1.text");
      qs[0].querySelector("cite").textContent = t("quote.1.author");
      qs[1].querySelector("p").textContent = t("quote.2.text");
      qs[1].querySelector("cite").textContent = t("quote.2.author");
      qs[2].querySelector("p").textContent = t("quote.3.text");
      qs[2].querySelector("cite").textContent = t("quote.3.author");
      qs[3].querySelector("p").textContent = t("quote.4.text");
      qs[3].querySelector("cite").textContent = t("quote.4.author");
    }
  }

  /* Statistics */
  const sg = document.getElementById("statsGrid");
  if (sg) {
    const sl = sg.querySelectorAll(".stat-label");
    if (sl.length >= 4) {
      sl[0].textContent = t("stat.days");
      sl[1].textContent = t("stat.adventures");
      sl[2].textContent = t("stat.memories");
      sl[3].textContent = t("stat.love");
    }
  }

  /* Heartbeat labels */
  const hc = document.getElementById("heartbeatContainer");
  if (hc) {
    const spans = hc.querySelectorAll(".hbeat-item span");
    if (spans.length >= 3) {
      spans[0].textContent = t("hbeat.1");
      spans[1].textContent = t("hbeat.2");
      spans[2].textContent = t("hbeat.3");
    }
  }

  /* Reveal */
  const rc = document.getElementById("revealContainer");
  if (rc) {
    const rh = rc.querySelector(".reveal-text h3");
    if (rh) rh.textContent = t("reveal.title");
    const rp = rc.querySelector(".reveal-text p");
    if (rp) rp.textContent = t("reveal.desc");
  }

  /* Split */
  const sc = document.getElementById("splitContainer");
  if (sc) {
    const sh = sc.querySelector(".split-text h3");
    if (sh) sh.textContent = t("split.title");
    const sp = sc.querySelectorAll(".split-text p");
    if (sp.length >= 2) {
      sp[0].textContent = t("split.p1");
      sp[1].textContent = t("split.p2");
    }
    const ss = sc.querySelector(".split-signature");
    if (ss) ss.textContent = t("split.signature");
  }
}

function applyCardLang() {
  /* Stack cards */
  const sw = document.getElementById("stackWrapper");
  if (sw) {
    const cards = sw.querySelectorAll(".stack-card h3");
    const descs = sw.querySelectorAll(".stack-card p");
    if (cards.length >= 4) {
      cards[0].textContent = t("stack.1.title");
      descs[0].textContent = t("stack.1.desc");
      cards[1].textContent = t("stack.2.title");
      descs[1].textContent = t("stack.2.desc");
      cards[2].textContent = t("stack.3.title");
      descs[2].textContent = t("stack.3.desc");
      cards[3].textContent = t("stack.4.title");
      descs[3].textContent = t("stack.4.desc");
    }
  }

  /* Timeline */
  const tc = document.getElementById("timelineContainer");
  if (tc) {
    const dates = tc.querySelectorAll(".timeline-date");
    const titles = tc.querySelectorAll(".timeline-text h4");
    const descs = tc.querySelectorAll(".timeline-text p");
    for (let i = 1; i <= 5 && i <= titles.length; i++) {
      const di = dates[i-1]; const ti = titles[i-1]; const pi = descs[i-1];
      if (di) di.textContent = t("tl." + i + ".date");
      if (ti) ti.textContent = t("tl." + i + ".title");
      if (pi) pi.textContent = t("tl." + i + ".desc");
    }
  }

  /* Flip cards */
  const fg = document.getElementById("flipGrid");
  if (fg) {
    const backs = fg.querySelectorAll(".flip-back-content");
    const keys = ["sunset","adventure","celebration","quiet"];
    backs.forEach((b, i) => {
      if (i >= keys.length) return;
      const k = keys[i];
      const h = b.querySelector("h3");
      const d = b.querySelector(".flip-date");
      const p = b.querySelector("p:not(.flip-date)");
      if (h) h.textContent = t("card." + k);
      if (d) d.textContent = t("card." + k + "Date");
      if (p) p.textContent = t("card." + k + "Desc");
    });
  }

  /* Horizontal story */
  const ht = document.getElementById("horizontalTrack");
  if (ht) {
    const h3s = ht.querySelectorAll(".horizontal-text h3");
    const ps = ht.querySelectorAll(".horizontal-text p");
    for (let i = 1; i <= 5; i++) {
      if (h3s[i-1]) h3s[i-1].textContent = t("hstory.ch" + i);
      if (ps[i-1]) ps[i-1].textContent = t("hstory.ch" + i + "desc");
    }
  }

  /* Carousel */
  const ct = document.getElementById("carouselTrack");
  if (ct) {
    const items = ct.querySelectorAll(".carousel-item h3");
    const keys = ["adventure","joy","love","peace","dream","forever"];
    items.forEach((item, i) => {
      if (i < keys.length) item.textContent = t("carousel." + keys[i]);
    });
  }

  /* Bento */
  const bg = document.getElementById("bentoGrid");
  if (bg) {
    const items = bg.querySelectorAll(".bento-overlay h3");
    const keys = ["elegance","serenity","joy","peace","wonder","magic"];
    items.forEach((item, i) => {
      if (i < keys.length) item.textContent = t("bento." + keys[i]);
    });
  }

  /* Polaroids */
  const pc = document.getElementById("polaroidContainer");
  if (pc) {
    const caps = pc.querySelectorAll(".polaroid-caption");
    const keys = ["summer","spring","autumn","winter","newBeg"];
    caps.forEach((c, i) => {
      if (i < keys.length) c.textContent = t("polaroid." + keys[i]);
    });
  }

  /* Chapters */
  const cc = document.getElementById("chaptersContainer");
  if (cc) {
    const h3s = cc.querySelectorAll(".chapter-content h3");
    const ps = cc.querySelectorAll(".chapter-content p");
    const yrs = cc.querySelectorAll(".chapter-year");
    for (let i = 1; i <= 4; i++) {
      if (h3s[i-1]) h3s[i-1].textContent = t("chapter." + i + ".title");
      if (ps[i-1]) ps[i-1].textContent = t("chapter." + i + ".desc");
      if (yrs[i-1]) yrs[i-1].textContent = t("chapter." + i + ".year");
    }
  }

  /* Love notes */
  const nc = document.getElementById("notesContainer");
  if (nc) {
    const notes = nc.querySelectorAll(".note-inner p");
    for (let i = 1; i <= 5 && i <= notes.length; i++) {
      notes[i-1].textContent = t("note." + i);
    }
  }
}
