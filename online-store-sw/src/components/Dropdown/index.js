import React from 'react';
import './index.css'

export default class Dropdown extends React.Component {

    constructor() {
        super();

        this.state = {
            currencies: [{
                label: "USD",
                symbol: "$"
            },{
                label: "GBP",
                symbol: "£"
            },{
                label: "AUD",
                symbol: "A$"
            },{
                label: "JPY",
                symbol: "¥"
            },{
                label: "RUB",
                symbol: "₽"
            }],

            selectedCurrency: {
                label: "USD",
                symbol: "$"
            },

            dropdownOpen: false,
        }


        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.choseCurrency = this.choseCurrency.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
    }


    componentWillUnmount() {
        document.removeEventListener('click', this.closeDropdown, false);
    }

    componentDidMount() {
        document.addEventListener('click', this.closeDropdown, false);
    }

    closeDropdown(event) {
        if (this.state.dropdownOpen){
            if (event.target.className !== 'dropdown__option' && event.target.className !== 'dropdown__selected'){
                this.setState({
                    dropdownOpen: false
                })
            }
        }
    }

    toggleDropdown() {
        this.setState(prevValue => ({
            dropdownOpen: !prevValue.dropdownOpen
        }))
    }

    choseCurrency(event) {
        if (event.target.className === 'dropdown__option') {
            const newCurrencyArray = event.target.textContent.split(' ');

            this.setState({
                dropdownOpen: false,
                selectedCurrency: {
                    label: newCurrencyArray[1],
                    symbol: newCurrencyArray[0]
                },
            })
        }
    }

    render(){
        return(
            <>
                <div className="dropdown__wrapper">
                    <div onClick={ this.toggleDropdown } className="dropdown__selected">
                        <p className="selected-currency-symbol">{ this.state.selectedCurrency.symbol }</p>

                        { this.state.dropdownOpen ? 
                            <svg className="currency-chevron-up-icon" width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 3.5L4 0.5L7 3.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            :
                            <svg className="currency-chevron-down-icon" width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 0.5L4 3.5L7 0.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        }
                    </div>

                    <div className={ `${this.state.dropdownOpen ? 'dropdown__options' : 'hiddenObj' }` }>
                        { this.state.currencies.map((el) => {
                            return <p 
                                key={ el.label } 
                                className="dropdown__option"
                                onClick={ this.choseCurrency }>{ `${el.symbol} ${el.label}` }</p>
                        }) }
                    </div>
                </div>
            </>
        )
    }
}

// проверка локализации
// при нажатии на потомка, событие не срабатывает