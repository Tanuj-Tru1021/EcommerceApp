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
          placeholderTextColor={'grey'}
          keyboardType='email-address'
          onChangeText={(text) => {
            setCredentials({ ...credentials, "email": text.trim() })
          }}
          value={credentials.email}
          style={{ paddingVertical: 6, paddingLeft: 16, marginBottom: 16, backgroundColor: 'white', borderRadius: 8 }}
        />

        <Text style={{ fontSize: 20, color: 'white', marginBottom: 8 }}>
          Password
        </Text>
        <View style={{flexDirection:'row'}}>
          <TextInput
            placeholder='Enter your password'
            placeholderTextColor={'grey'}
            secureTextEntry={hidePassword}
            onChangeText={(text) => {
              setCredentials({ ...credentials, "password": text.trim() })
            }}
            value={credentials.password}
            style={{ paddingVertical: 6, paddingHorizontal: 16, marginBottom: 16, backgroundColor: 'white', borderRadius: 8, width: '100%', position:'relative' }}
          />
          <TouchableOpacity onPress={() => manageVisibility()}>
            <Image 
              source={hidePassword ? require('../../assets/eye-closed.png') : require('../../assets/eye-open.png')}
              style={{ width: 27, height: 24, position:'absolute', tintColor:'#C4C4C4', justifyContent:'center', top: 8, right: 12}}
            />
          </TouchableOpacity>
        </View>

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