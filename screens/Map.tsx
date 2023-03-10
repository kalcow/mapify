import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
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
            user: 'me',
        },
        {
            lat: 34.06935,
            long: -118.44468,
            user: 'Kalyan',
        },
        {
            lat: 34.07274,
            long: -118.45425,
            user: 'Madeline',
        },
        {
            lat: 34.07423,
            long: -118.45119,
            user: 'Georgia',
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

            <Animated.ScrollView
                horizontal={true}
                decelerationRate={0.7}
                disableIntervalMomentum={true}
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
                style={styles.scrollView}>
                {listLocals.map((value, index) => (
                    <View style={styles.card} key={index}>
                        <Text style={styles.cardText}>{value.user}</Text>
                    </View>
                ))}
            </Animated.ScrollView>
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
    scrollView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
        marginBottom: '45%',
    },
    card: {
        backgroundColor: Colors.greyBackground,
        borderRadius: 30,
        marginHorizontal: 10,
        overflow: 'hidden',
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        color: 'white',
        fontFamily: 'satoshi-bold',
    },
});

export default Map;
