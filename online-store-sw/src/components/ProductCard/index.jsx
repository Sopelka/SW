//Core
import React from 'react';
import { Navigate } from "react-router-dom";
import { gql } from '@apollo/client'; 
import { connect } from 'react-redux';


//Locals
import './index.css';
import Popup from '../Popup';
import { client } from '../..';
import  store from '../../lib/redux/store';
import { setNewProductToCart } from '../../lib/redux/actions';


class ProductCard extends React.Component {
    constructor(){
        super();

        this.state = {
            redirect: false,
            currentPop: null,
            productDetails: null,
        };

        this.showDetails = this.showDetails.bind(this);
        this.showPopup = this.showPopup.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.getOrderID = this.getOrderID.bind(this);
        this.checkDuplicates = this.checkDuplicates.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.checkInputs = this.checkInputs.bind(this);
    }

    getOrderID(name, attrObj) {
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

    showDetails(e) {
        localStorage.setItem('PDP_ID', this.props.cardData.id);

        if (e.target.nodeName === 'svg' || e.target.nodeName === 'BUTTON'|| e.target.nodeName ==='path') {
            if (!this.props.cardData.attributes.length) {
                this.showPopup();

                setTimeout(()=>{this.addToCart();}, 500)
            }
            else {


                let allPopups = Array.from(document.getElementsByClassName('popup-container'));

                allPopups.map((element) => {
                    if (element.classList.contains(`popup__${this.props.cardData.id}`)) {
                        element.classList.toggle('invisible');
                        this.showPopup();
                    } 
                    else {
                        element.classList.add('invisible');
                    }
                    return null;
                });
            }    

        } 
        else {
            this.setState({
                redirect: true
            });
        }
    }

    async showPopup() {
        let id = localStorage.getItem('PDP_ID');

        await client.query({
            query: gql`
                query($id: String!) {
                    product(id: $id) {
                        attributes {
                            id,
                            name,
                            type,
                            items {
                                displayValue,
                                value,
                                id,
                            },
                        }
                    }
                }
            `, 
            variables: { id: id },
        }).then((result) =>  {this.setState({ currentPop: result.data.product })})

        client.query({
            query: gql`
                query($id: String!) {
                    product(id: $id) {
                        id,
                        name,
                        inStock,
                        gallery,
                        description,
                        category,
                        attributes {
                            id,
                            name,
                            type,
                            items {
                                displayValue,
                                value,
                                id,
                            },
                        },
                        prices {
                            currency {
                                label, 
                                symbol 
                            },
                            amount,
                        },
                        brand,
                    }
                }
            `, 
            variables: { id: id }
        }).then((result) =>  this.setState({
            productDetails: {
                name: result.data.product.name,
                brand: result.data.product.brand,
                img: result.data.product.gallery,
                product_id: result.data.product.id,
                prices: result.data.product.prices,
                attributes: result.data.product.attributes,
                counter: 1,

                inputsInfo: {},
                orderID: '',
            }
        }))
    }

    checkInputs() {
        let requiredInputSet = null;

        let attrArray = this.state.currentPop.attributes.map((element)=> {
            return element.id;
        })

        requiredInputSet = new Set(attrArray);

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

    addToCart() {
        let requiredInputSet = this.checkInputs();

        if (requiredInputSet.size) {
            const missingInputsArr = Array.from(requiredInputSet);
            alert(`Choose product features before continue: ${ missingInputsArr }`)
        } 
        else {
            this.getOrderID(this.state.productDetails.name, this.state.productDetails.inputsInfo);
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
                
                localStorage.setItem('currentOrder', JSON.stringify(finalData));

                Array.from(document.getElementsByTagName('input')).map((element) => {
                    if (!element.className.includes('minicart')) {
                        element.checked = false;
                    }
                    return null;
                })
            }, 500);

            let allPopups = Array.from(document.getElementsByClassName('popup-container'));

            allPopups.map((element) => {
                if(!element.classList.contains('invisible')){
                    element.classList.add('invisible')
                }
                return null;
            })

        }
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

    handleInput(event) {
        this.setState(prevValue => ({
            productDetails: {
                name: prevValue.productDetails.name,
                brand: prevValue.productDetails.brand,
                img: prevValue.productDetails?.img,
                product_id: prevValue.productDetails.id,
                prices: prevValue.productDetails.prices,
                attributes: prevValue.productDetails.attributes,
                counter: 1,
                inputsInfo: {...prevValue.productDetails?.inputsInfo, ...{
                    [`${event.className}  ${event.name}`]: event.value,
                }},

                orderID: '',
            }
        }));
    }

    render() {
        return (       
            <div className="product-root">  
                <div 
                    className = { this.props.cardData.inStock ? "product-card product-wrapper" : "product-card product-outofstock-wrapper" }
                    onClick = { this.showDetails }
                >
                    { this.props.cardData.inStock ? null : <p className="wrapper__title">OUT OF STOCK</p> }
                    
                    <div className="product-container">
                        <img className="product__image" src = { this.props.cardData.gallery[0] } alt = { this.props.cardData.name } />
                        <p className="product__name">{ `${this.props.cardData.brand} ${this.props.cardData.name}` }</p>
                        <p className="product__price">
                            <span className="price-value">

                                { this.props.cardData.prices.map((potentialPrice) => {
                                    return potentialPrice.currency.label === this.props.newCurrency[1] ? `${this.props.newCurrency[0]} ${(potentialPrice.amount).toFixed(2)}` : null;
                                })}

                            </span>
                        </p>

                        { this.props.cardData.inStock ? 
                            <>
                                <button className="product-button">
                                    <svg className="cart-icon" width="24" height="24" viewBox="0 0 23 20" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.5613 3.87359C19.1822 3.41031 18.5924 3.12873 17.9821 3.12873H5.15889L4.75914 1.63901C4.52718 0.773016 3.72769 0.168945 2.80069 0.168945H0.653099C0.295301 0.168945 0 0.450523 0 0.793474C0 1.13562 0.294459 1.418 0.653099 1.418H2.80069C3.11654 1.418 3.39045 1.61936 3.47434 1.92139L6.04306 11.7077C6.27502 12.5737 7.07451 13.1778 8.00152 13.1778H16.4028C17.3289 13.1778 18.1507 12.5737 18.3612 11.7077L19.9405 5.50575C20.0877 4.941 19.9619 4.33693 19.5613 3.87365L19.5613 3.87359ZM18.6566 5.22252L17.0773 11.4245C16.9934 11.7265 16.7195 11.9279 16.4036 11.9279H8.00154C7.68569 11.9279 7.41178 11.7265 7.32789 11.4245L5.49611 4.39756H17.983C18.1936 4.39756 18.4042 4.49824 18.5308 4.65948C18.6567 4.81994 18.7192 5.0213 18.6567 5.22266L18.6566 5.22252Z" fill="#FFFFFF"/>
                                        <path d="M8.44437 13.9814C7.2443 13.9814 6.25488 14.9276 6.25488 16.0751C6.25488 17.2226 7.24439 18.1688 8.44437 18.1688C9.64445 18.1696 10.6339 17.2234 10.6339 16.0757C10.6339 14.928 9.64436 13.9812 8.44437 13.9812V13.9814ZM8.44437 16.9011C7.9599 16.9011 7.58071 16.5385 7.58071 16.0752C7.58071 15.6119 7.9599 15.2493 8.44437 15.2493C8.92885 15.2493 9.30804 15.6119 9.30804 16.0752C9.30722 16.5188 8.90748 16.9011 8.44437 16.9011Z" fill="#FFFFFF"/>
                                        <path d="M15.6875 13.9814C14.4875 13.9814 13.498 14.9277 13.498 16.0752C13.498 17.2226 14.4876 18.1689 15.6875 18.1689C16.8875 18.1689 17.877 17.2226 17.877 16.0752C17.8565 14.9284 16.8875 13.9814 15.6875 13.9814ZM15.6875 16.9011C15.2031 16.9011 14.8239 16.5385 14.8239 16.0752C14.8239 15.612 15.2031 15.2493 15.6875 15.2493C16.172 15.2493 16.5512 15.612 16.5512 16.0752C16.5512 16.5188 16.1506 16.9011 15.6875 16.9011Z" fill="#FFFFFF"/>
                                    </svg>
                                </button>   
                            </>                                     
                        : 
                        null 
                        }

                    </div>
                </div>
                { this.props.cardData.inStock && this.props.cardData.attributes?.length ? 
                    <aside className={`invisible popup-container popup__${this.props.cardData.id}`}>
                        <Popup data = {this.state.currentPop} PCAddToCartCallback = { this.addToCart } PCHandleInputCallback = {this.handleInput}/>
                    </aside>
                    :
                    null
                }
                    
                { this.state.redirect && <Navigate to='/product' replace={ true }/> }
            </div>  
        )
    }
}

ProductCard.defaultProps = {
    newCurrency: [ "$", "USD" ]
}


export default connect()(ProductCard);