import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/colors';
import Satoshi from '../constants/Satoshi';
import useSWR from 'swr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';

import BottomTabIcons from '../constants/BottomTabIcons';

export default function Library() {
    return (
        <View style={styles.container}>
            <Satoshi.Bold style={styles.title}>Your Library</Satoshi.Bold>
            <Satoshi.Regular style={{ color: 'white' }}>Library</Satoshi.Regular>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 100, // safe space needed / hard coding it rn
        flex: 1,
        backgroundColor: Colors.blackBase,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
    },
    title: {
        color: 'white',
        fontSize: 35,
    },
});
