import { ComponentPropsWithoutRef } from "react";

import { IBaseControllerIconProps } from "@/components/assets/icons/icon-interface";
import { playstationComponents } from "@/components/assets/icons/playstation/PlaystationControllerIcon";
import { xboxComponents } from "@/components/assets/icons/xbox/XboxControllerIcon";

const BaseControllerIcon = ({ type, position, side, size, controllerType, ...props }: ComponentPropsWithoutRef<"svg"> & IBaseControllerIconProps) => {
    const components = controllerType === "playstation" ? playstationComponents : xboxComponents;

    if (type === "analog" && side && position && components.analog[side]) {
        const AnalogComponent = components.analog[side][position] || null;
        return AnalogComponent ? <AnalogComponent size={ size } { ...props } /> : null;
    }

    if (type === "button" && side && position && components.button[side]) {
        if (side === "right") {
            const ButtonComponent = components.button.right[position];
            return ButtonComponent ? <ButtonComponent size={ size } { ...props } /> : null;
        }

        if (side === "middle") {
            const ButtonComponent = components.button.middle.right;
            return ButtonComponent ? <ButtonComponent size={ size } { ...props } /> : null;
        }
    }

    return null;
};

export default BaseControllerIcon;
