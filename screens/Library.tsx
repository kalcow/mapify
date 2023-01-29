import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/colors';
import Satoshi from '../constants/Satoshi';
import useSWR from 'swr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';

export default function Library() {
    const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json());
    let { data } = useSWR('https://kalyankaramsetty.dev/api/nowplaying', fetcher, {
        refreshInterval: 1000,
    });

    const getToken = async () => {
        const value = await AsyncStorage.getItem('@spotify_refresh_token');
        if (value !== null) {
            alert(value); 
        }
    };

    return (
        <View style={styles.container}>
            <Satoshi.Regular style={{ color: 'white' }}>Library</Satoshi.Regular>
            <Button text='Get Refresh Token' onPress={() => {getToken()}}></Button>
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
