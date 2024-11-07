import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import { defaultSettings, IKeybindings, ISettings } from "@/components/app/settings/defaultsSettings";
import { getLocalStorage, mapGamepadButtonToCode, mapMouseButtonCodeToIndex } from "@/lib/utils";

type TValidationFunction = () => boolean;

interface IActionSubscriber {
    callback: () => void;
    validate: TValidationFunction;
}

interface IGameState {
    keybindings: () => IKeybindings;

    isPlaying: boolean;
    isSettingMenu: boolean;
    isRebinding: boolean;
    actionSubscribers: { [action: string]: Array<IActionSubscriber> };

    subscribeToAction: (action: keyof IKeybindings, callback: () => void, validate: TValidationFunction) => void;
    unsubscribeFromAction: (action: keyof IKeybindings, callback: () => void) => void;

    listenToGlobalEvents: () => () => void;
    notifyActionSubscribers: (action: keyof IKeybindings) => void;

    toggleSettingMenu: () => void;
    toggleRebinding: () => void;
    startGame: () => void;
    resetGame: () => void;
}

const useGame = create<IGameState, [["zustand/subscribeWithSelector", never]]>(
    subscribeWithSelector((set, get) => ({
        keybindings: () => {
            const settings = getLocalStorage("settings") as ISettings;
            return settings?.controls?.keybindings || defaultSettings.controls.keybindings;
        },

        isPlaying: false,
        isSettingMenu: false,
        isRebinding: false,

        actionSubscribers: {},

        startGame: () => set({ isPlaying: true }),
        resetGame: () => set({ isPlaying: false }),

        subscribeToAction: (action, callback, validate) => {
            set(state => ({
                actionSubscribers: {
                    ...state.actionSubscribers,
                    [action]: [ ...(state.actionSubscribers[action] || []), { callback, validate } ],
                },
            }));
        },

        unsubscribeFromAction: (action, callback) => {
            set(state => ({
                actionSubscribers: {
                    ...state.actionSubscribers,
                    [action]: state.actionSubscribers[action]?.filter(subscriber => subscriber.callback !== callback) || [],
                },
            }));
        },

        notifyActionSubscribers: action => {
            const subscribers = get().actionSubscribers[action];
            if (subscribers) {
                for (const subscriber of subscribers) {
                    const { callback, validate } = subscriber;
                    if (validate() && !get().isRebinding && (!get().isSettingMenu || action === "menu")) {
                        callback();
                    }
                }
            }
        },

        listenToGlobalEvents: () => {
            const { notifyActionSubscribers } = get();
            const keybindings = get().keybindings();

            const handleKeyDown = (event: KeyboardEvent) => {
                for (const actionKey of Object.keys(keybindings)) {
                    const actionBindings = keybindings[actionKey as keyof IKeybindings];

                    if (event.code === actionBindings.keyboard.code) {
                        notifyActionSubscribers(actionKey as keyof IKeybindings);
                    }
                }
            };

            const handleMouseDown = (event: MouseEvent) => {
                for (const actionKey of Object.keys(keybindings)) {
                    const actionBindings = keybindings[actionKey as keyof IKeybindings];

                    if (event.button === mapMouseButtonCodeToIndex(actionBindings.mouse.code)) {
                        notifyActionSubscribers(actionKey as keyof IKeybindings);
                    }
                }
            };

            let previousButtonStates: boolean[] = [];
            const buttonCodeToActionCache = new Map();
            let cachedGamepadIndex: number | null = null;
            let animationRequest: number;

            const initializeButtonStates = (gamepad: Gamepad) => {
                console.log("Gamepad connected");
                previousButtonStates = new Array(gamepad.buttons.length).fill(false);
                buttonCodeToActionCache.clear();

                for (let index = 0; index < gamepad.buttons.length; index++) {
                    const buttonCode = mapGamepadButtonToCode(index);
                    const actionKeys = Object.keys(keybindings).find(actionKey =>
                        keybindings[actionKey as keyof IKeybindings].controller.code === buttonCode,
                    );
                    buttonCodeToActionCache.set(index, actionKeys || null);
                }
            };

            const handleGamepadButtons = () => {
                const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
                const gamepad = cachedGamepadIndex !== null ? gamepads[cachedGamepadIndex] : null;

                if (gamepad) {
                    const buttons = gamepad.buttons;

                    for (let index = 0; index < buttons.length; index++) {
                        const button = buttons[index];
                        const buttonPressed = button.pressed;
                        if (buttonPressed === previousButtonStates[index]) continue;
                        const actionKeys = buttonCodeToActionCache.get(index);

                        if (buttonPressed && actionKeys) {
                            notifyActionSubscribers(actionKeys as keyof IKeybindings);
                        }

                        previousButtonStates[index] = buttonPressed;
                    }
                }

                animationRequest = requestAnimationFrame(handleGamepadButtons);
            };

            const handleGamepadConnected = (event: GamepadEvent) => {
                const gamepad = event.gamepad;
                cachedGamepadIndex = gamepad.index;
                initializeButtonStates(gamepad);
                animationRequest = requestAnimationFrame(handleGamepadButtons);
            };

            const handleGamepadDeconnected = () => {
                cachedGamepadIndex = null;
                cancelAnimationFrame(animationRequest);
            };

            window.addEventListener("keydown", handleKeyDown);
            window.addEventListener("mousedown", handleMouseDown);
            window.addEventListener("gamepadconnected", handleGamepadConnected);
            window.addEventListener("gamepaddisconnected", handleGamepadDeconnected);

            return () => {
                window.removeEventListener("keydown", handleKeyDown);
                window.removeEventListener("mousedown", handleMouseDown);
                window.removeEventListener("gamepadconnected", handleGamepadConnected);
                window.removeEventListener("gamepaddisconnected", handleGamepadDeconnected);
                cancelAnimationFrame(animationRequest);
            };
        },

        toggleSettingMenu: () => set(state => ({ isSettingMenu: !state.isSettingMenu })),
        toggleRebinding: () => set(state => ({ isRebinding: !state.isRebinding })),
    })),
);

export default useGame;
