import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
const markerImg = require('../assets/map-elements/bagel.png');

const Map = () => {
    const [position, setPosition] = useState<Location.LocationObject | null>(null);

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

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{
                    latitude: latitude_real,
                    longitude: longitude_real,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}>
                <Marker
                    coordinate={{
                        latitude: latitude_real,
                        longitude: longitude_real,
                    }}>
                    <View style={styles.marker}>
                        <Image source={markerImg} style={styles.image} />
                    </View>
                    <Callout>
                        <Text>Bagel Asf</Text>
                    </Callout>
                </Marker>
            </MapView>
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
});

export default Map;
