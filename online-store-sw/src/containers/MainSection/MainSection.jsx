//Core
import React from 'react';

//Locals
import './MainSection.css';
import ProductCard from '../../components/ProductCard';

export default class MainSection extends React.Component {      
    render () {
        return (
            <section className="main-section">
                <h2 className="main-section__header" >
                    { this.props.catName }
                </h2>
                <div className="main-section__content">      
                    { this.props.data.categories?.map(category => {
                        return category.name.toUpperCase() === this.props.catName ? 
                            category.products.map((product) => {
                                return ( 
                                    <ProductCard 
                                        cardData = { product } 
                                        key = { product?.id } 
                                        newCurrency = { this.props.newCurrency }                                
                                    />
                                );
                            })
                        : null
                    })}
                </div>
            </section>
        )
    }
}
