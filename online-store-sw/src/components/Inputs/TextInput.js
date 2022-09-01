import React from 'react';
import './TextInput.css';

export default class TextInput extends React.Component {
    state = {
        items: [
            {
                "displayValue": "Small",
                "value": "S",
                "id": "Small",
            },{
                "displayValue": "Medium",
                "value": "M",
                "id": "Medium",
            },{
                "displayValue": "Large",
                "value": "L",
                "id": "Large",
            },{
                "displayValue": "Extra Large",
                "value": "XL",
                "id": "Extra Large",
            }
        ],
        "type": "text",
        "name": "Size"

    }

    render () {
        const mode = this.props.size === 'small' ? '__mini-cart' : '' ;
        
        return (
            <>
                {console.log("TextInput props -", this.props)}

                <h1 className={`input-header${mode}`}>{this.state.name}:</h1>
                <div className={`text-input__wrapper${mode}`}>
                    {this.props.active ? null : <div className={`input__protector${mode}`}/>}
                    { this.state.items.map(element => 
                        <div className={`text-input__inner-wrapper${mode}`} key={element.id}>
                            <input 
                                onClick={()=>{console.log(element.id)}}
                                className={`text-input${mode}`}
                                type="radio" 
                                id={element.id} 
                                name="size" 
                                value={element.displayValue} 
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