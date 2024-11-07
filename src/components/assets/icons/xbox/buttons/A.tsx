import { ComponentPropsWithoutRef } from "react";

import { IIconProps } from "@/components/assets/icons/icon-interface";

export const XboxButtonA = ({ size = 35, ...props }: ComponentPropsWithoutRef<"svg"> & IIconProps) => {
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
                    <rect id="Rectangle_73" data-name="Rectangle 73" width="120" height="120"/>
                </clipPath>
            </defs>
            <g id="button_xbox_digital_a_7" clipPath="url(#clipPath)">
                <g id="button_xbox_digital_a_71">
                    <g id="Button_-_XBOX_B" data-name="Button - XBOX B" clipPath="url(#clipPath)">
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
                        <path id="Path_116" data-name="Path 116" d="M9.822,0,7.027-9.176H-7.027L-9.822,0h-8.807L-5.023-38.707H4.97L18.628,0ZM5.076-16.031Q1.2-28.5.712-30.138t-.7-2.584q-.87,3.375-4.983,16.69Z" transform="translate(60 74)" fill="#fff"/>
                    </g>
                </g>
            </g>
        </svg>
    );
};