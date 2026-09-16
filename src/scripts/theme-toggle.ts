export const initThemeToggle = (): void => {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIconSun = document.getElementById("theme-icon-sun");
  const themeIconMoon = document.getElementById("theme-icon-moon");
  const isDark = () => document.documentElement.classList.contains("dark");

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
