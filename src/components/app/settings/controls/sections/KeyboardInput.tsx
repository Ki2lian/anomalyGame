import { Trash2 } from "lucide-react";
import { KeyboardEvent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { IActionKeybindings, IKeybinding } from "@/components/app/settings/defaultsSettings";
import { complexKeyCodes } from "@/components/app/settings/import/validators/keybinding";
import { Input } from "@/components/ui/input";
import useGame from "@/store/useGame";

interface IKeyboardInputProps {
    value: IKeybinding;
    onChange: (newValue: IKeybinding) => void;
    checkIfAssigned: (code: string, device: keyof IActionKeybindings) => string | null;
    removePreviousAssignment: (actionKey: string, device: keyof IActionKeybindings) => void;
}

const KeyboardInput = ({ value, onChange, checkIfAssigned, removePreviousAssignment }: IKeyboardInputProps) => {
    const { t } = useTranslation("settingsMenu", { keyPrefix: "controls" });

    const { toggleRebinding } = useGame();

    const inputRef = useRef<HTMLInputElement>(null);

    const [ isActive, setIsActive ] = useState(false);

    const handleFocus = () => {
        setIsActive(true);
        toggleRebinding();
    };

    const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (isActive && inputRef.current) {
            const { code, key } = event;
            const display = getDisplayValue(code, key);

            if (value.code === code) {
                inputRef.current.blur();
                return;
            }

            const alreadyAssignedTo = checkIfAssigned(code, "keyboard");

            if (alreadyAssignedTo) {
                const isConfirmed = window.confirm(
                    t("keyAlreadyAssigned", { key: display.toUpperCase(), action: t(alreadyAssignedTo).toUpperCase() }),
                );

                if (isConfirmed) {
                    removePreviousAssignment(alreadyAssignedTo, "keyboard");
                    await new Promise(resolve => setTimeout(resolve, 1));
                    onChange({ code, display });
                }
            } else {
                onChange({ code, display });
            }

            inputRef.current.blur();
        }
    };

    const handleBlur = async () => {
        setIsActive(false);
        await new Promise(resolve => setTimeout(resolve, 1));
        toggleRebinding();
    };

    const getDisplayValue = (code: string, key: string) => {
        if (complexKeyCodes.includes(code)) return code;
        return key;
    };

    const handleDelete = async () => {
        const isConfirmed = window.confirm(t("confirmDeleteAssignation"));
        if (isConfirmed) {
            onChange({ code: "", display: "" });
            toggleRebinding();
            await new Promise(resolve => setTimeout(resolve, 1));
            toggleRebinding();
        }
    };

    return (
        <div className="flex items-center">
            <Input
                ref={ inputRef }
                onFocus={ handleFocus }
                onBlur={ handleBlur }
                onKeyDown={ handleKeyDown }
                value={ isActive ? "" : value.display }
                readOnly
                placeholder={ isActive ? t("placeholderInputKeyboard") : "" }
                className="cursor-pointer select-none text-center uppercase"
            />
            <Trash2 className="ml-2 cursor-pointer text-destructive" onClick={ handleDelete } />
        </div>
    );
};

export default KeyboardInput;
