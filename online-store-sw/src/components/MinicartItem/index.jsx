//Core
import React from "react";

//Locals
import './index.css';
import TextInput from "../Inputs/TextInput";
import SwatchInput from "../Inputs/SwatchInput";
import CartItemCounter from "../CartItemCounter";
import CartItemSlider from "../CartItemSlider";

export default class MinicartItem extends React.Component{
    render() {
        return (
            <div className="minicart-item__wrapper">
                <div className="minicart-item__info-wrapper">
                    <p className="minicart__info__brand-name">{ this.props.data.brand }</p>
                    <p className="minicart__info__item-name">{ this.props.data.name }</p>
                    <p className="minicart__info__price">
                        { this.props.data?.prices?.map((potentialPrice) => {
                            return potentialPrice.currency.label === this.props.newCurrency[1] ? `${this.props.newCurrency[0]} ${potentialPrice.amount}` : null;
                        })}
                    </p>
                    { this.props.data?.attributes?.length === 0 ?
                        null
                        :
                        this.props.data?.attributes?.map((element, index)=>{
                            return( element.type === 'text' ? 
                                <TextInput 
                                    key = { index } 
                                    size="small" 
                                    active={ false } 
                                    chosenOptions = { this.props.data.inputsInfo } 
                                    dataArr = { element }
                                />
                                : 
                                <SwatchInput 
                                    key = { index } 
                                    size="small" 
                                    active={ false } 
                                    chosenOptions = { this.props.data.inputsInfo } 
                                    dataArr = { element }
                                />
                            )

                        })
                    }
                </div>
                <div className="minicart-item__action-wrapper">
                    <CartItemCounter size="small" data = { this.props.data } cartCounterCallback = { this.props.cartCounterCallback } />
                    <CartItemSlider size="small" data = { this.props.data } />
                </div>
            </div>
        )
    }
}