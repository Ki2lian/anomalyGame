import { ComponentPropsWithoutRef } from "react";

import { IIconProps } from "@/components/assets/icons/icon-interface";

export const PlaystationButtonOptions = ({ size = 35, ...props }: ComponentPropsWithoutRef<"svg"> & IIconProps) => {
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
                <clipPath id="clip-Button_-_PS_Options">
                    <rect width="120" height="120"/>
                </clipPath>
            </defs>
            <g id="Button_-_PS_Options" data-name="Button - PS Options" clip-path="url(#clip-Button_-_PS_Options)">
                <g id="Rectangle_57" data-name="Rectangle 57" transform="translate(45 36)" fill="#2a2a2a" stroke="#fff" stroke-width="4">
                    <rect width="30" height="68" rx="15" stroke="none"/>
                    <rect x="-2" y="-2" width="34" height="72" rx="17" fill="none"/>
                </g>
                <g id="Rectangle_58" data-name="Rectangle 58" transform="translate(49 40)" fill="#404040" stroke="#5b5b5b" stroke-width="4">
                    <rect width="22" height="51" rx="11" stroke="none"/>
                    <rect x="-2" y="-2" width="26" height="55" rx="13" fill="none"/>
                </g>
                <rect id="Rectangle_59" data-name="Rectangle 59" width="22" height="58" rx="11" transform="translate(49 42)" fill="#404040"/>
                <path id="Path_85" data-name="Path 85" d="M-29.375-7.158a7.81,7.81,0,0,1-1.743,5.42A6.3,6.3,0,0,1-36.055.2a6.348,6.348,0,0,1-4.966-1.919,7.859,7.859,0,0,1-1.733-5.454,7.737,7.737,0,0,1,1.743-5.43A6.423,6.423,0,0,1-36.035-14.5a6.293,6.293,0,0,1,4.922,1.924A7.8,7.8,0,0,1-29.375-7.158Zm-10.9,0a6.4,6.4,0,0,0,1.064,4A3.758,3.758,0,0,0-36.055-1.8a3.751,3.751,0,0,0,3.14-1.348,6.413,6.413,0,0,0,1.06-4.014,6.427,6.427,0,0,0-1.05-3.984,3.712,3.712,0,0,0-3.13-1.357A3.789,3.789,0,0,0-39.2-11.143,6.34,6.34,0,0,0-40.273-7.158Zm23.418-2.8A4.163,4.163,0,0,1-18.32-6.533a6.454,6.454,0,0,1-4.17,1.191h-1.484V0h-2.334V-14.277H-22.2a6.22,6.22,0,0,1,4.009,1.094A3.926,3.926,0,0,1-16.855-9.961ZM-23.975-7.3h1.24A4.444,4.444,0,0,0-20.1-7.93a2.275,2.275,0,0,0,.84-1.953,2.216,2.216,0,0,0-.752-1.836,3.714,3.714,0,0,0-2.344-.605h-1.621ZM-9.072,0h-2.334V-12.275h-4.2v-2H-4.873v2h-4.2Zm6.387,0V-14.277H-.352V0ZM16.094-7.158a7.81,7.81,0,0,1-1.743,5.42A6.3,6.3,0,0,1,9.414.2,6.348,6.348,0,0,1,4.448-1.724,7.859,7.859,0,0,1,2.715-7.178a7.737,7.737,0,0,1,1.743-5.43A6.423,6.423,0,0,1,9.434-14.5a6.293,6.293,0,0,1,4.922,1.924A7.8,7.8,0,0,1,16.094-7.158Zm-10.9,0a6.4,6.4,0,0,0,1.064,4A3.758,3.758,0,0,0,9.414-1.8a3.751,3.751,0,0,0,3.14-1.348,6.413,6.413,0,0,0,1.06-4.014,6.427,6.427,0,0,0-1.05-3.984A3.712,3.712,0,0,0,9.434-12.5a3.789,3.789,0,0,0-3.169,1.357A6.34,6.34,0,0,0,5.2-7.158ZM31.055,0H28.193L21.172-11.377h-.078l.049.635q.137,1.816.137,3.32V0H19.16V-14.277h2.832l7,11.318h.059q-.02-.225-.078-1.636t-.059-2.2v-7.48h2.139Zm12-3.877A3.593,3.593,0,0,1,41.68-.889,5.993,5.993,0,0,1,37.881.2a9.064,9.064,0,0,1-3.965-.752V-2.764a10.776,10.776,0,0,0,2.075.723,8.8,8.8,0,0,0,2.046.264A3.255,3.255,0,0,0,40.083-2.3a1.72,1.72,0,0,0,.659-1.416,1.775,1.775,0,0,0-.605-1.357,9.115,9.115,0,0,0-2.5-1.318A6.614,6.614,0,0,1,34.883-8.2a3.823,3.823,0,0,1-.8-2.441,3.419,3.419,0,0,1,1.27-2.812,5.266,5.266,0,0,1,3.408-1.025,10.014,10.014,0,0,1,4.082.9l-.742,1.9a8.918,8.918,0,0,0-3.4-.8,2.608,2.608,0,0,0-1.719.493,1.62,1.62,0,0,0-.586,1.3,1.835,1.835,0,0,0,.234.952,2.394,2.394,0,0,0,.771.747,13.05,13.05,0,0,0,1.934.928,10.58,10.58,0,0,1,2.3,1.221,3.59,3.59,0,0,1,1.074,1.279A3.848,3.848,0,0,1,43.057-3.877Z" transform="translate(60 27)" fill="currentColor"/>
            </g>
        </svg>
    );
};