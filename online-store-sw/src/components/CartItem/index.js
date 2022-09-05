import React from 'react';
import './index.css';

import TextInput from '../Inputs/TextInput';
import SwatchInput from '../Inputs/SwatchInput';
import CartItemCounter from '../CartItemCounter';
import CartItemSlider from '../CartItemSlider';

export default class CartItem extends React.Component {
     render() {
        return (
            <div className="cart-item__container">
                <div className="cart-item__left-static-part">
                    <p className="left-static-part__brand-name">Apollo</p>
                    <p className="left-static-part__item-name">Running Short</p>
                    <p className="left-static-part__price">$50.00</p>

                    {/* foreach attribute */}
                    <div className="left-static-part__input-container">
                        <TextInput />
                        <SwatchInput />
                    </div>
                </div>

                <div className="cart-item__right-dynamic-part">
                    <CartItemCounter />
                    <CartItemSlider />
                </div>
            </div>
        )
     }
}
