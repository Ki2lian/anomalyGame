import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import ControllerInput from "@/components/app/settings/controls/sections/ControllerInput";
import KeyboardInput from "@/components/app/settings/controls/sections/KeyboardInput";
import MouseInput from "@/components/app/settings/controls/sections/MouseInput";
import {
    defaultControlsSettings,
    defaultSettings,
    IActionKeybindings,
    IKeybinding,
    IKeybindings,
    ISettings,
} from "@/components/app/settings/defaultsSettings";
import ResetButton from "@/components/app/settings/ResetButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface IUpdateKeybindingsProps {
    actionKey: keyof IKeybindings;
    device: keyof IActionKeybindings;
    newValue: IKeybinding;
    removePreviousAssignment?: boolean;
}

const RebindControls = () => {
    const { t } = useTranslation("settingsMenu", { keyPrefix: "controls" });

    const [ settings, setSettings ] = useLocalStorage<ISettings>("settings", defaultSettings);

    const [ keybindings, setKeybindings ] = useState<IKeybindings>(settings.controls.keybindings);

    useEffect(() => {
        if (JSON.stringify(settings.controls.keybindings) !== JSON.stringify(keybindings)) {
            setKeybindings(settings.controls.keybindings);
        }
    }, [ settings.controls.keybindings, keybindings ]);

    const updateKeybindings = ({ actionKey, device, newValue, removePreviousAssignment = false }: IUpdateKeybindingsProps) => {
        setKeybindings(prevKeybindings => {
            const updatedKeybindings = {
                ...prevKeybindings,
                [actionKey]: {
                    ...prevKeybindings[actionKey],
                    [device]: newValue,
                },
            };

            setSettings(prevSettings => ({
                ...prevSettings,
                controls: {
                    ...prevSettings.controls,
                    keybindings: updatedKeybindings,
                },
            }));

            return updatedKeybindings;
        });

        if (!removePreviousAssignment) {
            if (device === "keyboard") {
                toast.success(t("rebindKeyboardSuccessMessage"), {
                    duration: 2000,
                });
            } else if (device === "mouse") {
                toast.success(t("rebindMouseSuccessMessage"), {
                    duration: 2000,
                });
            }
        }
    };

    const handleControllerTypeChange = (value: ISettings["controls"]["controllerType"]) => {
        setSettings(prevSettings => ({
            ...prevSettings,
            controls: {
                ...prevSettings.controls,
                controllerType: value,
            },
        }));
    };

    const checkIfAssigned = (code: string, device: keyof IActionKeybindings) => {
        const assignedAction = Object.keys(keybindings).find(actionKey => keybindings[actionKey][device].code === code);
        return assignedAction || null;
    };

    const removePreviousAssignment = (actionKey: string, device: keyof IActionKeybindings) => {
        updateKeybindings({ actionKey, device, newValue: { code: "", display: "" }, removePreviousAssignment: true });
    };

    return (
        <div className="mt-4 select-none">
            <ResetButton
                section="controls"
                subSection="keybindings"
                confirmTextKey="confirmResetDefaultKeybindings"
                successMessageKey="resetKeybindingsSuccessMessage"
                onReset={ () => setKeybindings(defaultControlsSettings.keybindings) }
            />

            <div className="grid grid-cols-4 gap-4 p-2 text-center uppercase">
                <span className="text-left font-bold">{t("actions")}</span>
                <span className="font-bold">{t("keyboard")}</span>
                <span className="font-bold">{t("mouse")}</span>
                <div className="flex flex-col">
                    <span className="font-bold">{t("controller")}</span>
                    <Select value={ settings.controls.controllerType } onValueChange={ handleControllerTypeChange }>
                        <SelectTrigger className="uppercase">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="uppercase">
                            <SelectItem value="xbox">Xbox</SelectItem>
                            <SelectItem value="playstation">PlayStation</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {Object.keys(keybindings).map(actionKey => (
                <div key={ actionKey } className="mt-2 grid grid-cols-4 items-center gap-4 p-2 hover:bg-secondary">
                    <span>{t(actionKey)}</span>
                    <KeyboardInput
                        value={ keybindings[actionKey as keyof IKeybindings].keyboard }
                        onChange={ newValue => updateKeybindings({ actionKey, newValue, device: "keyboard" }) }
                        checkIfAssigned={ checkIfAssigned }
                        removePreviousAssignment={ removePreviousAssignment }
                    />
                    <MouseInput
                        value={ keybindings[actionKey as keyof IKeybindings].mouse }
                        onChange={ newValue => updateKeybindings({ actionKey, newValue, device: "mouse" }) }
                        checkIfAssigned={ checkIfAssigned }
                        removePreviousAssignment={ removePreviousAssignment }
                    />
                    <ControllerInput
                        value={ keybindings[actionKey as keyof IKeybindings].controller }
                    />
                </div>
            ))}
        </div>
    );
};

export default RebindControls;
