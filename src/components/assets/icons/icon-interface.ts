export interface IIconProps {
    size?: number;
}
interface IBaseControllerIconPropsCommon {
    size?: number;
    controllerType?: "xbox" | "playstation";
}

interface IAnalogControllerIconProps extends IBaseControllerIconPropsCommon {
    type: "analog";
    side: "left" | "right";
    position: "top" | "bottom" | "left" | "right";
}

interface IButtonControllerIconRightProps extends IBaseControllerIconPropsCommon {
    type: "button";
    side: "right";
    position: "top" | "bottom" | "left" | "right";
}

interface IButtonControllerIconMiddleProps extends IBaseControllerIconPropsCommon {
    type: "button";
    side: "middle";
    position: "right";
}

export type IBaseControllerIconProps = IAnalogControllerIconProps | IButtonControllerIconRightProps | IButtonControllerIconMiddleProps;


// type TIconComponent = React.FC<SVGProps<SVGSVGElement> & IIconProps>;

// interface IAnalogComponents {
//     left: Record<"top" | "bottom" | "left" | "right", TIconComponent>;
//     right: Record<"top" | "bottom" | "left" | "right", TIconComponent>;
// }

// interface IButtonComponents {
//     right: Record<"top" | "bottom" | "left" | "right", TIconComponent>;
//     middle: {
//         right: TIconComponent;
//     };
// }

// export interface IControllerComponents {
//     analog: IAnalogComponents;
//     button: IButtonComponents;
// }