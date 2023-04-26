import { StatusBar } from 'expo-status-bar';
import React, { FC, useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Dimensions,
} from 'react-native';

import Animated, {
    Layout,
    SlideInRight,
    SlideOutRight,
    SlideInLeft,
    SlideOutLeft,
} from 'react-native-reanimated';

import Colors from '../../constants/colors';
import Satoshi from '../../constants/Satoshi';
import useSWR from 'swr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';
import { LinearGradient } from 'expo-linear-gradient';
import ImageColors from 'react-native-image-colors';

import SpotifyActions from '../../lib/spotify';

import { useUserState } from '../../context/user';
const API_ENDPOINT = 'https://mapify-server.fly.dev/player';

import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

export default function SongPage(state, navigation) {
    const u = useUserState();
    const fetcher = (url: RequestInfo | URL) =>
        fetch(url, { headers: { access_token: u.accessToken!.spotify } }).then((r) => r.json());

    const nav = useNavigation();
    const route = useRoute();
    const data = JSON.parse(route.params?.info);
    const [dominantColor, setDominantColor] = useState<string | undefined>('#000');

    useEffect(() => {
        const getColors = () => {
            ImageColors.getColors(data.images[0].url, {
                fallback: '#00008B',
                cache: false,
                key: 'unique_key',
                headers: {
                    authorization: 'Basic 123',
                },
            }).then((result) => {
                // console.log(result);
                let primaryColor;
                switch (result.platform) {
                    case 'android':
                        // android result properties
                        primaryColor = result.vibrant;
                        setDominantColor(primaryColor);
                        break;
                    case 'web':
                        // web result properties
                        primaryColor = result.lightVibrant;
                        setDominantColor(primaryColor);
                        break;
                    case 'ios':
                        // iOS result properties
                        primaryColor = result.detail;
                        setDominantColor(primaryColor);
                        break;
                    default:
                        throw new Error('Unexpected platform key');
                }
            });
        };

        getColors();
    }, [data]);

    React.useEffect(() => {
        nav.setOptions({
            headerShown: true,
            headerTransparent: true,
        });
    }, navigation);

    const playTrack = (uri: string) => {
        SpotifyActions.playTrack(u.accessToken!.spotify, uri).then((r) => {
            //console.log('success: ' + uri + ' ' + JSON.stringify(r));
        });
    };

    const SongListhead = () => {
        return (
            <View style={styles.header}>
                <Gradient></Gradient>
                <Image
                    style={[
                        {
                            width: '66%',
                            aspectRatio: 1,
                            borderRadius: 8,
                            alignSelf: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 5 },
                            shadowOpacity: 0.8,
                            shadowRadius: 5,
                        },
                        // style,
                    ]}
                    source={{ uri: data.images[0].url }}
                />
                <Satoshi.Bold style={styles.title}>{data.name}</Satoshi.Bold>
                <Satoshi.Medium style={styles.artist}>
                    {data.artists[0].name} · {data.release_date.substring(0, 4)}
                </Satoshi.Medium>
            </View>
        );
    };
    const Gradient = () => {
        return (
            <LinearGradient colors={[dominantColor, Colors.blackBase]} style={styles.colorBlock} />
        );
    };

    const SongListCon = () => {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.flatlist}
                    contentContainerStyle={{ paddingBottom: 300 }}
                    ListHeaderComponent={SongListhead}
                    ListFooterComponent={
                        <View style={styles.footer}>
                            <Satoshi.Regular style={styles.footerText}>
                                {data.total_tracks} song{data.total_tracks < 2 ? '' : 's'} ·{' '}
                                {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
                            </Satoshi.Regular>
                            <Satoshi.Regular style={styles.footerText}>
                                {data.copyrights[0].text}
                            </Satoshi.Regular>
                        </View>
                    }
                    showsVerticalScrollIndicator={false}
                    data={data.tracks.items}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={styles.songButton}
                            onPress={() => {
                                //console.log(item.uri);
                                playTrack(item.uri);
                            }}>
                            <Satoshi.Medium style={styles.number}>{index + 1}.</Satoshi.Medium>
                            <Satoshi.Regular numberOfLines={1} style={styles.songName}>
                                {item.name}
                            </Satoshi.Regular>
                            <Satoshi.Medium style={styles.time}>
                                {Math.floor((item.duration_ms / 1000 / 60) << 0)}:
                                {Math.floor((item.duration_ms / 1000) % 60)}
                            </Satoshi.Medium>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    };

    return (
        <View>
            <SongListCon />
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        marginTop: 30,
        textAlign: 'center',
        width: '100%',
    },
    footerText: {
        width: 350,
        textAlign: 'center',
        color: 'grey',
        opacity: 0.8,
        alignSelf: 'center',
        marginBottom: 10,
    },
    number: {
        color: Colors.accentColor,
        fontSize: 16,
        marginRight: 10,
    },
    header: {
        marginTop: 100,
    },
    time: {
        color: 'grey',
        opacity: 0.8,
        textAlign: 'right',
    },
    songButton: {
        width: '90%',
        maxWidth: '90%',
        alignSelf: 'center',
        paddingVertical: 13,
        paddingHorizontal: 15,
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
        borderRadius: 10,
        marginVertical: 7,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    songName: {
        color: Colors.text,
        fontSize: 16,
        width: '80%',
    },
    flatlist: {
        paddingHorizontal: 0,
        height: '100%',
    },
    colorBlock: {
        height: 750,
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        top: '-100%',
        left: 0,
        right: 0,
    },
    container: {
        paddingTop: 0,
    },
    title: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
        marginTop: 30,
    },
    artist: {
        color: 'white',
        opacity: 0.7,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 30,
    },
});
