import React from 'react';
import './CartPage.css';

import CartItem from '../../components/CartItem';

export default class CartPage extends React.Component {
    constructor() {
        super();

        this.state = {
            allItems : null,

            cartEmpty: true,
        }

        
        this.showOrderData = this.showOrderData.bind(this);
        this.getTotal = this.getTotal.bind(this);

        this.changeCounter = this.changeCounter.bind(this);
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

            this.getTotal()
            this.getTotal(true)

            
            setTimeout(()=>{
                if(this.state.allItems) {
                    localStorage.setItem('currentOrder', JSON.stringify(this.state.allItems))
                }
            }, 100)

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



    showOrderData() {
        let data = null;

        if (localStorage.getItem('currentOrder')) {
            //setTimeout(()=>{data = localStorage.getItem('currentOrder');},0)
            data = localStorage.getItem('currentOrder');
            data = JSON.parse(data);

            this.setState({
                allItems: data,
                cartEmpty: false,
            })     
        }

        return data;
    }


    getTotal(tax) {
        let result = this.state.allItems.map((product) => {
            let currPrice = product.prices.map((probablePrice) => {
                return probablePrice.currency.label === this.props.newCurrency[1] ? probablePrice.amount : 0 ;
            })
            currPrice = currPrice.filter(el => el > 0 );
            return (currPrice * product.counter);
        })
        .reduce((prev, curr) => { 
            return prev + curr 
        })

        return tax ? `${this.props.newCurrency[0]} ${Math.floor(result * 0.21 * 100) / 100}`: `${this.props.newCurrency[0]} ${Math.floor(result * 100) / 100}`;
    }



    componentDidMount() {

        let result = this.showOrderData();

        if (!result) {
            this.setState({
                allItems: null,
                cartEmpty: false,
            })   
        }


        
    }

    componentWillUnmount() {

    }

    
    render() {
        console.log("CARTPAGEstate", this.state)
        console.log("CARTPAGEprops", this.props)
        return (
            <>
                <h1 className="cart__main-header">CART</h1>

                { this.state.allItems ?
                    this.state.allItems.map((element, index) => {
                        return <CartItem 
                            key={ index } 
                            data = { element } 
                            newCurrency = { this.props.newCurrency } 
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
                        <p className="summary__data-tax summary__data">{ this.state.allItems ? this.getTotal(true) : null }</p> {/* {`${this.props.newCurrency[0]}${this.state.taxValue}`} */}
                        <p className="summary__data-quantity summary__data">{ this.props.cartAmount }</p>
                        <p className="summary__data-total summary__data">{this.state.allItems ? this.getTotal(false) : null }</p> {/* {`${this.props.newCurrency[0]}${this.state.totalSum}`} */}
                    </div>
                </div>
                <button className="cart__order-button">ORDER</button>
            </>
        )
    }
}




// { this.props.data?.prices?.map((potentialPrice) => {
//     return potentialPrice.currency.label === this.props.newCurrency[1] ? `${this.props.newCurrency[0]} ${potentialPrice.amount}` : null;
// })}

    // getTotalSum(arr){
    //     let result = !localStorage.getItem('currentOrder') && !arr ? 
    //         null
    //         : 
    //         arr.map((el) => {
    //             let currPrice = el.prices.map((pair) => {
    //                 return pair.currency.label === this.props.newCurrency[1] ? pair.amount : 0 ;
    //             })
    //             currPrice = currPrice.filter(el => el > 0 )
    //             return (currPrice * el.counter);
    //         })
    //         .reduce((prev, curr) => { 
    //             return prev + curr 
    //         })

    //     if(result){
    //         result = Math.floor(result * 100) / 100

    //         this.setState({
    //             totalSum: result
    //         })
    //     }

    //     setTimeout(() => {
    //         this.getTaxValue();
    //     }, 100)
    // }

    // getTaxValue(){
    //     this.setState({
    //         //taxValue: this.state.totalSum * 0.21
    //         taxValue: Math.floor((this.state.totalSum * 0.21) * 100) / 100
    //     })
        
    //     //this.state.totalSum * 0.21
    // }

    // componentDidMount() {
    //     let arr = this.showOrderData();
    //     this.getTotalSum(arr);
    // }