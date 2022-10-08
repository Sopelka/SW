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
        this.props.pdpCallback(event.target);
    }

    showChosenInputs(element) {
        let result = null;

        for (let key in this.props.chosenOptions) {
            if (key.includes(this.props.dataArr.name) && this.props.chosenOptions[key] === element.id) {
                result = 'checked';
                break;
            }
        }

        return result;
    }

    render() {
        const mode = this.props.size === 'small' ? '__minicart' : '' ;
        return (
            <>
                <h1 className = { `input-header${mode}` }>{ this.props.dataArr?.name }:</h1>
                <div className =  { `text-input__wrapper${mode}` }>

                    { this.props.active ? null : <div className = { `input__protector${mode}` }/> }

                    { 
                        this.props.dataArr?.items?.map((element) => {
                            return (
                                <div className = { `text-input__inner-wrapper${mode}`} key = { element.id } >  
                                    <input 
                                        required
                                        onClick = { this.handleInput }
                                        className = { `text-input${mode} input${mode}` }
                                        type = "radio" 
                                        id = { element.id } 
                                        name = { this.props.active ? this.props.dataArr?.name : `${mode} ${JSON.stringify(this.props.chosenOptions)} ${this.props.dataArr.name}`} 
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

