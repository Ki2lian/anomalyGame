import { useRef } from "react";

import { IKeybinding, ISettings } from "@/components/app/settings/defaultsSettings";
import BaseControllerIcon from "@/components/assets/icons/BaseControllerIcon";
import { IBaseControllerIconProps } from "@/components/assets/icons/icon-interface";
import { Input } from "@/components/ui/input";

interface IControllerInputProps {
    value: IKeybinding;
    controllerType: ISettings["controls"]["controllerType"];
}

const mapCodeToIcon = (code: string, controllerType: string) => {
    const parts = code.split(/(?=[A-Z])/);
    const lowerCode = code.toLowerCase();

    const getIconProps = (type: string, position: string, side: string) =>
        ({
            type,
            position: position.toLowerCase() as IBaseControllerIconProps["position"],
            controllerType,
            side: side.toLowerCase() as IBaseControllerIconProps["side"],
        }) as IBaseControllerIconProps;

    if (lowerCode.includes("analog")) {
        const [ side, , position ] = parts;
        return getIconProps("analog", position, side);
    }

    if (lowerCode.includes("button")) {
        const [ side, , position ] = parts;
        return getIconProps("button", position, side);
    }

    return null;
};

const ControllerInput = ({ value, controllerType }: IControllerInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const iconProps = mapCodeToIcon(value.code, controllerType);

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
