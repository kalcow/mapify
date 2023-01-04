import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import Satoshi from '../constants/Satoshi';


export default function Home() {
    return (
        <View style={styles.container}>
            <Satoshi.Regular style={{color: 'white'}}>Home</Satoshi.Regular>
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
