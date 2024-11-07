import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";

import { defaultSettings, ISettings } from "@/components/app/settings/defaultsSettings";

const applyTheme = (theme: string) => {
    const root = window.document.documentElement;
    if (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        root.classList.add("dark");
    } else {
        root.classList.remove("dark");
    }
};

const Theme = () => {
    const [ settings ] = useLocalStorage<ISettings>("settings", defaultSettings);

    useEffect(() => {
        const savedTheme = settings.general.themeMode;
        applyTheme(savedTheme);

        const handleSystemThemeChange = () => {
            applyTheme("system");
        };

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        mediaQuery.addEventListener("change", handleSystemThemeChange);

        return () => {
            mediaQuery.removeEventListener("change", handleSystemThemeChange);
        };
    }, [ settings?.general?.themeMode ]);

    return null;
};

export default Theme;