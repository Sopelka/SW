import React from 'react';
import './TextInput.css';

export default class TextInput extends React.Component {
    constructor() {
        super();
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(event){
        this.props.pdpCallback (event.target)
    }

    render() {
        const mode = this.props.size === 'small' ? '__minicart' : '' ;
        console.log('textInputPROPS', this.props)
        return(
            <>
                <h1 className={`input-header${mode}`}>{ this.props.dataArr?.name }:</h1>
                <div className={`text-input__wrapper${mode}`}>

                    { this.props.active ? null : <div className={`input__protector${mode}`}/> }

                    { this.props.dataArr?.items?.map((element) => 
                        <div className={`text-input__inner-wrapper${mode}`} key={element.id} >  
                            <input 
                                required
                                onClick = { this.handleInput }
                                className = { `text-input${mode}` }
                                type = "radio" 
                                id = { element.id } 
                                name = { this.props.dataArr?.name } 
                                value = { element.displayValue } 
                            />
                            <label className={`text-input-label${mode}`} htmlFor={element.id}>{element.value}</label> 
                        </div>  
                    )}
                </div> 
            </>
        )
    }

}

TextInput.defaultProps = {
    size: 'normal',
    active: true,
}