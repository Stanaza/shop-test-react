import React from 'react';
import {Link} from "react-router-dom";
import {useCart} from "../hooks/useCart";

const Header = ({onClickCart}) => {

    const {totalPrice} = useCart()
    return (
        <header className='d-flex justify-between align-center p-40'>
            <Link to="/">
                <div className='d-flex align-center'>
                    <img width={40} height={40} src="img/store.png" alt="logo"/>
                    <div>
                        <h3 className='text-uppercase'>React shop</h3>
                        <p className='opacity-5'>Магазин кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className='d-flex'>
                <li className='mr-30 cu-p' onClick={onClickCart}>
                    <img width={18} height={18} src="img/cart.svg" alt="cart"/>
                    <span>{totalPrice}руб.</span>
                </li>
                <li className='mr-20 cu-p'>
                    <Link to="/favorites">
                        <img width={18} height={18} src="img/heart.svg" alt="heart"/>
                    </Link>
                </li>
                <li className='mr-20 cu-p'>
                    <Link to="/orders">
                        <img width={18} height={18} src="img/user.svg" alt="user"/>
                    </Link>
                </li>
            </ul>
        </header>
    );
};

export default Header;