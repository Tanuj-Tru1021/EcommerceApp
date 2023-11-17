import { View, Text, TouchableOpacity, Image, Modal, FlatList } from 'react-native'
import React, { useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from '../components/Header';
import { ApiContext } from '../components/ApiContext';
import ProductCard from '../components/ProductCard';

const Home = ({ navigation }) => {

  const [show, setShow] = useState(false)
  const [item, setItem] = useState({})
  const [add, setAdd] = useState(false)
  const { cart, products, addToCart } = useContext(ApiContext);

  const countUniqueItems = () => {
    const uniqueItems = new Set(cart.map(item => item.id))
    return uniqueItems.size
  }
  const itemsInCart = countUniqueItems()
  return (
    <View style={{ flex: 1, backgroundColor: '#002e65', paddingHorizontal: 16 }}>
      <Header onPressLogout={async () => {
        await AsyncStorage.removeItem('LoggedEmail')
        await AsyncStorage.removeItem('LoggedPassword')
        navigation.navigate('Login')
      }}
        onPressCart={() => navigation.navigate('Cart')}
        count={itemsInCart} />
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (

            <ProductCard
              onPressImage={() => {
                setItem(item)
                setShow(true)
              }}
              src={item.image}
              onPressCard={() => {
                navigation.navigate('ProductDetails', { item: item })
              }}
              title={item.title}
              price={item.price}
              category={item.category}
              count={item.rating.count}
              rate={item.rating.rate}
              onPressAdd={() => {
                alert("Item added to cart")
                addToCart(item)
                setAdd(false)
              }}
              add={add}
            />
          )
        }}
      />

      <Modal
        visible={show}
        animationType='fade'
        transparent={true}
      >
        <TouchableOpacity onPress={() => setShow(false)} activeOpacity={1}>
          <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 20, height: '100%' }}>
            <Image
              src={item.image}
              style={{ height: '90%', width: '100%', marginTop: 15, alignSelf: 'center' }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

export default Home