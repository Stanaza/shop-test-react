import Header from "./components/Header";
import Drawer from "./components/Drawer/Drawer";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Route} from "react-router-dom"
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from './context'
import Orders from "./pages/Orders";


function App() {

    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [cartOpened, setCartOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect((() => {
        async function fetchData() {
            try {
                const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
                    axios.get('http://localhost:3001/cart'),
                    axios.get('http://localhost:3001/favorites'),
                    axios.get('http://localhost:3001/items')
                ])

                setIsLoading(false)
                setFavorites(favoritesResponse.data)
                setCartItems(cartResponse.data)
                setItems(itemsResponse.data)
            } catch (e) {
                alert('Ошибка при запросе данных')
                console.error(e)
            }
        }

        fetchData()
    }), [])

    const onAddToCart = async (obj) => {
        try {
            if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
                setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
                await axios.delete(`http://localhost:3001/cart/${obj.id}`)
            } else {
                setCartItems(prev => [...prev, obj])
                await axios.post('http://localhost:3001/cart', obj)
            }
        } catch (e) {
            alert('Ошибка при добавлении в корзину')
            console.error(e)
        }
    }

    const onRemoveFromCart = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/cart/${id}`)
            setCartItems(cartItems.filter(item => item.id !== id))
        } catch (e) {
            alert('Ошибка при удалении данных')
            console.error(e)
        }
    }

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find(item => Number(item.id) === Number(obj.id))) {
                axios.delete(`http://localhost:3001/favorites/${obj.id}`)
                setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
            } else {
                const {data} = await axios.post('http://localhost:3001/favorites', obj)
                setFavorites(prev => [...prev, data])
            }
        } catch (e) {
            alert("Не удалось добавить в фавориты")
            console.error(e)
        }
    }

    const onChangeSearchInput = (e) => {
        setSearchValue(e.target.value)
    }

    const isItemAdded = (id) => {
        return cartItems.some(obj => Number(obj.id) === Number(id))
    }

    return (
        <AppContext.Provider
            value={{favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems, cartItems, onAddToCart}}>
            <div className="wrapper clear">
                <Drawer
                    onClose={() => setCartOpened(false)}
                    onRemoveFromCart={onRemoveFromCart}
                    opened={cartOpened}
                />
                <Header onClickCart={() => setCartOpened(true)}/>
                <Route path="/" exact>
                    <Home
                        searchValue={searchValue}
                        items={items}
                        cartItems={cartItems}
                        setSearchValue={setSearchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToCart={onAddToCart}
                        onAddToFavorite={onAddToFavorite}
                        isLoading={isLoading}
                    />
                </Route>
                <Route path="/favorites" exact>
                    <Favorites onAddToFavorite={onAddToFavorite} onAddToCart={onAddToCart}/>
                </Route>
                <Route path="/orders" exact>
                    <Orders/>
                </Route>
            </div>
        </AppContext.Provider>
    );
}

export default App;
