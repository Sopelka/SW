import React from 'react';
import './SwatchInput.css';

export default class SwatchInput extends React.Component {
    constructor() {
        super();

        this.state = {
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
                }],

            type: "swatch",
            name: "Color",
            active: false,
        }
    }

    render() {
        const mode = this.props.size === 'small' ? '__minicart' : '' ;

        return (
            <>
                <h1 className={`input-header${mode}`}>{ this.state.name }:</h1>
                <div className={`swatch-input__wrapper${mode}`}>
                { this.props.active ? null : <div className={`input__protector${mode}`}/> }
                    { this.state.items.map(element => 
                        <div className={`swatch-input__inner-wrapper${mode}`} key={ element.id }>
                            <input 
                                onClick={()=>{ console.log(element.id)} }
                                className={`swatch-input${mode}`}
                                type="radio" 
                                id={ element.id } 
                                name="color" 
                                value={ element.displayValue } 
                                data-swatch={ element.value } 
                            />
                            <label 
                                style={ {backgroundColor: element.value} } 
                                className={`swatch-input-label${mode}`}
                                htmlFor={ element.id } 
                                
                            />
                        </div>  
                    )}
                </div> 
            </>
        )
    }
}

SwatchInput.defaultProps = {
    size: 'normal',
    active: true,
}