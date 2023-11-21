import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext } from 'react'
import Header from '../components/Header'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ApiContext } from '../components/ApiContext'
import CartCard from '../components/CartCard'

const Cart = ({ navigation }) => {

    const { cart, price, removeFromCart, addToCart, clearCart } = useContext(ApiContext)

    const handleIncrement = (item) => {
        addToCart(item)
    }

    const handleDecrement = (item) => {
        removeFromCart(item.id, item.price)
    }

    const countUniqueItems = () => {
        const uniqueItems = new Set(cart.map(item => item.id))
        return uniqueItems.size
    }
    const itemsInCart = countUniqueItems()

    return (
        <View style={{ flex: 1, backgroundColor: '#002e65', paddingHorizontal: 16 }}>
            <Header
                isCart={itemsInCart != 0 ? true : false}
                onPressClear={clearCart}
                onPressHome={() => navigation.navigate('Home')}
                onPressLogout={async () => {
                    await AsyncStorage.removeItem('Email')
                    await AsyncStorage.removeItem('Password')
                    navigation.navigate('Login')
                }}
                count={itemsInCart}
            />
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <FlatList
                    data={cart}
                    ListEmptyComponent={
                        <View style={{
                            backgroundColor: 'white', paddingVertical: 16,
                            margin: 16, justifyContent: 'center', alignItems: 'center', borderRadius: 8
                        }}>
                            <Text style={{ fontSize: 20, fontWeight: 500, color: 'black' }}>
                                Your cart is empty!
                            </Text>
                        </View>
                    }
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
                                    handleDecrement(item)
                                    if (item.quantity === 1) {
                                        item.isAddedToCart = false
                                    }
                                }}
                                counter={item.quantity}
                                onPressPlus={() => {
                                    handleIncrement(item)
                                }}
                            />
                        )
                    }}
                />

                {
                    cart.length ?
                        <>
                            <View style={{ borderWidth: 4, borderColor: 'white', padding: 8, marginTop: 16 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 500, color: 'white' }}>
                                        Total :
                                    </Text>
                                    <Text style={{ fontSize: 20, fontWeight: 500, color: 'white' }}>
                                        $ {Math.floor(price)}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                                <TouchableOpacity
                                    style={{
                                        paddingVertical: 8, width: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 4, marginRight: 4
                                    }}
                                    onPress={() => navigation.navigate('Home')}
                                >
                                    <Text style={{ fontSize: 16, fontWeight: 500, color: 'black' }}>
                                        Shop More
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        paddingVertical: 8, width: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'orange', borderRadius: 4
                                    }}
                                    onPress={() => {
                                        alert("Purchase Successful")
                                        navigation.navigate('Home')
                                    }}
                                >
                                    <Text style={{ fontSize: 16, fontWeight: 500, color: 'white' }}>
                                        Buy Now
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </> : ""
                }
            </View>
        </View>
    )
}

export default Cart