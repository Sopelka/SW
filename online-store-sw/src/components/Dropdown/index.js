import React from 'react';
import './index.css'

export default class Dropdown extends React.Component {

    constructor() {
        super()

        this.state = {
            selectedCurrency: {
                "label": "USD",
                "symbol": "$"
            },
            dropdownOpen: false,
        }


        this.openDropdown = this.openDropdown.bind(this);
        this.choseCurrency = this.choseCurrency(this);

        this.showState = this.showState(this);
    }

    //toggleDropdown ?
    openDropdown(){
        console.log('+++++++++++++++++++++++')
        console.log('this.state1', this.state)

        this.setState ({dropdownOpen: !(this.state.dropdownOpen)})

        console.log('this.state2', this.state)
        
    }

    choseCurrency() {

    }

    showState(){
        console.log('this.state3', this.state)
    }

    render(){
        return(
            <>
                <button onClick={ this.showState }>ZMI</button>

                <div className="dropdown__wrapper">
                    <div onClick={ this.openDropdown } className="dropdown__selected">
                        <p className="selected-currency-symbol">$</p>

                        <svg className="currency-chevron-down-icon" width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 0.5L4 3.5L7 0.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        <svg className="currency-chevron-up-icon" width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 3.5L4 0.5L7 3.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className={ `${this.state.dropdownOpen ? 'dropdown__options' : 'hiddenObj' }` }>
                        <p className="dropdown__option">&#36; USD</p>
                        <p className="dropdown__option">&#8364; EUR</p>
                        <p className="dropdown__option">&#165; JPY</p>
                        <p className="dropdown__option">&#36; USD</p>
                        <p className="dropdown__option">&#8364; EUR</p>
                    </div>
                </div>
            </>
        )
    }
}


// 24.08 
// странно отображается стейт (не актуально), не работает метод на кнопке
// менять шевроны по открытию/закрытию

// 1. У нас есть стейт, где лежит текущая валюта, (открыт и закрыт попап)
// 2. по клику на кнопочку каррент, открываем попап
// 3. по клику на валюту, меняем валюту в стейте, в карренте, закрываем попап

// проверка локализации