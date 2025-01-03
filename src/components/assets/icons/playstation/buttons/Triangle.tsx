import { ComponentPropsWithoutRef } from "react";

import { IIconProps } from "@/components/assets/icons/icon-interface";

export const PlaystationButtonTriangle = ({ size = 35, ...props }: ComponentPropsWithoutRef<"svg"> & IIconProps) => {
    return (
        <svg width={ size } height={ size } viewBox="0 0 120 120" preserveAspectRatio="xMidYMid" xmlSpace="preserve" { ...props }>
            <defs>
                <clipPath id="clip-Button_-_PS_Triangle_White_1">
                    <rect width="120" height="120" />
                </clipPath>
            </defs>
            <g id="Button_-_PS_Triangle_White_1" data-name="Button - PS Triangle White 1" clipPath="url(#clip-Button_-_PS_Triangle_White_1)">
                <g id="Border_white_-_outer" data-name="Border white - outer" transform="translate(14 14)">
                    <g id="Border_white_-_outer-2" data-name="Border white - outer" fill="none" stroke="#fff" strokeWidth="2">
                        <circle cx="46" cy="46" r="46" stroke="none" />
                        <circle cx="46" cy="46" r="45" fill="none" />
                    </g>
                </g>
                <g id="Border_white_-_inner" data-name="Border white - inner" transform="translate(14 14)">
                    <g id="Border_white_-_inner-2" data-name="Border white - inner" fill="none" stroke="#fff" strokeWidth="4">
                        <circle cx="46" cy="46" r="46" stroke="none" />
                        <circle cx="46" cy="46" r="48" fill="none" />
                    </g>
                </g>
                <g id="Button_-_Base" data-name="Button - Base" transform="translate(14 14)">
                    <circle id="Button_-_Base-2" data-name="Button - Base" cx="46" cy="46" r="46" fill="#2a2a2a" />
                </g>
                <g id="Button_-_Top" data-name="Button - Top" transform="translate(18 14)">
                    <g id="Button_-_Top-2" data-name="Button - Top" fill="#404040" stroke="#5b5b5b" strokeWidth="6">
                        <circle cx="42" cy="42" r="42" stroke="none" />
                        <circle cx="42" cy="42" r="39" fill="none" />
                    </g>
                </g>
                <g id="Playstation_-_Triangle" data-name="Playstation - Triangle" transform="translate(34 25)">
                    <g id="Playstation_-_Triangle-2" data-name="Playstation - Triangle" fill="none">
                        <path d="M26,0,52,47H0Z" stroke="none" />
                        <path
                            d="M 26 12.39512634277344 L 10.176025390625 41.00000762939453 L 41.823974609375 41.00000762939453 L 26 12.39512634277344 M 26 3.814697265625e-06 L 52 47.00000762939453 L 0 47.00000762939453 L 26 3.814697265625e-06 Z"
                            stroke="none"
                            fill="#fff"
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
};
