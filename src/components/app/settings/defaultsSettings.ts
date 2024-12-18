export interface IKeybinding {
    code: string;
    display: string;
}

export interface IActionKeybindings {
    keyboard: IKeybinding;
    mouse: IKeybinding;
    controller: IKeybinding;
}

export interface IKeybindings {
    [key: string]: IActionKeybindings;
    forward: IActionKeybindings;
    backward: IActionKeybindings;
    leftward: IActionKeybindings;
    rightward: IActionKeybindings;
    run: IActionKeybindings;
    jump: IActionKeybindings;
    interact: IActionKeybindings;
}

export interface IAspectRatio {
    isNative: boolean;
    width: number;
    height: number;
}

export interface ISettings {
    general: {
        [key: string]: string | boolean;
        language: string;
        fpsCounter: boolean;
        themeMode: string;
    };
    graphics: {
        [key: string]: string | boolean | number | IAspectRatio;
        resolution: number;
        aspectRatio: IAspectRatio;
        shadows: boolean;
        fov: number;
        environmentTexture: "1k" | "2k" | "4k";
        renderDistance: number;
    };
    controls: {
        [key: string]: string | boolean | number | IKeybindings;
        camInvertX: boolean;
        camInvertY: boolean;
        leftJoystickDeadZone: number;
        rightJoystickDeadZone: number;
        controllerType: "xbox" | "playstation";
        keybindings: IKeybindings;
    };
    audio: {
        masterVolume: number;
        ambientVolume: number;
        actionVolume: number;
        uiVolume: number;
    }
}

export const defaultGeneralSettings: ISettings["general"] = {
    language: "fr",
    fpsCounter: false,
    themeMode: "light",
};

export const defaultGraphicsSettings: ISettings["graphics"] = {
    resolution: 1,
    aspectRatio: {
        isNative: true,
        width: 0,
        height: 0,
    },
    shadows: true,
    fov: 70,
    environmentTexture: "4k",
    renderDistance: 100,
};

export const defaultControlsSettings: ISettings["controls"] = {
    camInvertX: false,
    camInvertY: false,
    leftJoystickDeadZone: 0.05,
    rightJoystickDeadZone: 0.05,
    controllerType: "xbox",
    keybindings: {
        forward: {
            keyboard: { code: "KeyW", display: "z" },
            mouse: { code: "", display: "" },
            controller: { code: "LeftAnalogTop", display: "" },
        },
        backward: {
            keyboard: { code: "KeyS", display: "s" },
            mouse: { code: "", display: "" },
            controller: { code: "LeftAnalogBottom", display: "" },
        },
        leftward: {
            keyboard: { code: "KeyA", display: "q" },
            mouse: { code: "", display: "" },
            controller: { code: "LeftAnalogLeft", display: "" },
        },
        rightward: {
            keyboard: { code: "KeyD", display: "d" },
            mouse: { code: "", display: "" },
            controller: { code: "LeftAnalogRight", display: "" },
        },
        run: {
            keyboard: { code: "ShiftLeft", display: "shiftleft" },
            mouse: { code: "", display: "" },
            controller: { code: "LeftAnalogTop", display: "" },
        },
        jump: {
            keyboard: { code: "Space", display: "space" },
            mouse: { code: "", display: "" },
            controller: { code: "RightButtonLeft", display: "" },
        },
        interact: {
            keyboard: { code: "KeyE", display: "e" },
            mouse: { code: "", display: "" },
            controller: { code: "RightButtonBottom", display: "" },
        },
        menu: {
            keyboard: { code: "Escape", display: "Escape" },
            mouse: { code: "", display: "" },
            controller: { code: "MiddleButtonRight", display: "" },
        },
    },
};

export const defaultAudioSettings: ISettings["audio"] = {
    masterVolume: 1,
    ambientVolume: 1,
    actionVolume: 1,
    uiVolume: 1,
};

export const defaultSettings: ISettings = {
    general: defaultGeneralSettings,
    graphics: defaultGraphicsSettings,
    controls: defaultControlsSettings,
    audio: defaultAudioSettings,
};
