import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useSettingsActions } from "@/hooks/useSettingsActions";

const SettingsActions = () => {
    const { t } = useTranslation("settingsMenu");

    const { handleImportSettings, handleExportSettings, handleResetSettings } = useSettingsActions();

    const [ jsonInput, setJsonInput ] = useState("");
    const [ isDialogOpen, setIsDialogOpen ] = useState(false);

    const handleImportClick = () => {
        try {
            const parsedData = JSON.parse(jsonInput);
            handleImportSettings(parsedData);
        } catch {
            toast.error(t("importErrorMessage"));
        }
        setJsonInput("");
        setIsDialogOpen(false);
    };

    return (
        <div className="mb-2 flex flex-col gap-2 md:flex-row md:items-center">
            <Dialog open={ isDialogOpen } onOpenChange={ setIsDialogOpen }>
                <DialogTrigger asChild>
                    <Button className="uppercase" variant="default">
                        {t("import")}
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="select-none text-center text-xl">{t("importSettingsTitle")}</DialogTitle>
                        <DialogDescription className="select-none text-center text-xl">{t("importSettingsDescription")}</DialogDescription>
                    </DialogHeader>
                    <Textarea value={ jsonInput } onChange={ e => setJsonInput(e.target.value) } className="mt-4" />
                    <Button variant="secondary" className="mt-4 uppercase" onClick={ handleImportClick }>
                        {t("import")}
                    </Button>
                </DialogContent>
            </Dialog>
            <Button className="uppercase" onClick={ handleExportSettings }>
                {t("export")}
            </Button>
            <Button className="uppercase" onClick={ handleResetSettings }>
                {t("reset")}
            </Button>
        </div>
    );
};

export default SettingsActions;
