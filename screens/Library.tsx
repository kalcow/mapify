import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/colors';
import Satoshi from '../constants/Satoshi';
import useSWR from 'swr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';

export default function Library() {

    return (
        <View style={styles.container}>
            <Satoshi.Regular style={{ color: 'white' }}>Library</Satoshi.Regular>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blackBase,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
