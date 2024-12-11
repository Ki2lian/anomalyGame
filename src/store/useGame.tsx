import Rand from "rand-seed";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import { defaultSettings, IKeybindings, ISettings } from "@/components/app/settings/defaultsSettings";
import { generateRandomSeed, getLocalStorage, mapGamepadButtonToCode, mapMouseButtonCodeToIndex } from "@/lib/utils";

export type TValidationFunction = () => boolean;

interface IActionSubscriber {
    callback: () => void;
    validate: TValidationFunction;
}

interface IStage {
    currentStage: number;
    visitCount: number;
    maxAnomalies: number;
}

export type TDifficulty = "easy" | "medium" | "hard";

export type TActiveMenu = "" | "main" | "settings" | "gameSetup" | "endGame";

interface IGameState {
    keybindings: () => IKeybindings;
    isPlaying: boolean;
    difficulty: TDifficulty;
    activeMenu: TActiveMenu;
    isRebinding: boolean;
    gameIsReady: boolean;
    seed: string;
    stage: IStage;
    isVictory: boolean;
    isDefeat: boolean;
    isGamepadActive: boolean;
    actionSubscribers: { [action: string]: Array<IActionSubscriber> };

    isTransitioning: boolean;

    subscribeToAction: (action: keyof IKeybindings, callback: () => void, validate: TValidationFunction) => void;
    unsubscribeFromAction: (action: keyof IKeybindings, callback: () => void) => void;
    notifyActionSubscribers: (action: keyof IKeybindings) => void;

    startGame: (difficulty: TDifficulty, seed?: string) => void;
    resetGame: () => void;
    checkCurrentStage: () => { hasAnomalies: boolean };
    incrementVisitCount: () => void;
    nextStage: () => void;
    setVictory: () => void;
    setDefeat: () => void;

    setActiveMenu: (menu: TActiveMenu) => void;
    toggleRebinding: () => void;
    setGameIsReady: (isReady: boolean) => void;

    listenToGlobalEvents: () => () => void;
}

/**
 * Given a stage number, a seed, and a difficulty,
 * returns a random number of anomalies for that stage.
 *
 * @param {number} stageNumber - The stage number
 * @param {string} seed - A random string used to initialize the random generator.
 * @param {TDifficulty} difficulty - The difficulty of the game, either "easy", "medium", or "hard".
 *    - "easy":
 *          - 50% chances of 0 anomalie
 *          - 30% chances of 1 anomalie
 *          - 20% chances of 2 anomalies
 *    - "medium":
 *          - 40% chances of 0 anomalie
 *          - 30% chances of 1 anomalie
 *          - 20% chances of 2 anomalies
 *          - 10% chances of 3 anomalies
 *    - "hard":
 *          - 35% chances of 0 anomalie
 *          - 25% chances of 1 anomalie
 *          - 20% chances of 2 anomalies
 *          - 10% chances of 3 anomalies
 *          - 5% chances of 4 anomalies
 *
 * @returns {number}
 */
const generateMaxAnomalies = (stageNumber: number, seed: string, difficulty: TDifficulty): number => {
    const rng = new Rand(`${ seed }-${ stageNumber }`);
    const roll = rng.next();

    const thresholds: Record<TDifficulty, number[]> = {
        easy: [ 0.5, 0.8, 1 ],
        medium: [ 0.4, 0.7, 0.9, 1 ],
        hard: [ 0.35, 0.6, 0.8, 0.95, 1 ],
    };

    const ranges = thresholds[difficulty];
    for (let i = 0; i < ranges.length; i++) {
        if (roll < ranges[i]) {
            return i;
        }
    }

    return 0;
};

