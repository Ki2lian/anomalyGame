import { IKeybindings, ISettings } from "@/components/app/settings/defaultsSettings";
import { validateKeybindings } from "@/components/app/settings/import/validators/keybinding";
import { preciseRoundToStep } from "@/lib/utils";

export const validateControls = (controlsData: Partial<ISettings["controls"]>): Partial<ISettings["controls"]> => {
    const validatedControls: Partial<ISettings["controls"]> = {};

    if (typeof controlsData.camInvertX === "boolean") {
        validatedControls.camInvertX = controlsData.camInvertX;
    }

    if (typeof controlsData.camInvertY === "boolean") {
        validatedControls.camInvertY = controlsData.camInvertY;
    }

    if (typeof controlsData.leftJoystickDeadZone === "number" && controlsData.leftJoystickDeadZone >= 0 && controlsData.leftJoystickDeadZone <= 1) {
        validatedControls.leftJoystickDeadZone = preciseRoundToStep(controlsData.leftJoystickDeadZone, 0.05, 2);
    }

    if (
        typeof controlsData.rightJoystickDeadZone === "number" &&
        controlsData.rightJoystickDeadZone >= 0 &&
        controlsData.rightJoystickDeadZone <= 1
    ) {
        validatedControls.rightJoystickDeadZone = preciseRoundToStep(controlsData.rightJoystickDeadZone, 0.05, 2);
    }

    if (typeof controlsData.controllerType === "string" && [ "xbox", "playstation" ].includes(controlsData.controllerType)) {
        validatedControls.controllerType = controlsData.controllerType;
    }

    if (controlsData.keybindings) {
        validatedControls.keybindings = validateKeybindings(controlsData.keybindings) as IKeybindings;
    }

    return validatedControls;
};
