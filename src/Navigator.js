import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ApiProvider } from './components/ApiContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Login from './screens/Login'
import Home from './screens/Home'
import ProductDetails from './screens/ProductDetails'
import Cart from './screens/Cart'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Stack = createNativeStackNavigator()

const Navigator = () => {
  return (
    <ApiProvider>
      <NavigationContainer>
        <StatusBar backgroundColor='#012E65' />
        <SafeAreaProvider>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AuthCheck" component={AuthCheck} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name='ProductDetails' component={ProductDetails} />
            <Stack.Screen name='Cart' component={Cart} />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </ApiProvider>
  )
}

const AuthCheck = ({ navigation }) => {

  useEffect(() => {
    setTimeout(async () => {
      handleLogin()
    }, 3000)
  })

  const handleLogin = async () => {
    const mEmail = await AsyncStorage.getItem('Email')
    const mPassword = await AsyncStorage.getItem('Password')
    !mEmail && !mPassword ? navigation.replace('Login') : navigation.replace('Home')
  }

  return (
    <></>
  )
}

export default Navigator