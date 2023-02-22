import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState, useEffect, FC } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import NetInfo from '@react-native-community/netinfo'; //uninstall later

//npm i react-native-dropdown-picker
//npx expo install @react-native-community/netinfo

interface UserInfo {
    name: string;
}

let hours = new Date().getHours();

const Header: FC<UserInfo> = ({ name }) => {
    const [isOnline, setIsOnline] = useState(true);

    //information for dropdown picker when online
    const [openOn, setOpenOn] = useState(false);   //state variable that specifies whether the picker is open
    const [valueOn, setValueOn] = useState('online');
    const [itemsOn, setItemsOn] = useState([
        { label: 'Online', value: 'online' },
        { label: 'Ghost', value: 'ghost' },
    ]);

     //information for dropdown picker when offline
     const [openOff, setOpenOff] = useState(false);   //state variable that specifies whether the picker is open
     const [valueOff, setValueOff] = useState('offline');
     const [itemsOff, setItemsOff] = useState([
         { label: 'Offline', value: 'offline' }
     ]);

     
    useEffect(() => {
        // Subscribe to network state updates
        const unsubscribe = NetInfo.addEventListener(state => {
            if(state.isConnected != null)
                setIsOnline(state.isConnected);
          });
    
        return () => {
          // Unsubscribe to network state updates
          unsubscribe();
        };

      }, []);

    let greeting = "Good Morning";
    if (hours >= 11 && hours <= 16) {
        greeting = "Good Afternoon";
    } else if (hours > 16 && hours < 21) {
        greeting = "Good Evening";
    } else if (hours >= 21 || hours < 4) {
        greeting = "Good Night";
    }

    //drop-down menu is not compatible with styles such as borderColor or backgroundColor in the containerStyle property
    if(isOnline){
        return (
            <View style={styles.headerWrapper}>
                <Text style={styles.greetingText}>{greeting}, {"\n" + name}</Text>
    
                <DropDownPicker
                    open={openOn}
                    value={valueOn}
                    items={itemsOn}
                    setOpen={setOpenOn}
                    setValue={setValueOn}
                    placeholder="hello"
                    containerStyle={{
                        maxWidth: '30%',
                        minHeight: 10,
                        flex: 1
    
                    }}
                />
                <Image source={require("../assets/favicon.png")} />
            </View>
        )
    }

    else{
        return (
            <View style={styles.headerWrapper}>
                <Text style={styles.greetingText}>{greeting}, {"\n" + name}</Text>
    
                <DropDownPicker
                    open={openOff}
                    value={valueOff}
                    items={itemsOff}
                    setOpen={setOpenOff}
                    setValue={setValueOff}
                    placeholder="goodbye"
                    containerStyle={{
                        maxWidth: '30%',
                        minHeight: 10,
                        flex: 1
    
                    }}
                    disabled={true}  //conditional component with only offline which is disabled
    
                />
                <Image source={require("../assets/favicon.png")} />
            </View>
        )
    }
 
}

const styles = StyleSheet.create({
    greetingText: {
        fontSize: 25,
        color: "#FFF9EB"
    },
    headerWrapper: {
        padding: 20,            //pads header on top and bottom
        alignSelf: "stretch",   //stretches out to fill out horizontally
        backgroundColor: "#0E487D",
        display: "flex",
        flexDirection: "row",   //children are laid out in a row
        justifyContent: "space-between",  //evenly space children 
    },
})

export default Header;