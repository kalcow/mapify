import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Carousel from 'react-native-reanimated-carousel';
import Colors from '../constants/colors';
//import MapMarker from '../components/MapMarker';
const markerImg = require('../assets/map-elements/bagel.png');
const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = height * 0.15;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const Map = () => {
    const [position, setPosition] = useState<Location.LocationObject | null>(null);
    const mapRef = useRef(null);

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
        },
        {
            lat: 34.06935,
            long: -118.44468,
            user: 'Kalyan',
            currentSong: 'Ctrl',
            album: 'https://media.npr.org/assets/img/2017/06/09/sza_sq-5a43e9b7680aaeed2dddc3dd6a648ae3d986c8ea-s800-c85.jpg',
        },
        {
            lat: 34.07274,
            long: -118.45425,
            user: 'Madeline',
            currentSong: 'Reputation',
            album: 'https://imageio.forbes.com/blogs-images/brittanyhodak/files/2017/08/20988198_10154975234150369_1493436770276743217_o-1200x1200.jpg?format=jpg&width=1200',
        },
        {
            lat: 34.07423,
            long: -118.45119,
            user: 'Georgia',
            currentSong: 'Reputation',
            album: 'https://imageio.forbes.com/blogs-images/brittanyhodak/files/2017/08/20988198_10154975234150369_1493436770276743217_o-1200x1200.jpg?format=jpg&width=1200',
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
                        />
                    );
                })}
            </MapView>
            <Carousel
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
                    // <View
                    //     style={{
                    //         flex: 1,
                    //         borderWidth: 1,
                    //         justifyContent: 'center',
                    //     }}>
                    //     <Text style={{ textAlign: 'center', fontSize: 30 }}>
                    //         {listLocals[index].user}
                    //     </Text>
                    // </View>
                    <View style={styles.card} key={index}>
                        <View style={styles.infoText}>
                            <Text style={styles.userText}>{listLocals[index].user}</Text>
                            <Text style={styles.songText}>
                                Listening To: {listLocals[index].currentSong}
                            </Text>
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
        height: Dimensions.get('window').height / 18,
        width: Dimensions.get('window').width / 1,
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
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
