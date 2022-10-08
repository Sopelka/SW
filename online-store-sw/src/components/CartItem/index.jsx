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
        return (
            <div className="cart-item__container">
                <div className="cart-item__left-static-part">
                    <p className="left-static-part__brand-name">{ this.props.data.brand }</p>
                    <p className="left-static-part__item-name">{ this.props.data.name }</p>
                    <p className="left-static-part__price">

                        { this.props.data?.prices?.map((potentialPrice) => {
                                return potentialPrice.currency.label === this.props.newCurrency[1] ? `${this.props.newCurrency[0]} ${potentialPrice.amount}` : null;
                            })
                        }

                    </p>
                    <div className="left-static-part__input-container">

                        { this.props.data?.attributes?.length === 0 ?
                            null
                            :
                            this.props.data?.attributes?.map((element, index) => {
                                return( element.type === 'text' ? 
                                    <TextInput 
                                        key = { index } 
                                        active = { false } 
                                        chosenOptions = { this.props.data.inputsInfo } 
                                        dataArr = { element }
                                    />
                                    : 
                                    <SwatchInput 
                                        key = { index } 
                                        active = { false } 
                                        chosenOptions = { this.props.data.inputsInfo } 
                                        dataArr = { element }
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <div className="cart-item__right-dynamic-part">
                    <CartItemCounter  data = { this.props.data } cartCounterCallback = { this.props.cartCounterCallback }/>
                    <CartItemSlider  data = { this.props.data } />
                </div>
            </div>
        )
     }
}
