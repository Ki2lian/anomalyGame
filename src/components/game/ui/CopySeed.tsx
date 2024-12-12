import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { playSound } from "@/lib/utils";
import useGame from "@/store/useGame";

const CopySeed = () => {
    const { t } = useTranslation("mainMenu");

    const { seed, activeMenu, gameIsReady } = useGame();

    const [ _, copyToClipboard ] = useCopyToClipboard();
    const [ isCopied, setIsCopied ] = useState(false);

    const handleCopySeed = () => {
        if (isCopied) return;

        copyToClipboard(seed);
        playSound("/audio/click.wav", "ui");
        setIsCopied(true);
        toast.success(t("seedCopied"));

        setTimeout(() => setIsCopied(false), 2000);
    };

    if (!gameIsReady || activeMenu === "") return null;

    return (
        <>
            <div className="absolute bottom-2 left-2 z-[18568369]">
                <div className="w-[230px] cursor-text rounded bg-black/70 px-3 py-1 text-lg font-bold text-lime-500">{seed}</div>
                <Button onClick={ handleCopySeed } variant={ "link" } className="absolute right-0 top-0 text-white">
                    {isCopied ? <CopyCheck /> : <Copy />}
                </Button>
            </div>
        </>
    );
};

export default CopySeed;
