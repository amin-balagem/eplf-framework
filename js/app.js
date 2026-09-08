/* ==========================================================================
   EPLF™ — app.js
   Foundational Edition | Version 1.0 | 2026
   ========================================================================== */


/* ==========================================================================
   1. LANGUAGE MANAGEMENT SYSTEM
   ========================================================================== */

function setLangMode(mode) {

    const html = document.documentElement;

    const validMode =
        ['en', 'ar', 'bilingual'].includes(mode)
            ? mode
            : 'bilingual';

    html.setAttribute('data-lang-mode', validMode);


    /* ----------------------------------------------------------------------
       Language buttons
       ---------------------------------------------------------------------- */

    const btnEn = document.getElementById('btn-en');
    const btnAr = document.getElementById('btn-ar');
    const btnBi = document.getElementById('btn-bi');

    const normalEn =
        'px-5 py-1.5 rounded-lg text-lg font-bold transition-all text-blue-300 hover:bg-blue-900/50 hover:text-white';

    const normalBi =
        'px-5 py-1.5 rounded-lg text-lg font-bold transition-all text-purple-300 hover:bg-purple-900/50 hover:text-white';

    const normalAr =
        'px-5 py-1.5 rounded-lg text-lg font-bold transition-all text-emerald-300 hover:bg-emerald-900/50 hover:text-white';


    if (btnEn) btnEn.className = normalEn;
    if (btnBi) btnBi.className = normalBi;
    if (btnAr) btnAr.className = normalAr;


    /* ----------------------------------------------------------------------
       English
       ---------------------------------------------------------------------- */

    if (validMode === 'en') {

        if (btnEn) {

            btnEn.className =
                'px-5 py-1.5 rounded-lg text-lg font-bold transition-all bg-blue-600 text-white shadow-lg shadow-blue-500/30';
        }

        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');

        if (document.body) {

            document.body.style.fontFamily =
                "'Inter', sans-serif";
        }
    }


    /* ----------------------------------------------------------------------
       Arabic
       ---------------------------------------------------------------------- */

    else if (validMode === 'ar') {

        if (btnAr) {

            btnAr.className =
                'px-5 py-1.5 rounded-lg text-lg font-bold transition-all bg-emerald-600 text-white shadow-lg shadow-emerald-500/30';
        }

        html.setAttribute('lang', 'ar');
        html.setAttribute('dir', 'rtl');

        if (document.body) {

            document.body.style.fontFamily =
                "'Cairo', sans-serif";
        }
    }


    /* ----------------------------------------------------------------------
       Bilingual
       ---------------------------------------------------------------------- */

    else {

        if (btnBi) {

            btnBi.className =
                'px-5 py-1.5 rounded-lg text-lg font-bold transition-all bg-executive-gold text-executive-navy shadow-lg shadow-yellow-500/30';
        }

        /*
         * Bilingual mode keeps the document direction LTR because
         * English and Arabic content are displayed together.
         */
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');

        if (document.body) {

            document.body.style.fontFamily =
                "'Inter', sans-serif";
        }
    }


    /* ----------------------------------------------------------------------
       Remember selected language
       ---------------------------------------------------------------------- */

    try {

        localStorage.setItem(
            'preferredLangMode',
            validMode
        );

    } catch (_) {

        /*
         * Storage may be unavailable in privacy-restricted
         * browser contexts.
         */
    }


    /* ----------------------------------------------------------------------
       Refresh language-dependent visual components
       ---------------------------------------------------------------------- */

    if (typeof generateRing === 'function') {

        try {

            generateRing();

        } catch (_) {

            /*
             * Prevent a visual component error from breaking
             * the main language controller.
             */
        }
    }
}


/* ==========================================================================
   2. VIDEO CONTROL SYSTEM
   ==========================================================================

   English:
   videos/eplfENG-overview.mp4

   Arabic / Bilingual:
   videos/eplf-overview.mp4

   ========================================================================== */

function openEPLFVideo() {

    const modal =
        document.getElementById('video-modal');

    const video =
        document.getElementById('eplf-overview-video');

    const source =
        video
            ? video.querySelector('source')
            : null;


    /*
     * Required elements are not available.
     */
    if (!modal || !video || !source) {

        return;
    }


    /* ----------------------------------------------------------------------
       Determine current language
       ---------------------------------------------------------------------- */

    const langMode =
        document.documentElement.getAttribute(
            'data-lang-mode'
        ) || 'bilingual';


    /* ----------------------------------------------------------------------
       Select correct video
       ---------------------------------------------------------------------- */

    const videoPath =
        langMode === 'en'
            ? 'videos/eplfENG-overview.mp4'
            : 'videos/eplf-overview.mp4';


    /* ----------------------------------------------------------------------
       Change video source only when necessary
       ---------------------------------------------------------------------- */

    if (
        source.getAttribute('src') !== videoPath
    ) {

        source.setAttribute(
            'src',
            videoPath
        );

        video.load();
    }


    /* ----------------------------------------------------------------------
       Open modal
       ---------------------------------------------------------------------- */

    modal.classList.remove('hidden');
    modal.classList.add('flex');


    /* ----------------------------------------------------------------------
       Start playback
       ---------------------------------------------------------------------- */

    const playPromise =
        video.play();


    /*
     * Browser autoplay restrictions are ignored intentionally.
     * The normal video controls remain available to the user.
     */

    if (
        playPromise &&
        typeof playPromise.catch === 'function'
    ) {

        playPromise.catch(() => {

            /* Autoplay may be blocked by the browser. */

        });
    }
}


/* ==========================================================================
   3. CLOSE VIDEO
   ========================================================================== */

function closeEPLFVideo() {

    const modal =
        document.getElementById('video-modal');

    const video =
        document.getElementById('eplf-overview-video');


    if (video) {

        video.pause();

        /*
         * Reset playback position so the next opening
         * starts from the beginning.
         */
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


/* --------------------------------------------------------------------------
   Close video when clicking outside the video player
   -------------------------------------------------------------------------- */

document.addEventListener(
    'click',
    function (event) {

        const modal =
            document.getElementById('video-modal');

        if (
            modal &&
            event.target === modal
        ) {

            closeEPLFVideo();
        }
    }
);


/* --------------------------------------------------------------------------
   Close video with Escape key
   -------------------------------------------------------------------------- */

document.addEventListener(
    'keydown',
    function (event) {

        if (event.key === 'Escape') {

            closeEPLFVideo();
        }
    }
);


/* ==========================================================================
   5. INITIALIZATION
   ========================================================================== */

document.addEventListener(
    'DOMContentLoaded',
    function () {

        let savedMode =
            'bilingual';


        /* ------------------------------------------------------------------
           Retrieve previously selected language
           ------------------------------------------------------------------ */

        try {

            savedMode =
                localStorage.getItem(
                    'preferredLangMode'
                ) || 'bilingual';

        } catch (_) {

            /*
             * Use bilingual as the default when browser
             * storage is unavailable.
             */
        }


        /* ------------------------------------------------------------------
           Initialize language system
           ------------------------------------------------------------------ */

        setLangMode(savedMode);
    }
);
