//Core
import React from 'react';
import { Navigate } from "react-router-dom";
import { connect } from 'react-redux';

//Locals
import './CartPage.css';
import CartItem from '../../components/CartItem';
import { setNewProductToCart } from '../../lib/redux/actions';
import store from '../../lib/redux/store';

class CartPage extends React.Component {
    constructor() {
        super();

        this.state = {
            allItems : null,
            cartEmpty: true,
        };
        
        this.showOrderData = this.showOrderData.bind(this);
        this.getTotal = this.getTotal.bind(this);
        this.changeCounter = this.changeCounter.bind(this);
        this.confirmOrder = this.confirmOrder.bind(this);
    }

    changeCounter(increase, orderID) {
        let index = null;
        let state = store.getState();

        const { appCartAmountCallback, dispatch } = this.props;
        const { allItems } = this.state;

        let newData = state.setNewProductToCart.map((product, itemIndex) => {
            if (product.orderID === orderID) {
                if (increase) {
                    appCartAmountCallback('+1');

                    return ({
                        ...product,
                        counter: +product.counter + 1,
                    });
                }
                else {
                    if ((+product.counter - 1) === 0) {
                        appCartAmountCallback('-1');

                        let deleteItem = window.confirm(`Do you want to delete ${product.name} ${product.brand}?`, 'Do you want to delete this item?');
                        index = deleteItem ? itemIndex : null;
                        return { ...product, counter: 1 };
                    } 
                    else {
                        appCartAmountCallback('-1');

                        return ({
                            ...product,
                            counter: +product.counter - 1,
                        });
                    }
                }
            } 
            else {
                return({
                    ...product,
                });
            }
        })

        if (index || index === 0) {
            newData.splice(index, 1);
            index = null;
        }

        if (newData.length) {
            this.setState({
                allItems: newData,
            });

            dispatch(setNewProductToCart(newData));

            this.getTotal();
            this.getTotal(true);

            
            setTimeout(() => {
                if (allItems) {
                    localStorage.setItem('currentOrder', JSON.stringify(allItems));
                }
            }, 100);
        }
        else {
            this.setState({
                allItems: null,
                cartEmpty: true,
            });

            dispatch(setNewProductToCart([]));

            localStorage.removeItem('currentOrder');

            this.setState({
                redirect: true
            });
        }
    }

    showOrderData() {
        let state = store.getState();

        if (state.setNewProductToCart.length > 0) {
            this.setState({
                allItems: state.setNewProductToCart,
                cartEmpty: false,
            });

            return state.setNewProductToCart;
        }

        return null;
    }

    getTotal(tax) {
        let state = store.getState();
        let result = null;
        const { newCurrency } = this.props;


        if (state.setNewProductToCart.length > 0) {
            result = state.setNewProductToCart.map((product) => {
                let currPrice = product.prices.map((probablePrice) => {
                    return probablePrice.currency.label === newCurrency[1] ? probablePrice.amount : 0 ;
                });
                currPrice = currPrice.filter(el => el > 0 );
                return (currPrice * product.counter);
            })
            .reduce((prev, curr) => { 
                return prev + curr 
            });
        }

        if (result) {
            return tax ? `${newCurrency[0]} ${(Math.floor(result * 0.21 * 100) / 100).toFixed(2)}`: `${newCurrency[0]} ${(Math.floor(result * 100) / 100).toFixed(2)}`;
        }
        else {
            return null;
        }
    }

    componentDidMount() {
        let result = this.showOrderData();

        if (!result) {
            this.setState({
                allItems: null,
                cartEmpty: false,
            });
        }
    }

    confirmOrder() {
        const { appSubmitOrderCallback } = this.props;

        appSubmitOrderCallback();

        this.setState({
            redirect: true,
            allItems : null,
        });
    }

    render() {
        let state = store.getState();
        const { newCurrency, cartAmount} = this.props;
        const { allItems, redirect } = this.state;

        return (
            <>
                <h1 className="cart__main-header">CART</h1>

                { state.setNewProductToCart.length > 0 ?
                    state.setNewProductToCart.map((element, index) => {
                        return <CartItem 
                            key = { element.orderID } 
                            data = { element } 
                            newCurrency = { newCurrency } 
                            cartCounterCallback = { this.changeCounter }
                        />
                    })
                    : 
                    null
                }
                
                <div className="cart__summary-container">
                    <div className="summary__property-wrapper">
                        <p className="summary__property">Tax 21%:</p>
                        <p className="summary__property">Quantity:</p>
                        <p className="summary__total">Total:</p>
                    </div>
                    <div className="summary__data-wrapper">
                        <p className="summary__data-tax summary__data">{ allItems ? this.getTotal(true) : null }</p>
                        <p className="summary__data-quantity summary__data">{ cartAmount }</p>
                        <p className="summary__data-total summary__data">{ allItems ? this.getTotal(false) : null }</p>
                    </div>
                </div>
                <button onClick = { this.confirmOrder } className="cart__order-button">ORDER</button>
                { redirect && <Navigate to='/main' replace={ true }/> }
            </>
        )
    }
}

export default connect()(CartPage);
