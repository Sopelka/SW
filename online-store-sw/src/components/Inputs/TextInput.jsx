//Core
import React from 'react';

//Locals
import './TextInput.css';

export default class TextInput extends React.Component {
    constructor() {
        super();

        this.handleInput = this.handleInput.bind(this);
        this.showChosenInputs = this.showChosenInputs.bind(this);
        this.setUniqueStyle = this.setUniqueStyle.bind(this);
    }

    setUniqueStyle(mode, element) {
        let res = {};

        if (mode === '__minicart') {
            if (element.value.includes('1T') || element.value.includes('512G') || element.value.includes('256GB')) {
                res = { width: 50 + 'px'}
            }
            else if (element.value.includes('Yes') || element.value.includes('No') ){
                res = { width: 30 + 'px'}
            }
            else {
                res = { width: 24 + 'px'}
            }
        }

        return res;
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
                break;
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
                <div className =  { `text-input__wrapper${mode}` }>

                    { active ? null : <div className = { `input__protector${mode}` }/> }

                    { 
                        dataArr?.items?.map((element) => {
                            return (
                                <div className = { `text-input__inner-wrapper${mode}`} key = { element.id } >  
                                    <input 
                                        required
                                        onClick = { this.handleInput }
                                        className = { `text-input${mode} input${mode}` }
                                        type = "radio" 
                                        id = { element.id } 
                                        name = { active ? dataArr?.name : `${mode} ${ JSON.stringify(chosenOptions) } ${ dataArr.name }`} 
                                        value = { element.displayValue } 
                                        defaultChecked = { this.showChosenInputs(element) }
                                        style = { this.setUniqueStyle(mode, element) }
                                    />
                                    <label 
                                        className = { `text-input-label${mode}` }
                                        htmlFor = { element.id }
                                        style = { this.setUniqueStyle(mode, element) }
                                    >{ element.value }
                                    </label> 
                                </div>  
                            )            
                        })
                    }
                </div> 
            </>
        )
    }
}

TextInput.defaultProps = {
    size: 'normal',
    active: true,
}

