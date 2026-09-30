/* ===========================================================
   PARCHIS - main.js
   Efecto parallax del hero + menú móvil + animaciones scroll
   =========================================================== */

/* ---------- 1. PARALLAX HERO (movimiento con el scroll) ---------- */
const nubesArriba = document.querySelector("#nubes-arriba");
const nubesAbajo  = document.querySelector("#nubes-abajo");
const slogan      = document.querySelector("#slogan");
const etiqueta    = document.querySelector("#etiqueta");
const logoHero    = document.querySelector("#logo-hero");
const fondo       = document.querySelector("#fondo");

window.addEventListener("scroll", () => {
    const scroll = window.scrollY;

    // Cada capa se mueve a una velocidad distinta = sensación de profundidad
    if (fondo)       fondo.style.transform       = `translateY(${scroll * 0.15}px) scale(1.05)`;
    if (nubesArriba) nubesArriba.style.transform = `translate(${scroll * 0.6}px, ${scroll * 0.2}px)`;
    if (nubesAbajo)  nubesAbajo.style.transform  = `translate(${scroll * -0.5}px, ${scroll * 0.3}px)`;
    if (slogan)      slogan.style.transform      = `translateX(${scroll * 1.1}px)`;
    if (etiqueta)    etiqueta.style.transform    = `translateX(${scroll * -0.9}px)`;
    if (logoHero)    logoHero.style.transform    = `translateY(${scroll * -0.3}px)`;
});

/* ---------- 2. PARALLAX SUAVE CON EL MOUSE (hero) ---------- */
const hero = document.querySelector(".parallax");
if (hero) {
    hero.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth  - 0.5);
        const y = (e.clientY / window.innerHeight - 0.5);
        if (nubesArriba) nubesArriba.style.marginLeft = `${x * 30}px`;
        if (nubesAbajo)  nubesAbajo.style.marginRight = `${x * 40}px`;
        if (slogan)      slogan.style.marginTop = `${y * 20}px`;
        if (logoHero)    logoHero.style.marginTop = `${y * -18}px`;
    });
}

/* ---------- 3. MENÚ HAMBURGUESA (móvil) ---------- */
const hamburguesa = document.querySelector(".hamburguesa");
const menu = document.querySelector(".menu");
if (hamburguesa && menu) {
    hamburguesa.addEventListener("click", () => menu.classList.toggle("abierto"));
    menu.querySelectorAll("a").forEach(a =>
        a.addEventListener("click", () => menu.classList.remove("abierto"))
    );
}

/* ---------- 4. ANIMACIONES AL HACER SCROLL (reveal) ---------- */
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    reveals.forEach(el => obs.observe(el));
} else {
    reveals.forEach(el => el.classList.add("visible"));
}

/* ---------- 5. INTERACCIÓN FICHA DE PRODUCTO (chips) ---------- */
document.querySelectorAll(".variantes").forEach(grupo => {
    grupo.querySelectorAll(".chip, .color-punto").forEach(op => {
        op.addEventListener("click", () => {
            op.parentElement.querySelectorAll(".chip, .color-punto")
              .forEach(x => x.classList.remove("sel"));
            op.classList.add("sel");
        });
    });
});

/* ---------- 6. FORMULARIO CONTACTO (demo, sin backend) ---------- */
const form = document.querySelector("#form-contacto");
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const msg = document.querySelector("#form-mensaje-ok");
        if (msg) { msg.style.display = "block"; form.reset(); }
    });
}
