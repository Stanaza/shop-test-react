import React, {useState} from 'react';
import axios from "axios";

import {useCart} from "../../hooks/useCart";
import Info from "../Info";

import styles from './Drawer.module.scss';


const delay = () => new Promise((resolve) => setTimeout(resolve,1000))

const Drawer = ({onClose, onRemoveFromCart, opened}) => {
    const [orderId, setOrderId] = useState(null)
    const [isOrderComplete, setIsOrderComplete] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const {cartItems, setCartItems, totalPrice} = useCart()

    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.post('http://localhost:3000/orders', {items: cartItems})
            setOrderId(data.id)
            setCartItems([])
            setIsOrderComplete(true)
            for (let i = 0; i < cartItems; i++) {
                const item = cartItems[i]
                await axios.delete('http://localhost:3000/cart', item.id);
                await delay()
            }
        } catch (e) {
            alert('Не удалось создать заказ :(')
        }
        setIsLoading(false)
    }

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2 className='mb-40 d-flex justify-between'>
                    Корзина
                    <img className='removeBtn cu-p' src="img/delete-btn.svg" alt="delete" onClick={onClose}/>
                </h2>
                {
                    cartItems.length > 0
                        ?
                        <>
                            <div className={styles.items}>
                                {cartItems.map((item =>
                                        <div className="cartItem d-flex align-center mb-20" key={item.id}>
                                            <div
                                                style={{backgroundImage: `url(${item.imgUrl})`}}
                                                className="cartItemImg">
                                            </div>
                                            <div className='mr-20 flex'>
                                                <p className='mb-5'>{item.name}</p>
                                                <b>{item.price} руб.</b>
                                            </div>
                                            <img className='removeBtn' src="img/delete-btn.svg" alt="delete"
                                                 onClick={() => onRemoveFromCart(item.id)}/>
                                        </div>
                                ))}
                            </div>
                            <div className={styles.cartTotalBlock}>
                                <ul>
                                    <li>
                                        <span>Итого:</span>
                                        <div></div>
                                        <b>{totalPrice} руб. </b>
                                    </li>
                                    <li>
                                        <span>Налог 5%: </span>
                                        <div></div>
                                        <b>{Math.round(totalPrice*0.05)} руб. </b>
                                    </li>
                                </ul>
                                <button onClick={onClickOrder} disabled={isLoading} className='greenBtn'>Оформить заказ <img src="img/arrow.svg" alt="arrow"/>
                                </button>
                            </div>
                        </>
                        :
                        <Info title={isOrderComplete ? 'Заказ оформлен' : 'Корзина пустая'}
                              img={isOrderComplete ?  'img/order.png' : 'img/empty-cart.jpg'}
                              description={isOrderComplete ?    `Ваш заказ #${orderId} будет скоро передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовокб что бы сделать заказ'}
                        />
                }
            </div>
        </div>
    );
}

export default Drawer;