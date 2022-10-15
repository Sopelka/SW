//Core
import React from 'react';

//Locals
import './index.css';

export default class Dropdown extends React.Component {
    constructor() {
        super();

        this.state = {
            selectedCurrency: {
                label: "USD",
                symbol: "$"
            },
            dropdownOpen: false,
        };

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.choseCurrency = this.choseCurrency.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
        this.showChosenCurrency = this.showChosenCurrency.bind(this);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.closeDropdown, false);
    }

    componentDidMount() {
        document.addEventListener('click', this.closeDropdown, false);

        if (localStorage.getItem('currentCurrency')) {
            let prevCurrency = JSON.parse(localStorage.getItem('currentCurrency'));

            this.setState({
                selectedCurrency: {
                    label: prevCurrency[1],
                    symbol: prevCurrency[0],
                },
            });
        }
    }

    closeDropdown(event) {
        if (this.state.dropdownOpen) {
            if (event.target.className !== 'dropdown__option' && event.target.className !== 'dropdown-btn') {
                this.setState({
                    dropdownOpen: false,
                });
            }
        }
    }

    toggleDropdown() {
        this.setState(prevValue => ({
            dropdownOpen: !prevValue.dropdownOpen,
        }));
    }

    choseCurrency(event) {
        const { appCurrencyCallback } = this.props;

        if (event.target.className === 'dropdown__option') {
            const newCurrencyArray = event.target.textContent.split(' ');
            appCurrencyCallback(newCurrencyArray);

            this.setState({
                dropdownOpen: false,
                selectedCurrency: {
                    label: newCurrencyArray[1],
                    symbol: newCurrencyArray[0],
                },
            });
        }
    }

    showChosenCurrency(element) {
        let result = null;
        const { selectedCurrency } = this.state;

        if (element.label === selectedCurrency.label) {
            result = { background: '#EEEEEE' };
        }

        return result;
    }


    render() {
        const { currencyList } = this.props;
        const { selectedCurrency, dropdownOpen } = this.state;

        return (
            <>
                <div className="dropdown__wrapper">
                    <div onClick = { this.toggleDropdown } className = "dropdown-btn"></div>
                    <div className = "dropdown__selected">
                        <p className = "selected-currency-symbol">{ selectedCurrency.symbol }</p> 

                        { dropdownOpen ? 
                            <svg className = "currency-chevron-up-icon" width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 3.5L4 0.5L7 3.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            :
                            <svg className = "currency-chevron-down-icon" width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 0.5L4 3.5L7 0.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        }
                    </div>

                    <div className={ `${dropdownOpen ? 'dropdown__options' : 'hiddenObj' }` }>

                        { currencyList?.map((element) => {
                            return <p 
                                key = { element.label } 
                                className = "dropdown__option"
                                style = { this.showChosenCurrency(element) }
                                onClick = { this.choseCurrency }>{ `${element.symbol} ${element.label}` }</p>
                            })
                        }
                    </div>
                </div>
            </>
        )
    }
}
