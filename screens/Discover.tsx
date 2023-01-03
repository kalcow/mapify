import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/colors';
import Satoshi from '../constants/Satoshi';


export default function Discover() {
    return (
        <View style={styles.container}>
            <Satoshi.Regular>Home</Satoshi.Regular>
            <StatusBar style="dark" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blackBase,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
