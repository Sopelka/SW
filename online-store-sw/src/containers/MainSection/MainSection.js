import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import './MainSection.css'

import ProductCard from '../../components/ProductCard';
import ProductDescriptionPage from './../ProductDescriptionPage/ProductDescriptionPage';
import CartPage from '../CartPage/CartPage';


export default class MainSection extends React.Component {
    // constructor() {
    //     super()

        // this.state = {
        //     catName: 'ALL',
        // }

        // this.showCat = this.showCat.bind(this);
    //}

    showCat(event) {
        console.log('event')
        console.log('event', event)
        console.log('event.target', event.target)
        // this.setState({
        //     dark: childData,
        // })

        console.log(323123, this.props.data.categories)

        this.props.data.categories.map(category => {
            if (category.name === this.props.catName){
                return alert(category.name)
            }
        });
    }

    
    render () {
        console.log('propsMAIN', this.props)
        console.log(323123, this.props.data.categories)
        return (
            <section className="main-section">
                {/* conditional rendering */}
                <h2 className="main-section__header" >
                    { this.props.catName }
                </h2>

                <div className="main-section__content">

                    {/* { для всей даты пропсы катНейм === категория, 
                        тогда массив категории.мап продукт кард (и все для продукт кард)} */}

                        {         
                        this.props.data.categories?.map(category => {
                            console.log('category.name.toUpperCase()',category.name.toUpperCase())
                            console.log('this.props.catName',this.props.catName)
                            return category.name.toUpperCase() === this.props.catName ? 
                                category.products.map((product) => {
                                    return <ProductCard cardData = { product } key = { product.id } /> 
                                })
                            : null

                            //let a = this.props.catName;
                            //     if (category.name.toUpperCase() === this.props.catName){
                            //         a = category.name
                            //     }
                            // return console.log("USPEH", a)
                            //return console.log("USPEH22", a)
                        })}
                    
                    {/* <ProductCard /> */}
                </div>
            </section>




//            
        //     <section className="main-section">
        //         {/* conditional rendering */}
        //         <h2 className="main-section__header">Category name</h2>

        //         {/* map all the data */}
        //         <div className="main-section__content">
        //             <ProductCard />
        //             <ProductCard />
        //             <ProductCard />
        //             <ProductCard />
        //             <ProductCard />
        //             <ProductCard />

        //         </div>
        //         {/* by clicking on product card routing by id on productDescription */}
        //             <ProductDescriptionPage />

        //         <CartPage />
                
        //     </section>
        )
    }
}