(() => {
    const STORAGE_KEY = "swagger-ui-theme";
    const themes = [
        { name: "Classic", file: "" },
        { name: "Dark", file: "/swagger-theme-toggler/themes/dark.css" },
        { name: "Nord Dark", file: "/swagger-theme-toggler/themes/nord-dark.css" },
        { name: "Monokai", file: "/swagger-theme-toggler/themes/monokai.css" },
        { name: "Gruvbox", file: "/swagger-theme-toggler/themes/gruvbox.css" },
        { name: "Muted", file: "/swagger-theme-toggler/themes/muted.css" },
        { name: "Newspaper", file: "/swagger-theme-toggler/themes/newspaper.css" },
    ];

    // Försök hitta container flera gånger (max 20 gånger, var 200 ms)
    let attempts = 0;
    const maxAttempts = 20;

    const tryAddDropdown = () => {
        const container = document.querySelector(".topbar-wrapper");
        if (container) {
            // Lägg till dropdown här
            let themeLink = document.getElementById("theme-style");
            if (!themeLink) {
                themeLink = document.createElement("link");
                themeLink.id = "theme-style";
                themeLink.rel = "stylesheet";
                document.head.appendChild(themeLink);
            }

            // Skapa label med Swagger UI-klass
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
            select.title = "Välj tema";

            themes.forEach((theme, index) => {
                const option = document.createElement("option");
                option.value = index.toString();
                option.textContent = theme.name;
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
            clearInterval(intervalId); // Sluta försöka när klart
        } else {
            attempts++;
            if (attempts >= maxAttempts) {
                clearInterval(intervalId);
                console.warn("Kunde inte hitta container för tema-dropdown efter flera försök");
            }
        }
    };

    const intervalId = setInterval(tryAddDropdown, 200);
})();
