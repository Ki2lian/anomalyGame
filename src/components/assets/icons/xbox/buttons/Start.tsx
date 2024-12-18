import { ComponentPropsWithoutRef } from "react";

import { IIconProps } from "@/components/assets/icons/icon-interface";

export const XboxButtonStart = ({ size = 35, ...props }: ComponentPropsWithoutRef<"svg"> & IIconProps) => {
    return (
        <svg width={ size } height={ size } viewBox="0 0 120 120" preserveAspectRatio="xMidYMid" xmlSpace="preserve" { ...props }>
            <defs>
                <clipPath id="clip-button_xbox_digital_start_1">
                    <rect width="120" height="120" />
                </clipPath>
            </defs>
            <g id="button_xbox_digital_start_1" clipPath="url(#clip-button_xbox_digital_start_1)">
                <g id="Rectangle_57" data-name="Rectangle 57" transform="translate(30 47)" fill="#2a2a2a" stroke="#fff" strokeWidth="4">
                    <rect width="60" height="45" rx="21" stroke="none" />
                    <rect x="-2" y="-2" width="64" height="49" rx="23" fill="none" />
                </g>
                <g
                    id="Rectangle_58"
                    data-name="Rectangle 58"
                    transform="translate(82 84) rotate(180)"
                    fill="#404040"
                    stroke="#5b5b5b"
                    strokeWidth="4"
                >
                    <rect width="44" height="29" rx="14.5" stroke="none" />
                    <rect x="-2" y="-2" width="48" height="33" rx="16.5" fill="none" />
                </g>
                <rect
                    id="Rectangle_59"
                    data-name="Rectangle 59"
                    width="44"
                    height="33"
                    rx="16.5"
                    transform="translate(82 84) rotate(180)"
                    fill="#404040"
                />
                <path
                    id="Path_114"
                    data-name="Path 114"
                    d="M-19.7-3.877A3.593,3.593,0,0,1-21.079-.889,5.993,5.993,0,0,1-24.878.2a9.064,9.064,0,0,1-3.965-.752V-2.764a10.776,10.776,0,0,0,2.075.723,8.8,8.8,0,0,0,2.046.264A3.255,3.255,0,0,0-22.676-2.3a1.72,1.72,0,0,0,.659-1.416,1.775,1.775,0,0,0-.605-1.357,9.115,9.115,0,0,0-2.5-1.318A6.614,6.614,0,0,1-27.876-8.2a3.823,3.823,0,0,1-.8-2.441,3.419,3.419,0,0,1,1.27-2.812A5.266,5.266,0,0,1-24-14.482a10.014,10.014,0,0,1,4.082.9l-.742,1.9a8.918,8.918,0,0,0-3.4-.8,2.608,2.608,0,0,0-1.719.493,1.62,1.62,0,0,0-.586,1.3,1.835,1.835,0,0,0,.234.952,2.394,2.394,0,0,0,.771.747,13.05,13.05,0,0,0,1.934.928,10.58,10.58,0,0,1,2.3,1.221,3.59,3.59,0,0,1,1.074,1.279A3.848,3.848,0,0,1-19.7-3.877ZM-12.007,0h-2.334V-12.275h-4.2v-2H-7.808v2h-4.2ZM3.237,0,1.812-3.965H-3.647L-5.044,0H-7.5l5.342-14.336H.376L5.718,0ZM1.2-5.977-.142-9.863q-.146-.391-.405-1.23T-.9-12.324A21.886,21.886,0,0,1-1.675-9.7L-2.964-5.977Zm8.74-1.66h1.621a3.7,3.7,0,0,0,2.363-.605,2.2,2.2,0,0,0,.732-1.8,1.934,1.934,0,0,0-.791-1.738,4.337,4.337,0,0,0-2.383-.527H9.937Zm0,1.934V0H7.6V-14.277h4.033a6.627,6.627,0,0,1,4.092,1.035,3.717,3.717,0,0,1,1.328,3.125,3.906,3.906,0,0,1-2.773,3.8L18.315,0H15.659L12.241-5.7ZM25.317,0H22.983V-12.275h-4.2v-2H29.517v2h-4.2Z"
                    transform="translate(60 39)"
                    fill="currentColor"
                />
                <path
                    id="Polygon_8"
                    data-name="Polygon 8"
                    d="M9.106,1.789a1,1,0,0,1,1.789,0l8.382,16.764A1,1,0,0,1,18.382,20H1.618a1,1,0,0,1-.894-1.447Z"
                    transform="translate(74 58) rotate(90)"
                    fill="#fff"
                />
            </g>
        </svg>
    );
};
