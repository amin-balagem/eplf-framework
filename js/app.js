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