import React from 'react';
import './index.css';

import TextInput from '../Inputs/TextInput';
import SwatchInput from '../Inputs/SwatchInput';

export default class CartItem extends React.Component {
     render () {
        return (
            <div className="cart-item__container">
                <div className="cart-item__left-static-part">
                    <p className="left-static-part__brand-name">Apollo</p>
                    <p className="left-static-part__item-name">Running Short</p>
                    <p className="left-static-part__price">$50.00</p>

                    {/* foreach attribute */}
                    <div className="left-static-part__input-container">
                        <div className="left-static-part__input-protector" />
                        <TextInput />
                    </div>
                    
                    <SwatchInput />
                </div>

                
                <div className="cart-item__right-dynamic-part">
                    <div className="right-dynamic-part__count-btn-container">
                        <button className="right-dynamic-part__count-btn-increase">+</button>
                        <p className="right-dynamic-part__counter">0</p>
                        <button className="right-dynamic-part__count-btn-decrease">-</button>
                    </div>
                    <div className="right-dynamic-part__image-slider">
                        <img className="image-slider__image" src="./proba.jpg" alt="product" />
                    </div>
                </div>
            </div>
            
        )
     }
}