import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import Satoshi from '../../constants/Satoshi';
import Button from '../../components/Button';
import ScreenWrapper from '../../components/ScreenWrapper';
import { supabase } from '../../supabase/supabase';
import { startAsync, makeRedirectUri } from 'expo-auth-session';
import * as Linking from 'expo-linking';
import { Provider } from '@supabase/supabase-js';
import { useNavigation } from '@react-navigation/native';
import { useUserState } from '../../context/user';
import { useAuthState } from '../../hooks/useAuthState';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {};

const Login = (props: Props) => {
    const u = useUserState(); 
    const authState = useAuthState(); 
    const navigator = useNavigation();
    const signInWithSpotify = async () => {
        const returnUrl = makeRedirectUri({
            useProxy: false,
        });
        
        const signInParameters = {
            provider: 'spotify' as Provider,
            options: {
                redirectTo: returnUrl,
                scopes: [
                    'user-read-email',
                    'playlist-read-private',
                    'user-read-currently-playing',
                    'user-read-playback-state', 
                    'user-modify-playback-state', 
                ].join(' '),
            },
        };


        const authUrl = (await supabase.auth.signInWithOAuth(signInParameters)).data.url;

        if (authUrl !== null) {
            const response = await startAsync({ authUrl, returnUrl });
            if (response.type == 'success') {
                await Linking.openURL(response.url);
            }

            //@ts-ignore
            if (!response || !response.params?.refresh_token) {
                return;
            }

            console.log("response", response); 

            //@ts-ignore
            await AsyncStorage.setItem('@spotify_refresh_token', response.params?.provider_refresh_token)

            const { data, error } = await supabase.auth.refreshSession({
                //@ts-ignore
                refresh_token: response.params.refresh_token,
            });

            const { session, user } = data;
            console.log("data", data);
            u.session?.set(JSON.stringify(session)); 

        }
    };

    useEffect(() => {
        supabase.auth
            .getSession()
            .then((data) => {
                if (data.data.session !== null) {
                    navigator.navigate('HomeTabs' as never, {} as never);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [authState]);

    return (
        <ScreenWrapper>
            <Satoshi.Regular style={{ color: 'white' }}>Login</Satoshi.Regular>
            <Button
                text="Login with Spotify"
                onPress={() => {
                    signInWithSpotify();
                }}>
                {/* <Icons.RightArrow /> */}
            </Button>
        </ScreenWrapper>
    );
};

export default Login;
