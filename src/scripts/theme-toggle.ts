export const initThemeToggle = (): void => {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIconSun = document.getElementById("theme-icon-sun");
  const themeIconMoon = document.getElementById("theme-icon-moon");
  const isDark = () => document.documentElement.classList.contains("dark");

  // Sync with OS preference if no saved preference exists
  try {
    if (!localStorage.getItem("theme")) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  } catch {
    // Ignore storage errors
  }

  const updateIcon = (): void => {
    themeIconSun?.classList.toggle("hidden", isDark());
    themeIconMoon?.classList.toggle("hidden", !isDark());
  };

  themeToggle?.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark() ? "dark" : "light");
    } catch {
      // Ignore storage errors
    }
    updateIcon();
  });

  updateIcon();
};
