import { View, Text } from 'react-native';
import React, { useState } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
    longitude: number;
    latitude: number;
};

const MapMarker = (props: Props) => {
    console.log(props.latitude);
    return (
        <Marker
            coordinate={{
                latitude: props.latitude,
                longitude: props.longitude,
            }}
        />
    );
};

export default MapMarker;
