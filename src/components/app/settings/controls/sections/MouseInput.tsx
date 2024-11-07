import { Trash2 } from "lucide-react";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { IActionKeybindings, IKeybinding } from "@/components/app/settings/defaultsSettings";
import { Input } from "@/components/ui/input";
import useGame from "@/store/useGame";

interface IMouseInputProps {
    value: IKeybinding;
    onChange: (newValue: IKeybinding) => void;
    checkIfAssigned: (code: string, device: keyof IActionKeybindings) => string | null;
    removePreviousAssignment: (actionKey: string, device: keyof IActionKeybindings) => void;
}

const MouseInput = ({ value, onChange, checkIfAssigned, removePreviousAssignment }: IMouseInputProps) => {
    const { t } = useTranslation("settingsMenu", { keyPrefix: "controls" });

    const { toggleRebinding } = useGame();

    const inputRef = useRef<HTMLInputElement>(null);

    const [ isActive, setIsActive ] = useState(false);

    useEffect(() => {
        const blockHistoryNavigation = () => {
            history.pushState(null, "", document.URL);
        };

        window.addEventListener("popstate", blockHistoryNavigation);
        history.pushState(null, "", document.URL);

        return () => {
            window.removeEventListener("popstate", blockHistoryNavigation);
        };
    }, []);

    const handleFocus = () => {
        setIsActive(true);
        toggleRebinding();
    };

    const handleMouseDown = async (event: MouseEvent<HTMLInputElement>) => {
        if (isActive && inputRef.current) {
            const { button } = event;
            const mouseButton = getMouseButtonDetails(button);

            if (mouseButton) {
                event.preventDefault();

                const code = mouseButton.code;
                const display = mouseButton.display;

                if (value.code === code) {
                    inputRef.current.blur();
                    return;
                }

                const alreadyAssignedTo = checkIfAssigned(code, "mouse");

                if (alreadyAssignedTo) {
                    const isConfirmed = window.confirm(
                        t("keyAlreadyAssigned", { key: t(display).toUpperCase(), action: t(alreadyAssignedTo).toUpperCase() }),
                    );

                    if (isConfirmed) {
                        removePreviousAssignment(alreadyAssignedTo, "mouse");
                        await new Promise(resolve => setTimeout(resolve, 1));
                        onChange({ code, display });
                    }
                } else {
                    onChange({ code, display });
                }

                inputRef.current.blur();
            }
        }
    };

    const handleBlur = async () => {
        setIsActive(false);
        await new Promise(resolve => setTimeout(resolve, 1));
        toggleRebinding();
    };

    const handleContextMenu = (event: MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
    };

    const getMouseButtonDetails = (button: number) => {
        switch (button) {
            case 0:
                return { code: "MouseLeft", display: "buttonLeft" };
            case 1:
                return { code: "MouseMiddle", display: "buttonMiddle" };
            case 2:
                return { code: "MouseRight", display: "buttonRight" };
            case 3:
                return { code: "MouseButton4", display: "buttonMouse4" };
            case 4:
                return { code: "MouseButton5", display: "buttonMouse5" };
            default:
                return null;
        }
    };

    const handleDelete = () => {
        const isConfirmed = window.confirm(t("confirmDeleteAssignation"));
        if (isConfirmed) onChange({ code: "", display: "" });
    };

    return (
        <div className="flex items-center">
            <Input
                ref={inputRef}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onMouseDown={handleMouseDown}
                onContextMenu={handleContextMenu}
                value={isActive ? "" : value.display ? t(value.display) : ""}
                readOnly
                placeholder={isActive ? t("placeholderInputMouse") : ""}
                className="cursor-pointer select-none text-center uppercase"
            />
            <Trash2 className="ml-2 cursor-pointer text-destructive" onClick={handleDelete} />
        </div>
    );
};

export default MouseInput;
