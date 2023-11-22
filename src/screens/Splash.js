import { View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Logo from '../../assets/logo.png'

const Splash = ({ navigation }) => {

    const [flag, setFlag] = useState()
    const handle = async () => {
        const mEmail = await AsyncStorage.getItem('Email')
        const mPassword = await AsyncStorage.getItem('Password')
        !mEmail && !mPassword ?
            navigation.navigate('Login')
            : navigation.navigate('Home')
        await AsyncStorage.setItem("token", "false")
    }

    const setToken = async () => {
        await AsyncStorage.setItem("token", "true")
        setFlag(await AsyncStorage.getItem("token"))
    }
    useEffect(() => {
        setToken()
        setTimeout(async () => {
            handle()
        }, 3000)
    })
    return (
        <>
            {
                flag && <SafeAreaProvider>
                    <View style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={Logo}
                            style={{ height: 400, width: 400 }}
                        />
                    </View>
                </SafeAreaProvider>
            }
        </>
    )
}

export default Splash