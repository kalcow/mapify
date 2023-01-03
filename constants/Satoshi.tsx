import { Text } from "react-native";

interface SatoshiText {
    Light: (props: Text['props']) => JSX.Element, 
    Regular: (props: Text['props']) => JSX.Element, 
    Medium: (props: Text['props']) => JSX.Element, 
    Bold: (props: Text['props']) => JSX.Element, 
    Black: (props: Text['props']) => JSX.Element, 
}

const Satoshi: SatoshiText = {
    Light: (props: Text['props']) => {
        return <Text {...props} style={[props.style, { fontFamily: 'satoshi-light' }]} />;
    },
    Regular: (props: Text['props']) => {
        return <Text {...props} style={[props.style, { fontFamily: 'satoshi-regular' }]} />;
    },
    Medium: (props: Text['props']) => {
        return <Text {...props} style={[props.style, { fontFamily: 'satoshi-medium' }]} />;
    },
    Bold: (props: Text['props']) => {
        return <Text {...props} style={[props.style, { fontFamily: 'satoshi-bold' }]} />;
    },
    Black: (props: Text['props']) => {
        return <Text {...props} style={[props.style, { fontFamily: 'satoshi-black' }]} />;
    },
}

export default Satoshi; 