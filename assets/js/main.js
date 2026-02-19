async function loadLanguage(lang) {
    const response = await fetch(`assets/languages/${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (translations[key]) {
            el.textContent = translations[key];
        }
    });

    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
}

document.addEventListener("DOMContentLoaded", async function () {  // ← async
    // Header laden
    await fetch("components/header.html")                          // ← await
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("header").innerHTML = data;
        });

    // Footer laden
    await fetch("components/footer.html")                          // ← await
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("footer").innerHTML = data;
        });

    const lang =
        localStorage.getItem("lang") ||
        (navigator.language.startsWith("de") ? "de" : "en");

    loadLanguage(lang);
});