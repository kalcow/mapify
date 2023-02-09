import { View, Text, StyleSheet, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';

import * as Location from 'expo-location';

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
                    }}
                />
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
});

export default Map;
