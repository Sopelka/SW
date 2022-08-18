import React from 'react';
import './index.css'

export default class Dropdown extends React.Component {
    render(){
        return(
            <>
                <select >
                    <option value="&#36;">&#36; USD</option>
                    <option value="&#8364;">&#8364; EUR</option>
                    <option value="&#165;">&#165; JPY</option>
                </select>

                <div className="dropdown__wrapper">
                    <div className="dropdown__selected">
                        <p className="selected-currency-symbol">$</p>

                        <svg className="currency-chevron-down-icon" width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 0.5L4 3.5L7 0.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        <svg className="currency-chevron-up-icon" width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 3.5L4 0.5L7 3.5" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div className="dropdown__options">
                        <p className="dropdown__option">&#36; USD</p>
                        <p className="dropdown__option">&#8364; EUR</p>
                        <p className="dropdown__option">&#165; JPY</p>
                    </div>

                </div>
            </>
        )
    }
}