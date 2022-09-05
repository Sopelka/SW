import React from "react";
import './index.css'

export default class CartItemCounter extends React.Component {
    constructor(){
        super()

        this.state = {
            value: '0'
        }

        this.increase = this.increase.bind(this);
        this.decrease = this.decrease.bind(this);
    }

    increase(){
        this.setState(prevValue => ({
            value: +prevValue.value + 1
        }))
    }

    decrease(){
        this.setState(prevValue => ({
            value: +prevValue.value === 0 ? 0 : prevValue.value - 1
        }))
    }

    render(){
        const mode = this.props.size === 'small' ? '__mini-cart' : '' ;

        return(
            <>
                <div className={`count-btn-container${mode}`}>
                    <div className={`count-btn-increase${mode} count-btn${mode}`} onClick={ this.increase }>
                        <div className={`count-btn-protector${mode}`}/>
                        { this.props.size === 'normal' ?
                            <>
                                <svg width="17" height="1" viewBox="0 0 17 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 0.5H16" stroke="#1D1F22" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <svg width="1" height="17" viewBox="0 0 1 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.5 1V16" stroke="#1D1F22" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </>
                            :
                            <>
                                <svg width="2" height="10" viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1V9" stroke="#1D1F22" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1H9" stroke="#1D1F22" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>

                            </>
                        }
                    </div>
                    
                    <p className={`counter${mode}`}>{ this.state.value }</p>

                    <div className={`count-btn-decrease${mode} count-btn${mode}`} onClick={ this.decrease }>
                        <div className={`count-btn-protector${mode}`}/>
                        { this.props.size === 'normal' ? 
                            <svg width="17" height="1" viewBox="0 0 17 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 0.5H16" stroke="#1D1F22" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        :
                            <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1H9" stroke="#1D1F22" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                    
                        }
                    </div>
                </div>
            </>
        )
    }
}

CartItemCounter.defaultProps = {
    size: 'normal',
}