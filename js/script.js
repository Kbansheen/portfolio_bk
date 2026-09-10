/* ============================================================
   Portfolio UI: nav, reveal, modals, typewriter, counters
   ============================================================ */

/* ---------- Scroll progress bar ---------- */
var progressEl = document.getElementById("scrollProgress");

window.addEventListener("scroll", function () {
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    progressEl.style.width = pct + "%";
}, { passive: true });

/* ---------- Mobile nav ---------- */
var burger = document.getElementById("navBurger");
var nav = document.getElementById("nav");

burger.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
});

nav.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
        nav.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
    });
});

/* ---------- Active nav link while scrolling ---------- */
var sections = document.querySelectorAll("section[id]");
var navLinks = document.querySelectorAll(".nav-link");

var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute("id");
        navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
    });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach(function (sec) { sectionObserver.observe(sec); });

/* ---------- Reveal on scroll ---------- */
var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(function (el) { revealObserver.observe(el); });

/* ---------- Stat count-up ---------- */
(function counters() {
    var nums = document.querySelectorAll(".stat-num[data-count]");
    if (!nums.length) return;

    var reduceMotion = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function render(el) {
        var target = parseInt(el.getAttribute("data-count"), 10);
        var suffix = el.getAttribute("data-suffix") || "";

        if (reduceMotion) {
            el.textContent = target + suffix;
            return;
        }

        var duration = 1400;
        var start = null;

        function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - p, 3);   /* ease-out cubic */
            el.textContent = Math.round(eased * target) + suffix;
            if (p < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            render(entry.target);
            counterObserver.unobserve(entry.target);
        });
    }, { threshold: 0.6 });

    nums.forEach(function (el) { counterObserver.observe(el); });
})();

/* ---------- Project modals ---------- */
var detailButtons = document.querySelectorAll(".proj-details-btn");
var openModal = null;

function closeModal() {
    if (!openModal) return;
    openModal.classList.remove("open");
    openModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    openModal = null;
}

detailButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
        closeModal();
        var modal = document.getElementById("modal-" + btn.getAttribute("data-project"));
        if (!modal) return;
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        openModal = modal;
    });
});

document.querySelectorAll("[data-close]").forEach(function (el) {
    el.addEventListener("click", closeModal);
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
});

/* ---------- Typewriter hero roles ---------- */
(function typewriter() {
    var el = document.getElementById("typedRole");
    if (!el) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var roles = [
        "Computer Science Engineer",
        "AI Researcher",
        "Software Developer",
        "Published Researcher"
    ];
    var roleIndex = 0, charIndex = roles[0].length, deleting = false;

    function tick() {
        var word = roles[roleIndex];

        if (deleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        el.textContent = word.slice(0, charIndex);

        var delay = deleting ? 35 : 75;

        if (!deleting && charIndex === word.length) {
            delay = 2200;               /* pause on full word */
            deleting = true;
        } else if (deleting && charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 400;
        }

        setTimeout(tick, delay);
    }

    setTimeout(tick, 2200);
})();

/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
