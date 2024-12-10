import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { defaultSettings, ISettings } from "@/components/app/settings/defaultsSettings";
import ResetButton from "@/components/app/settings/ResetButton";
import SettingRow from "@/components/app/settings/SettingRow";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface IUpdateAudioSettingProps {
    key: string;
    value: number;
}

const AudioTab = () => {
    const { t } = useTranslation("settingsMenu", { keyPrefix: "audio" });
    const [ settings, setSettings ] = useLocalStorage<ISettings>("settings", defaultSettings);

    const [ tempValues, setTempValues ] = useState({
        masterVolume: settings.audio.masterVolume,
        ambientVolume: settings.audio.ambientVolume,
        actionVolume: settings.audio.actionVolume,
        uiVolume: settings.audio.uiVolume,
    });

    const updateAudioSetting = ({ key, value }: IUpdateAudioSettingProps) => {
        setSettings(prevSettings => ({
            ...prevSettings,
            audio: {
                ...prevSettings.audio,
                [key]: value,
            },
        }));
    };

    const handleSliderChange = ({ key, value }: IUpdateAudioSettingProps) => {
        setTempValues(prevValues => ({
            ...prevValues,
            [key]: value,
        }));
    };

    return (
        <Card>
            <CardContent className="p-4">
                <ResetButton section="audio" confirmTextKey="confirmResetDefaultAudio" successMessageKey="resetAudioSuccessMessage" />
                <SettingRow label={ t("masterVolume") } description={ t("masterVolumeDescription") }>
                    <Slider
                        value={ [ tempValues.masterVolume ] }
                        min={ 0 }
                        max={ 1 }
                        step={ 0.1 }
                        onValueChange={ value => handleSliderChange({ key: "masterVolume", value: value[0] }) }
                        onValueCommit={ value => updateAudioSetting({ key: "masterVolume", value: value[0] }) }
                    />
                    <Input value={ tempValues.masterVolume } readOnly className="w-1/4 cursor-default text-center focus-visible:ring-0" />
                </SettingRow>
                <SettingRow label={ t("ambientVolume") } description={ t("ambientVolumeDescription") }>
                    <Slider
                        value={ [ tempValues.ambientVolume ] }
                        min={ 0 }
                        max={ 1 }
                        step={ 0.1 }
                        onValueChange={ value => handleSliderChange({ key: "ambientVolume", value: value[0] }) }
                        onValueCommit={ value => updateAudioSetting({ key: "ambientVolume", value: value[0] }) }
                    />
                    <Input value={ tempValues.ambientVolume } readOnly className="w-1/4 cursor-default text-center focus-visible:ring-0" />
                </SettingRow>
                <SettingRow label={ t("actionVolume") } description={ t("actionVolumeDescription") }>
                    <Slider
                        value={ [ tempValues.actionVolume ] }
                        min={ 0 }
                        max={ 1 }
                        step={ 0.1 }
                        onValueChange={ value => handleSliderChange({ key: "actionVolume", value: value[0] }) }
                        onValueCommit={ value => updateAudioSetting({ key: "actionVolume", value: value[0] }) }
                    />
                    <Input value={ tempValues.actionVolume } readOnly className="w-1/4 cursor-default text-center focus-visible:ring-0" />
                </SettingRow>
                <SettingRow label={ t("uiVolume") } description={ t("uiVolumeDescription") }>
                    <Slider
                        value={ [ tempValues.uiVolume ] }
                        min={ 0 }
                        max={ 1 }
                        step={ 0.1 }
                        onValueChange={ value => handleSliderChange({ key: "uiVolume", value: value[0] }) }
                        onValueCommit={ value => updateAudioSetting({ key: "uiVolume", value: value[0] }) }
                    />
                    <Input value={ tempValues.uiVolume } readOnly className="w-1/4 cursor-default text-center focus-visible:ring-0" />
                </SettingRow>
            </CardContent>
        </Card>
    );
};

export default AudioTab;