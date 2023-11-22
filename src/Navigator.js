import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ApiProvider } from './components/ApiContext'
import Login from './screens/Login'
import Home from './screens/Home'
import ProductDetails from './screens/ProductDetails'
import Splash from './screens/Splash'
import Cart from './screens/Cart'

const Stack = createNativeStackNavigator()

const Navigator = () => {
  return (
    <ApiProvider>
      <NavigationContainer>
        <StatusBar backgroundColor='#012E65' />
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name='ProductDetails' component={ProductDetails} />
          <Stack.Screen name='Cart' component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApiProvider>
  )
}

export default Navigator