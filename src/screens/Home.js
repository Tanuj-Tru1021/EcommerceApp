import { View, Text, TouchableOpacity, Image, Modal, FlatList, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from '../components/Header';
import { ApiContext } from '../components/ApiContext';
import ProductCard from '../components/ProductCard';

const Home = ({ navigation }) => {

  const [show, setShow] = useState(false)
  const [item, setItem] = useState({})
  const [add, setAdd] = useState(false)
  const [disable, setDisable] = useState(false)
  const { products, addToCart } = useContext(ApiContext);
  return (
    <View style={{ flex: 1, backgroundColor: '#002e65', paddingHorizontal: 16 }}>
      {/* {
        loader === false ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color='white' />
          </View>
          : */}

      <FlatList
        data={products}
        keyExtractor={item => item.id}
        ListHeaderComponent={<Header onPressLogout={async () => {
          await AsyncStorage.removeItem('LoggedEmail')
          await AsyncStorage.removeItem('LoggedPassword')
          navigation.navigate('Login')
        }}
          onPressCart={() => navigation.navigate('Cart')} />}
        renderItem={({ item }) => {
          return (

            <ProductCard
              onPressImage={() => {
                setItem(item)
                setShow(true)
              }}
              src={item.image}
              onPressText={() => {
                navigation.navigate('ProductDetails', { item: item })
              }}
              title={item.title}
              price={item.price}
              category={item.category}
              count={item.rating.count}
              rate={item.rating.rate}
              onPressAdd={() => {
                addToCart(item)
                setAdd(false)
                setDisable(true)
              }}
              add={add}
              // disable={disable}
            />
            // <View style={{ backgroundColor: 'white', paddingHorizontal: 16, paddingVertical: 16, borderRadius: 8, marginTop: 20, elevation: 100, shadowColor: 'white', }}>
            //   <View style={{ flexDirection: 'row' }}>
            //     <TouchableOpacity onPressImage={() => {
            //       setItem(item)
            //       setShow(true)
            //     }}>
            //       <Image
            //         src={item.image}
            //         style={{ width: 120, height: 160, marginRight: 16 }}
            //       />
            //     </TouchableOpacity>
            //     <View>
            //       <View>
            //         <TouchableOpacity onPress={() => {
            //           navigation.navigate('ProductDetails', { item: item })
            //         }}>
            //           <Text style={{ fontSize: 16, fontWeight: 500, color: 'black', maxWidth: 200 }}>
            //             {item.title}
            //           </Text>
            //         </TouchableOpacity>
            //         <Text style={{ fontSize: 14, color: 'grey', marginTop: 4 }}>
            //           $ {item.price}
            //         </Text>
            //         <Text style={{ fontSize: 14, color: 'grey', marginTop: 4 }}>
            //           Category: {item.category}
            //         </Text>
            //         {
            //           item.rating.count > 0 ? <Text style={{ fontSize: 14, color: 'green', marginTop: 4 }}>In stock</Text> : <Text style={{ fontSize: 14, color: 'red', marginTop: 4 }}>Out of stock</Text>
            //         }
            //         <View style={{ flexDirection: 'row' }}>
            //           <Text style={{ fontSize: 14, marginTop: 4, color: 'grey', marginRight: 4 }}>
            //             Rating:
            //           </Text>
            //           <Text style={{ fontSize: 14, marginTop: 4, color: item.rating.rate > 3 ? 'green' : item.rating.rate < 3 && item.rating.rate > 2 ? 'orange' : 'red' }}>
            //             {item.rating.rate} / 5
            //           </Text>
            //         </View>
            //       </View>
            //       <TouchableOpacity
            //         style={{ backgroundColor: !add ? 'orange' : 'grey', borderRadius: 4, justifyContent: 'center', alignItems: 'center', marginTop: 4, paddingVertical: 4, width: '100%' }}
            //         onPress={() => {
            //           addToCart(item)
            //           // setAdd(false)
            //           // if(cart.find(() => {item})){
            //           //   setAdd(true)
            //           // }
            //         }}
            //       >
            //         <Text style={{ fontSize: 18, color: 'white', fontWeight: 500 }}>
            //           {!add ? 'Add to Cart' : 'Added to Cart'}
            //         </Text>
            //       </TouchableOpacity>
            //     </View>
            //   </View>
            // </View>
          )
        }}
      />
      {/* } */}

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