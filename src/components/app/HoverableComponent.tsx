import { ComponentPropsWithoutRef, useState } from "react";


interface IHoverableComponentProps {
    component: React.ReactNode;
    hoverComponent: React.ReactNode;
    text: string;
    isActive?: boolean;
}

const HoverableComponent = ({ component, hoverComponent, text, isActive, ...props }: ComponentPropsWithoutRef<"div"> & IHoverableComponentProps) => {
    const [ isHovered, setIsHovered ] = useState<boolean>(false);

    return (
        <div
            className="relative cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            {component}
            <div className={`absolute inset-0 transition-opacity duration-200 ${ isActive || isHovered ? "opacity-100" : "opacity-0" }`}>
                {hoverComponent}
            </div>
            <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-nowrap text-lg dark:text-background">{text}</h1>
        </div>
    );
};

export default HoverableComponent;