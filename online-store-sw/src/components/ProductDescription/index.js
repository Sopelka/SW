import React from 'react';
import './index.css'

export default class ProductDescription extends React.Component {
    render () {
        return (
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
                    <p className="info-form__manufacturer-name">Apollo</p>
                    <p className="info-form__manufacturer-name">Running Short</p>
                    <p className="info-form__size-title">SIZE</p>
                    <div className="info-form__size-options">
                        {/* < RadioBTN /> */}
                    </div>
                    <p className="info-form__color-title">COLOR</p>
                    <div className="info-form__color-options">
                        {/* < RadioBTN /> */}
                    </div>
                    <p className="info-form__price-title">PRICE</p>
                    <p className="info-form__price">$50.00</p>
                    <button className="info-form__submit-button" type="submit">ADD TO CART</button>
                    <p className="info-form__product-descriotion">Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.</p>

                </form>
            </div>
        )
    }
}