//Core
import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import { gql } from '@apollo/client'; 

//Locals
import './App.css';
import Header from '../../components/Header/index';
import MainSection from '../MainSection/MainSection';
import ProductDescriptionPage from './../ProductDescriptionPage/ProductDescriptionPage';
import CartPage from '../CartPage/CartPage';
import { setNewProductToCart, setNewCartAmount, setNewCurrency } from '../../lib/redux/actions';
import  store from '../../lib/redux/store';
import { client } from '../..';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            dark: false,
            data: [],
            error: '',
            catName: 'ALL',
            currency: [ "$", "USD" ],
            cartAmount: 0,
            products: [],
        };

        this.setDark = this.setDark.bind(this);
        this.getData = this.getData.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.changeCurrency = this.changeCurrency.bind(this);
        this.changeCartProductAmount = this.changeCartProductAmount.bind(this);
        this.submitOrder = this.submitOrder.bind(this);
    }

    getData() {
        client.query({
            query: gql`
                query { 
                    categories { 
                        name, 
                    },
                    currencies {
                        label,
                        symbol
                    }
                }`
        })
        .then((result) => this.setState({ 
            data: result.data 
        }))

        let catName = 'all';

        client.query({
            query: gql`
                query getCategory($input: CategoryInput!) {
                    category(input: $input){
                        name,
                        products {
                            id, 
                            name, 
                            inStock, 
                            gallery,
                            brand,
                            description, 
                            attributes {
                                items {
                                    id,
                                },
                            },
                            prices { 
                                currency { 
                                    label,
                                    symbol, 
                                }, 
                                amount, 
                            },
                        },
                    }
                }`,
                variables: {  
                    "input": {
                        "title": catName,
                    }
                },
        }).then((result) => this.setState({ products: result.data.category }))
    }

    setDark(childData) {
        this.setState({
            dark: childData,
        });
    }

    changeCategory(event) {
        this.setState({
            catName: event.target.innerText,
        });

        let catName = event.target.innerText.toLowerCase();

        client.query({
            query: gql`
                query getCategory($input: CategoryInput!) {
                    category(input: $input){
                        name,
                        products {
                            id, 
                            name, 
                            inStock, 
                            gallery,
                            brand,
                            description, 
                            attributes {
                                items {
                                    id,
                                },
                            },
                            prices { 
                                currency { 
                                    label,
                                    symbol,
                                }, 
                                amount,
                            },
                        },
                    }
                }`,
                variables: {  
                    "input": {
                        "title": catName,
                    }
                }
        }).then((result) => {this.setState({ products: result.data.category })})
    }

    changeCurrency(childData) {
        const { dispatch } = this.props;

        this.setState({
            currency: childData,
        });

        dispatch(setNewCartAmount(childData));

        localStorage.setItem('currentCurrency', JSON.stringify(childData));
    }

    changeCartProductAmount(value) {
        let state = store.getState();
        const { cartAmount } = this.state;
        const { dispatch } = this.props;

        if (typeof value === 'number') {
            if (state.setNewProductToCart.length > 0 || localStorage.getItem('currentOrder')) {
                this.setState({
                    cartAmount: value,
                });

                dispatch(setNewCartAmount(value));
            } 
            else {
                this.setState({
                    cartAmount: 0,
                });

                dispatch(setNewCartAmount(0));
            }        
        }
        else if (typeof value === 'string') {
            dispatch(setNewCartAmount(cartAmount + Number(value)));

            this.setState(prevValue => ({
                cartAmount: +prevValue.cartAmount + Number(value),
            }));
        }       
    }

    submitOrder() {
        const { dispatch } = this.props;
        window.alert('Your order was successfully formed. We will contact you in a few minutes');
        localStorage.removeItem('currentOrder');
        this.changeCartProductAmount(0);
        dispatch(setNewProductToCart([]));
    }

    componentDidMount() {
        const { dispatch } = this.props;
        this.getData();

        if (localStorage.getItem('currentOrder')) {
            let prevCartAmount = JSON.parse(localStorage.getItem('currentOrder'));
            
            prevCartAmount = prevCartAmount.reduce((acc, obj) => {
                return acc + obj.counter
            }, 0);

            this.changeCartProductAmount(prevCartAmount);
        }

        if (localStorage.getItem('currentCurrency')) {
            let currency = JSON.parse(localStorage.getItem('currentCurrency'));
            this.changeCurrency(currency);

            this.setState({
                currency: currency,
            });

            dispatch(setNewCurrency(currency));
        }
    }

    render() {
        const { dark, cartAmount, currency, data, products, catName } = this.state;

        return (
            <>
                <div className = { dark ? "dark-screen" : "dark-screen disactivated" }/>
                <div className = "inner-root">    
                    <div className = 'main-header-wrapper'>
                        <Header 
                            data = { data } 
                            appDarkCallback = { this.setDark } 
                            appCategoryCallback = { this.changeCategory }
                            appCurrencyCallback = { this.changeCurrency }
                            appCartAmountCallback = { this.changeCartProductAmount }
                            cartAmount = { cartAmount }
                            newCurrency = { currency }
                            appSubmitOrderCallback = { this.submitOrder }
                        />
                    </div>

                    <Routes>
                        <Route 
                            path = '/main' 
                            element = { 
                                <MainSection 
                                    data = { data } 
                                    category = { products }
                                    catName = { catName } 
                                    newCurrency = { currency }
                                    appCartAmountCallback = { this.changeCartProductAmount }
                                />
                            }  
                        />  

                        <Route path = '/product' 
                            element = { 
                                <ProductDescriptionPage 
                                    newCurrency = { currency } 
                                    appCartAmountCallback = { this.changeCartProductAmount }
                                /> 
                            }
                        />

                        <Route 
                            path = '/cart' 
                            element = { 
                                <CartPage
                                    cartAmount = { cartAmount }
                                    newCurrency = { currency }
                                    appCartAmountCallback = { this.changeCartProductAmount }
                                    appSubmitOrderCallback = { this.submitOrder }
                                /> 
                            }
                        />

                        <Route path = '*' element = { <Navigate to = '/main' /> } />
                    </Routes>
                </div>
            </>
        )
    }
}

export default connect()(App);
