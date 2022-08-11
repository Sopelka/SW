import React from 'react';
import './SizeInput.css';

export default class SizeInput extends React.Component {
    state = {
        inputs: [
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
        ]
    }



    render () {
        return (
            <>
                <h1 className="input-header">SIZE:</h1>
                <div className="size-input__wrapper">
                    { this.state.inputs.map(element => 
                        <div className="size-input__inner-wrapper">
                            <input onClick={()=>{alert(element.id)}} className="size-input" type="radio" id={element.id} name="size" value={element.displayValue} />
                            <label className="size-input-label" for={element.id}>{element.value}</label> 
                        </div>  
                    )}
                </div> 
            </>
        )
    }
}