import { Text } from "react-native";

interface SatoshiText {
    light: (props: Text['props']) => JSX.Element, 
    regular: (props: Text['props']) => JSX.Element, 
    medium: (props: Text['props']) => JSX.Element, 
    bold: (props: Text['props']) => JSX.Element, 
    black: (props: Text['props']) => JSX.Element, 
}

const Satoshi: SatoshiText = {
    light: (props: Text['props']) => {
        return <Text {...props} style={[props.style, { fontFamily: 'satoshi-light' }]} />;
    },
    regular: (props: Text['props']) => {
        return <Text {...props} style={[props.style, { fontFamily: 'satoshi-regular' }]} />;
    },
    medium: (props: Text['props']) => {
        return <Text {...props} style={[props.style, { fontFamily: 'satoshi-medium' }]} />;
    },
    bold: (props: Text['props']) => {
        return <Text {...props} style={[props.style, { fontFamily: 'satoshi-bold' }]} />;
    },
    black: (props: Text['props']) => {
        return <Text {...props} style={[props.style, { fontFamily: 'satoshi-black' }]} />;
    },
}

export default Satoshi; 