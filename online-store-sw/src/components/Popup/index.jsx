//Core
import React from 'react';

//Local
import TextInput from '../Inputs/TextInput';
import SwatchInput from '../Inputs/SwatchInput';
import './index.css';

export default class Popup extends React.Component {
    render() {
        const { data, PCHandleInputCallback, PCAddToCartCallback } = this.props;
        return (
            <div className="popup-wrapper">
                { data ?
                    data.attributes?.map((attribute) => {
                        return attribute.type === 'text' ?
                            <TextInput key={ attribute.id } dataArr={ attribute } pdpCallback = { PCHandleInputCallback } /> 
                            : 
                            <SwatchInput key={ attribute.id } dataArr={ attribute } pdpCallback = { PCHandleInputCallback }  />;
                    }) 
                    :
                    null
                }    
                    <button className="info-form__submit-button" onClick={ PCAddToCartCallback } type="submit" >ADD TO CART</button>
                    
            </div>
        )
    }
}