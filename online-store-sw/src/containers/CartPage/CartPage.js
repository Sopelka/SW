import React from 'react';
import './CartPage.css';

import CartItem from '../../components/CartItem';


export default class CartPage extends React.Component {
     render () {
        return (
            <>
                <h1 className="cart__main-header">CART</h1>
                {/* map all the goods */}
                <CartItem />
            </>
        )
     }
}