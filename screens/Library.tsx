import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    FlatListProps,
    Image,
    TouchableOpacity,
} from 'react-native';
import Colors from '../constants/colors';
import Satoshi from '../constants/Satoshi';
import useSWR from 'swr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';

import { useUserState } from '../context/user';
const API_ENDPOINT = 'https://mapify-server.fly.dev/player';

import BottomTabIcons from '../constants/BottomTabIcons';

export default function Library() {
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

    const u = useUserState();
    const fetcher = (url: RequestInfo | URL) =>
        fetch(url, { headers: { access_token: u.accessToken!.spotify } }).then((r) => r.json());
    //const { data, error, mutate } = useSWR(API_ENDPOINT, fetcher, { refreshInterval: 500 });

    const data = require('../assets/fakeAlbumData.json');

    const load = true;

    if (!load || data == undefined) {
        return (
            <View style={styles.container}>
                <Satoshi.Bold style={styles.title}>Your Library</Satoshi.Bold>
                <Satoshi.Regular style={{ color: 'white' }}>ERROR LOADING LIBRARY</Satoshi.Regular>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Satoshi.Bold style={styles.title}>Your Library</Satoshi.Bold>
            <Satoshi.Regular style={{ color: 'white', paddingBottom: 20 }}>
                Displaying the user's first {data.limit} saved albums.
            </Satoshi.Regular>
            <View style={styles.libraryView}>
                <FlatList
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    contentContainerStyle={{ paddingBottom: 300 }}
                    numColumns={2}
                    style={styles.libraryList}
                    data={data.items}
                    renderItem={({ item }) => (
                        <View style={styles.libraryItem}>
                            <TouchableOpacity
                                onPress={() => {
                                    alert('selected');
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
        marginBottom: 20,
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
    },
    libraryItem: {
        maxWidth: '48%',
        height: 'auto',
        alignItems: 'center',
        paddingBottom: 10,
    },
});
