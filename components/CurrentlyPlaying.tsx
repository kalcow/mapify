import { View, StyleSheet, Image } from 'react-native';
import React, { FC } from 'react';
import Satoshi from '../constants/Satoshi';
import Colors from '../constants/Colors';
import useSWR from 'swr';
import { useUserState } from '../context/user';

const API_ENDPOINT = 'https://mapify-api-service.onrender.com/currently-playing';

interface CurrentlyPlaying {}

const CurrentlyPlaying: FC<CurrentlyPlaying> = () => {
    const u = useUserState();
    const fetcher = (url: RequestInfo | URL) =>
        fetch(url, { headers: { refresh_token: u.refreshToken!.spotify } }).then((r) => r.json());
    const { data, error } = useSWR(API_ENDPOINT, fetcher, { refreshInterval: 1000 });

    if (data === undefined) {
        return (
            <View>
                <Satoshi.Bold style={styles.title}>Loading</Satoshi.Bold>
            </View>
        );
    }

    if (data.isPlaying === false) {
        return (
            <View>
                <Satoshi.Bold style={styles.title}>
                    Looks like nothing is playing right now
                </Satoshi.Bold>
            </View>
        );
    }

    const artists: string = data.item.artists.map((_artist: any) => _artist.name).join(', ');
    // const artists = "Super long piece of text is long. The quick brown fox jumps over the lazy dog."

    return (
        <View style={styles.wrapper}>
            <Image
                style={{ width: 72, height: 72, borderRadius: 23 }}
                source={{ uri: data.item.album.images[0].url }}
            />
            <View style={styles.textWrapper}>
                <Satoshi.Bold style={styles.title}>{data.item.name}</Satoshi.Bold>
                <Satoshi.Bold style={styles.artists}>{artists}</Satoshi.Bold>
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
    },
    textWrapper: {
        flex: 1,
        paddingLeft: 11,
    },
    title: {
        color: Colors.text,
        fontSize: 12,
    },
    artists: {
        fontSize: 10,
        color: Colors.text,
    },
});
