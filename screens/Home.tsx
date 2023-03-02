import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import Globe from '../components/Globe';
import Colors from '../constants/colors';
import Satoshi from '../constants/Satoshi';
import { supabase } from '../supabase/supabase';

export default function Home() {
    const navigation = useNavigation();
    const SignOutOfSpotify = async () => {
        const { error } = await supabase.auth.signOut();

        if (error !== null) alert(error);

        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' as never }],
        });
    };

    const getToken = async () => {
        const value = await AsyncStorage.getItem('@spotify_refresh_token');
        if (value !== null) {
            console.log(value); 
        }
    };

    return (
        <View style={styles.container}>
            <Satoshi.Regular style={{ color: 'white' }}>Home</Satoshi.Regular>
            <Button text="Sign Out" onPress={() => SignOutOfSpotify()}></Button>
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
