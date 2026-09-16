interface MobileMenuOptions {
  openLabel: string;
  closeLabel: string;
  closeDelay?: number;
  desktopQuery?: string;
}

export const initMobileMenu = ({
  openLabel,
  closeLabel,
  closeDelay = 300,
  desktopQuery = "(min-width: 768px)",
}: MobileMenuOptions): void => {
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileIconOpen = document.getElementById("mobile-icon-open");
  const mobileIconClose = document.getElementById("mobile-icon-close");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let mobileMenuOpen = false;
  let mobileCloseTimer = 0;

  const isMobileMenuOpen = (): boolean => mobileMenuOpen;

  const setMobileMenu = (open: boolean): void => {
    if (!mobileMenu || !mobileToggle) return;
    mobileMenuOpen = open;
    mobileToggle.setAttribute("aria-expanded", String(open));
    mobileToggle.setAttribute("aria-label", open ? closeLabel : openLabel);
    mobileMenu.setAttribute("aria-hidden", String(!open));
    mobileIconOpen?.classList.toggle("hidden", open);
    mobileIconClose?.classList.toggle("hidden", !open);
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      if (mobileCloseTimer) {
        window.clearTimeout(mobileCloseTimer);
        mobileCloseTimer = 0;
      }
      mobileMenu.classList.remove("hidden");
      // Force reflow so the slide transition plays.
      void mobileMenu.offsetWidth;
      mobileMenu.classList.remove("translate-x-full");
      mobileToggle.focus({ preventScroll: true });
    } else {
      mobileMenu.classList.add("translate-x-full");
      if (reduceMotion.matches) {
        mobileMenu.classList.add("hidden");
      } else {
        if (mobileCloseTimer) {
          window.clearTimeout(mobileCloseTimer);
        }
        mobileCloseTimer = window.setTimeout(() => {
          if (!mobileMenuOpen) mobileMenu.classList.add("hidden");
          mobileCloseTimer = 0;
        }, closeDelay);
      }
    }
  };

  mobileToggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    setMobileMenu(!isMobileMenuOpen());
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMobileMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMobileMenuOpen()) {
      setMobileMenu(false);
      mobileToggle?.focus({ preventScroll: true });
    }
  });

  window.matchMedia(desktopQuery).addEventListener("change", (event) => {
    if (event.matches && isMobileMenuOpen()) setMobileMenu(false);
  });
};
