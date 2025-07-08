(() => {
    const STORAGE_KEY = "Simple.SwaggerThemeToggler";
    const DEFAULT_THEMES_JSON_URL = "/swagger-theme-toggler/themes/themes.json";
    const CUSTOM_THEMES_JSON_URL = window.SwaggerThemeTogglerCustomPath
        ? window.SwaggerThemeTogglerCustomPath.replace(/\/$/, "") // inga extra / i slutet
        : null;

    let intervalId;
    let attempts = 0;
    const maxAttempts = 20;

    const toTitleCase = (str) =>
        str
            .replace(/\.css$/, '')
            .split(/[-_]/)
            .map(s => s.charAt(0).toUpperCase() + s.slice(1))
            .join(' ');

    const tryAddDropdown = (themes) => {
        const container = document.querySelector(".topbar-wrapper");
        if (!container) {
            attempts++;
            if (attempts >= maxAttempts) {
                clearInterval(intervalId);
                console.warn("⚠️ Could not find container for theme dropdown after max attempts");
            }
            return;
        }

        clearInterval(intervalId);
        console.log("✅ Adding theme dropdown to Swagger UI");

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
        label.style.color = "#f0f0f0";

        const select = document.createElement("select");
        select.title = "Choose theme";
        select.style.border = "2px solid var(--swagger-color)";
        select.style.marginLeft = "0.5em";

        // Lägg till "Classic" först
        themes.unshift({ name: "Classic", file: "" });

        // Sortera alfabetiskt på namn efter att Classic lagts till
        themes.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

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
        let defaultThemes = [];
        let customThemes = [];

        try {
            const res = await fetch(DEFAULT_THEMES_JSON_URL);
            if (!res.ok) throw new Error("Default themes.json not found");
            defaultThemes = await res.json();
            console.log("✅ Loaded default themes");
        } catch (err) {
            console.warn("⚠️ Could not load default themes:", err.message);
        }

        if (CUSTOM_THEMES_JSON_URL) {
            try {
                const res = await fetch(CUSTOM_THEMES_JSON_URL);
                if (!res.ok) throw new Error("Custom themes.json not found");
                customThemes = await res.json();
                console.log("✅ Loaded custom themes");
            } catch (err) {
                console.warn("⚠️ Could not load custom themes:", err.message);
            }
        }

        // Blanda in custom themes och låt dem skriva över default themes med samma namn
        const themeMap = new Map();

        for (const theme of defaultThemes) {
            themeMap.set(theme.name.toLowerCase(), theme);
        }

        for (const theme of customThemes) {
            themeMap.set(theme.name.toLowerCase(), theme); // Överskriv
        }

        const mergedThemes = Array.from(themeMap.values());

        intervalId = setInterval(() => tryAddDropdown(mergedThemes), 200);
    };

    console.log("🎬 Swagger theme toggler script loaded");
    fetchThemes();
})();
