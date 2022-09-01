import React from 'react';
import './MainSection.css'

// import ProductCard from '../../components/ProductCard';
// import ProductDescriptionPage from './../ProductDescriptionPage/ProductDescriptionPage';
import CartPage from '../CartPage/CartPage';


export default class MainSection extends React.Component {
    render () {
        return (
            <section className="main-section">
                <div className="main-section__screen"></div>
                {console.log("AAAAAAAAAAAAAAAAAAAAAAAAA")}
                {/* conditional rendering */}
                {/* <h2 className="main-section__header">Category name</h2> */}

                {/* map all the data */}
                <div className="main-section__content">
                    {/* <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard /> */}

                </div>
                {/* by clicking on product card routing by id on productDescription */}
                    {/* <ProductDescriptionPage /> */}

                <CartPage />
                
            </section>
        )
    }
}