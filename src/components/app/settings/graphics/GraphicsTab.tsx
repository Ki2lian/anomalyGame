import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { defaultSettings, IAspectRatio, ISettings } from "@/components/app/settings/defaultsSettings";
import { aspectRatiosAvailable, environmentTextureAvailable } from "@/components/app/settings/import/validators/graphics";
import ResetButton from "@/components/app/settings/ResetButton";
import SettingRow from "@/components/app/settings/SettingRow";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useFullScreen } from "@/hooks/useFullScreen";

interface IUpdateGraphicsSettingProps {
    key: string;
    value: string | boolean | number | IAspectRatio;
}

const GraphicsTab = () => {
    const { t } = useTranslation("settingsMenu", { keyPrefix: "graphics" });
    const [ settings, setSettings ] = useLocalStorage<ISettings>("settings", defaultSettings);

    const [ isFullScreen, toggleFullScreen ] = useFullScreen();

    const [ tempValues, setTempValues ] = useState({
        renderDistance: settings.graphics.renderDistance,
        fov: settings.graphics.fov,
        resolution: settings.graphics.resolution,
    });

    const updateGraphicsSetting = ({ key, value }: IUpdateGraphicsSettingProps) => {
        setSettings(prevSettings => ({
            ...prevSettings,
            graphics: {
                ...prevSettings.graphics,
                [key]: value,
            },
        }));
    };

    const handleSliderChange = ({ key, value }: IUpdateGraphicsSettingProps) => {
        setTempValues(prevValues => ({
            ...prevValues,
            [key]: value,
        }));
    };

    const handleAspectRatioChange = (value: string) => {
        const [ width, height ] = value.split("x");
        const isNative = width === "0" && height === "0";

        updateGraphicsSetting({ key: "aspectRatio", value: { isNative, width: parseInt(width), height: parseInt(height) }});
    };

    const handleToggleFullScreen = async () => {
        await toggleFullScreen();
    };

    return (
        <Card>
            <CardContent className="p-4">
                <ResetButton section="graphics" confirmTextKey="confirmResetDefaultGraphics" successMessageKey="resetGraphicsSuccessMessage" />
                <SettingRow label={ t("fullScreen") } description={ t("toggleFullScreenDescription") }>
                    {!isFullScreen ? (
                        <Button className="md:hidden" variant={ "success" } onClick={ handleToggleFullScreen }>{ t("enableFullScreen") }</Button>
                    ) : (
                        <Button className="md:hidden" variant={ "destructive" } onClick={ handleToggleFullScreen }>{ t("disableFullScreen") }</Button>
                    )}
                    <span className="hidden md:block">{ t("pressF11") }</span>
                </SettingRow>
                <SettingRow label={ t("fov") } description={ t("fovDescription") }>
                    <Slider
                        value={ [ tempValues.fov ] }
                        min={ 60 }
                        max={ 150 }
                        step={ 5 }
                        onValueChange={ value => handleSliderChange({ key: "fov", value: value[0] }) }
                        onValueCommit={ value => updateGraphicsSetting({ key: "fov", value: value[0] }) }
                    />
                    <Input value={ tempValues.fov } readOnly className="w-1/4 cursor-default text-center focus-visible:ring-0" />
                </SettingRow>
                <SettingRow label={ t("resolution") } description={ t("resolutionDescription") }>
                    <Slider
                        value={ [ tempValues.resolution ] }
                        min={ 0.1 }
                        max={ 2 }
                        step={ 0.1 }
                        onValueChange={ value => handleSliderChange({ key: "resolution", value: value[0] }) }
                        onValueCommit={ value => updateGraphicsSetting({ key: "resolution", value: value[0] }) }
                    />
                    <Input value={ tempValues.resolution } readOnly className="w-1/4 cursor-default text-center focus-visible:ring-0" />
                </SettingRow>
                <SettingRow label={ t("aspectRatio") } description={ t("aspectRatioDescription") }>
                    <Select
                        value={
                            settings.graphics.aspectRatio.isNative
                                ? "0x0"
                                : `${ settings.graphics.aspectRatio.width }x${ settings.graphics.aspectRatio.height }`
                        }
                        onValueChange={ value => handleAspectRatioChange(value) }
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {aspectRatiosAvailable.map(ar => {
                                const label = ar.width === 0 && ar.height === 0 ? "Automatique" : `${ ar.width }x${ ar.height }`;
                                const value = `${ ar.width }x${ ar.height }`;
                                return (
                                    <SelectItem key={ `${ ar.width }-${ ar.height }` } value={ value }>
                                        {label}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </SettingRow>
                <SettingRow label={ t("renderDistance") } description={ t("renderDistanceDescription") }>
                    <Slider
                        value={ [ tempValues.renderDistance ] }
                        min={ 1 }
                        max={ 100 }
                        step={ 1 }
                        onValueChange={ value => handleSliderChange({ key: "renderDistance", value: value[0] }) }
                        onValueCommit={ value => updateGraphicsSetting({ key: "renderDistance", value: value[0] }) }
                    />
                    <Input value={ tempValues.renderDistance } readOnly className="w-1/4 cursor-default text-center focus-visible:ring-0" />
                </SettingRow>
                <SettingRow label={ t("shadows") } description={ t("shadowsDescription") }>
                    <Switch checked={ settings.graphics.shadows } onCheckedChange={ value => updateGraphicsSetting({ key: "shadows", value }) } />
                </SettingRow>
                <SettingRow label={ t("environmentTexture") } description={ t("environmentTextureDescription") }>
                    <Select
                        value={ settings.graphics.environmentTexture }
                        onValueChange={ value => updateGraphicsSetting({ key: "environmentTexture", value }) }
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {environmentTextureAvailable.map(envTA => (
                                <SelectItem key={ envTA } value={ envTA }>
                                    {envTA}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </SettingRow>
            </CardContent>
        </Card>
    );
};

export default GraphicsTab;
