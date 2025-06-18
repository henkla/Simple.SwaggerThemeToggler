(() => {
    const STORAGE_KEY = "Simple.SwaggerThemeToggler";
    const THEMES_JSON_URL = "/swagger-theme-toggler/themes/themes.json";

    let intervalId;
    let attempts = 0;
    const maxAttempts = 20;

    const toTitleCase = (str) =>
        str
            .replace(/\.css$/, '')                // Ta bort .css
            .split(/[-_]/)                        // Dela på - eller _
            .map(s => s.charAt(0).toUpperCase() + s.slice(1))
            .join(' ');

    const tryAddDropdown = (themes) => {
        const container = document.querySelector(".topbar-wrapper");
        if (!container) {
            attempts++;
            if (attempts >= maxAttempts) {
                clearInterval(intervalId);
                console.warn("Could not find container for theme dropdown after max attempts");
            }
            return;
        }

        clearInterval(intervalId);

        let themeLink = document.getElementById("theme-style");
        if (!themeLink) {
            themeLink = document.createElement("link");
            themeLink.id = "theme-style";
            themeLink.rel = "stylesheet";
            document.head.appendChild(themeLink);
        }

        const label = document.createElement("label");
        label.classList.add("select-label");
        label.setAttribute("for", "theme-select");
        label.textContent = "Select theme";
        label.style.marginLeft = "1em";
        label.style.marginRight = "-0.5em";
        label.style.marginTop = "4px";
        label.style.color = "#f0f0f0";
        label.style.fontSize = "16px";
        label.style.padding = "0 10px 0 0";
        label.style.textAlign = "right";

        const select = document.createElement("select");
        select.style.border = "2px solid var(--swagger-color)";
        select.title = "Choose theme";

        // Lägg till Classic först
        themes.unshift({ name: "Classic", file: "" });

        themes.forEach((theme, index) => {
            const option = document.createElement("option");
            option.value = index.toString();
            option.textContent = toTitleCase(theme.name);
            select.appendChild(option);
        });

        const savedTheme = localStorage.getItem(STORAGE_KEY);
        const savedIndex = savedTheme !== null ? parseInt(savedTheme, 10) : 0;
        const initialIndex = savedIndex >= 0 && savedIndex < themes.length ? savedIndex : 0;

        select.value = initialIndex.toString();
        themeLink.href = themes[initialIndex].file;

        select.addEventListener("change", () => {
            const selectedIndex = parseInt(select.value, 10);
            if (selectedIndex >= 0 && selectedIndex < themes.length) {
                themeLink.href = themes[selectedIndex].file;
                localStorage.setItem(STORAGE_KEY, selectedIndex);
            }
        });

        container.appendChild(label);
        container.appendChild(select);
    };

    const fetchThemes = async () => {
        try {
            const response = await fetch(THEMES_JSON_URL);
            if (!response.ok) throw new Error("Failed to fetch themes");
            const themes = await response.json();

            intervalId = setInterval(() => tryAddDropdown(themes), 200);
        } catch (err) {
            console.error("Failed to load theme definitions:", err);
        }
    };

    fetchThemes();
})();
