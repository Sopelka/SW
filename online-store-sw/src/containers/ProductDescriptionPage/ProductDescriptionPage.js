import React from 'react';
import './ProductDescriptionPage.css';

import { gql } from '@apollo/client'; 
import { client } from '../..';

import { Navigate } from "react-router-dom";

import TextInput from '../../components/Inputs/TextInput';
import SwatchInput from '../../components/Inputs/SwatchInput';

export default class ProductDescriptionPage extends React.Component {s
    constructor() {
        super();

        this.state = {
            data: [],
            error: '',

            productDetails: {
                inputsInfo: {}
            },
        }

        this.getData = this.getData.bind(this);
        this.changeImage = this.changeImage.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleOrder = this.handleOrder.bind(this);
        this.getOrderId = this.getOrderId.bind(this);

        this.mainImageRef = React.createRef();
    }

    async getData() {
        const queryID = localStorage.getItem('PDP_ID')

        await client.query({
            query: gql`${productDescriptions}`, 
            variables: {id: queryID}})
                .then((result) => this.setState({ data: result.data.product }))
                .catch((error) => this.setState({ error: error }))

        setTimeout(() => { 
            this.setState({
                productDetails: {
                    name: this.state.data.name,
                    brand: this.state.data.brand,
                    img: this.state.data?.gallery?.[0],
                    product_id: this.state.data.id,
                    prices: this.state.data.prices,
    
                    inputsInfo: {},
                    orderID: '',
                }
            })
        }, 1)
    }

    changeImage(imageSrc){
        this.mainImageRef.current.src = imageSrc;
    }

    handleInput(event){
        this.setState(prevValue => ({
            productDetails: {
                name: this.state.data.name,
                brand: this.state.data.brand,
                img: this.state.data?.gallery?.[0],
                product_id: this.state.data.id,
                prices: this.state.data.prices,

                inputsInfo: {...prevValue.productDetails.inputsInfo, ...{
                    [`${event.className}  ${event.name}`]: event.value,
                }},

                orderID: '',
            }
        }))
    }

    handleOrder(event){
        event.preventDefault();

        let requiredInputSet = new Set(
            Array.from(document.getElementsByTagName('input')).map((el) => { 
                return el.name
            })
        );

        let allInputsArr = Array.from(document.getElementsByTagName('input'));

        allInputsArr.map((el) => {
            if (el.checked) {
                requiredInputSet.delete(el.name);
            }
            return null;
        });

        if (requiredInputSet.size) {
            const missingInputsArr = Array.from(requiredInputSet);
            alert(`Choose product features before continue: ${missingInputsArr}`)
        } else {
            this.getOrderId(this.state.productDetails.name, this.state.productDetails.inputsInfo)

            setTimeout(() => {
                if (localStorage.getItem('currentOrder')) {
                    let data = localStorage.getItem('currentOrder')
                    data = JSON.parse(data)
                    data.push(this.state.productDetails)
                    localStorage.setItem('currentOrder', JSON.stringify(data))
                    this.props.appCartAmountCallback(JSON.parse(localStorage.getItem('currentOrder')).length);
                } else {
                    localStorage.setItem('currentOrder', JSON.stringify([this.state.productDetails]))
                    this.props.appCartAmountCallback(JSON.parse(localStorage.getItem('currentOrder')).length);
                }    
                
                this.setState({
                    redirect: true
                })

            }, 0)

            
        }
    }

    getOrderId(name, attrObj) {
        let orderedObj = null;

        Object.keys(attrObj).sort().reduce(
            (obj, key) => { 
                obj[key] = attrObj[key]; 
                orderedObj = obj;
                return obj;
            }, {}
        )

        this.setState(prevValue => ({
            ...prevValue,
            productDetails: {
                ...prevValue.productDetails,
                orderID: `${name}${JSON.stringify(orderedObj)}`
            }
        }))
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

                        { this.state.data.gallery?.map((picture) => {
                            return <img className="image__mini" key={ picture } src={ picture } alt="product description" onClick={()=>{ this.changeImage(picture) }}/>
                        }) }

                    </div>
                    <img ref={ this.mainImageRef } className="product__main-image" src={ this.state.data?.gallery?.[0] } alt="product main description" />
                </div>

                <form onSubmit = {this.handleOrder} className="product__info-form">
                    <p className="info-form__brand-name">{ this.state.data?.brand }</p>
                    <p className="info-form__item-name">{ this.state.data?.name }</p>

                    { this.state.data.attributes?.map((attribute) => {
                        return attribute.type === 'text' ?
                            <TextInput key={ attribute.id } dataArr={ attribute } pdpCallback = { this.handleInput } /> 
                            : 
                            <SwatchInput key={ attribute.id } dataArr={ attribute } pdpCallback = { this.handleInput }  />;
                    }) }

                    <p className="info-form__price-title">PRICE:</p>
                    <p className="info-form__price">

                        { this.state.data?.prices?.map((potentialPrice) => {
                            return potentialPrice.currency.label === this.props.newCurrency[1] ? `${this.props.newCurrency[0]} ${potentialPrice.amount}` : null;
                        })}

                    </p>

                    { this.state.data.inStock ? 
                        <button className="info-form__submit-button" type="submit" onClick={ this.handleOrder } >ADD TO CART</button>
                        :
                        <button className="info-form__submit-button__disabled">OUT OF STOCK</button>
                    }
                    
                    <div className="info-form__description" dangerouslySetInnerHTML={{__html: this.state.data?.description}} />
                </form>
                { this.state.redirect && <Navigate to='/main' replace={ true }/> }
            </div>
        )
    }
}



const productDescriptions = 'query($id: String!){product(id: $id){id,name,inStock,gallery,description,category,attributes{id,name,type,items{displayValue,value,id,},},prices{currency{label,symbol},amount,},brand,}}'; 
