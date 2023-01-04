import type { Theme } from '@react-navigation/native/src/types';
import Colors from './Colors';

const DarkTheme: Theme = {
    dark: true,
    colors: {
        primary: 'rgb(10, 132, 255)',
        background: Colors.blackBase,
        card: 'rgb(18, 18, 18)',
        text: 'rgb(229, 229, 231)',
        border: 'rgb(39, 39, 41)',
        notification: 'rgb(255, 69, 58)',
    },
};

export default DarkTheme;
