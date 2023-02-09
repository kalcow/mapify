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
import isExpoGo from '../../lib/isExpoGo';

type Props = {};

const Login = (props: Props) => {
    const u = useUserState();
    const authState = useAuthState();
    const navigator = useNavigation();
    const signInWithSpotify = async () => {
        const redirectUri = makeRedirectUri({
            native: 'mapify://auth',
            useProxy: isExpoGo ? true : false,
            scheme: 'mapify',
            path: '/auth',
        });

        console.log(redirectUri); 

        const signInParameters = {
            provider: 'spotify' as Provider,
            options: {
                redirectTo: redirectUri,
                scopes: [
                    'user-read-email',
                    'playlist-read-private',
                    'user-read-currently-playing',
                    'user-read-playback-state',
                    'user-modify-playback-state',
                    'user-read-recently-played', 
                ].join(' '),
            },
        };

        const authUrl = (await supabase.auth.signInWithOAuth(signInParameters)).data.url;
        console.log(authUrl)

        if (authUrl !== null) {
            //@ts-ignore
            const response = await startAsync({ authUrl, redirectUri });
            if (response.type == 'success') {
                console.log('success')
                console.log(response.url); 
                await Linking.openURL(response.url);
            } else {
                console.log('failed')
            }

            //@ts-ignore
            if (!response || !response.params?.refresh_token) {
                return;
            }

            // console.log("response", response);

            await AsyncStorage.setItem(
                '@spotify_refresh_token',
                //@ts-ignore
                response.params?.provider_refresh_token
            );

            const { data, error } = await supabase.auth.refreshSession({
                //@ts-ignore
                refresh_token: response.params.refresh_token,
            });

            const { session, user } = data;
            console.log('data', data);
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
