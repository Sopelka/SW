import React from 'react';
import './SwatchInput.css';

export default class SwatchInput extends React.Component {
    constructor() {
        super();
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(event){
        this.props.pdpCallback(event.target);
    }

    render() {
        const mode = this.props.size === 'small' ? '__minicart' : '' ;
        console.log('swatchInputProps', this.props)
        return (
            <>
                <h1 className={`input-header${mode}`}>{ this.props.dataArr?.name }:</h1>
                <div className={`swatch-input__wrapper${mode}`}>

                { this.props.active ? null : <div className={`input__protector${mode}`}/> }

                    { this.props.dataArr?.items?.map((element, index) =>  
                        <div className={`swatch-input__inner-wrapper${mode}`} key={ element.id }>
                            <input 
                                required
                                onClick = { this.handleInput }
                                className = {`swatch-input${mode} input${mode}`}
                                type = "radio" 
                                id = { element.id } 
                                name = { this.props.dataArr?.name } 
                                value = { element.displayValue } 
                                data-swatch = { element.value } 
                                defaultChecked = { this.props?.chosenOptions && element?.id === Object.values(this.props?.chosenOptions)[index] ? 'checked' : null }
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