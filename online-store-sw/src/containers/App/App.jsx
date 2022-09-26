import React from 'react';
import './App.css';

import { gql } from '@apollo/client'; 
import { client } from '../..';

import { Route, Routes, Navigate } from "react-router-dom";

import Header from '../../components/Header/index';
import MainSection from '../MainSection/MainSection';

import ProductDescriptionPage from './../ProductDescriptionPage/ProductDescriptionPage';
import CartPage from '../CartPage/CartPage';

export default class App extends React.Component {
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
        console.log('changeCurrency', childData);
        this.setState({
            currency: childData,
        })
    }

    changeCartProductAmount(value){
        if (typeof value === 'number'){
            if (localStorage.getItem('currentOrder')) {
                this.setState({
                    cartAmount: value,
                })
            } else {
                this.setState({
                    cartAmount: 0,
                })
            }        
        }
        else if(typeof value === 'string'){
            this.setState(prevValue => ({
                cartAmount: +prevValue.cartAmount + Number(value),
            }))
        }       
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

                    <Route path = '/cart' element = { <CartPage/> }/>

                    <Route path = '*' element = { <Navigate to = '/main' /> } />
                </Routes>

            </>
        )
    }
}

const getStarted = 'query{categories{name,products{id,name,inStock,gallery,brand,description,prices{currency{label,symbol},amount},}},currencies {label,symbol}}'; 
//const productDescriptions = '';
