import React from 'react';
import './App.css';

import { gql } from '@apollo/client'; 
import { client } from '../..';

import { Route, Routes, Navigate } from "react-router-dom";

import Header from '../../components/Header/index';
import MainSection from '../MainSection/MainSection';

import ProductDescriptionPage from './../ProductDescriptionPage/ProductDescriptionPage';
import CartPage from '../CartPage/CartPage';

import { connect } from 'react-redux';
import { setNewProductToCart, setNewCartAmount, setNewCurrency } from '../../lib/redux/actions';
import  store from '../../lib/redux/store';

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            dark: false,

            data: [],
            error: '',

            catName: 'ALL',

            currency: [ "$", "USD" ],

            cartAmount: 0,
        }

        this.setDark = this.setDark.bind(this);
        this.getData = this.getData.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.changeCurrency = this.changeCurrency.bind(this);
        this.changeCartProductAmount = this.changeCartProductAmount.bind(this);
        this.submitOrder = this.submitOrder.bind(this);
    }

    async getData() {
        await client.query({query: gql`${getStarted}`})
            .then((result) => this.setState({ data: result.data }))
            .catch((error) => this.setState({ error: error }))
    }

    setDark(childData) {
        this.setState({
            dark: childData,
        })
    }

    changeCategory(event) {
        this.setState({
            catName: event.target.innerText,
        })
    }

    changeCurrency(childData) {
        this.setState({
            currency: childData,
        })

        this.props.dispatch(setNewCartAmount(childData));

        localStorage.setItem('currentCurrency', JSON.stringify(childData))
    }

    changeCartProductAmount(value) {
        let state = store.getState();

        if (typeof value === 'number'){
            if (state.setNewProductToCart.length > 0 || localStorage.getItem('currentOrder')) {
                this.setState({
                    cartAmount: value,
                })

                this.props.dispatch(setNewCartAmount(value));
            } else {
                this.setState({
                    cartAmount: 0,
                })

                this.props.dispatch(setNewCartAmount(0));
            }        
        }
        else if(typeof value === 'string'){
            this.props.dispatch(setNewCartAmount(this.state.cartAmount + Number(value)));

            this.setState(prevValue => ({
                cartAmount: +prevValue.cartAmount + Number(value),
            }))

            
        }       
    }

    submitOrder() {
        let state = store.getState();

        console.log('_________________________________________ state.setNewProductToCart', state.setNewProductToCart)
        console.log('_________________________________________ JSON.stringify(localStorage.getItem(currentOrder)) === JSON.stringify(state.setNewProductToCart)', JSON.stringify(localStorage.getItem('currentOrder')) === JSON.stringify(state.setNewProductToCart))
        console.log('_________________________________________ JSON.stringify(localStorage.getItem(currentOrder)), JSON.stringify(state.setNewProductToCart)', JSON.stringify(localStorage.getItem('currentOrder')),'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', JSON.stringify(state.setNewProductToCart))

        //if (JSON.stringify(localStorage.getItem('currentOrder')) === JSON.stringify(state.setNewProductToCart)) {
            
                window.alert('Your order was successfully formed. We will contact you in a few minutes')
                localStorage.removeItem('currentOrder')
                this.changeCartProductAmount(0)
                this.props.dispatch(setNewProductToCart([]));
            
        //}
    }

    componentDidMount() {
        this.getData();

        if (localStorage.getItem('currentOrder')) {
            let prevCartAmount = JSON.parse(localStorage.getItem('currentOrder'));
            
            prevCartAmount = prevCartAmount.reduce((acc, obj)=>{
                return acc+obj.counter
            }, 0)

            this.changeCartProductAmount(prevCartAmount);
        }

        if (localStorage.getItem('currentCurrency')) {
            let currency = JSON.parse(localStorage.getItem('currentCurrency'));
            this.changeCurrency(currency)
            this.setState({
                currency: currency,
            })
            this.props.dispatch(setNewCurrency(currency))
        }
    }

    render() {
        return (
            <>
                <div className='app'>
                    <Header 
                        data = { this.state.data } 
                        appDarkCallback = { this.setDark } 
                        appCategoryCallback = { this.changeCategory }
                        appCurrencyCallback = { this.changeCurrency }
                        appCartAmountCallback = { this.changeCartProductAmount }
                        cartAmount = { this.state.cartAmount }
                        newCurrency = { this.state.currency }
                        appSubmitOrderCallback = { this.submitOrder }
                    />
                    
                    <div className={ this.state.dark ? "dark-screen" : "dark-screen disactivated" }/>
                </div>

                <Routes>
                    <Route 
                        path = '/main' 
                        element = { 
                            <MainSection 
                                data = { this.state.data } 
                                catName = { this.state.catName } 
                                newCurrency = { this.state.currency }
                            /> }  
                    />  

                    <Route path = '/product' 
                        element = { 
                            <ProductDescriptionPage 
                                newCurrency = { this.state.currency } 
                                appCartAmountCallback = { this.changeCartProductAmount }
                            /> }/>

                    <Route 
                        path = '/cart' 
                        element = { 
                            <CartPage
                                cartAmount = { this.state.cartAmount }
                                newCurrency = { this.state.currency }
                                appCartAmountCallback = { this.changeCartProductAmount }
                                appSubmitOrderCallback = { this.submitOrder }
                            /> 
                        }/>

                    <Route path = '*' element = { <Navigate to = '/main' /> } />
                </Routes>

            </>
        )
    }
}

const getStarted = 'query{categories{name,products{id,name,inStock,gallery,brand,description,prices{currency{label,symbol},amount},}},currencies {label,symbol}}'; 
//const productDescriptions = '';
export default connect()(App)