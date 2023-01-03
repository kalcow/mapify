import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';
import Colors from './colors';

type props = {
    focused: boolean;
    color: string;
    size: number;
};

//                    stroke={`${props.focused === true ? Colors.greyBackground : Colors.text}`}

const BottomTabIcons = {
    Map: (props: props) => {
        return (
            <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                <Path
                    d="M6.667 15L.833 18.333V5l5.834-3.333m0 13.333l6.666 3.333M6.667 15V1.667m6.666 16.666L19.167 15V1.667L13.333 5m0 13.333V5m0 0L6.667 1.667"
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
            <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                <Path
                    d="M10 18.333a8.333 8.333 0 100-16.666 8.333 8.333 0 000 16.666z"
                    stroke={props.color}                    
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M13.533 6.467l-1.766 5.3-5.3 1.766 1.766-5.3 5.3-1.766z"
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
            <Svg width={19} height={19} viewBox="0 0 19 19" fill="none">
                <Path
                    d="M1 1v16.67M5.903 1v16.67m4.903 0h6.864V3.942L10.806 1v16.67z"
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
            <Svg width={16} height={18} viewBox="0 0 16 18" fill="none">
                <Path
                    d="M14.667 16.5v-1.667a3.333 3.333 0 00-3.334-3.333H4.667a3.333 3.333 0 00-3.334 3.333V16.5m10-11.667a3.333 3.333 0 11-6.666 0 3.333 3.333 0 016.666 0z"
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
