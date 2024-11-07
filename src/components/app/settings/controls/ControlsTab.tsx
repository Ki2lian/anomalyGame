import { useLocalStorage } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import RebindControls from "@/components/app/settings/controls/RebindControls";
import { defaultSettings, ISettings } from "@/components/app/settings/defaultsSettings";
import ResetButton from "@/components/app/settings/ResetButton";
import SettingRow from "@/components/app/settings/SettingRow";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export interface IUpdateControlsSettingProps {
    key: string;
    value: string | boolean | number;
}

const ControlsTab = () => {
    const { t } = useTranslation("settingsMenu", { keyPrefix: "controls" });
    const [ settings, setSettings ] = useLocalStorage<ISettings>("settings", defaultSettings);
    const [ isRebinding, setIsRebinding ] = useState(false);

    const [ tempValues, setTempValues ] = useState({
        leftJoystickDeadZone: settings.controls.leftJoystickDeadZone,
        rightJoystickDeadZone: settings.controls.rightJoystickDeadZone,
    });

    const updateControlsSetting = ({ key, value }: IUpdateControlsSettingProps) => {
        setSettings(prevSettings => ({
            ...prevSettings,
            controls: {
                ...prevSettings.controls,
                [key]: value,
            },
        }));
    };

    const handleSliderChange = ({ key, value }: IUpdateControlsSettingProps) => {
        setTempValues((prevValues) => ({
            ...prevValues,
            [key]: value,
        }));
    };

    const toggleRebinding = () => setIsRebinding(prev => !prev);

    return (
        <Card>
            <CardContent className="p-4">
                <AnimatePresence mode="wait">
                    {!isRebinding ? (
                        <>
                            <motion.div
                                key="controls"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Button onClick={toggleRebinding} variant={"outline"} className="hidden w-full uppercase lg:flex">
                                    {t("rebindControls")}
                                </Button>
                                <div className="mt-4">
                                    <ResetButton
                                        section="controls"
                                        confirmTextKey="confirmResetDefaultControls"
                                        successMessageKey="resetControlsSuccessMessage"
                                        excludeSubSections={[ "keybindings" ]}
                                    />
                                </div>
                                <SettingRow label={t("camInvertX")} description={t("camInvertXDescription")}>
                                    <Switch
                                        checked={settings.controls.camInvertX}
                                        onCheckedChange={value => updateControlsSetting({ key: "camInvertX", value })}
                                    />
                                </SettingRow>

                                <SettingRow label={t("camInvertY")} description={t("camInvertYDescription")}>
                                    <Switch
                                        checked={settings.controls.camInvertY}
                                        onCheckedChange={value => updateControlsSetting({ key: "camInvertY", value })}
                                    />
                                </SettingRow>

                                <SettingRow
                                    label={t("leftJoystickDeadZone")}
                                    description={t("leftJoystickDeadZoneDescription")}
                                    className="hidden lg:flex"
                                >
                                    <Slider
                                        value={[ tempValues.leftJoystickDeadZone ]}
                                        min={0}
                                        max={1}
                                        step={0.05}
                                        onValueChange={value => handleSliderChange({ key: "leftJoystickDeadZone", value: value[0] })}
                                        onValueCommit={value => updateControlsSetting({ key: "leftJoystickDeadZone", value: value[0] })}
                                    />
                                    <Input
                                        value={tempValues.leftJoystickDeadZone.toFixed(2)}
                                        readOnly
                                        className="w-1/4 cursor-default text-center focus-visible:ring-0"
                                    />
                                </SettingRow>

                                <SettingRow
                                    label={t("rightJoystickDeadZone")}
                                    description={t("rightJoystickDeadZoneDescription")}
                                    className="hidden lg:flex"
                                >
                                    <Slider
                                        value={[ tempValues.rightJoystickDeadZone ]}
                                        min={0}
                                        max={1}
                                        step={0.05}
                                        onValueChange={value => handleSliderChange({ key: "rightJoystickDeadZone", value: value[0] })}
                                        onValueCommit={value => updateControlsSetting({ key: "rightJoystickDeadZone", value: value[0] })}
                                    />
                                    <Input
                                        value={tempValues.rightJoystickDeadZone.toFixed(2)}
                                        readOnly
                                        className="w-1/4 cursor-default text-center focus-visible:ring-0"
                                    />
                                </SettingRow>
                            </motion.div>
                        </>
                    ) : (
                        <>
                            <motion.div
                                key="rebindControls"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Button onClick={toggleRebinding} variant={"outline"} className="w-full uppercase">
                                    {t("hideRebindControls")}
                                </Button>
                                <RebindControls />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    );
};

export default ControlsTab;
