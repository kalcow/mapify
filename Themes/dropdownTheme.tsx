import {
    StyleSheet
} from 'react-native';

import Satoshi from '../constants/Satoshi';
//import Colors from '../../constants/colors';

export const ICONS = {
    ARROW_DOWN: require('../assets/Dropdown/arrow-down.png'),
    ARROW_UP: require('../assets/Dropdown/arrow-up.png'),
    TICK: require('../assets/Dropdown/tick.png'),
    CLOSE: require('../assets/Dropdown/close.png') 
};

//const widthPercentage = "60%"";

export default StyleSheet.create({
    container: {
        width: '100%',
        //backgroundColor: "purple",
        justifyContent: "space-around",
        marginLeft: 70,
    },
    style: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "53%",
        minHeight: 30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",
        paddingHorizontal: 10,
        paddingVertical: 3,
        backgroundColor: "white"
    },
    label: {
        flex: 1,
        color: "black",
        fontWeight: "bold",
        fontSize: 12,
    },
    labelContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    arrowIcon: {
        width: 14,
        height: 14
    },
    tickIcon: {
        width: 14,
        height: 14
    },
    closeIcon: {
        width: 14,
        height: 14
    },
    badgeStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: "alto",
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    badgeDotStyle: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        marginRight: 8,
        backgroundColor: "gray"
    },
    badgeSeparator: {
        width: 5,
    },
    listBody: {
        height: '100%',
    },
    listBodyContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    dropDownContainer: {
        position: 'absolute',
        backgroundColor: "white",
        borderRadius: 8,
        borderColor: "black",
        borderWidth: 1,
        width: '53%',
        overflow: 'hidden',
        zIndex: 1000,
    },
    modalContentContainer: {
        flexGrow: 1,
    },
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 40,
    },
    listItemLabel: {
        flex: 1,
        color: "black",
        fontWeight: "bold",
        fontSize: 12,
    },
    iconContainer: {
        marginRight: 10
    },
    arrowIconContainer: {
        marginLeft: 10
    },
    tickIconContainer: {
        marginLeft: 10
    },
    closeIconContainer: {
        marginLeft: 10
    },
    listParentLabel: {

    },
    listChildLabel: {

    },
    listParentContainer: {

    },
    listChildContainer: {
        paddingLeft: 40,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomColor: "black",
        borderBottomWidth: 1
    },
    searchTextInput: {
        flexGrow: 1,
        flexShrink: 1,
        margin: 0,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        borderColor: "black",
        borderWidth: 1,
        color: "black"
    },
    itemSeparator: {
        height: 1,
        backgroundColor: "black",
    },
    flatListContentContainer: {
        flexGrow: 1
    },
    customItemContainer: {

    },
    customItemLabel: {
        fontStyle: 'italic'
    },
    listMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    listMessageText: {

    },
    selectedItemContainer: {

    },
    selectedItemLabel: {

    },
    modalTitle: {
        fontSize: 18,
        color: "black"
    },
    extendableBadgeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1
    },
    extendableBadgeItemContainer: {
        marginVertical: 3,
        marginEnd: 7
    }
});