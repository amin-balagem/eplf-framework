/* ==========================================================================
   EPLF — app.js
   الإصدار التأسيسي 2026 — Foundational Edition
   ========================================================================== */


/* ==========================================================================
   1. LANGUAGE MANAGEMENT SYSTEM
   ========================================================================== */
function setLangMode(mode) {
    document.documentElement.setAttribute('data-lang-mode', mode);

    var btnEn = document.getElementById('btn-en');
    var btnAr = document.getElementById('btn-ar');
    var btnBi = document.getElementById('btn-bi');

    /* الألوان الافتراضية — غير مفعّل */
    var normalEn = "px-5 py-1.5 rounded-lg text-lg font-bold transition-all text-blue-300 hover:bg-blue-900/50 hover:text-white";
    var normalBi = "px-5 py-1.5 rounded-lg text-lg font-bold transition-all text-purple-300 hover:bg-purple-900/50 hover:text-white";
    var normalAr = "px-5 py-1.5 rounded-lg text-lg font-bold transition-all text-emerald-300 hover:bg-emerald-900/50 hover:text-white";

    if (btnEn) btnEn.className = normalEn;
    if (btnBi) btnBi.className = normalBi;
    if (btnAr) btnAr.className = normalAr;

    /* الألوان الخاصة بالزر النشط */
    if (mode === 'en') {
        if (btnEn) btnEn.className = "px-5 py-1.5 rounded-lg text-lg font-bold transition-all bg-blue-600 text-white shadow-lg shadow-blue-500/30";
        document.documentElement.dir = 'ltr';
        document.body.style.fontFamily = "'Inter', sans-serif";

    } else if (mode === 'ar') {
        if (btnAr) btnAr.className = "px-5 py-1.5 rounded-lg text-lg font-bold transition-all bg-emerald-600 text-white shadow-lg shadow-emerald-500/30";
        document.documentElement.dir = 'rtl';
        document.body.style.fontFamily = "'Cairo', sans-serif";

    } else {
        /* bilingual */
        if (btnBi) btnBi.className = "px-5 py-1.5 rounded-lg text-lg font-bold transition-all bg-executive-gold text-executive-navy shadow-lg shadow-yellow-500/30";
        document.documentElement.dir = 'ltr';
        document.body.style.fontFamily = "'Inter', sans-serif";
    }

    /* تحديث حلقة الكفاءات عند تغيير اللغة */
    if (typeof generateRing === 'function') {
        generateRing();
    }
}


/* ==========================================================================
   2. INTERACTIVE SVG RING
   (Improved Layout · 3D Centre · Coloured Text)
   ========================================================================== */
