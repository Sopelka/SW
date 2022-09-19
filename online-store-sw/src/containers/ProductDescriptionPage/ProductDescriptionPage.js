import React from 'react';
import './ProductDescriptionPage.css';

import { gql } from '@apollo/client'; 
import { client } from '../..';

import TextInput from '../../components/Inputs/TextInput';
import SwatchInput from '../../components/Inputs/SwatchInput';

export default class ProductDescriptionPage extends React.Component {s
    constructor() {
        super();

        this.state = {
            data: [],
            error: '',
        }

        this.getData = this.getData.bind(this);
    }

    async getData() {
        const imp = localStorage.getItem('PDP_ID')

        await client.query({
            query: gql`${productDescriptions}`, 
            variables: {id: imp}})
                .then((result) => this.setState({ data: result.data.product }))
                .catch((error) => this.setState({ error: error }))
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        console.log('propsDESCRRIPTIONPAGE', this.props)
        console.log('stateDESCRRIPTIONPAGE', this.state)
        return(
            <div className="product-wrapper">
                <div className="product__images">
                    <div className="product__side-images">
                        <img className="image__mini" src="./proba.jpg" alt="product" />
                        <img className="image__mini" src="./proba.jpg" alt="product" />
                        <img className="image__mini" src="./proba.jpg" alt="product" />
                    </div>
                    <img className="product__main-image" src="./proba.jpg" alt="product" />
                </div>

                <form className="product__info-form">
                    <p className="info-form__brand-name">{ this.state.data?.brand }</p>
                    <p className="info-form__item-name">{ this.state.data?.name }</p>
                    {/* Мапим здесь и под каждый создаем инпут */}
                    <TextInput />
                    <SwatchInput />
                    <p className="info-form__price-title">PRICE:</p>
                    <p className="info-form__price">$50.00</p>
                    <button className="info-form__submit-button" type="submit">ADD TO CART</button>
                    <div className="info-form__description" dangerouslySetInnerHTML={{__html: this.state.data?.description}} />
                </form>
            </div>
        )
    }
}



const productDescriptions = 'query($id: String!){product(id: $id){id,name,inStock,gallery,description,category,attributes{id,name,type,items{displayValue,value,id,},},prices{currency{label,symbol},amount,},brand,}}'; 




//технически это работает, но не могу менять параметр :((
//const productDescriptions = 'query($id: String! = "ps-5"){product(id: $id){id,name,inStock,gallery,description,category,attributes{id,name,type,items{displayValue,value,id,},},prices{currency{label,symbol},amount,},brand,}}'; 
//const wonder = "ps-5"


//query($id: String!){product(id: "ps-5"){id,name,inStock,gallery,description,category,attributes{id,name,type,items{displayValue,value,id,},},prices{currency{label,symbol},amount,},brand,}}