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

        
        // "items": [
        //     {
        //       "displayValue": "256GB",
        //       "value": "256GB",
        //       "id": "256GB"
        //     },
        //     {
        //       "displayValue": "512GB",
        //       "value": "512GB",
        //       "id": "512GB"
        //     }
        //   ],
        //     "type": "text",
        //     "name": "Capacity"
        
        
    }



    render () {
        return (
            <>
                <h1 className="input-header">{this.state.name.toUpperCase()}:</h1>
                <div className="text-input__wrapper">
                    { this.state.items.map(element => 
                        <div className="text-input__inner-wrapper" key={element.id}>
                            <input 
                                onClick={()=>{console.log(element.id)}}
                                className="text-input" 
                                type="radio" 
                                id={element.id} 
                                name="size" 
                                value={element.displayValue} 
                            />
                            <label className="text-input-label" htmlFor={element.id}>{element.value}</label> 
                        </div>  
                    )}
                </div> 
            </>
        )
    }
}