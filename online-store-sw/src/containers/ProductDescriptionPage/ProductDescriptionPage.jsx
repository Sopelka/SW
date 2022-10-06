//Core
import React from 'react';
import { Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import { gql } from '@apollo/client'; 

//Locals
import './ProductDescriptionPage.css';
import TextInput from '../../components/Inputs/TextInput';
import SwatchInput from '../../components/Inputs/SwatchInput';
import { client } from '../..';
import { setNewProductToCart } from '../../lib/redux/actions';
import  store from '../../lib/redux/store';

class ProductDescriptionPage extends React.Component {
    constructor() {
        super();

        this.state = {
            data: [],
            error: '',

            productDetails: {
                inputsInfo: {},
            },
        };

        this.getData = this.getData.bind(this);
        this.changeImage = this.changeImage.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleOrder = this.handleOrder.bind(this);
        this.getOrderId = this.getOrderId.bind(this);
        this.checkDuplicates = this.checkDuplicates.bind(this);
        this.checkInputs = this.checkInputs.bind(this);

        this.mainImageRef = React.createRef();
    }

    async getData() {
        let queryID = null;
        if (localStorage.getItem('PDP_ID')) {
            queryID = localStorage.getItem('PDP_ID');
        } 
        else {
            queryID = this.state.data.id;
        }

        await client.query({
            query: gql`${productDescriptions}`, 
            variables: {id: queryID}})
                .then((result) =>  this.setState({ data: result.data.product }))
                .catch((error) => this.setState({ error: error }))

        setTimeout(() => { 
            this.setState({
                productDetails: {
                    name: this.state.data.name,
                    brand: this.state.data.brand,
                    img: this.state.data?.gallery,
                    product_id: this.state.data.id,
                    prices: this.state.data.prices,
                    attributes: this.state.data.attributes,
                    counter: 1,
    
                    inputsInfo: {},
                    orderID: '',
                }
            });
        }, 500)
    }

    changeImage(imageSrc) {
        this.mainImageRef.current.src = imageSrc;
    }

    handleInput(event) {
        this.setState(prevValue => ({
            productDetails: {
                name: this.state.data.name,
                brand: this.state.data.brand,
                img: this.state.data?.gallery,
                product_id: this.state.data.id,
                prices: this.state.data.prices,
                attributes: this.state.data.attributes,
                counter: 1,

                inputsInfo: {...prevValue.productDetails.inputsInfo, ...{
                    [`${event.className}  ${event.name}`]: event.value,
                }},

                orderID: '',
            }
        }));
    }

    handleOrder(event) {
        event.preventDefault();
        let requiredInputSet = this.checkInputs();

        if (requiredInputSet.size) {
            const missingInputsArr = Array.from(requiredInputSet);
            alert(`Choose product features before continue: ${missingInputsArr}`)
        } 
        else {
            this.getOrderId(this.state.productDetails.name, this.state.productDetails.inputsInfo);

            setTimeout(() => {
                let state = store.getState();
                let finalData = this.checkDuplicates(state.setNewProductToCart, this.state.productDetails);
                let totalNumber = finalData.reduce((acc, obj) => { return acc + obj.counter; }, 0);
                this.props.appCartAmountCallback(totalNumber);
                this.props.dispatch(setNewProductToCart(finalData));

                if (!localStorage.getItem('currentOrder')) {
                    localStorage.setItem('currentOrder', JSON.stringify([this.state.productDetails]));
                    this.props.appCartAmountCallback(1);
                }
                
                this.setState({
                    redirect: true,
                });

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
        );

        this.setState(prevValue => ({
            ...prevValue,
            productDetails: {
                ...prevValue.productDetails,
                orderID: `${name}${JSON.stringify(orderedObj)}`
            }
        }));
    }

    checkDuplicates(arr, newEl) {
        let check = arr;

        let res = arr.map((order) => {
            return ( order.orderID === newEl.orderID ?
                {
                    ...order,
                    counter: order.counter + 1,
                }
            : 
                {
                    ...order
                }
            );
        })

        arr = [...arr, newEl];

        return JSON.stringify(res) === JSON.stringify(check) ? arr : res;
    }

    checkInputs() {
        let requiredInputSet = new Set(
            Array.from(document.getElementsByClassName('input')).map((el) => { 
                return el.name;
            })
        );

        if (!requiredInputSet) {
            this.setState({
                productDetails: {
                    name: this.state.data.name,
                    brand: this.state.data.brand,
                    img: this.state.data?.gallery,
                    product_id: this.state.data.id,
                    prices: this.state.data.prices,
                    attributes: null,
                    counter: 1,
    
                    inputsInfo: null,
    
                    orderID: '',
                }
            });
        }

        let allInputsArr = Array.from(document.getElementsByTagName('input'));

        allInputsArr.map((el) => {
            if (el.checked) {
                requiredInputSet.delete(el.name);
            }
            return null;
        });

        return requiredInputSet;
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
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
                        }) 
                    }

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
export default connect()(ProductDescriptionPage);
