import { PlaystationLeftAnalogBottom } from "@/components/assets/icons/playstation/analogs/left/Bottom";
import { PlaystationLeftAnalogLeft } from "@/components/assets/icons/playstation/analogs/left/Left";
import { PlaystationLeftAnalogRight } from "@/components/assets/icons/playstation/analogs/left/Right";
import { PlaystationLeftAnalogTop } from "@/components/assets/icons/playstation/analogs/left/Top";
import { PlaystationRightAnalogBottom } from "@/components/assets/icons/playstation/analogs/right/Bottom";
import { PlaystationRightAnalogLeft } from "@/components/assets/icons/playstation/analogs/right/Left";
import { PlaystationRightAnalogRight } from "@/components/assets/icons/playstation/analogs/right/Right";
import { PlaystationRightAnalogTop } from "@/components/assets/icons/playstation/analogs/right/Top";
import { PlaystationButtonCircle } from "@/components/assets/icons/playstation/buttons/Circle";
import { PlaystationButtonCross } from "@/components/assets/icons/playstation/buttons/Cross";
import { PlaystationButtonOptions } from "@/components/assets/icons/playstation/buttons/Options";
import { PlaystationButtonSquare } from "@/components/assets/icons/playstation/buttons/Square";
import { PlaystationButtonTriangle } from "@/components/assets/icons/playstation/buttons/Triangle";

const playstationComponents = {
    analog: {
        left: {
            top: PlaystationLeftAnalogTop,
            bottom: PlaystationLeftAnalogBottom,
            left: PlaystationLeftAnalogLeft,
            right: PlaystationLeftAnalogRight,
        },
        right: {
            top: PlaystationRightAnalogTop,
            bottom: PlaystationRightAnalogBottom,
            left: PlaystationRightAnalogLeft,
            right: PlaystationRightAnalogRight,
        },
    },
    button: {
        right: {
            top: PlaystationButtonTriangle,
            bottom: PlaystationButtonCross,
            left: PlaystationButtonSquare,
            right: PlaystationButtonCircle,
        },
        middle: {
            right: PlaystationButtonOptions,
        },
    },
};

export { playstationComponents };
