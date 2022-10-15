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
        const { pdpCallback } = this.props;

        pdpCallback(event.target);
    }

    showChosenInputs(element) {
        let result = null;
        const { dataArr, chosenOptions } = this.props;

        for (let key in chosenOptions) {
            if (key.includes(dataArr.name) && chosenOptions[key] === element.id) {
                result = 'checked';
            }
        }

        return result;
    }

    render() {
        const mode = this.props.size === 'small' ? '__minicart' : '' ;
        const { dataArr, active, chosenOptions } = this.props;

        return (
            <>
                <h1 className = { `input-header${mode}` }>{ dataArr?.name }:</h1>
                <div className = { `swatch-input__wrapper${mode}` }>

                { active ? null : <div className={`input__protector${mode}`}/> }

                    { dataArr?.items?.map((element) =>  
                        <div className = {`swatch-input__inner-wrapper${mode}`} key = { element.id }>
                            <input 
                                required
                                onClick = { this.handleInput }
                                className = {`swatch-input${mode} input${mode}`}
                                type = "radio" 
                                id = { element.id } 
                                name = { active ? dataArr?.name : `${mode} ${JSON.stringify(chosenOptions)} ${dataArr.name}`}  
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
