//Core
import React from "react";

//Locals
import './index.css';
import TextInput from "../Inputs/TextInput";
import SwatchInput from "../Inputs/SwatchInput";
import CartItemCounter from "../CartItemCounter";
import CartItemSlider from "../CartItemSlider";

export default class MinicartItem extends React.Component {
    render() {
        const { data, newCurrency, cartCounterCallback } = this.props;
        
        return (
            <div className="minicart-item__wrapper">
                <div className="minicart-item__info-wrapper">
                    <p className="minicart__info__brand-name">{ data.brand }</p>
                    <p className="minicart__info__item-name">{ data.name }</p>
                    <p className="minicart__info__price">

                        { data?.prices?.map((potentialPrice) => {
                            return potentialPrice.currency.label === newCurrency[1] ? `${ newCurrency[0] } ${ (potentialPrice.amount).toFixed(2) }` : null;
                        })}

                    </p>

                    { data?.attributes?.length === 0 ?
                        null
                        :
                        data?.attributes?.map((element, index) => {
                            return( element.type === 'text' ? 
                                <TextInput 
                                    key = { index } 
                                    size = "small" 
                                    active = { false } 
                                    chosenOptions = { data.inputsInfo } 
                                    dataArr = { element }
                                />
                                : 
                                <SwatchInput 
                                    key = { index } 
                                    size = "small" 
                                    active = { false } 
                                    chosenOptions = { data.inputsInfo } 
                                    dataArr = { element }
                                />
                            )

                        })
                    }
                </div>
                <div className="minicart-item__action-wrapper">
                    <CartItemCounter size="small" data = { data } cartCounterCallback = { cartCounterCallback } />
                    <CartItemSlider size="small" data = { data } />
                </div>
            </div>
        )
    }
}
