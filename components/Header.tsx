import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState, FC} from 'react'

interface UserInfo{
    name: string;
}

let hours = new Date().getHours();

const Header: FC<UserInfo> = ({name}:UserInfo) => {

    let greeting = "Good Morning";
    if (hours >= 11 && hours <= 16) {
        greeting = "Good Afternoon";
    } else if (hours > 16 && hours < 21) {
        greeting = "Good Evening";
    } else if (hours >= 21 || hours < 4) {
        greeting = "Good Night";
    }

    return (
        <View style={styles.headerWrapper}>
            <View style={styles.greetingWrapper}>
                <Text style={styles.greetingText}>{greeting}, {"\n" + name}</Text>
            </View>
                <img src={require("C:\Users\clair\Documents\mapify\assets\splash.png")} />
            <View> 
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    greetingText: {
        fontSize: 25,
        color: "#FFF9EB"
    },
    headerWrapper: {
        padding: 20
    },

    greetingWrapper: {
        backgroundColor: "#0E487D",
        borderRadius: 200,
        padding: 20,
        paddingLeft: 30,
        paddingRight: 30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
    },
})

export default Header;