import { useLocalStorage } from "@uidotdev/usehooks";
import { useRef } from "react";

import { defaultSettings, IKeybinding, ISettings } from "@/components/app/settings/defaultsSettings";
import BaseControllerIcon from "@/components/assets/icons/BaseControllerIcon";
import { Input } from "@/components/ui/input";
import { mapCodeToIcon } from "@/lib/utils";

interface IControllerInputProps {
    value: IKeybinding;
}

const ControllerInput = ({ value }: IControllerInputProps) => {
    const [ settings ] = useLocalStorage<ISettings>("settings", defaultSettings);

    const inputRef = useRef<HTMLInputElement>(null);

    const iconProps = mapCodeToIcon(value.code, settings.controls.controllerType);

    return (
        <>
            <div className="relative">
                <Input ref={inputRef} placeholder="" readOnly className="cursor-default focus-visible:ring-0" />
                {iconProps && <BaseControllerIcon {...iconProps} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />}
            </div>
        </>
    );
};

export default ControllerInput;
