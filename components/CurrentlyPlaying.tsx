import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { FC, useEffect } from 'react';
import Satoshi from '../constants/Satoshi';
import Colors from '../constants/Colors';
import useSWR from 'swr';
import { useUserState } from '../context/user';
import ms_to_string from '../lib/ms_to_string';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const API_ENDPOINT = 'https://mapify-api-service.onrender.com/player';

interface CurrentlyPlaying {}

const CurrentlyPlaying: FC<CurrentlyPlaying> = () => {
    const u = useUserState();
    const fetcher = (url: RequestInfo | URL) =>
        fetch(url, { headers: { refresh_token: u.refreshToken!.spotify } }).then((r) => r.json());
    const { data, error } = useSWR(API_ENDPOINT, fetcher, { refreshInterval: 1000 });
    const w = useSharedValue(0);

    useEffect(() => {
        if (data !== undefined && data.player_available) {
            w.value = (data.progress_ms / data.item.duration_ms) * 100;
        }
    }, [data]);

    const animatedWidth = useAnimatedStyle(() => {
        return {
            width: withTiming(`${w.value}%`, {
                duration: 3000,
            }),
        };
    }, [data]);

    if (data === undefined) {
        return (
            <View>
                <Satoshi.Bold style={styles.title}>Loading</Satoshi.Bold>
            </View>
        );
    }

    if (data.player_available === false) {
        return (
            <View>
                <Satoshi.Bold style={styles.title}>
                    Looks like nothing is playing right now
                </Satoshi.Bold>
            </View>
        );
    }

    const pause = async () => {
        console.log('hello')
        // const data = {
        //     grant_type: 'refresh_token',
        //     refresh_token: u.refreshToken!.spotify,
        // };
        // axios
        //     .post(TOKEN_ENDPOINT, data, {
        //         headers: {
        //             Authorization: `Basic ${basic}`,
        //             'Content-Type': 'application/x-www-form-urlencoded',
        //         },
        //     })
        //     .then((response) => {
        //         const { access_token } = response.data;
        //         fetch('https://api.spotify.com/v1/me/player/pause', {
        //             method: 'PUT',
        //             headers: {
        //                 Accept: 'application/json',
        //                 'Content-Type': 'application/json',
        //                 Authorization: `Bearer ${access_token}`,
        //             },
        //         }).then(() => alert('hello'));
        //     });
        const response = await fetch('https://mapify-api-service.onrender.com/player', {
            method: 'get',
            headers: {
                refresh_token: u.refreshToken!.spotify,
            },
        });
        // console.log(response);
        console.log('hello again')
    };

    const artists: string = data.item.artists.map((_artist: any) => _artist.name).join(', ');

    return (
        <View style={styles.wrapper}>
            <Image
                style={{ width: 72, height: 72, borderRadius: 23, marginRight: 11 }}
                source={{ uri: data.item.album.images[0].url }}
            />
            <View style={styles.textWrapper}>
                <View style={styles.textContainer}>
                    <View>
                        <Satoshi.Bold numberOfLines={1} style={styles.title}>
                            {data.item.name}
                            <Satoshi.Bold style={styles.artists}> • {artists}</Satoshi.Bold>
                        </Satoshi.Bold>
                        <View style={styles.device}>
                            <Svg width={9} height={11} style={{ marginRight: 3 }} fill="none">
                                <Path
                                    d="M4.5 2.8h.004M1.875 1h5.25c.483 0 .875.403.875.9v7.2c0 .497-.392.9-.875.9h-5.25A.888.888 0 0 1 1 9.1V1.9c0-.497.392-.9.875-.9ZM6.25 6.4c0 .994-.784 1.8-1.75 1.8s-1.75-.806-1.75-1.8.784-1.8 1.75-1.8 1.75.806 1.75 1.8Z"
                                    stroke="#C2C8D7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </Svg>
                            <Satoshi.Medium style={styles.artists}>
                                {data.device.name}
                            </Satoshi.Medium>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.playButton}
                        onPress={() => {
                            pause();
                        }}>
                        <Svg width={14} height={16} fill="none">
                            <Path
                                d="M.857 1.233a1 1 0 0 1 1.53-.848l10.828 6.767a1 1 0 0 1 0 1.696L2.387 15.615a1 1 0 0 1-1.53-.848V1.233Z"
                                fill="#1D1E24"
                            />
                        </Svg>
                    </TouchableOpacity>
                </View>
                <View style={styles.progressSectionWrapper}>
                    <View style={styles.progressBarWrapper}>
                        <Animated.View style={[styles.progressBarCurrent, animatedWidth]} />
                    </View>
                    <Satoshi.Regular style={styles.timeStamp}>
                        {ms_to_string(data.progress_ms)}
                    </Satoshi.Regular>
                </View>
            </View>
        </View>
    );
};

export default CurrentlyPlaying;

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
    },
    textWrapper: {
        flex: 1,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 42,
        position: 'relative',
    },
    title: {
        color: Colors.text,
        fontSize: 12,
    },
    artists: {
        fontSize: 12,
        color: '#C2C8D7',
    },
    progressSectionWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    timeStamp: {
        fontSize: 10,
        color: Colors.text,
        letterSpacing: 1.2,
        width: 40,
        textAlign: 'right',
    },
    progressBarWrapper: {
        position: 'relative',
        backgroundColor: '#C2C8D7',
        flex: 1,
        height: 4,
        borderRadius: 10,
        overflow: 'hidden',
    },
    progressBarCurrent: {
        position: 'absolute',
        backgroundColor: '#2876F6',
        top: 0,
        bottom: 0,
        left: 0,
    },
    playButton: {
        borderRadius: 20,
        width: 36,
        height: 36,
        backgroundColor: '#2876F6',
        position: 'absolute',
        right: 0,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 1,
        zIndex: 1000,
    },
    device: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 2,
    },
});
