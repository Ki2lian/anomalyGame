import { defaultControlsSettings } from "@/components/app/settings/defaultsSettings";

const movementActions = [ "forward", "backward", "leftward", "rightward", "jump", "run" ];

export const generateKeyboardMouseMap = (keybindings: (typeof defaultControlsSettings)["keybindings"]) => {
    const keyboardMouseMap = movementActions.map(action => {
        const { keyboard, mouse } = keybindings[action as keyof typeof keybindings];

        const keys = [];

        if (keyboard.code) {
            keys.push(keyboard.code);
        }

        if (mouse.code) {
            keys.push(mouse.code);
        }

        return {
            name: action,
            keys,
        };
    });

    return keyboardMouseMap;
};
