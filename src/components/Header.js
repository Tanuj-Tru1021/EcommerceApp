import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'

const Header = ({ onPressLogout, onPressCart, onPressHome }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
            <TouchableOpacity onPress={onPressHome}>
                <Ionicon name="home" size={30} color='white' />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={onPressCart}>
                    <Ionicon name="cart" size={30} color='white' style={{ marginRight: 8 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressLogout}>
                    <Ionicon name="log-out" size={30} color='white' />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header