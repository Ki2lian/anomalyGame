import { ComponentPropsWithoutRef, useState } from "react";

import { playSound } from "@/lib/utils";
import useGame, { TActiveMenu } from "@/store/useGame";

interface IHoverableComponentProps {
    component: React.ReactNode;
    hoverComponent: React.ReactNode;
    text: string;
    menuName: TActiveMenu;
    isActive?: boolean;
    onClick?: () => void;
}

const HoverableComponent = ({ component, hoverComponent, text, menuName, isActive, onClick, ...props }: ComponentPropsWithoutRef<"div"> & IHoverableComponentProps) => {
    const { activeMenu } = useGame();

    const [ isHovered, setIsHovered ] = useState<boolean>(false);

    const playHoverSound = () => {
        if (activeMenu !== menuName) return;
        if (isActive) return;
        playSound("/audio/hover.wav", "ui");
    };

    const handleClick = () => {
        if (activeMenu !== menuName) return;
        playSound("/audio/click.wav", "ui");
        if (onClick) {
            onClick();
        }
    };

    return (
        <div
            className="relative cursor-pointer"
            onMouseEnter={ () => {
                setIsHovered(true);
                playHoverSound();
            } }
            onMouseLeave={ () => setIsHovered(false) }
            onClick={ handleClick }
            { ...props }
        >
            {component}
            <div className={ `absolute inset-0 transition-opacity duration-200 ${ isActive || isHovered ? "opacity-100" : "opacity-0" }` }>
                {hoverComponent}
            </div>
            <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-nowrap text-lg dark:text-background">
                {text}
            </h1>
        </div>
    );
};

export default HoverableComponent;