function generateRing() {
    const mount = document.getElementById('ring-mount');
    if (!mount) return;
    mount.innerHTML = '';

    const mode  = document.documentElement.getAttribute('data-lang-mode');
    const useAr = (mode === 'ar');

    const competencies = [
        /* ── الطبقة الداخلية (ذهبي) ── */
        { en: "Leadership",        ar: "القيادة",              layer: 1, color: '#D4AF37' },
        { en: "Strategy",          ar: "الاستراتيجية",         layer: 1, color: '#D4AF37' },
        { en: "Business Acumen",   ar: "الفطنة التجارية",      layer: 1, color: '#D4AF37' },
        { en: "Innovation",        ar: "الابتكار",             layer: 1, color: '#D4AF37' },

        /* ── الطبقة الوسطى (أزرق) ── */
        { en: "Governance",             ar: "الحوكمة",              layer: 2, color: '#3B82F6' },
        { en: "Project Management",     ar: "إدارة المشاريع",       layer: 2, color: '#3B82F6' },
        { en: "Portfolio Management",   ar: "إدارة المحافظ",        layer: 2, color: '#3B82F6' },
        { en: "Commercial Excellence",  ar: "التميز التجاري",       layer: 2, color: '#3B82F6' },
        { en: "Claims Management",      ar: "إدارة المطالبات",      layer: 2, color: '#3B82F6' },
        { en: "HSE",                    ar: "HSE",                  layer: 2, color: '#3B82F6' },
        { en: "Continuous Improvement", ar: "التحسين المستمر",      layer: 2, color: '#3B82F6' },

        /* ── الطبقة الخارجية (أخضر/زمردي) ── */
        { en: "Risk Intelligence",      ar: "ذكاء المخاطر",                 layer: 3, color: '#10B981' },
        { en: "Decision Intelligence",  ar: "ذكاء اتخاذ القرار",           layer: 3, color: '#10B981' },
        { en: "Digital Leadership",     ar: "القيادة الرقمية",              layer: 3, color: '#10B981' },
        { en: "Data Governance",        ar: "حوكمة البيانات",               layer: 3, color: '#10B981' },
        { en: "AI Governance",          ar: "حوكمة الذكاء الاصطناعي",      layer: 3, color: '#10B981' },
        { en: "AI Literacy",            ar: "محو أمية الذكاء الاصطناعي",   layer: 3, color: '#10B981' },
        { en: "Project Controls",       ar: "ضوابط المشاريع",              layer: 3, color: '#10B981' },
        { en: "Cost Engineering",       ar: "هندسة التكاليف",              layer: 3, color: '#10B981' }
    ];

    const svgNS = "http://www.w3.org/2000/svg";
    const svg   = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 1600 1600");
    svg.setAttribute("width",  "100%");
    svg.setAttribute("height", "100%");

    const defs = document.createElementNS(svgNS, "defs");

    /* فلتر التوهج */
    const filter = document.createElementNS(svgNS, "filter");
    filter.setAttribute("id", "glow");
    const feBlur = document.createElementNS(svgNS, "feGaussianBlur");
    feBlur.setAttribute("stdDeviation", "4");
    feBlur.setAttribute("result", "coloredBlur");
    const feMerge = document.createElementNS(svgNS, "feMerge");
    const fmn1 = document.createElementNS(svgNS, "feMergeNode"); fmn1.setAttribute("in", "coloredBlur");
    const fmn2 = document.createElementNS(svgNS, "feMergeNode"); fmn2.setAttribute("in", "SourceGraphic");
    feMerge.appendChild(fmn1);
    feMerge.appendChild(fmn2);
    filter.appendChild(feBlur);
    filter.appendChild(feMerge);
    defs.appendChild(filter);

    /* تدرج ذهبي معدني */
    const goldGrad = document.createElementNS(svgNS, "linearGradient");
    goldGrad.setAttribute("id", "goldGrad");
    goldGrad.setAttribute("x1", "0%"); goldGrad.setAttribute("y1", "0%");
    goldGrad.setAttribute("x2", "100%"); goldGrad.setAttribute("y2", "100%");
    [
        { o: "0%",   c: "#BF953F" },
        { o: "25%",  c: "#FCF6BA" },
        { o: "50%",  c: "#B38728" },
        { o: "75%",  c: "#FBF5B7" },
        { o: "100%", c: "#AA771C" }
    ].forEach(s => {
        const stop = document.createElementNS(svgNS, "stop");
        stop.setAttribute("offset", s.o);
        stop.setAttribute("stop-color", s.c);
        goldGrad.appendChild(stop);
    });
    defs.appendChild(goldGrad);

    /* تدرج كحلي للدائرة المركزية */
    const darkGrad = document.createElementNS(svgNS, "radialGradient");
    darkGrad.setAttribute("id", "darkGrad");
    darkGrad.setAttribute("cx", "30%"); darkGrad.setAttribute("cy", "30%"); darkGrad.setAttribute("r", "70%");
    const ds1 = document.createElementNS(svgNS, "stop");
    ds1.setAttribute("offset", "0%");   ds1.setAttribute("stop-color", "#1E3A8B");
    const ds2 = document.createElementNS(svgNS, "stop");
    ds2.setAttribute("offset", "100%"); ds2.setAttribute("stop-color", "#080E21");
    darkGrad.appendChild(ds1);
    darkGrad.appendChild(ds2);
    defs.appendChild(darkGrad);

    svg.appendChild(defs);

    const cx = 800, cy = 800;
    const radiusLayers = { 1: 280, 2: 480, 3: 680 };
    const lineColors   = { 1: '#D4AF37', 2: '#3B82F6', 3: '#10B981' };

    /* الحلقات الدائرية المتقطعة */
    [3, 2, 1].forEach(level => {
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", cx); circle.setAttribute("cy", cy);
        circle.setAttribute("r", radiusLayers[level]);
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", lineColors[level]);
        circle.setAttribute("stroke-width", "3");
        circle.setAttribute("stroke-dasharray", "12 18");
        svg.appendChild(circle);
    });

    const nodesGroup = document.createElementNS(svgNS, "g");
    const textsGroup = document.createElementNS(svgNS, "g");

    /* العقد والنصوص */
    [1, 2, 3].forEach(level => {
        const items = competencies.filter(c => c.layer === level);
        const total = items.length;
        const r     = radiusLayers[level];

        items.forEach((item, i) => {
            const angle = (i / total) * (2 * Math.PI) - (Math.PI / 2);
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);

            const g = document.createElementNS(svgNS, "g");

            const nodeCircle = document.createElementNS(svgNS, "circle");
            nodeCircle.setAttribute("cx", x);
            nodeCircle.setAttribute("cy", y);
            nodeCircle.setAttribute("r",  16);
            nodeCircle.setAttribute("fill",         "#0B132B");
            nodeCircle.setAttribute("stroke",       item.color);
            nodeCircle.setAttribute("stroke-width", "5");
            nodeCircle.setAttribute("filter",       "url(#glow)");

            let txtX = x, txtY = y, tAnchor = "middle";

            if (Math.abs(Math.cos(angle)) < 0.1) {
                tAnchor = "middle";
                txtX = x;
                txtY = Math.sin(angle) > 0 ? y + 50 : y - 35;
            } else if (Math.cos(angle) > 0) {
                tAnchor = useAr ? "end" : "start";
                txtX = x + 40;
                txtY = y + 8;
            } else {
                tAnchor = useAr ? "start" : "end";
                txtX = x - 40;
                txtY = y + 8;
            }

            const text = document.createElementNS(svgNS, "text");
            text.setAttribute("x",           txtX);
            text.setAttribute("y",           txtY);
            text.setAttribute("text-anchor", tAnchor);
            text.setAttribute("fill",        item.color);
            text.setAttribute("font-size",   "26px");
            text.setAttribute("font-weight", "700");
            text.setAttribute("font-family", "Inter, Cairo, sans-serif");
            text.textContent = useAr ? item.ar : item.en;

            g.appendChild(nodeCircle);
            nodesGroup.appendChild(g);
            textsGroup.appendChild(text);
        });
    });

    svg.appendChild(nodesGroup);
    svg.appendChild(textsGroup);

    /* الدائرة المركزية — تصميم 3D ذهبي */
    const centerGrp = document.createElementNS(svgNS, "g");

    const coreGlow = document.createElementNS(svgNS, "circle");
    coreGlow.setAttribute("cx", cx); coreGlow.setAttribute("cy", cy); coreGlow.setAttribute("r", 168);
    coreGlow.setAttribute("fill", "none");
    coreGlow.setAttribute("stroke", "url(#goldGrad)");
    coreGlow.setAttribute("stroke-width", "15");
    coreGlow.setAttribute("filter", "url(#glow)");
    coreGlow.setAttribute("opacity", "0.6");

    const goldRing = document.createElementNS(svgNS, "circle");
    goldRing.setAttribute("cx", cx); goldRing.setAttribute("cy", cy); goldRing.setAttribute("r", 155);
    goldRing.setAttribute("fill", "none");
    goldRing.setAttribute("stroke", "url(#goldGrad)");
    goldRing.setAttribute("stroke-width", "12");

    const centerCircle = document.createElementNS(svgNS, "circle");
    centerCircle.setAttribute("cx", cx); centerCircle.setAttribute("cy", cy); centerCircle.setAttribute("r", 149);
    centerCircle.setAttribute("fill", "url(#darkGrad)");

    const text1 = document.createElementNS(svgNS, "text");
    text1.setAttribute("x", cx); text1.setAttribute("y", cy - 5);
    text1.setAttribute("text-anchor", "middle");
    text1.setAttribute("fill", "#ffffff");
    text1.setAttribute("font-size", "46px");
    text1.setAttribute("font-weight", "900");
    text1.setAttribute("style", "text-shadow: 2px 4px 10px rgba(0,0,0,0.9);");
    text1.textContent = useAr ? "الكفاءات" : "EXECUTIVE";

    const text2 = document.createElementNS(svgNS, "text");
    text2.setAttribute("x", cx); text2.setAttribute("y", cy + 42);
    text2.setAttribute("text-anchor", "middle");
    text2.setAttribute("fill", "url(#goldGrad)");
    text2.setAttribute("font-size", "36px");
    text2.setAttribute("font-weight", "900");
    text2.setAttribute("style", "text-shadow: 2px 4px 10px rgba(0,0,0,0.9);");
    text2.textContent = useAr ? "التنفيذية" : "COMPETENCIES";

    centerGrp.appendChild(coreGlow);
    centerGrp.appendChild(goldRing);
    centerGrp.appendChild(centerCircle);
    centerGrp.appendChild(text1);
    centerGrp.appendChild(text2);
    svg.appendChild(centerGrp);

    mount.appendChild(svg);
}


