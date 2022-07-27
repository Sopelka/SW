import React from 'react';
import './MainSection.css'

import ProductCard from '../../components/ProductCard';

export default class MainSection extends React.Component {
    render () {
        return (
            <section className="main-section">
                {/* conditional rendering */}
                <h2 className="main-section__header">Category name</h2>

                {/* map all the data */}
                <div className="main-section__content">
                    <ProductCard />
                </div>
            </section>
        )
    }
}