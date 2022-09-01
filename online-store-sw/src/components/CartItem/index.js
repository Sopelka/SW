import React from 'react';
import './index.css';

import TextInput from '../Inputs/TextInput';
import SwatchInput from '../Inputs/SwatchInput';
import CartItemCounter from '../CartItemCounter';

export default class CartItem extends React.Component {
     render () {
        return (
            <div className="cart-item__container">
                {console.log("CARTITEM")}
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

                    {/* <div className="right-dynamic-part__count-btn-container">
                        <div className="right-dynamic-part__count-btn-increase right-dynamic-part__count-btn">
                            <svg width="17" height="1" viewBox="0 0 17 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 0.5H16" stroke="#1D1F22" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <svg width="1" height="17" viewBox="0 0 1 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 1V16" stroke="#1D1F22" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <p className="right-dynamic-part__counter">0</p>
                        <div className="right-dynamic-part__count-btn-decrease right-dynamic-part__count-btn">
                            <svg width="17" height="1" viewBox="0 0 17 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 0.5H16" stroke="#1D1F22" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div> */}

                    <CartItemCounter />

                    <div className="right-dynamic-part__image-slider">
                        <img className="image-slider__image" src="./proba.jpg" alt="product" />
                        <div className="right-dynamic-part__slider-btn-left right-dynamic-part__slider-btn">
                            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                <path d="M7.25 1.06857L1.625 6.6876L7.25 12.3066" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="right-dynamic-part__slider-btn-right right-dynamic-part__slider-btn">
                            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.75 1.06808L6.375 6.68711L0.75 12.3062" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>

                </div>
            </div>
            
        )
     }
}