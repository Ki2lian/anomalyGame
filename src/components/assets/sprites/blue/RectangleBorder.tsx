import { ComponentPropsWithoutRef } from "react";

import { ISpriteProps } from "@/components/assets/sprites/sprite-interface";

export const BlueRectangleBorder = ({ size, ...props }: ComponentPropsWithoutRef<"svg"> & ISpriteProps) => {
    return (
        <svg
            width={ (size && size * 192) || 192 }
            height={ (size && size * 63) || 64 }
            viewBox="0 0 192 64"
            preserveAspectRatio="xMidYMid"
            xmlSpace="preserve"
            { ...props }
        >
            <g>
                <path
                    stroke="none"
                    fill="#167DA8"
                    d="M0 58.25 L0 5.95 Q0.05 0 6 0 L186 0 Q192 0 192 5.95 L192 58.25 Q191.85 64 186 64 L6 64 Q0.15 64 0 58.25 M186.5 2.05 L6 2 5.9 2 5.4 2.05 Q2 2.3 2 5.95 L2 58 Q2 62 6 62 L186 62 Q190 62 190 58 L190 5.95 Q190 2.25 186.5 2.05"
                />
                <path
                    stroke="none"
                    fill="#36BDF7"
                    d="M186.5 2.05 Q190 2.25 190 5.95 L190 58 Q190 62 186 62 L6 62 Q2 62 2 58 L2 5.95 Q2 2.3 5.4 2.05 L5.9 2 6 2 186.5 2.05 M186.4 4.05 L6.1 4 5.6 4.05 5.55 4.05 Q4 4.2 4 5.95 L4 58 Q4 60 6 60 L186 60 Q188 60 188 58 L188 5.95 Q188 4.2 186.4 4.05"
                />
                <path
                    stroke="none"
                    fill="#1C9FD7"
                    d="M186.4 4.05 Q188 4.2 188 5.95 L188 58 Q188 60 186 60 L6 60 Q4 60 4 58 L4 5.95 Q4 4.2 5.55 4.05 L5.6 4.05 6.1 4 186.4 4.05 M6.3 6 L6 6.05 6 58 186 58 186 6.05 6.3 6"
                />
                <path stroke="none" fill="#FFFFFF" d="M6.3 6 L186 6.05 186 58 6 58 6 6.05 6.3 6 M184 8.05 L8 8 8 56 184 56 184 8.05" />
                <path stroke="none" fill="#DADCE7" d="M184 8.05 L184 56 8 56 8 8 184 8.05" />
            </g>
        </svg>
    );
};
