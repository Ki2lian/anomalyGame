import { ComponentPropsWithoutRef } from "react";

import { IIconProps } from "@/components/assets/icons/icon-interface";

export const XboxButtonB = ({ size = 35, ...props }: ComponentPropsWithoutRef<"svg"> & IIconProps) => {
    return (
        <svg width={ size } height={ size } viewBox="0 0 120 120" preserveAspectRatio="xMidYMid" xmlSpace="preserve" { ...props }>
            <defs>
                <clipPath id="clipPath">
                    <rect id="Rectangle_72" data-name="Rectangle 72" width="120" height="120" />
                </clipPath>
            </defs>
            <g id="button_xbox_digital_b_7" clipPath="url(#clipPath)">
                <g id="button_xbox_B_9">
                    <g id="Button_-_XBOX_A" data-name="Button - XBOX A" clipPath="url(#clipPath)">
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
                        <path
                            id="Path_119"
                            data-name="Path 119"
                            d="M-13.289-38.549h12q8.2,0,11.9,2.333t3.7,7.422A9.352,9.352,0,0,1,12.7-23.124a6.478,6.478,0,0,1-4.311,2.663v.264a8.493,8.493,0,0,1,5.287,3.059,9.951,9.951,0,0,1,1.622,5.959,9.82,9.82,0,0,1-3.81,8.227Q7.673,0,1.134,0H-13.289Zm8.174,15.267H-.369a8.677,8.677,0,0,0,4.812-1.028,3.836,3.836,0,0,0,1.49-3.4,3.4,3.4,0,0,0-1.622-3.177,10.423,10.423,0,0,0-5.128-.962h-4.3Zm0,6.486V-6.75H.211A7.9,7.9,0,0,0,5.194-8.042,4.769,4.769,0,0,0,6.8-12q0-4.8-6.855-4.8Z"
                            transform="translate(60 74)"
                            fill="#fff"
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
};
