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

import Colors from '../../constants/colors';
import Satoshi from '../../constants/Satoshi';
import useSWR from 'swr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';

import SpotifyActions from '../../lib/spotify';

import { useUserState } from '../../context/user';
const API_ENDPOINT = 'https://mapify-server.fly.dev/player';

import { useNavigation } from '@react-navigation/native';

export default function Library(state, navigation) {
    // Fetching saved album and playlist data from ENDPOINT

    const u = useUserState();
    const fetcher = (url: RequestInfo | URL) =>
        fetch(url, { headers: { access_token: u.accessToken!.spotify } }).then((r) => r.json());
    //const { data, error, mutate } = useSWR(API_ENDPOINT, fetcher, { refreshInterval: 500 });

    // Right now using My Data in a JSON
    const data = require('../../assets/fakeAlbumData.json');

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
                                        //console.log(item.album);
                                        nav.navigate('SongPage', {
                                            info: JSON.stringify(item.album),
                                        });
                                        /*showModal(item.album.id, item.album);*/
                                        //</View>playTrack(item.album.uri);
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