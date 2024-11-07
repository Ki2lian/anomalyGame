import { ComponentPropsWithoutRef } from "react";

import { IIconProps } from "@/components/assets/icons/icon-interface";

export const XboxLeftAnalogTop = ({ size = 35, ...props }: ComponentPropsWithoutRef<"svg"> & IIconProps) => {
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
                <clipPath id="clip-button_xbox_analog_l_direction_1">
                    <rect width="120" height="120"/>
                </clipPath>
            </defs>
            <g id="button_xbox_analog_l_direction_1" clipPath="url(#clip-button_xbox_analog_l_direction_1)">
                <g id="Border_white_-_outer" data-name="Border white - outer" transform="translate(110 110) rotate(180)">
                    <g id="Border_white_-_outer-2" data-name="Border white - outer" fill="none" stroke="#fff" strokeWidth="4">
                        <circle cx="50" cy="50" r="50" stroke="none"/>
                        <circle cx="50" cy="50" r="48" fill="none"/>
                    </g>
                </g>
                <g id="Border_white_-_inner" data-name="Border white - inner" transform="translate(102 94) rotate(180)">
                    <g id="Border_white_-_inner-2" data-name="Border white - inner" fill="none" stroke="#fff" strokeWidth="4">
                        <circle cx="42" cy="42" r="42" stroke="none"/>
                        <circle cx="42" cy="42" r="44" fill="none"/>
                    </g>
                </g>
                <g id="Button_-_Base" data-name="Button - Base" transform="translate(106 106) rotate(180)">
                    <g id="Button_-_Base-2" data-name="Button - Base" fill="#404040" stroke="#2a2a2a" strokeWidth="8">
                        <circle cx="46" cy="46" r="46" stroke="none"/>
                        <circle cx="46" cy="46" r="42" fill="none"/>
                    </g>
                </g>
                <g id="Button_-_Top" data-name="Button - Top" transform="translate(102 94) rotate(180)">
                    <g id="Button_-_Top-2" data-name="Button - Top" fill="#404040">
                        <path d="M 42 82 C 36.59915161132813 82 31.36092567443848 80.94268798828125 26.43081283569336 78.857421875 C 21.66787528991699 76.84287261962891 17.38990020751953 73.95845031738281 13.71572494506836 70.28427124023438 C 10.04154968261719 66.61009979248047 7.157124996185303 62.33212661743164 5.142574787139893 57.56918716430664 C 3.057312488555908 52.63907623291016 2 47.40084838867188 2 42 C 2 31.40740013122559 6.163750171661377 21.35947418212891 13.72426223754883 13.70715045928955 C 17.32125091552734 10.0654125213623 21.56393814086914 7.1932373046875 26.33467483520508 5.170199871063232 C 31.29537582397461 3.066612482070923 36.56594848632813 2 42 2 C 47.40084838867188 2 52.63907623291016 3.057312488555908 57.56918716430664 5.142574787139893 C 62.33212661743164 7.157124996185303 66.61009979248047 10.04154968261719 70.28427124023438 13.71572494506836 C 73.95845031738281 17.38990020751953 76.84287261962891 21.66787528991699 78.857421875 26.43081283569336 C 80.94268798828125 31.36092567443848 82 36.59915161132813 82 42 C 82 47.40084838867188 80.94268798828125 52.63907623291016 78.857421875 57.56918716430664 C 76.84287261962891 62.33212661743164 73.95845031738281 66.61009979248047 70.28427124023438 70.28427124023438 C 66.61009979248047 73.95845031738281 62.33212661743164 76.84287261962891 57.56918716430664 78.857421875 C 52.63907623291016 80.94268798828125 47.40084838867188 82 42 82 Z" stroke="none"/>
                        <path d="M 42 4 C 36.83570098876953 4 31.82782745361328 5.013214111328125 27.11547088623047 7.011482238769531 C 22.58637237548828 8.932060241699219 18.55973052978516 11.65758514404297 15.14697265625 15.11280059814453 C 11.62004089355469 18.68257141113281 8.864845275878906 22.78442764282227 6.957901000976563 27.304443359375 C 4.995185852050781 31.95664215087891 4 36.90092849731445 4 42 C 4 47.13172912597656 5.004158020019531 52.10782623291016 6.984588623046875 56.79008483886719 C 8.898300170898438 61.31462860107422 11.63880157470703 65.37891387939453 15.12994384765625 68.87005615234375 C 18.62108612060547 72.36119842529297 22.68537139892578 75.10169982910156 27.20991516113281 77.01541137695313 C 31.89216995239258 78.99584197998047 36.86827087402344 80 42 80 C 47.13172912597656 80 52.10782623291016 78.99584197998047 56.79008483886719 77.01541137695313 C 61.31462860107422 75.10169982910156 65.37891387939453 72.36119842529297 68.87005615234375 68.87005615234375 C 72.36119842529297 65.37891387939453 75.10169982910156 61.31462860107422 77.01541137695313 56.79008483886719 C 78.99584197998047 52.10782623291016 80 47.13172912597656 80 42 C 80 36.86827087402344 78.99584197998047 31.89216995239258 77.01541137695313 27.20991516113281 C 75.10169982910156 22.68537139892578 72.36119842529297 18.62108612060547 68.87005615234375 15.12994384765625 C 65.37891387939453 11.63880157470703 61.31462860107422 8.898300170898438 56.79008483886719 6.984588623046875 C 52.10782623291016 5.004158020019531 47.13172912597656 4 42 4 M 42 0 C 65.19595336914063 0 84 18.80404663085938 84 42 C 84 65.19595336914063 65.19595336914063 84 42 84 C 18.80404663085938 84 0 65.19595336914063 0 42 C 0 30.494873046875 4.626045227050781 20.07021331787109 12.30152893066406 12.30149841308594 C 19.73397064208984 4.776588439941406 30.30916976928711 0 42 0 Z" stroke="none" fill="#5b5b5b"/>
                    </g>
                </g>
                <g id="Button_-_Top_Alt" data-name="Button - Top Alt" transform="translate(102 94) rotate(180)">
                    <g id="Button_-_Top-3" data-name="Button - Top" fill="#5b5b5b" stroke="#404040" strokeWidth="12">
                        <circle cx="42" cy="42" r="42" stroke="none"/>
                        <circle cx="42" cy="42" r="36" fill="none"/>
                    </g>
                </g>
                <g id="Component_12_12" data-name="Component 12 – 12" transform="translate(24 16)">
                    <g id="Ellipse_41" data-name="Ellipse 41" transform="translate(30)" fill="#404040" stroke="#404040" strokeWidth="4">
                        <circle cx="6" cy="6" r="6" stroke="none"/>
                        <circle cx="6" cy="6" r="4" fill="none"/>
                    </g>
                    <g id="Ellipse_44" data-name="Ellipse 44" transform="translate(30 60)" fill="#404040" stroke="#404040" strokeWidth="4">
                        <circle cx="6" cy="6" r="6" stroke="none"/>
                        <circle cx="6" cy="6" r="4" fill="none"/>
                    </g>
                    <g id="Ellipse_42" data-name="Ellipse 42" transform="translate(0 30)" fill="#404040" stroke="#404040" strokeWidth="4">
                        <circle cx="6" cy="6" r="6" stroke="none"/>
                        <circle cx="6" cy="6" r="4" fill="none"/>
                    </g>
                    <g id="Ellipse_43" data-name="Ellipse 43" transform="translate(60 30)" fill="#404040" stroke="#404040" strokeWidth="4">
                        <circle cx="6" cy="6" r="6" stroke="none"/>
                        <circle cx="6" cy="6" r="4" fill="none"/>
                    </g>
                </g>
                <g id="Group_5" data-name="Group 5" transform="translate(120 120) rotate(180)">
                    <g id="Group_3" data-name="Group 3">
                        <path id="Intersection_3" data-name="Intersection 3" d="M-42.413-398.915A37.826,37.826,0,0,1-22-404.858a37.824,37.824,0,0,1,20.413,5.943L-22-378.5Z" transform="translate(82 426.858)" fill="#fff"/>
                        <circle id="Border_white_-_inner-3" data-name="Border white - inner" cx="50" cy="50" r="50" transform="translate(10 10)" fill="none"/>
                    </g>
                    <path id="Intersection_4" data-name="Intersection 4" d="M-32-404v-19.385A38.771,38.771,0,0,1-18-426a38.771,38.771,0,0,1,14,2.615V-404Z" transform="translate(78 436)" fill="#fff"/>
                </g>
                <path id="Path_62" data-name="Path 62" d="M-7.705,0V-28.555H-1.65V-5H9.932V0Z" transform="translate(60 66)" fill="#fff"/>
            </g>
        </svg>
    );
};