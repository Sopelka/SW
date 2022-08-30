import React from 'react';
import './SwatchInput.css';

export default class SwatchInput extends React.Component {
    state = {
        "items": [
            {
                "displayValue": "Green",
                "value": "#44FF03",
                "id": "Green"
            },
            {
                "displayValue": "Cyan",
                "value": "#03FFF7",
                "id": "Cyan"
            },
            {
                "displayValue": "Blue",
                "value": "#030BFF",
                "id": "Blue"
            },
            {
                "displayValue": "Black",
                "value": "#000000",
                "id": "Black"
            },
            {
                "displayValue": "White",
                "value": "#FFFFFF",
                "id": "White"
            }
          ],
            "type": "swatch",
            "name": "Color",
            "active": false,
    }



    render () {
        return (
            <>
                <h1 className="input-header">{ this.state.name.toUpperCase() }:</h1>
                <div className="swatch-input__wrapper">
                    { this.state.items.map(element => 
                        <div className="swatch-input__inner-wrapper" key={ element.id }>
                            <input 
                                onClick={()=>{ console.log(element.id)} }
                                className="swatch-input" 
                                type="radio" 
                                id={ element.id } 
                                name="color" 
                                value={ element.displayValue } 
                                data-swatch={ element.value } 
                            />
                            <label 
                                style={ {backgroundColor: element.value} } 
                                className="swatch-input-label" 
                                htmlFor={ element.id } 
                                
                            />
                        </div>  
                    ) }
                </div> 
            </>
        )
    }
}