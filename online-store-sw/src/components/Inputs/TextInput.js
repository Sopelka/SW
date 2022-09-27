import React from 'react';
import './TextInput.css';

export default class TextInput extends React.Component {
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
        console.log('textInputPROPS', this.props)
        return(
            <>
                <h1 className={`input-header${mode}`}>{ this.props.dataArr?.name }:</h1>
                <div className={`text-input__wrapper${mode}`}>

                    { this.props.active ? null : <div className={`input__protector${mode}`}/> }

                    { 
                        this.props.dataArr?.items?.map((element) => {
                            return (
                                <div className={ `text-input__inner-wrapper${mode}`} key={element.id} >  
                                    <input 
                                        required
                                        onClick = { this.handleInput }
                                        className = { `text-input${mode} input${mode}` }
                                        type = "radio" 
                                        id = { element.id } 
                                        name = { this.props.active ? this.props.dataArr?.name : `${JSON.stringify(this.props.chosenOptions)} ${this.props.dataArr.name}`} 
                                        value = { element.displayValue } 
                                        defaultChecked = { this.showChosenInputs(element) }
                                    />
                                    <label className={`text-input-label${mode}`} htmlFor={element.id}>{element.value}</label> 
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
