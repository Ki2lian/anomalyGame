import { defaultControlsSettings, IKeybinding, IKeybindings } from "@/components/app/settings/defaultsSettings";

export const complexKeyCodes = [
    "ShiftLeft",
    "ShiftRight",
    "ControlLeft",
    "ControlRight",
    "AltLeft",
    "AltRight",
    "MetaLeft",
    "MetaRight",
    "Enter",
    "NumpadEnter",
    "Space",
    "Escape",
];

export const validateKeybindings = (keybindingsData: Partial<IKeybindings>): Partial<IKeybindings> => {
    const validatedKeybindings: Partial<IKeybindings> = {};

    for (const action in keybindingsData) {
        const binding = keybindingsData[action as keyof IKeybindings];

        if (binding) {
            validatedKeybindings[action as keyof IKeybindings] = {
                keyboard: validateKeyboardBinding(binding.keyboard),
                mouse: validateMouseBinding(binding.mouse),
                controller: validateControllerBinding(action),
            };
        }
    }

    return validatedKeybindings;
};

const validateKeyboardBinding = (binding: Partial<IKeybinding>): IKeybinding => {
    if (typeof binding.code !== "string" || typeof binding.display !== "string") {
        return { code: "", display: "" };
    }

    const display = binding.display;
    const code = binding.code;

    const isComplexKey = complexKeyCodes.includes(code);
    const isSimpleKey = (/^Key[A-Z]$/).test(code) && (/^[a-zA-Z]$/).test(display);

    if (isComplexKey && display.toLowerCase() === code.toLowerCase()) {
        return { code, display };
    }

    if (isSimpleKey && display.length === 1) {
        return { code, display };
    }

    return { code: "", display: "" };
};

const validateMouseBinding = (binding: Partial<IKeybinding>): IKeybinding => {
    if (typeof binding.code !== "string" || typeof binding.display !== "string") {
        return { code: "", display: "" };
    }

    const validMouseBindings = [
        { code: "MouseLeft", display: "buttonLeft" },
        { code: "MouseMiddle", display: "buttonMiddle" },
        { code: "MouseRight", display: "buttonRight" },
        { code: "MouseButton4", display: "buttonMouse4" },
        { code: "MouseButton5", display: "buttonMouse5" },
    ];

    const isValidBinding = validMouseBindings.some(validBinding => validBinding.code === binding.code && validBinding.display === binding.display);

    return isValidBinding ? { code: binding.code, display: binding.display } : { code: "", display: "" };
};

const validateControllerBinding = (action: keyof IKeybindings): IKeybinding => {
    if (!defaultControlsSettings.keybindings[action]) return { code: "", display: "" };

    return defaultControlsSettings.keybindings[action].controller;
};
