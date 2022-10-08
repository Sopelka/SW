//Core
import React from 'react';

//Locals
import './SwatchInput.css';

export default class SwatchInput extends React.Component {
    constructor() {
        super();
         
        this.handleInput = this.handleInput.bind(this);
        this.showChosenInputs = this.showChosenInputs.bind(this);
    }

    handleInput(event) {
        this.props.pdpCallback(event.target);
    }

    showChosenInputs(element) {
        let result = null;

        for (let key in this.props.chosenOptions) {
            if (key.includes(this.props.dataArr.name) && this.props.chosenOptions[key] === element.id) {
                result = 'checked';
            }
        }

        return result;
    }

    render() {
        const mode = this.props.size === 'small' ? '__minicart' : '' ;
        return (
            <>
                <h1 className = { `input-header${mode}` }>{ this.props.dataArr?.name }:</h1>
                <div className = { `swatch-input__wrapper${mode}` }>

                { this.props.active ? null : <div className={`input__protector${mode}`}/> }

                    { this.props.dataArr?.items?.map((element) =>  
                        <div className = {`swatch-input__inner-wrapper${mode}`} key = { element.id }>
                            <input 
                                required
                                onClick = { this.handleInput }
                                className = {`swatch-input${mode} input${mode}`}
                                type = "radio" 
                                id = { element.id } 
                                name = { this.props.active ? this.props.dataArr?.name : `${mode} ${JSON.stringify(this.props.chosenOptions)} ${this.props.dataArr.name}`}  
                                value = { element.displayValue } 
                                data-swatch = { element.value } 
                                defaultChecked = { this.showChosenInputs(element) }
                            />
                            <label 
                                style = { {backgroundColor: element.value} } 
                                className = {`swatch-input-label${mode}`}
                                htmlFor = { element.id } 
                                
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
