import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [price, setPrice] = useState(0)

    const fetchData = async () => {
        try {
            const url = "https://fakestoreapi.com/products"
            const response = await axios.get(url)
            setProducts(response.data)
            console.log(products[0].title)
        } catch (error) {
            console.error('Error fetching API data', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    const addToCart = (product) => {
        setCart([...cart, product]);
        setPrice(price + product.price)
    };

    const removeFromCart = (productId, productPrice) => {
        setCart(cart.filter(item => item.id !== productId))
        setPrice(price - productPrice)
    };

    return (
        <ApiContext.Provider value={{ products, cart, price, addToCart, removeFromCart }}>
            {children}
        </ApiContext.Provider>
    );
};
