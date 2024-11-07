import { ComponentPropsWithoutRef } from "react";

import { IIconProps } from "@/components/assets/icons/icon-interface";

export const XboxButtonX = ({ size = 35, ...props }: ComponentPropsWithoutRef<"svg"> & IIconProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 120 120"
            preserveAspectRatio="xMidYMid"
            xmlSpace="preserve"
            {...props}
        >
            <defs>
                <clipPath id="clipPath">
                    <rect id="Rectangle_74" data-name="Rectangle 74" width="120" height="120"/>
                </clipPath>
            </defs>
            <g id="button_xbox_digital_x_7" clipPath="url(#clipPath)">
                <g id="button_xbox_X_9">
                    <g id="Button_-_XBOX_X" data-name="Button - XBOX X" clipPath="url(#clipPath)">
                        <g id="Border_white_-_outer" data-name="Border white - outer" transform="translate(14 14)">
                            <g id="Border_white_-_outer-2" data-name="Border white - outer" fill="none" stroke="#fff" strokeWidth="2">
                                <circle cx="46" cy="46" r="46" stroke="none"/>
                                <circle cx="46" cy="46" r="45" fill="none"/>
                            </g>
                        </g>
                        <g id="Border_white_-_inner" data-name="Border white - inner" transform="translate(14 14)">
                            <g id="Border_white_-_inner-2" data-name="Border white - inner" fill="none" stroke="#fff" strokeWidth="4">
                                <circle cx="46" cy="46" r="46" stroke="none"/>
                                <circle cx="46" cy="46" r="48" fill="none"/>
                            </g>
                        </g>
                        <g id="Button_-_Base" data-name="Button - Base" transform="translate(14 14)">
                            <circle id="Button_-_Base-2" data-name="Button - Base" cx="46" cy="46" r="46" fill="#2a2a2a"/>
                        </g>
                        <g id="Button_-_Top" data-name="Button - Top" transform="translate(18 14)">
                            <g id="Button_-_Top-2" data-name="Button - Top" fill="#404040" stroke="#5b5b5b" strokeWidth="6">
                                <circle cx="42" cy="42" r="42" stroke="none"/>
                                <circle cx="42" cy="42" r="39" fill="none"/>
                            </g>
                        </g>
                        <path id="Path_122" data-name="Path 122" d="M18.009,0H8.675L-.29-14.581-9.255,0h-8.754L-5.221-19.881-17.191-38.549h9.018L.132-24.68,8.279-38.549h8.807L4.983-19.433Z" transform="translate(60 74)" fill="#fff"/>
                    </g>
                </g>
            </g>
        </svg>
    );
};