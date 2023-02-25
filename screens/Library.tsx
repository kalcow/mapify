import { StatusBar } from 'expo-status-bar';
import React, { FC, useState } from 'react';
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

import Colors from '../constants/colors';
import Satoshi from '../constants/Satoshi';
import useSWR from 'swr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';

import SpotifyActions from '../lib/spotify';

import { useUserState } from '../context/user';
const API_ENDPOINT = 'https://mapify-server.fly.dev/player';

import { useNavigation } from '@react-navigation/native';

import BottomTabIcons from '../constants/BottomTabIcons';

export default function Library(state, navigation) {
    const libraryData = [
        {
            key: 'Kids Sees Ghosts',
            subText: 'Kanye West',
            url: 'https://e.snmc.io/i/1200/s/403d180c0c5885aaa34dfe48f8a41b27/7562716',
        },
        {
            key: 'Ctrl',
            subText: 'SZA',
            url: 'https://media.npr.org/assets/img/2017/06/09/sza_sq-5a43e9b7680aaeed2dddc3dd6a648ae3d986c8ea-s800-c85.jpg',
        },
        {
            key: 'Harverd Dropout',
            subText: 'Lil Pump',
            url: 'https://media.pitchfork.com/photos/5c673ed4817ba43f155f4ed0/1:1/w_600/harverd%20dropout_lil%20pump.jpg',
        },
        {
            key: 'reputation',
            subText: 'Taylor Swift',
            url: 'https://imageio.forbes.com/blogs-images/brittanyhodak/files/2017/08/20988198_10154975234150369_1493436770276743217_o-1200x1200.jpg?format=jpg&width=1200',
        },
        {
            key: 'What Could Possibly Go...',
            subText: 'Dominic Fike',
            url: 'https://media.pitchfork.com/photos/5f3171dc4a81119dc842fba1/1:1/w_600/What%20Could%20Possibly%20Go%20Wrong_dominic%20fike.jpg',
        },
        {
            key: 'Currents (From Ben)',
            subText: 'Tame Impala',
            url: 'https://media.pitchfork.com/photos/5929ae46c0084474cd0c188c/1:1/w_600/04192b63.jpg',
        },
    ];

    // Fetching saved album and playlist data from ENDPOINT

    const u = useUserState();
    const fetcher = (url: RequestInfo | URL) =>
        fetch(url, { headers: { access_token: u.accessToken!.spotify } }).then((r) => r.json());
    //const { data, error, mutate } = useSWR(API_ENDPOINT, fetcher, { refreshInterval: 500 });

    // Right now using My Data in a JSON
    const data = require('../assets/fakeAlbumData.json');

    // Loading Library and Error Checking
    const load = true;
    const [viewState, setViewState] = useState('Grid'); // Grid or List View
    const [modal, setModal] = useState([]);

    // Error Screen if fetch unsuccessful

    if (!load || data == undefined) {
        return (
            <View style={styles.container}>
                <Satoshi.Bold style={styles.title}>Your Library</Satoshi.Bold>
                <Satoshi.Regular style={{ color: 'white' }}>ERROR LOADING LIBRARY</Satoshi.Regular>
            </View>
        );
    }

    // When we click on a track
    const playTrack = (uri: string) => {
        SpotifyActions.playSong(u.accessToken!.spotify, uri).then((r) => {
            //console.log('success: ' + uri);
        });
    };

    interface SongListModal {
        modalVisible: boolean;
    }

    const SongListModal = (album_id: string, album: JSON) => {
        let ScreenHeight = Dimensions.get('window').height;

        console.log(album);

        var songs;

        SpotifyActions.getAlbumSongs(u.accessToken!.spotify, album_id).then((data) => {
            songs = data.items;
        });

        return (
            <Animated.View
                entering={SlideInRight}
                exiting={SlideOutRight}
                style={{ ...styles.modalThing, height: ScreenHeight }}>
                <View style={styles.modalWrapper}>
                    <View style={styles.modal}>
                        <Satoshi.Bold style={styles.title}>Album Name</Satoshi.Bold>
                        <TouchableOpacity
                            onPress={() => {
                                setModal([]);
                            }}>
                            <Satoshi.Bold style={{ color: 'white' }}>Close</Satoshi.Bold>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        );
    };

    const nav = useNavigation();

    const showModal = (uri: string, album: JSON) => {
        console.log(album);
        setModal(<SongListModal URI={uri} album={album} />);
    };

    const LibraryHeader = () => {
        return (
            <View style={styles.libraryHeader}>
                <Satoshi.Black style={styles.title}>Your Library</Satoshi.Black>
                <TextInput placeholder="Search" style={styles.searchBar}></TextInput>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.sortBar}>
                    <TouchableOpacity style={styles.sortButtonSelected}>
                        <Satoshi.Medium style={{ color: 'black', fontSize: 16 }}>
                            Albums
                        </Satoshi.Medium>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sortButton}>
                        <Satoshi.Medium style={{ color: 'white', fontSize: 16 }}>
                            Playlists
                        </Satoshi.Medium>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sortButton}>
                        <Satoshi.Medium style={{ color: 'white', fontSize: 16 }}>
                            Recently Played
                        </Satoshi.Medium>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sortButton}>
                        <Satoshi.Medium style={{ color: 'white', fontSize: 16 }}>
                            Top Tracks
                        </Satoshi.Medium>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    };

    const LibraryCon = () => {
        return (
            <View style={styles.container}>
                {modal}
                <View style={styles.libraryView}>
                    <FlatList
                        ListHeaderComponent={LibraryHeader}
                        stickyHeaderIndices={[0]}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        contentContainerStyle={{ paddingBottom: 300 }}
                        numColumns={2}
                        style={styles.libraryList}
                        data={data.items}
                        renderItem={({ item }) => (
                            <View style={styles.libraryItem}>
                                <TouchableOpacity
                                    onPress={() => {
                                        showModal(item.album.id, item.album);
                                        playTrack(item.album.uri);
                                    }}>
                                    <Image
                                        style={[
                                            {
                                                width: '100%',
                                                aspectRatio: 1,
                                                borderRadius: 8,
                                            },
                                            // style,
                                        ]}
                                        source={{ uri: item.album.images[0].url }}
                                    />
                                    <Satoshi.Medium
                                        style={{
                                            color: 'white',
                                            fontSize: 15,
                                            textAlign: 'left',
                                            paddingTop: 10,
                                        }}>
                                        {item.album.name}
                                    </Satoshi.Medium>
                                    <Satoshi.Regular
                                        style={{
                                            color: '#969696',
                                            fontSize: 15,
                                            textAlign: 'left',
                                            paddingVertical: 1,
                                            paddingBottom: 10,
                                        }}>
                                        {item.album.artists[0].name}
                                    </Satoshi.Regular>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            </View>
        );
    };

    return (
        <View>
            <LibraryCon />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 75, // safe space needed / hard coding it rn
        flex: 1,
        backgroundColor: Colors.blackBase,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingHorizontal: 0,
    },
    libraryHeader: {
        backgroundColor: Colors.blackBase,
    },
    title: {
        color: 'white',
        fontSize: 25,
        marginBottom: 15,
    },

    libraryView: {
        width: '100%',
    },

    libraryList: {
        height: 'auto',
        minHeight: 720,
        width: '100%',
        maxWidth: '100%',
        paddingBottom: 500,
        paddingHorizontal: 10,
    },
    libraryItem: {
        maxWidth: '48%',
        height: 'auto',
        alignItems: 'center',
        paddingBottom: 10,
    },
    searchBar: {
        color: '#999EA4',
        borderColor: '',
        borderWidth: 2,
        padding: 10,
        fontSize: 15,
        borderRadius: 8,
        backgroundColor: '#1D1E24',
    },
    sortBar: {
        marginVertical: 10,
        marginBottom: 20,
    },
    sortButton: {
        backgroundColor: '#1D1E24',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 8,
        marginRight: 10,
    },
    sortButtonSelected: {
        backgroundColor: '#E0E5EB',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 8,
        marginRight: 10,
    },

    // modal implementation
    modalThing: {
        position: 'absolute',
        backgroundColor: 'black',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        flex: 1,
        zIndex: 1,
    },
    modalWrapper: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
    },
    modal: {
        padding: 20,
        paddingTop: 70,
        flex: 1,
    },
});
