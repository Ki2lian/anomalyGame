import { ComponentPropsWithoutRef } from "react";

import { ISpriteProps } from "@/components/assets/sprites/sprite-interface";

export const GreenRectangleDepthFlat = ({ size, ...props }: ComponentPropsWithoutRef<"svg"> & ISpriteProps) => {
    return (
        <svg
            width={ (size && size * 192) || 192 }
            height={ (size && size * 64) || 64 }
            viewBox="0 0 192 64"
            preserveAspectRatio="xMidYMid"
            xmlSpace="preserve"
            { ...props }
        >
            <g>
                <path
                    stroke="none"
                    fill="#029357"
                    d="M186.5 2.05 L6 2 5.9 2 5.4 2.05 Q2 2.3 2 5.95 L2 54 Q2 58 6 58 L186 58 Q190 58 190 54 L190 5.95 Q190 2.25 186.5 2.05 M0 54.25 L0 5.95 Q0.05 0 6 0 L186 0 Q192 0 192 5.95 L192 54.25 Q191.85 60 186 60 L6 60 Q0.15 60 0 54.25"
                />
                <path
                    stroke="none"
                    fill="#2FD792"
                    d="M186.4 4.05 L6.1 4 5.6 4.05 5.55 4.05 Q4 4.2 4 5.95 L4 54 Q4 56 6 56 L186 56 Q188 56 188 54 L188 5.95 Q188 4.2 186.4 4.05 M186.5 2.05 Q190 2.25 190 5.95 L190 54 Q190 58 186 58 L6 58 Q2 58 2 54 L2 5.95 Q2 2.3 5.4 2.05 L5.9 2 6 2 186.5 2.05"
                />
                <path
                    stroke="none"
                    fill="#16BB77"
                    d="M186.4 4.05 Q188 4.2 188 5.95 L188 54 Q188 56 186 56 L6 56 Q4 56 4 54 L4 5.95 Q4 4.2 5.55 4.05 L5.6 4.05 6.1 4 186.4 4.05"
                />
                <path
                    stroke="none"
                    fill="#046D41"
                    d="M192 54.25 L192 58 Q192 64 186 64 L6 64 Q0 64 0 58 L0 54.25 Q0.15 60 6 60 L186 60 Q191.85 60 192 54.25"
                />
            </g>
        </svg>
    );
};
