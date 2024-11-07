import { ComponentPropsWithoutRef } from "react";

import { IIconProps } from "@/components/assets/icons/icon-interface";

export const PlaystationButtonCross = ({ size = 35, ...props }: ComponentPropsWithoutRef<"svg"> & IIconProps) => {
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
                    <circle id="Ellipse_10" data-name="Ellipse 10" cx="29" cy="29" r="29" transform="translate(18.64 14.64)" fill="#fff" stroke="#707070" strokeWidth="1"/>
                </clipPath>
                <clipPath id="clip-Button_-_PS_Cross_White_1">
                    <rect width="120" height="120"/>
                </clipPath>
            </defs>
            <g id="Button_-_PS_Cross_White_1" data-name="Button - PS Cross White 1" clipPath="url(#clip-Button_-_PS_Cross_White_1)">
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
                <g id="Playstation_-_Cross" data-name="Playstation - Cross" transform="translate(18.988 14.988)">
                    <g id="Playstation_-_Cross-2" data-name="Playstation - Cross" transform="translate(38.184 -23.532) rotate(45)" clipPath="url(#clipPath)">
                        <path id="Union_1" data-name="Union 1" d="M25.292,58.076V32.785H0V25.292H25.292V0h7.493V25.292H58.076v7.493H32.785V58.076Z" transform="translate(18.602 14.602)" fill="#fff"/>
                    </g>
                </g>
            </g>
        </svg>
    );
};