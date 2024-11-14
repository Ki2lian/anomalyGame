import "@/i18n";

import { useLocalStorage } from "@uidotdev/usehooks";
import eruda from "eruda";
import { useEffect } from "react";

import Menu from "@/components/app/Menu";
import { defaultSettings } from "@/components/app/settings/defaultsSettings";
import Theme from "@/components/app/Theme";
import Game from "@/components/game/Game";
import { Toaster } from "@/components/ui/sonner";
import { prepareSettings } from "@/lib/utils";
import useGame from "@/store/useGame";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    eruda.init();
}

const App = () => {
    const isPlaying = useGame((state) => state.isPlaying);
    const [ settings, setSettings ] = useLocalStorage("settings", defaultSettings);

    useEffect(() => {
        if (JSON.stringify(defaultSettings) !== JSON.stringify(settings)) {
            const mergedSettings = prepareSettings(defaultSettings, settings);
            setSettings(mergedSettings);
        }
    }, [ settings, setSettings ]);

    return <>
        <Toaster position="bottom-right" />
        <Theme />
        {isPlaying ? <Game /> : <Menu />}
    </>;
};

export default App;
