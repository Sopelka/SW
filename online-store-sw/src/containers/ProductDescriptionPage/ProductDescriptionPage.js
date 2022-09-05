import React from 'react';
import './ProductDescriptionPage.css';
import TextInput from '../../components/Inputs/TextInput';
import SwatchInput from '../../components/Inputs/SwatchInput';

export default class ProductDescriptionPage extends React.Component {s
    constructor() {
        super();

        this.state = {
            description: "<p>Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.</p>",
        }
    }

    render() {
        return(
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
                    <p className="info-form__brand-name">Apollo</p>
                    <p className="info-form__item-name">Running Short</p>
                    {/* Мапим здесь и под каждый создаем инпут */}
                    <TextInput />
                    <SwatchInput />
                    <p className="info-form__price-title">PRICE:</p>
                    <p className="info-form__price">$50.00</p>
                    <button className="info-form__submit-button" type="submit">ADD TO CART</button>
                    <div className="info-form__description" dangerouslySetInnerHTML={{__html: this.state.description}} />
                </form>
            </div>
        )
    }
}