const useGame = create<IGameState, [["zustand/subscribeWithSelector", never]]>(
    subscribeWithSelector((set, get) => ({
        keybindings: () => {
            const settings = getLocalStorage("settings") as ISettings;
            return settings?.controls?.keybindings || defaultSettings.controls.keybindings;
        },
        isPlaying: false,
        activeMenu: "main",
        isRebinding: false,
        gameIsReady: false,
        difficulty: "easy",
        seed: "",
        stage: { currentStage: 6, visitCount: 0, maxAnomalies: 0 },
        isVictory: false,
        isDefeat: false,
        isGamepadActive: false,
        actionSubscribers: {},

        isTransitioning: false,

        startGame: (difficulty, providedSeed) => {
            const seed = providedSeed || generateRandomSeed();
            set({
                isPlaying: true,
                difficulty,
                seed,
                stage: {
                    currentStage: 6,
                    visitCount: 0,
                    maxAnomalies: generateMaxAnomalies(6, seed, difficulty),
                },
            });
        },
        resetGame: () =>
            set({
                isPlaying: false,
                activeMenu: "main",
                isRebinding: false,
                difficulty: "easy",
                seed: "",
                gameIsReady: false,
                stage: { currentStage: 6, visitCount: 0, maxAnomalies: 0 },
                isVictory: false,
                isDefeat: false,
            }),
        checkCurrentStage: () => ({
            hasAnomalies: get().stage.visitCount < get().stage.maxAnomalies,
        }),
        incrementVisitCount: () =>
            set(state => ({
                stage: { ...state.stage, visitCount: state.stage.visitCount + 1 },
            })),
        nextStage: () => {
            const newStage = get().stage.currentStage - 1;
            set(state => ({
                stage: {
                    currentStage: newStage,
                    visitCount: 0,
                    maxAnomalies: generateMaxAnomalies(newStage, state.seed, state.difficulty),
                },
            }));
        },
        setVictory: () => set({ isVictory: true }),
        setDefeat: () => set({ isDefeat: true }),

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
                    if (validate() && !get().isRebinding && !get().isVictory && !get().isDefeat && (get().activeMenu !== "main" || action === "menu")) {
                        callback();
                    }
                }
            }
        },

        setActiveMenu: (menu) => {
            const { isTransitioning } = get();

            if (isTransitioning) return;

            set({ isTransitioning: true, activeMenu: menu });

            setTimeout(() => set({ isTransitioning: false }), 500);
        },
        toggleRebinding: () => set(state => ({ isRebinding: !state.isRebinding })),

        setGameIsReady: isReady => set({ gameIsReady: isReady }),

        listenToGlobalEvents: () => {
            const { notifyActionSubscribers } = get();
            const keybindings = get().keybindings();

            let previousButtonStates: boolean[] = [];
            const buttonCodeToActionCache = new Map();
            let cachedGamepadIndex: number | null = null;
            let animationRequest: number;

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

            const initializeButtonStates = (gamepad: Gamepad) => {
                previousButtonStates = new Array(gamepad.buttons.length).fill(false);
                buttonCodeToActionCache.clear();

                for (let index = 0; index < gamepad.buttons.length; index++) {
                    const buttonCode = mapGamepadButtonToCode(index);
                    const actionKeys = Object.keys(keybindings).find(
                        actionKey => keybindings[actionKey as keyof IKeybindings].controller.code === buttonCode,
                    );
                    buttonCodeToActionCache.set(index, actionKeys || null);
                }
            };

            const handleGamepadButtons = () => {
                const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
                const gamepad = cachedGamepadIndex !== null ? gamepads[cachedGamepadIndex] : null;

                set(prevState => {
                    if (prevState.isGamepadActive === !!gamepad) return prevState;
                    return { ...prevState, isGamepadActive: !!gamepad };
                });

                if (gamepad) {
                    const buttons = gamepad.buttons;

                    const relevantButtons = buttonCodeToActionCache.keys();
                    for (const index of relevantButtons) {
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

            const handleGamepadDisconnected = () => {
                cachedGamepadIndex = null;
                cancelAnimationFrame(animationRequest);
            };

            window.addEventListener("keydown", handleKeyDown);
            window.addEventListener("mousedown", handleMouseDown);
            window.addEventListener("gamepadconnected", handleGamepadConnected);
            window.addEventListener("gamepaddisconnected", handleGamepadDisconnected);

            return () => {
                window.removeEventListener("keydown", handleKeyDown);
                window.removeEventListener("mousedown", handleMouseDown);
                window.removeEventListener("gamepadconnected", handleGamepadConnected);
                window.removeEventListener("gamepaddisconnected", handleGamepadDisconnected);
            };
        },
    })),
);

export default useGame;
