import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ecommerce from '../../assets/ecommerce.png'
import { reg, RenderError } from '../components/Util'


const Login = ({ navigation }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState({})
  const [hidePassword, setHidePassword] = useState(true)

  const manageVisibility = () => {
    setHidePassword(!hidePassword)
  }

  const getData = async () => {
    await AsyncStorage.setItem('Email', credentials.email)
    await AsyncStorage.setItem('Password', credentials.password)
    setCredentials({
      email: '',
      password: ''
    })
    navigation.navigate('Home')
  }

  const disabled = (credentials.email.length === 0 && credentials.password.length === 0)
  return (
    <ScrollView
      keyboardShouldPersistTaps='handled'
      style={{ flex: 1, backgroundColor: '#002e65' }}
    >
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
          autoCapitalize='none'
          placeholderTextColor={'grey'}
          keyboardType='email-address'
          onChangeText={(text) => {
            setCredentials({ ...credentials, "email": text.trim() })
            setError(prev => ({ ...prev, email: (!text) }))
          }}
          value={credentials.email}
          style={{ paddingVertical: 6, paddingLeft: 16, marginBottom: 16, backgroundColor: 'white', borderRadius: 8 }}
        />

        {error.email && <RenderError message='Enter Email' />}
        {(credentials.email && !reg.test(credentials.email)) && <RenderError message='Enter Valid Email' />}

        <Text style={{ fontSize: 20, color: 'white', marginBottom: 8 }}>
          Password
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            placeholder='Enter your password'
            autoCapitalize='none'
            placeholderTextColor={'grey'}
            secureTextEntry={hidePassword}
            onChangeText={(text) => {
              setCredentials({ ...credentials, "password": text.trim() })
              setError(prev => ({ ...prev, password: (!text) }))
            }}
            value={credentials.password}
            style={{ paddingVertical: 6, paddingHorizontal: 16, marginBottom: 16, backgroundColor: 'white', borderRadius: 8, width: '100%', position: 'relative' }}
          />
          <TouchableOpacity onPress={() => manageVisibility()}>
            <Image
              source={hidePassword ? require('../../assets/eye-closed.png') : require('../../assets/eye-open.png')}
              style={{ width: 27, height: 24, position: 'absolute', tintColor: '#C4C4C4', justifyContent: 'center', top: 8, right: 12 }}
            />
          </TouchableOpacity>
        </View>

        {error.password && <RenderError message='Enter Password' />}
        {(credentials.password && credentials.password.length < 5) && <RenderError message='Password should be minimum 5 characters' />}

        <TouchableOpacity
          style={{ backgroundColor: disabled ? 'grey' : '#00a3e5', paddingVertical: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 37, marginBottom: 30 }}
          disabled={disabled}
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