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
};

export default Icons;
