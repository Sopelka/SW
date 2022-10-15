//Core
import React from 'react';

//Locals
import './MainSection.css';
import ProductCard from '../../components/ProductCard';

export default class MainSection extends React.Component {      
    render () {
        const { catName, category, newCurrency, appCartAmountCallback } = this.props;
        return (
            <section className="main-section">
                <h2 className="main-section__header" >
                    { catName }
                </h2>
                <div className="main-section__content">      
                    { category.products ?
                        category.products.map((product) => {
                            return ( 
                                <ProductCard 
                                    cardData = { product } 
                                    key = { product?.id } 
                                    newCurrency = { newCurrency }  
                                    appCartAmountCallback = { appCartAmountCallback }                              
                                />
                            );
                        })
                        :
                        null
                    }
                </div>
            </section>
        )
    }
}
