import { ComponentPropsWithoutRef } from "react";

import { IIconProps } from "@/components/assets/icons/icon-interface";

export const XboxLeftAnalogRight = ({ size = 35, ...props }: ComponentPropsWithoutRef<"svg"> & IIconProps) => {
    return (
        <svg width={ size } height={ size } viewBox="0 0 120 120" preserveAspectRatio="xMidYMid" xmlSpace="preserve" { ...props }>
            <defs>
                <clipPath id="clip-button_xbox_analog_l_direction_2">
                    <rect width="120" height="120" />
                </clipPath>
            </defs>
            <g id="button_xbox_analog_l_direction_2" clipPath="url(#clip-button_xbox_analog_l_direction_2)">
                <g id="Border_white_-_outer" data-name="Border white - outer" transform="translate(10 110) rotate(-90)">
                    <g id="Border_white_-_outer-2" data-name="Border white - outer" fill="none" stroke="#fff" strokeWidth="4">
                        <circle cx="50" cy="50" r="50" stroke="none" />
                        <circle cx="50" cy="50" r="48" fill="none" />
                    </g>
                </g>
                <g id="Border_white_-_inner" data-name="Border white - inner" transform="translate(26 102) rotate(-90)">
                    <g id="Border_white_-_inner-2" data-name="Border white - inner" fill="none" stroke="#fff" strokeWidth="4">
                        <circle cx="42" cy="42" r="42" stroke="none" />
                        <circle cx="42" cy="42" r="44" fill="none" />
                    </g>
                </g>
                <g id="Button_-_Base" data-name="Button - Base" transform="translate(14 106) rotate(-90)">
                    <g id="Button_-_Base-2" data-name="Button - Base" fill="#404040" stroke="#2a2a2a" strokeWidth="8">
                        <circle cx="46" cy="46" r="46" stroke="none" />
                        <circle cx="46" cy="46" r="42" fill="none" />
                    </g>
                </g>
                <g id="Button_-_Top" data-name="Button - Top" transform="translate(26 102) rotate(-90)">
                    <path id="Button_-_Top-2" data-name="Button - Top" d="M42,0A42,42,0,1,1,12.3,12.3,42,42,0,0,1,42,0Z" fill="#404040" />
                </g>
                <g id="Button_-_Top_Alt" data-name="Button - Top Alt" transform="translate(30 98) rotate(-90)">
                    <g id="Button_-_Top-3" data-name="Button - Top" fill="#5b5b5b" stroke="#404040" strokeWidth="8">
                        <circle cx="38" cy="38" r="38" stroke="none" />
                        <circle cx="38" cy="38" r="34" fill="none" />
                    </g>
                </g>
                <g id="Component_12_13" data-name="Component 12 – 13" transform="translate(32 24)">
                    <g id="Ellipse_41" data-name="Ellipse 41" transform="translate(30)" fill="#404040" stroke="#404040" strokeWidth="4">
                        <circle cx="6" cy="6" r="6" stroke="none" />
                        <circle cx="6" cy="6" r="4" fill="none" />
                    </g>
                    <g id="Ellipse_44" data-name="Ellipse 44" transform="translate(30 60)" fill="#404040" stroke="#404040" strokeWidth="4">
                        <circle cx="6" cy="6" r="6" stroke="none" />
                        <circle cx="6" cy="6" r="4" fill="none" />
                    </g>
                    <g id="Ellipse_42" data-name="Ellipse 42" transform="translate(0 30)" fill="#404040" stroke="#404040" strokeWidth="4">
                        <circle cx="6" cy="6" r="6" stroke="none" />
                        <circle cx="6" cy="6" r="4" fill="none" />
                    </g>
                    <g id="Ellipse_43" data-name="Ellipse 43" transform="translate(60 30)" fill="#404040" stroke="#404040" strokeWidth="4">
                        <circle cx="6" cy="6" r="6" stroke="none" />
                        <circle cx="6" cy="6" r="4" fill="none" />
                    </g>
                </g>
                <g id="Group_5" data-name="Group 5" transform="translate(0 120) rotate(-90)">
                    <g id="Group_3" data-name="Group 3">
                        <path
                            id="Intersection_3"
                            data-name="Intersection 3"
                            d="M-42.413-398.915A37.826,37.826,0,0,1-22-404.858a37.824,37.824,0,0,1,20.413,5.943L-22-378.5Z"
                            transform="translate(82 426.858)"
                            fill="#fff"
                        />
                        <circle
                            id="Border_white_-_inner-3"
                            data-name="Border white - inner"
                            cx="50"
                            cy="50"
                            r="50"
                            transform="translate(10 10)"
                            fill="none"
                        />
                    </g>
                    <path
                        id="Intersection_4"
                        data-name="Intersection 4"
                        d="M-32-404v-19.385A38.771,38.771,0,0,1-18-426a38.771,38.771,0,0,1,14,2.615V-404Z"
                        transform="translate(78 436)"
                        fill="#fff"
                    />
                </g>
                <path id="Path_93" data-name="Path 93" d="M-7.705,0V-28.555H-1.65V-5H9.932V0Z" transform="translate(68 74)" fill="#fff" />
            </g>
        </svg>
    );
};
