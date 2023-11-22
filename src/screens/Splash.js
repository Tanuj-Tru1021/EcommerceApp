import { View, Image } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Logo from '../../assets/logo.png'

const Splash = ({ navigation }) => {
    const handle = async () => {
        const mEmail = await AsyncStorage.getItem('Email')
        const mPassword = await AsyncStorage.getItem('Password')
        !mEmail && !mPassword ?
            navigation.navigate('Login')
            : navigation.navigate('Home')
    }
    useEffect(() => {
        setTimeout(async () => {
            handle()
        }, 3000)
    })
    return (
        <SafeAreaProvider>
            <View style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={Logo}
                    style={{ height: 400, width: 400 }}
                />
            </View>
        </SafeAreaProvider>
    )
}

export default Splash