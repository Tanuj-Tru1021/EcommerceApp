import { View, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'

const Header = ({ onPressLogout, onPressCart, onPressHome, count, isHome = false, isCart = false, onPressClear }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',  marginBottom: 5 }}>
            <TouchableOpacity onPress={onPressHome}>
                <Ionicon name="home" size={30} color='white' />
            </TouchableOpacity>

            {isHome == true && <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={onPressCart}>
                    <View style={{ position: 'relative', marginRight: 15 }}>
                        <Ionicon name="cart" size={30} color="white" />
                        {count > 0 && (
                            <View style={{
                                position: 'absolute',
                                backgroundColor: 'red',
                                borderRadius: 8,
                                width: 16,
                                height: 16,
                                justifyContent: 'center',
                                alignItems: 'center',
                                top: -5,
                                right: -5,
                            }}>
                                <Text style={{ color: 'white', fontSize: 12 }}>{count}</Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressLogout}>
                    <Ionicon name="log-out" size={30} color='white' />
                </TouchableOpacity>
            </View>}

            {isCart && <TouchableOpacity onPress={onPressClear}>
                <Ionicon name="trash" size={30} color='white' />
            </TouchableOpacity>}
        </View>
    )
}

export default Header