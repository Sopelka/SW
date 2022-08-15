import React from 'react';
import './SwatchInput.css';

export default class ColorInput extends React.Component {
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
                <h1 className="input-header">{this.state.name.toUpperCase()}:</h1>
                <div className="color-input__wrapper">
                    { this.state.items.map(element => 
                        <div className="color-input__inner-wrapper" key={element.id}>
                            <input 
                                onClick={()=>{console.log(element.id)}}
                                className="color-input" 
                                type="radio" 
                                id={element.id} 
                                name="color" 
                                value={element.displayValue} 
                                data-color={element.value} 
                            />
                            <label 
                                style={{backgroundColor: element.value}} 
                                className="color-input-label" 
                                htmlFor={element.id} 
                                
                            />
                        </div>  
                    )}
                </div> 
            </>
        )
    }
}