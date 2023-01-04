import { View, StyleSheet, TouchableOpacity, LayoutAnimation, Animated } from 'react-native';
import React, { FC } from 'react';
import {
    createMaterialTopTabNavigator,
    MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import * as Animatable from 'react-native-animatable';
import { TabActions } from '@react-navigation/native';
import BottomTabIcons from '../constants/BottomTabIcons';
import Colors from '../constants/Colors';
import Satoshi from '../constants/Satoshi';

//* Screens
import Home from '../screens/Home';
import Map from '../screens/Map';
import Library from '../screens/Library';
import Discover from '../screens/Discover';

const TabData = [
    { route: 'Map', label: 'Map', icon: BottomTabIcons.Map, component: Map },
    { route: 'Discover', label: 'Discover', icon: BottomTabIcons.Compass, component: Discover },
    { route: 'Home', label: 'Home', icon: BottomTabIcons.Home, component: Home },
    { route: 'Library', label: 'Library', icon: BottomTabIcons.Library, component: Library },
    { route: 'You', label: 'You', icon: BottomTabIcons.User, component: Library },
];

const Tabs = createMaterialTopTabNavigator();

const TabBar: FC<MaterialTopTabBarProps> = ({ state, descriptors, navigation, position }) => {
    LayoutAnimation.configureNext({
        duration: 300,
        create: { type: 'linear', property: 'opacity' },
        update: { type: 'easeOut' },
        delete: { type: 'linear', property: 'opacity' },
    });
    // LayoutAnimation.easeInEaseOut()
    return (
        <View
            style={{
                ...styles.wrapper,
                // bottom: insets.bottom - 10,
                // left: insets.left,
                // right: insets.right,
            }}>
            <View style={styles.songContainer}>
                <Satoshi.Bold style={styles.text}>Spotify Here</Satoshi.Bold>
                {/* {render({ focused: true, color: 'red', size: 12 })} */}
            </View>
            <View style={styles.tabsContainer}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                            ? options.title
                            : route.name;

                    const isFocused = state.index === index;

                    const renderIcon = options.tabBarIcon;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            // LayoutAnimation.easeInEaseOut();
                            navigation.dispatch(TabActions.jumpTo(route.name));
                            // navigation.navigate(route.name, { merge: true });
                        }
                    };

                    

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    const inputRange = state.routes.map((_, i) => i);
                    const opacity = position.interpolate({
                        inputRange,
                        outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
                    });

                    const antiOpacity = position.interpolate({
                        inputRange,
                        outputRange: inputRange.map((i) => (i === index ? 0 : 0.8)),
                    });

                    if (state.index === index) {
                        return (
                            <TouchableOpacity
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={styles.activeTab}
                                key={index}>
                                <Animated.View
                                    style={{ ...styles.activeBackground, opacity: opacity }}
                                />
                                {renderIcon !== undefined &&
                                    renderIcon({
                                        focused: isFocused,
                                        color: Colors.greyBackground,
                                    })}
                                <Satoshi.Bold style={{ ...styles.text, ...styles.activeText }}>
                                    {typeof label === 'string' ? label : ''}
                                </Satoshi.Bold>
                            </TouchableOpacity>
                        );
                    }

                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.inactiveTab}
                            key={index}>
                            <Animated.View style={{ ...styles.inactiveBackground, opacity }}>
                                {renderIcon !== undefined &&
                                    renderIcon({
                                        focused: isFocused,
                                        color: Colors.greyBackground,
                                    })}
                            </Animated.View>
                            <Animated.View style={{ ...styles.inactiveIcon, opacity: antiOpacity }}>
                                {renderIcon !== undefined &&
                                    renderIcon({ focused: isFocused, color: Colors.text })}
                            </Animated.View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        backgroundColor: Colors.greyBackground,
        marginHorizontal: 15,
        padding: 7,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 30,
        left: 0,
        right: 0,
    },
    text: {
        color: Colors.text,
        fontSize: 14,
    },
    songContainer: {
        height: 72,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabsContainer: {
        width: '100%',
        minHeight: 34,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    activeText: {
        color: Colors.greyBackground,
        paddingLeft: 8,
    },
    activeTab: {
        flexDirection: 'row',
        // backgroundColor: Colors.text,
        paddingHorizontal: 12,
        borderRadius: 30,
        height: 34,
        alignItems: 'center',
        position: 'relative',
    },
    inactiveTab: {
        flexDirection: 'row',
        // backgroundColor: Colors.text,
        paddingHorizontal: 5,
        borderRadius: 30,
        height: 34,
        alignItems: 'center',
        position: 'relative',
    },
    activeBackground: {
        position: 'absolute',
        backgroundColor: Colors.text,
        height: '100%',
        flex: 1,
        borderRadius: 30,
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
    },
    inactiveBackground: {
        position: 'absolute',
        backgroundColor: Colors.text,
        height: '100%',
        flex: 1,
        borderRadius: 30,
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inactiveIcon: {
        width: 34,
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const SwipeableBottomTabNavigation = () => {
    return (
        <Tabs.Navigator tabBarPosition="bottom" initialRouteName="Home" tabBar={(props) => <TabBar {...props} />} screenOptions={{tabBarIndicatorStyle: {position: 'absolute', backgroundColor: 'red', top: 0, bottom: 0, left: 0, right: 0}}}>
            {TabData.map((Item, index) => {
                return (
                    <Tabs.Screen
                        key={index}
                        name={Item.route}
                        component={Item.component}
                        options={{
                            tabBarIcon: Item.icon,
                        }}
                    />
                );
            })}
        </Tabs.Navigator>
    );
};

export default SwipeableBottomTabNavigation;
