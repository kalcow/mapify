import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/colors';
import Satoshi from '../constants/Satoshi';


export default function Library() {
    return (
        <View style={styles.container}>
            <Satoshi.Regular>Library</Satoshi.Regular>
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
