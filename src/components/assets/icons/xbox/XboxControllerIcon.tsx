import { XboxLeftAnalogBottom } from "@/components/assets/icons/xbox/analogs/left/Bottom";
import { XboxLeftAnalogLeft } from "@/components/assets/icons/xbox/analogs/left/Left";
import { XboxLeftAnalogRight } from "@/components/assets/icons/xbox/analogs/left/Right";
import { XboxLeftAnalogTop } from "@/components/assets/icons/xbox/analogs/left/Top";
import { XboxRightAnalogBottom } from "@/components/assets/icons/xbox/analogs/right/Bottom";
import { XboxRightAnalogLeft } from "@/components/assets/icons/xbox/analogs/right/Left";
import { XboxRightAnalogRight } from "@/components/assets/icons/xbox/analogs/right/Right";
import { XboxRightAnalogTop } from "@/components/assets/icons/xbox/analogs/right/Top";
import { XboxButtonA } from "@/components/assets/icons/xbox/buttons/A";
import { XboxButtonB } from "@/components/assets/icons/xbox/buttons/B";
import { XboxButtonStart } from "@/components/assets/icons/xbox/buttons/Start";
import { XboxButtonX } from "@/components/assets/icons/xbox/buttons/X";
import { XboxButtonY } from "@/components/assets/icons/xbox/buttons/Y";

const xboxComponents = {
    analog: {
        left: {
            top: XboxLeftAnalogTop,
            bottom: XboxLeftAnalogBottom,
            left: XboxLeftAnalogLeft,
            right: XboxLeftAnalogRight,
        },
        right: {
            top: XboxRightAnalogTop,
            bottom: XboxRightAnalogBottom,
            left: XboxRightAnalogLeft,
            right: XboxRightAnalogRight,
        },
    },
    button: {
        right: {
            top: XboxButtonY,
            bottom: XboxButtonA,
            left: XboxButtonX,
            right: XboxButtonB,
        },
        middle: {
            right: XboxButtonStart,
        },
    },
};

export { xboxComponents };
