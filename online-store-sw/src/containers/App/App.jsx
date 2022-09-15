import React from 'react';
import './App.css';

import { gql } from '@apollo/client'; 
import { client } from '../..';

import Header from '../../components/Header/index';
import MainSection from '../MainSection/MainSection';

import { Route, Routes, Navigate } from "react-router-dom";

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
        }

        this.setDark = this.setDark.bind(this);
        this.getData = this.getData.bind(this);
        this.changeCat = this.changeCat.bind(this);
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

    changeCat(event) {
        this.setState({
            catName: event.target.innerText,
        })
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <>
                <div className='app'>
                    <Header 
                        data = { this.state.data } 
                        appDarkCallback = { this.setDark } 
                        appShowCatCallback = { this.changeCat }
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
                            /> }  
                    />  

                    <Route path = '/product' element = { <ProductDescriptionPage/> }/>
                    <Route path = '/cart' element = { <CartPage/> }/>

                    <Route path = '*' element = { <Navigate to = '/main' /> } />
                </Routes>

            </>
        )
    }
}

const getStarted = 'query{categories{name,products{id,name,inStock,gallery,brand,description,prices{currency{label,symbol},amount},}},currencies {label,symbol}}'; 

