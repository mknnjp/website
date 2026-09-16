export const initLocaleMenu = (storageKey: string): void => {
  const localeToggle = document.getElementById("locale-toggle");
  const localeMenu = document.getElementById("locale-menu");
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  localeToggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    const expanded = localeToggle.getAttribute("aria-expanded") === "true";
    localeToggle.setAttribute("aria-expanded", String(!expanded));
    localeMenu?.classList.toggle("hidden", expanded);
  });

  document.addEventListener("click", (event) => {
    if (
      localeMenu &&
      !localeMenu.classList.contains("hidden") &&
      event.target instanceof Node &&
      !localeToggle?.contains(event.target) &&
      !localeMenu.contains(event.target) &&
      !mobileToggle?.contains(event.target) &&
      !mobileMenu?.contains(event.target)
    ) {
      localeMenu.classList.add("hidden");
      localeToggle?.setAttribute("aria-expanded", "false");
    }
  });

  localeMenu?.querySelectorAll("a[data-locale]").forEach((link) => {
    link.addEventListener("click", () => {
      try {
        const nextLocale = link.getAttribute("data-locale");
        if (nextLocale) {
          localStorage.setItem(storageKey, nextLocale);
        }
      } catch {
        // Ignore storage errors (private mode, quota exceeded)
      }
    });
  });
};
