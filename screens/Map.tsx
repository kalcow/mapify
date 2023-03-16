import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Carousel from 'react-native-reanimated-carousel';
import Colors from '../constants/colors';

//import MapMarker from '../components/MapMarker';
const KM = require('../assets/map-elements/KayleeMei.png');
const Edward = require('../assets/map-elements/Edward.png');
const Kalyan = require('../assets/map-elements/Kalyan.png');
const Jayson = require('../assets/map-elements/Jayson.png');
const Madeline = require('../assets/map-elements/Madeline.png');
const Robin = require('../assets/map-elements/Robin.png');
const Chloe = require('../assets/map-elements/Chloe.png');
const Max = require('../assets/map-elements/Max.png');
const Claire = require('../assets/map-elements/Claire.png');
const Nicholas = require('../assets/map-elements/Nicholas.png');
const Joyce = require('../assets/map-elements/Joyce.png');
const Nitya = require('../assets/map-elements/Nitya.png');

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = height * 0.15;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const Map = () => {
    const [position, setPosition] = useState<Location.LocationObject | null>(null);
    const mapRef = useRef(null);
    const carouselRef = useRef(null);

    let mapAnimation = new Animated.Value(0);
    let mapIndex = 0;

    useEffect(() => {
        const requestPermissions = async () => {
            const foreground = await Location.requestForegroundPermissionsAsync();
            if (foreground.granted) {
                const { granted } = await Location.getForegroundPermissionsAsync();
                if (!granted) {
                    console.log('location tracking denied');
                    return;
                }
                const foregroundSubscription = await Location.watchPositionAsync(
                    {
                        // For better logs, we set the accuracy to the most sensitive option
                        accuracy: Location.Accuracy.BestForNavigation,
                    },
                    (location) => {
                        if (location !== null) {
                            setPosition(location);
                        }
                    }
                );
            }
        };
        requestPermissions();
    }, []);

    let latitude_real: number = 0;
    let longitude_real: number = 0;
    if (position !== null) {
        latitude_real = position.coords.latitude;
        longitude_real = position.coords.longitude;
    } else {
        //loading view
    }

    let listLocals = [
        {
            lat: latitude_real,
            long: longitude_real,
            user: 'Me',
            currentSong: 'Harverd Dropout',
            album: 'https://media.pitchfork.com/photos/5c673ed4817ba43f155f4ed0/1:1/w_600/harverd%20dropout_lil%20pump.jpg',
            artist: 'Taylor Swift',
            profilePhoto: KM,
        },
        {
            lat: 34.06935,
            long: -118.46468,
            user: 'Kalyan',
            currentSong: 'Ctrl',
            album: 'https://i.scdn.co/image/ab67616d0000b273dc12b2bd6884bd1de21b6bae',
            artist: 'Taylor Swift',
            profilePhoto: Kalyan,
        },
        {
            lat: 34.07274,
            long: -118.45425,
            user: 'Madeline',
            currentSong: 'Reputation',
            album: 'https://imageio.forbes.com/blogs-images/brittanyhodak/files/2017/08/20988198_10154975234150369_1493436770276743217_o-1200x1200.jpg?format=jpg&width=1200',
            artist: 'Taylor Swift',
            profilePhoto: Madeline,
        },
        {
            lat: 34.06786,
            long: -118.43885,
            user: 'Georgia',
            currentSong: 'She Wolf',
            album: 'https://i.scdn.co/image/ab67616d0000b27357ebde83fa52e36af99f3b76',
            artist: 'Sharika',
        },
        {
            lat: 34.06973,
            long: -118.44831,
            user: 'Robin',
            currentSong: "'39",
            album: 'https://i.scdn.co/image/ab67616d0000b273ce4f1737bc8a646c8c4bd25a',
            artist: 'Queen',
            profilePhoto: Robin,
        },
        {
            lat: 34.07423,
            long: -118.45119,
            user: 'Claire',
            currentSong: '天公不作美',
            album: 'https://i.scdn.co/image/ab67616d00004851e655e5ac2917d9a7952389de',
            artist: '阿悠悠',
            profilePhoto: Claire,
        },
        {
            lat: 34.06423,
            long: -118.45119,
            user: 'Joyce',
            currentSong: 'More & More',
            album: 'https://i.scdn.co/image/ab67616d0000b273b7ce24c3fe0b15f535e03ae6',
            artist: 'GEMINI',
            profilePhoto: Joyce,
        },
        {
            lat: 34.07128,
            long: -118.44895,
            user: 'Max',
            currentSong: 'Reputation',
            album: 'https://imageio.forbes.com/blogs-images/brittanyhodak/files/2017/08/20988198_10154975234150369_1493436770276743217_o-1200x1200.jpg?format=jpg&width=1200',
            artist: 'Taylor Swift',
            profilePhoto: Max,
        },
        {
            lat: 34.07423,
            long: -118.42119,
            user: 'Edward',
            currentSong: 'Reputation',
            album: 'https://imageio.forbes.com/blogs-images/brittanyhodak/files/2017/08/20988198_10154975234150369_1493436770276743217_o-1200x1200.jpg?format=jpg&width=1200',
            artist: 'Taylor Swift',
            profilePhoto: Edward,
        },
        {
            lat: 34.07255,
            long: -118.44206,
            user: 'Nitya',
            currentSong: 'Reputation',
            album: 'https://imageio.forbes.com/blogs-images/brittanyhodak/files/2017/08/20988198_10154975234150369_1493436770276743217_o-1200x1200.jpg?format=jpg&width=1200',
            artist: 'Taylor Swift',
            profilePhoto: Nitya,
        },
        {
            lat: 34.07233,
            long: -118.44978,
            user: 'Chloe',
            currentSong: 'Reputation',
            album: 'https://imageio.forbes.com/blogs-images/brittanyhodak/files/2017/08/20988198_10154975234150369_1493436770276743217_o-1200x1200.jpg?format=jpg&width=1200',
            artist: 'Taylor Swift',
            profilePhoto: Chloe,
        },
        {
            lat: 34.07083,
            long: -118.4433,
            user: 'Jayson',
            currentSong: 'Reputation',
            album: 'https://imageio.forbes.com/blogs-images/brittanyhodak/files/2017/08/20988198_10154975234150369_1493436770276743217_o-1200x1200.jpg?format=jpg&width=1200',
            artist: 'Taylor Swift',
            profilePhoto: Jayson,
        },
        {
            lat: 34.07006,
            long: -118.44077,
            user: 'Nicholas',
            currentSong: 'Reputation',
            album: 'https://imageio.forbes.com/blogs-images/brittanyhodak/files/2017/08/20988198_10154975234150369_1493436770276743217_o-1200x1200.jpg?format=jpg&width=1200',
            artist: 'Taylor Swift',
            profilePhoto: Nicholas,
        },
    ];
    //@ts-ignore
    const renderItem = ({ item }) => <Text>{item.user}</Text>;

    //@ts-ignore
    const markerPressed = (region) => {
        const goToPoint = {
            longitude: longitude_real,
            latitude: latitude_real,
            latitudeDelta: 0.016,
            longitudeDelta: 0.016,
        };
        if (region.marker === 'marker-press') {
            goToPoint.longitude = region.coordinate.longitude;
            goToPoint.latitude = region.coordinate.latitude;
            goToPoint.latitudeDelta = 0.01;
            goToPoint.longitudeDelta = 0.01;
        }
        //@ts-ignore
        mapRef.current.animateToRegion(goToPoint, 500);
        //carouselRef.current.scrollTo({index: 1});
        //console.log(carouselRef.current.scrollTo({index: 1}));
    };
    //@ts-ignore
    const carouselSpin = (lat, long) => {
        const goToPoint = {
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        };
        //@ts-ignore
        mapRef.current.animateToRegion(goToPoint, 500);
    };
    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                region={{
                    latitude: latitude_real,
                    longitude: longitude_real,
                    latitudeDelta: 0.016,
                    longitudeDelta: 0.016,
                }}
                onPress={(e) =>
                    markerPressed({
                        coordinate: e.nativeEvent.coordinate,
                        marker: e.nativeEvent.action,
                    })
                }>
                {listLocals.map((value, index) => {
                    return (
                        <Marker
                            key={index}
                            coordinate={{ latitude: value.lat, longitude: value.long }}
                            title={value.user}
                            //image={markerImg}
                            style={styles.marker}>
                            <View style={styles.marker}>
                                <Image source={value.profilePhoto} style={styles.image}></Image>
                            </View>
                        </Marker>
                    );
                })}
            </MapView>
            <Carousel
                ref={carouselRef}
                style={styles.Carousel}
                loop={true}
                width={width}
                height={width / 2}
                autoPlay={false}
                data={listLocals}
                snapEnabled={true}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) =>
                    carouselSpin(listLocals[index].lat, listLocals[index].long)
                }
                renderItem={({ index }) => (
                    <View style={styles.card} key={index}>
                        <View style={styles.infoText}>
                            <Text style={styles.userText}>{listLocals[index].user}</Text>
                            <Text style={styles.songText}>
                                Listening To: {listLocals[index].currentSong}
                            </Text>
                            <Text style={styles.songText}>Artist: {listLocals[index].artist}</Text>
                        </View>
                        <Image
                            style={styles.albumImage}
                            source={{ uri: listLocals[index].album }}
                        />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    marker: {
        // backgroundColor: '#000000',
        alignItems: 'center',
        flex: 1,
        height: Dimensions.get('window').height / 14,
        width: Dimensions.get('window').height / 14,
        borderRadius: Dimensions.get('window').height / 28,
        overflow: 'hidden',
        resizeMode: 'cover',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        height: '100%',
        width: '100%',
    },
    Carousel: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
        marginBottom: '30%',
        alignContent: 'center',
    },
    card: {
        backgroundColor: Colors.greyBackground,
        borderRadius: 10,
        marginHorizontal: '10%',
        overflow: 'hidden',
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        justifyContent: 'space-between',
        //alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    userText: {
        color: 'white',
        fontFamily: 'satoshi-bold',
        fontSize: 20,
    },
    albumImage: {
        width: '35%',
        height: '85%',
        borderRadius: 5,
        //resizeMode: 'scale',
        marginVertical: 10,
        marginRight: 10,
    },
    infoText: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    songText: {
        color: 'white',
        fontFamily: 'satoshi-medium',
        fontSize: 13,
    },
});

export default Map;
