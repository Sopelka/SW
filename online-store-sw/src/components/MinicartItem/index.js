import React from "react";
import './index.css';

import TextInput from "../Inputs/TextInput";
import SwatchInput from "../Inputs/SwatchInput";

export default class MinicartItem extends React.Component{

    render(){
        return(
            <>
                <div className="minicart-item__info-wrapper">
                    <p className="minicart__info__brand-name">Apollo</p>
                    <p className="minicart__info__item-name">Running Short</p>
                    <p className="minicart__info__price">$50.00</p>
                    
                    <TextInput size="small" active={false} />
                    <SwatchInput size="small" active={false}/>
                </div>
                <div className="minicart-item__action-wrapper"></div>
            </>
        )
    }
}