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
                <div className="cart__summary-container">
                    <div className="summary__property-wrapper">
                        <p className="summary__property">Tax 21%:</p>
                        <p className="summary__property">Quantity:</p>
                        <p className="summary__total">Total:</p>
                    </div>
                    <div className="summary__data-wrapper">
                        <p className="summary__data-tax summary__data">$42.00</p>
                        <p className="summary__data-quantity summary__data">3</p>
                        <p className="summary__data-total summary__data">$200.00</p>
                    </div>
                </div>
                <button className="cart__order-button">ORDER</button>
                
            </>
        )
     }
}