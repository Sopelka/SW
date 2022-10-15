//Core
import React from 'react';

//Locals
import './index.css';
import TextInput from '../Inputs/TextInput';
import SwatchInput from '../Inputs/SwatchInput';
import CartItemCounter from '../CartItemCounter';
import CartItemSlider from '../CartItemSlider';

export default class CartItem extends React.Component {
     render() {
        const { data, newCurrency, cartCounterCallback } = this.props;

        return (
            <div className="cart-item__container">
                <div className="cart-item__left-static-part">
                    <p className="left-static-part__brand-name">{ data.brand }</p>
                    <p className="left-static-part__item-name">{ data.name }</p>
                    <p className="left-static-part__price">

                        { data?.prices?.map((potentialPrice) => {
                                return potentialPrice.currency.label === newCurrency[1] ? `${ newCurrency[0] } ${(potentialPrice.amount).toFixed(2)}` : null;
                            })
                        }

                    </p>
                    <div className="left-static-part__input-container">

                        { data?.attributes?.length === 0 ?
                            null
                            :
                            data?.attributes?.map((element, index) => {
                                return( element.type === 'text' ? 
                                    <TextInput 
                                        key = { index } 
                                        active = { false } 
                                        chosenOptions = { data.inputsInfo } 
                                        dataArr = { element }
                                    />
                                    : 
                                    <SwatchInput 
                                        key = { index } 
                                        active = { false } 
                                        chosenOptions = { data.inputsInfo } 
                                        dataArr = { element }
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <div className="cart-item__right-dynamic-part">
                    <CartItemCounter  data = { data } cartCounterCallback = { cartCounterCallback }/>
                    <CartItemSlider  data = { data } />
                </div>
            </div>
        )
     }
}
