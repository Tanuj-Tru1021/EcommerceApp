import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ecommerce from '../../assets/ecommerce.png'

const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/

const Login = ({ navigation }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState({})

  const getData = async () => {
    await AsyncStorage.setItem('Email', credentials.email)
    await AsyncStorage.setItem('Password', credentials.password)
    navigation.navigate('Home')
  }
  return (
    <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#002e65' }}>
      <Image
        source={Ecommerce}
        style={{ height: 250, width: '100%', }}
      />
      <View style={{ marginHorizontal: 30, paddingHorizontal: 16, }}>
        <Text style={{ fontSize: 24, fontWeight: 500, color: 'white', marginBottom: 20, textAlign: 'center', }}>
          Login to your account
        </Text>
        <Text style={{ fontSize: 20, color: 'white', marginBottom: 8 }}>
          Email
        </Text>
        <TextInput
          placeholder='Enter your email address'
          placeholderTextColor={'grey'}
          keyboardType='email-address'
          onChangeText={(text) => {
            setCredentials({ ...credentials, "email": text.trim() })
            setError(prev => ({ ...prev, email: (!text) }))
          }}
          value={credentials.email}
          style={{ paddingVertical: 6, paddingLeft: 16, marginBottom: 16, backgroundColor: 'white', borderRadius: 8 }}
        />

        <Text style={{ fontSize: 20, color: 'white', marginBottom: 8 }}>
          Password
        </Text>
        <TextInput
          placeholder='Enter your password'
          placeholderTextColor={'grey'}
          secureTextEntry
          onChangeText={(text) => {
            setCredentials({ ...credentials, "password": text.trim() })
            setError(prev => ({ ...prev, password: (!text) }))
          }}
          value={credentials.password}
          style={{ paddingVertical: 6, paddingLeft: 16, marginBottom: 16, backgroundColor: 'white', borderRadius: 8 }}
        />

        <TouchableOpacity
          style={{ backgroundColor: '#00a3e5', paddingVertical: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 37, marginBottom: 30 }}
          disabled={!(credentials.email.length !== 0 && reg.test(credentials.email) && credentials.password.length > 5)}
          onPress={() => getData()}
        >
          <Text style={{ fontSize: 20, fontWeight: 500, color: 'white' }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Login