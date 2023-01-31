import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import Colors from './colors';

const Icons = {
    RightArrow: (props: SvgProps) => (
        <Svg width={15} height={16} fill="none" {...props}>
            <Path
                d="m5.657 12.124 3.686-3.75-3.686-3.75"
                stroke={Colors.blackBase}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    ),
    DownChevron: (props: SvgProps) => (
        <Svg width={24} height={16} fill="none" {...props}>
            <Path
                d="m4 4 8 8 8-8"
                stroke="#E0E5EB"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    ),
    Analytics: (props: SvgProps) => (
        <Svg width={24} height={24} fill="none" {...props}>
            <Path
                d="M18 20V10M12 20V4M6 20v-6"
                stroke="#E0E5EB"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    ),
    shuffle: (props: SvgProps) => (
        <Svg width={24} height={24} fill="none" {...props}>
            <Path
                d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"
                stroke="#E0E5EB"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    ),
    skipBack: (props: SvgProps) => (
        <Svg width={24} height={24} fill="none" {...props}>
            <Path
                d="M19 20 9 12l10-8v16Z"
                fill="#E0E5EB"
                stroke="#E0E5EB"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M5 19V5"
                stroke="#E0E5EB"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    ),
    skipForward: (props: SvgProps) => (
        <Svg width={24} height={24} fill="none" {...props}>
            <Path
                d="m5 4 10 8-10 8V4Z"
                fill="#E0E5EB"
                stroke="#E0E5EB"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M19 5v14"
                stroke="#E0E5EB"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    ),
    repeat: (props: SvgProps) => (
        <Svg width={24} height={24} fill="none" {...props}>
            <Path
                d="m17 1 4 4-4 4"
                stroke="#E0E5EB"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4"
                stroke="#E0E5EB"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M21 13v2a4 4 0 0 1-4 4H3"
                stroke="#E0E5EB"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    ),
};

export default Icons;
