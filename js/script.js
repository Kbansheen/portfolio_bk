/* ============================================================
   Portfolio UI: theme, nav, reveal, modals, typewriter
   ============================================================ */

/* ---------- Theme (light / dark) ---------- */
(function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem("bk-theme"); } catch (e) { /* no storage */ }
    var theme = saved === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
})();

document.getElementById("themeToggle").addEventListener("click", function () {
    var current = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", current);
    try { localStorage.setItem("bk-theme", current); } catch (e) { /* no storage */ }
});

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
            delay = 2200;               // pause on full word
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

/* ---------- Back to top ---------- */
var backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    backToTop.classList.toggle("show", window.scrollY > 500);
}, { passive: true });

backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