/* ==========================================================================
   3. VIDEO CONTROL SYSTEM
   ── يحدد الفيديو تلقائياً بناءً على اللغة المختارة ──
   • English   → videos/eplfENG-overview.mp4
   • العربية    → videos/eplf-overview.mp4
   • Bilingual → videos/eplf-overview.mp4
   ========================================================================== */
function openEPLFVideo() {
    const modal  = document.getElementById('video-modal');
    const video  = document.getElementById('eplf-overview-video');
    const source = video ? video.querySelector('source') : null;

    if (!modal || !video || !source) return;

    /* ── اختيار الفيديو المناسب ── */
    const langMode = document.documentElement.getAttribute('data-lang-mode');

    if (langMode === 'en') {
        source.setAttribute('src', 'videos/eplfENG-overview.mp4'); /* فيديو إنجليزي */
    } else {
        source.setAttribute('src', 'videos/eplf-overview.mp4');    /* فيديو عربي (افتراضي) */
    }

    /* إعادة تحميل الفيديو بالمصدر الجديد */
    video.load();

    /* فتح المودال */
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    /* تشغيل الفيديو */
    const playPromise = video.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            /* صامت — تجنب أخطاء منع التشغيل التلقائي في بعض المتصفحات */
        });
    }
}

function closeEPLFVideo() {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('eplf-overview-video');

    if (video) {
        video.pause();
        video.currentTime = 0;
    }

    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}


/* ==========================================================================
   4. GLOBAL EVENT LISTENERS
   ========================================================================== */
document.addEventListener('click', function (event) {
    /* إغلاق المودال عند الضغط خارجه */
    const modal = document.getElementById('video-modal');
    if (modal && event.target === modal) {
        closeEPLFVideo();
    }
});

document.addEventListener('keydown', function (event) {
    /* إغلاق المودال بمفتاح ESC */
    if (event.key === 'Escape') {
        closeEPLFVideo();
    }
});


/* ==========================================================================
   5. INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function () {
    setLangMode('bilingual'); /* اللغة الافتراضية عند تحميل الصفحة */
});
