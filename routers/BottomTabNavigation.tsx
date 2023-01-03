import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import * as Animatable from 'react-native-animatable';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabIcons from '../constants/BottomTabIcons';
import Colors from '../constants/colors';

//* Screens
import Home from '../screens/Home';
import Map from '../screens/Map';
import Library from '../screens/Library';

//* Imports for Types
import { NavigationHelpers, ParamListBase, TabNavigationState } from '@react-navigation/native';
import {
    BottomTabDescriptorMap,
    BottomTabNavigationEventMap,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { EdgeInsets } from 'react-native-safe-area-context';
import Satoshi from '../constants/Satoshi';
import Discover from '../screens/Discover';

const TabData = [
    { route: 'Map', label: 'Map', icon: BottomTabIcons.Map, component: Map },
    { route: 'Discover', label: 'Discover', icon: BottomTabIcons.Compass, component: Discover },
    { route: 'Home', label: 'Home', icon: BottomTabIcons.Home, component: Home },
    { route: 'Library', label: 'Library', icon: BottomTabIcons.Library, component: Library },
    { route: 'You', label: 'You', icon: BottomTabIcons.User, component: Library },
];

const Tabs = createBottomTabNavigator();

interface TabBarProps {
    state: TabNavigationState<ParamListBase>;
    descriptors: BottomTabDescriptorMap;
    navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
    insets: EdgeInsets;
}

const TabBar: FC<TabBarProps> = ({ state, descriptors, navigation, insets }) => {
    // const render = BottomTabIcons.Map;
    return (
        <View
            style={{
                ...styles.wrapper,
                bottom: insets.bottom - 10,
                left: insets.left,
                right: insets.right,
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
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    if (isFocused) {
                        return (
                            <TouchableOpacity
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                key={index}
                                style={styles.activeTab}>
                                {renderIcon !== undefined &&
                                    renderIcon({
                                        focused: isFocused,
                                        color: Colors.greyBackground,
                                        size: 0,
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
                            key={index}>
                            <View style={styles.inactiveIcon}>
                                {renderIcon !== undefined &&
                                    renderIcon({ focused: isFocused, color: Colors.text, size: 0 })}
                            </View>
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
        justifyContent: 'space-between',
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
        backgroundColor: Colors.text,
        paddingHorizontal: 12,
        // paddingVertical: 7,
        borderRadius: 30,
        height: 34,
        alignItems: 'center',
    },
    inactiveIcon: {
        width: 34,
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const BottomTabNavigation = () => {
    return (
        <Tabs.Navigator
            screenOptions={{
                headerShown: true,
            }}
            tabBar={(props) => <TabBar {...props} />}>
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

export default BottomTabNavigation;
