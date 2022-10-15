//Core
import React from 'react';

//Local
import TextInput from '../Inputs/TextInput';
import SwatchInput from '../Inputs/SwatchInput';
import './index.css';

export default class Popup extends React.Component {
    render(){
        return (
            <div className="popup-wrapper">
                { this.props.data ?
                    this.props.data.attributes?.map((attribute) => {
                        return attribute.type === 'text' ?
                            <TextInput key={ attribute.id } dataArr={ attribute } pdpCallback = { this.props.PCHandleInputCallback } /> 
                            : 
                            <SwatchInput key={ attribute.id } dataArr={ attribute } pdpCallback = { this.props.PCHandleInputCallback }  />;
                    }) 
                    :
                    null
                }    
                    <button className="info-form__submit-button" onClick={ this.props.PCAddToCartCallback } type="submit" >ADD TO CART</button>
                    
            </div>
        )
    }
}