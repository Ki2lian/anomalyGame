import { ComponentPropsWithoutRef } from "react";

import { IGreyRectangleDepthFlatProps } from "@/components/assets/sprites/sprite-interface";
import { cn } from "@/lib/utils";

export const GreyRectangleDepthFlat = ({ className, children, ...props }: ComponentPropsWithoutRef<"div"> & IGreyRectangleDepthFlatProps) => {
    return (
        <div { ...props } className="absolute top-[12.5%] z-[18568369] w-full">
            <div className={ cn(className) }>
                <div className="absolute inset-0 rounded-lg bg-[#666880] dark:bg-[#DADCE7]"></div>
                <div className="absolute inset-[4px] rounded-lg border border-[#DADCE7] bg-white dark:bg-[#666880]"></div>
                <div className="absolute inset-[8px] rounded-lg border  bg-[#DADCE7] dark:bg-[#333344]"></div>
                <div className="relative z-10 p-4">{children}</div>
            </div>
        </div>
    );
};
