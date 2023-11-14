import { View, Text, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useContext } from 'react'
import Header from '../components/Header'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ApiContext } from '../components/ApiContext'
import CartCard from '../components/CartCard'

const Cart = ({ navigation }) => {

    const { cart, price, removeFromCart } = useContext(ApiContext)
    const [counter, setCounter] = useState(1)
    const [disable, setDisable] = useState(false)
    const [subTotal, setSubTotal] = useState(price)
    const [total, setTotal] = useState(subTotal + 8)

    return (
        <View style={{ flex: 1, backgroundColor: '#002e65', paddingHorizontal: 16 }}>
            <Header
                onPressHome={() => navigation.goBack()}
                onPressLogout={async () => {
                    await AsyncStorage.removeItem('LoggedEmail')
                    await AsyncStorage.removeItem('LoggedPassword')
                    navigation.navigate('Login')
                }}
            />
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <ScrollView>
                    <FlatList
                        data={cart}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return (
                                <CartCard
                                    SRC={item.image}
                                    itemTitle={item.title}
                                    itemPrice={item.price}
                                    itemCount={item.rating.count}
                                    itemId={item.id}
                                    onPressMinus={() => {
                                        if (counter === 1) {
                                            removeFromCart(item.id)
                                            setCounter(counter - 1)
                                            // setDisable(true)
                                        }
                                        else {
                                            setCounter(counter - 1)
                                        }
                                        setSubTotal(subTotal - item.price)
                                        setTotal(total - item.price)
                                    }}
                                    counter={counter}
                                    onPressPlus={() => {
                                        if (counter === item.rating.count) {
                                            setDisable(true)
                                        } else {
                                            setCounter(counter + 1)
                                            setSubTotal(subTotal + item.price)
                                            setTotal(total + item.price)
                                        }
                                    }}
                                />
                            )
                        }}
                    />
                </ScrollView>
                <View>
                    <View style={{ borderWidth: 4, borderColor: 'white', padding: 8 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 20, fontWeight: 500, color: 'white' }}>
                                Subtotal :
                            </Text>
                            <Text style={{ fontSize: 20, fontWeight: 500, color: 'white' }}>
                                $ {subTotal}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                            <Text style={{ fontSize: 20, fontWeight: 500, color: 'white' }}>
                                Tax (GST) :
                            </Text>
                            <Text style={{ fontSize: 20, fontWeight: 500, color: 'white' }}>
                                $ 8
                            </Text>
                        </View>
                        <View style={{ height: 2, backgroundColor: 'white', marginVertical: 4 }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 20, fontWeight: 500, color: 'white' }}>
                                Total :
                            </Text>
                            <Text style={{ fontSize: 20, fontWeight: 500, color: 'white' }}>
                                $ {total}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Cart