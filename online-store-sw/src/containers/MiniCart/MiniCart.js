import React from "react";
import './MiniCart.css'

import { Navigate, Link } from "react-router-dom";

import MinicartItem from "../../components/MinicartItem";

export default class MiniCart extends React.Component {
    constructor() {
        super();

        this.state = {
            // allItems : [
            //     {},{},{}
            // ],

            allItems : null,

            cartOpen: false,
            cartEmpty: true,
        }

        this.toggleCart = this.toggleCart.bind(this);
        this.closeCart = this.closeCart.bind(this);

        this.showOrderData = this.showOrderData.bind(this);

        this.getTotalSum = this.getTotalSum.bind(this);
        this.changeCounter = this.changeCounter.bind(this);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.closeCart, false);
    }

    componentDidMount() {
        document.addEventListener('click', this.closeCart, false);

        this.showOrderData();
    }

    toggleCart() {
        this.setState(prevValue => ({
            cartOpen: !prevValue.cartOpen
        }))

        this.props.appDarkCallback(!this.state.cartOpen);

        let data = this.showOrderData();
        this.getTotalSum(data);

        // if(this.state.cartOpen ) {
        //     localStorage.setItem('currentOrder', JSON.stringify(this.state.allItems))
        // }

        if(this.state.cartOpen && this.state.allItems) {
            localStorage.setItem('currentOrder', JSON.stringify(this.state.allItems))
        }
    }

    closeCart(event) {
        if (this.state.cartOpen && !event.target.className.includes('minicart')){
            this.setState({
                cartOpen: false
            })

            this.props.appDarkCallback(false)

            //localStorage.setItem('currentOrder', JSON.stringify(this.state.allItems))

            if(this.state.allItems) {
                localStorage.setItem('currentOrder', JSON.stringify(this.state.allItems))
            }
        }
    }

    showOrderData() {
        let data = null;

        if (localStorage.getItem('currentOrder')) {
            data = localStorage.getItem('currentOrder');
            data = JSON.parse(data);

            this.setState({
                allItems: data,
                cartEmpty: false,
            })     
        }

        return data;
    }

    getTotalSum(arr){
        let result = !localStorage.getItem('currentOrder') && !arr ? 
            null
            : 
            arr.map((el) => {
                let currPrice = el.prices.map((pair) => {
                    return pair.currency.label === this.props.newCurrency[1] ? pair.amount : 0 ;
                })
                currPrice = currPrice.filter(el => el > 0 )
                return (currPrice * el.counter);
            })
            .reduce((prev, curr) => { 
                return prev + curr 
            })

        if(result){
            result = Math.floor(result * 100) / 100

            this.setState({
                totalSum: result
            })
        }
    }


    changeCounter(increase, orderID) {
        let index = null;

        let newData = this.state.allItems.map((product, itemIndex) => {
            if (product.orderID === orderID) {
                if (increase){
                    this.props.appCartAmountCallback('+1');

                    return ({
                        ...product,
                        counter: +product.counter + 1,
                    })
                }
                else {
                    if ((+product.counter - 1) === 0) {
                        this.props.appCartAmountCallback('-1');

                        let deleteItem = window.confirm(`Do you want to delete ${product.name} ${product.brand}?`, 'Do you want to delete this item?');
                        index = deleteItem ? itemIndex : null;
                        return { ...product, counter: 1 }
                    } 
                    else {
                        this.props.appCartAmountCallback('-1');

                        return ({
                            ...product,
                            counter: +product.counter - 1,
                        })
                    }
                }
            } 
            else {
                return({
                    ...product,
                })
            }
        })

        if (index || index === 0) {
            newData.splice(index, 1)
            index = null;
        }

        if(newData.length) {
            this.setState({
                allItems: newData
            })

            this.getTotalSum(newData)
        }
        else {
            this.setState({
                // allItems: [
                //     {},{},{}
                // ],
                allItems: null,
                cartEmpty: true,
            })

            localStorage.removeItem('currentOrder')
        }
    }


    render() {
        console.log('minicartSTATE', this.state)
        console.log('minicartPROPS', this.props)
        return(
            <div className="minicart__extra-conteiner">
                <svg className="minicart-icon" width="20" height="19" viewBox="0 0 20 19" fill="#43464E" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5613 3.87359C19.1822 3.41031 18.5924 3.12873 17.9821 3.12873H5.15889L4.75914 1.63901C4.52718 0.773016 3.72769 0.168945 2.80069 0.168945H0.653099C0.295301 0.168945 0 0.450523 0 0.793474C0 1.13562 0.294459 1.418 0.653099 1.418H2.80069C3.11654 1.418 3.39045 1.61936 3.47434 1.92139L6.04306 11.7077C6.27502 12.5737 7.07451 13.1778 8.00152 13.1778H16.4028C17.3289 13.1778 18.1507 12.5737 18.3612 11.7077L19.9405 5.50575C20.0877 4.941 19.9619 4.33693 19.5613 3.87365L19.5613 3.87359ZM18.6566 5.22252L17.0773 11.4245C16.9934 11.7265 16.7195 11.9279 16.4036 11.9279H8.00154C7.68569 11.9279 7.41178 11.7265 7.32789 11.4245L5.49611 4.39756H17.983C18.1936 4.39756 18.4042 4.49824 18.5308 4.65948C18.6567 4.81994 18.7192 5.0213 18.6567 5.22266L18.6566 5.22252Z" fill="#43464E"/>
                    <path d="M8.44437 13.9814C7.2443 13.9814 6.25488 14.9276 6.25488 16.0751C6.25488 17.2226 7.24439 18.1688 8.44437 18.1688C9.64445 18.1696 10.6339 17.2234 10.6339 16.0757C10.6339 14.928 9.64436 13.9812 8.44437 13.9812V13.9814ZM8.44437 16.9011C7.9599 16.9011 7.58071 16.5385 7.58071 16.0752C7.58071 15.6119 7.9599 15.2493 8.44437 15.2493C8.92885 15.2493 9.30804 15.6119 9.30804 16.0752C9.30722 16.5188 8.90748 16.9011 8.44437 16.9011Z" fill="#43464E"/>
                    <path d="M15.6875 13.9814C14.4875 13.9814 13.498 14.9277 13.498 16.0752C13.498 17.2226 14.4876 18.1689 15.6875 18.1689C16.8875 18.1689 17.877 17.2226 17.877 16.0752C17.8565 14.9284 16.8875 13.9814 15.6875 13.9814ZM15.6875 16.9011C15.2031 16.9011 14.8239 16.5385 14.8239 16.0752C14.8239 15.612 15.2031 15.2493 15.6875 15.2493C16.172 15.2493 16.5512 15.612 16.5512 16.0752C16.5512 16.5188 16.1506 16.9011 15.6875 16.9011Z" fill="#43464E"/>
                </svg>
                <div className="minicart-wrapper">
                    <div onClick={ this.toggleCart } className="minicart__open-btn"></div>
                    <div className={ this.state.cartOpen ? "minicart__droplist-wrapper" : "hiddenObj" }>
                    { this.state.cartEmpty ?
                        <p className="minicart initial-title">Your cart is empty</p>
                        :
                        <>
                            <p className="minicart-title">My Bag
                                <span className="minicart-title__details">{ `, ${this.state.allItems.length} ${this.state.allItems.length === 1 ? 'item' : 'items'}` }</span>
                            </p>
                            <div className="minicart__items-wrapper">
                                { 
                                    this.state?.allItems?.map((item, index) => {
                                        return <MinicartItem 
                                            key={ index } 
                                            data = { item } 
                                            newCurrency = { this.props.newCurrency } 
                                            cartCounterCallback = { this.changeCounter }
                                        />
                                    })
                                }
                            </div>
                            <div className="minicart__total-wrapper">
                                <p className="minicart__total-title">Total</p>
                                <p className="minicart__total-result">{`${this.props.newCurrency[0]}${this.state.totalSum}`}</p>
                            </div>
                            <div className="minicart__buttons-wrapper">
                                <Link to = '/cart'>
                                    <button onClick={ this.state.allItems ? localStorage.setItem('currentOrder', JSON.stringify(this.state.allItems)) : null } className="button-viewbag" >VIEW BAG</button> {/* className="minicart__button-viewbag" */}
                                </Link>
                                
                                <button className="minicart__button-checkout">CHECK OUT</button>
                            </div>

                            {/* onClick={ this.state.allItems ? localStorage.setItem('currentOrder', JSON.stringify(this.state.allItems)) : null } */}
                        </>
                    }
                        
                    </div>
                </div>
            </div>
        )
    }
}
