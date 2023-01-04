import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

type props = {
    focused: boolean;
    color: string;
};

//                    stroke={`${props.focused === true ? Colors.greyBackground : Colors.text}`}

const BottomTabIcons = {
    Map: (props: props) => {
        return (
            <Svg width={22} height={20} fill="none">
                <Path
                    d="M7.3 15.4 1 19V4.6L7.3 1m0 14.4 7.2 3.6m-7.2-3.6V1m7.2 18 6.3-3.6V1l-6.3 3.6m0 14.4V4.6m0 0L7.3 1"
                    stroke={props.color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
        );
    },
    Compass: (props: props) => {
        return (
            <Svg width={20} height={20} fill="none">
                <Path
                    d="M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
                    stroke={props.color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="m13.816 6.184-1.908 5.724-5.724 1.908 1.908-5.724 5.724-1.908Z"
                    stroke={props.color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
        );
    },
    Home: (props: props) => {
        return (
            <Svg width={18} height={20} viewBox="0 0 18 20" fill="none">
                <Path
                    d="M6.5 18.333V10h5v8.333M1.5 7.5L9 1.667 16.5 7.5v9.167a1.667 1.667 0 01-1.667 1.666H3.167A1.667 1.667 0 011.5 16.667V7.5z"
                    stroke={props.color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
        );
    },
    Library: (props: props) => {
        return (
            <Svg width={20} height={20} fill="none">
                <Path
                    d="M1 1v18M6.294 1v18m5.294 0H19V4.176L11.588 1v18Z"
                    stroke={props.color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
        );
    },
    User: (props: props) => {
        return (
            <Svg width={18} height={20} fill="none">
                <Path
                    d="M17 19v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M13 5a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                    stroke={props.color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
        );
    },
};

export default BottomTabIcons;
