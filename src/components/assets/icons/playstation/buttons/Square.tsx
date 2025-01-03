import { ComponentPropsWithoutRef } from "react";

import { IIconProps } from "@/components/assets/icons/icon-interface";

export const PlaystationButtonSquare = ({ size = 35, ...props }: ComponentPropsWithoutRef<"svg"> & IIconProps) => {
    return (
        <svg width={ size } height={ size } viewBox="0 0 120 120" preserveAspectRatio="xMidYMid" xmlSpace="preserve" { ...props }>
            <defs>
                <clipPath id="clip-Button_-_PS_Square_White_1">
                    <rect width="120" height="120" />
                </clipPath>
            </defs>
            <g id="Button_-_PS_Square_White_1" data-name="Button - PS Square White 1" clipPath="url(#clip-Button_-_PS_Square_White_1)">
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
                <g id="Playstation_-_Square" data-name="Playstation - Square" transform="translate(39 35)">
                    <g id="Playstation_-_Square-2" data-name="Playstation - Square" fill="none" stroke="#fff" strokeWidth="6">
                        <rect width="42" height="42" stroke="none" />
                        <rect x="3" y="3" width="36" height="36" fill="none" />
                    </g>
                </g>
            </g>
        </svg>
    );
};
