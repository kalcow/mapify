import * as Location from 'expo-location';
import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text, View } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Callout, Marker } from 'react-native-maps';
//import MapMarker from '../components/MapMarker';
const markerImg = require('../assets/map-elements/bagel.png');

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

    const renderItem = ({ item }) => <Text>{item.user}</Text>;

    const markerPressed = (region) => {
        //console.log(region.user);
        const goToPoint = {
            longitude: longitude_real,
            latitude: latitude_real,
            latitudeDelta: .016,
            longitudeDelta: .016,
        };
        console.log()
        if (region.marker === 'marker-press') {
            goToPoint.longitude = region.coordinate.longitude;
            goToPoint.latitude = region.coordinate.latitude;
            goToPoint.latitudeDelta = 0.01;
            goToPoint.longitudeDelta = 0.01;

        } 
        
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

            {/* <Callout>
                <ScrollView horizontal={true} style={styles.friends}>
                    <FlatList
                        horizontal
                        data={listLocals}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index}
                        showsHorizontalScrollIndicator={false}
                    />
                </ScrollView>
            </Callout> */}
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
    friends: {
        borderColor: 'transparent',
        borderWidth: 0.0,
        marginBottom: '40%',
        backgroundColor: '#fff',
    },
});

export default Map;
