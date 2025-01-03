import { ComponentPropsWithoutRef } from "react";

import { IIconProps } from "@/components/assets/icons/icon-interface";

export const XboxRightAnalogRight = ({ size = 35, ...props }: ComponentPropsWithoutRef<"svg"> & IIconProps) => {
    return (
        <svg width={ size } height={ size } viewBox="0 0 120 120" preserveAspectRatio="xMidYMid" xmlSpace="preserve" { ...props }>
            <defs>
                <clipPath id="clip-button_xbox_analog_r_direction_4">
                    <rect width="120" height="120" />
                </clipPath>
            </defs>
            <g id="button_xbox_analog_r_direction_4" clipPath="url(#clip-button_xbox_analog_r_direction_4)">
                <g id="Border_white_-_outer" data-name="Border white - outer" transform="translate(110 10) rotate(90)">
                    <g id="Border_white_-_outer-2" data-name="Border white - outer" fill="none" stroke="#fff" strokeWidth="4">
                        <circle cx="50" cy="50" r="50" stroke="none" />
                        <circle cx="50" cy="50" r="48" fill="none" />
                    </g>
                </g>
                <g id="Border_white_-_inner" data-name="Border white - inner" transform="translate(94 18) rotate(90)">
                    <g id="Border_white_-_inner-2" data-name="Border white - inner" fill="none" stroke="#fff" strokeWidth="4">
                        <circle cx="42" cy="42" r="42" stroke="none" />
                        <circle cx="42" cy="42" r="44" fill="none" />
                    </g>
                </g>
                <g id="Button_-_Base" data-name="Button - Base" transform="translate(106 14) rotate(90)">
                    <g id="Button_-_Base-2" data-name="Button - Base" fill="#404040" stroke="#2a2a2a" strokeWidth="8">
                        <circle cx="46" cy="46" r="46" stroke="none" />
                        <circle cx="46" cy="46" r="42" fill="none" />
                    </g>
                </g>
                <g id="Button_-_Top" data-name="Button - Top" transform="translate(94 18) rotate(90)">
                    <path id="Button_-_Top-2" data-name="Button - Top" d="M42,0A42,42,0,1,1,12.3,12.3,42,42,0,0,1,42,0Z" fill="#404040" />
                </g>
                <g id="Button_-_Top_Alt" data-name="Button - Top Alt" transform="translate(90 22) rotate(90)">
                    <g id="Button_-_Top-3" data-name="Button - Top" fill="#5b5b5b" stroke="#404040" strokeWidth="8">
                        <circle cx="38" cy="38" r="38" stroke="none" />
                        <circle cx="38" cy="38" r="34" fill="none" />
                    </g>
                </g>
                <g id="Component_12_11" data-name="Component 12 – 11" transform="translate(16 24)">
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
                <g id="Group_5" data-name="Group 5" transform="translate(120) rotate(90)">
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
                <path
                    id="Path_101"
                    data-name="Path 101"
                    d="M-3.555-15.879H-1.6a7.472,7.472,0,0,0,4.238-.957A3.416,3.416,0,0,0,4-19.844a3.125,3.125,0,0,0-1.4-2.891,8.474,8.474,0,0,0-4.326-.859H-3.555Zm0,4.922V0H-9.609V-28.555h8.32q5.82,0,8.613,2.119T10.117-20A7.576,7.576,0,0,1,8.73-15.518,9.175,9.175,0,0,1,4.8-12.441Q11.25-2.812,13.2,0H6.484L-.332-10.957Z"
                    transform="translate(52 74)"
                    fill="#fff"
                />
            </g>
        </svg>
    );
};
