import React from "react";
import './index.css'

export default class CartItemSlider extends React.Component {
    constructor() {
        super();

        this.state = {
            currentImgIndex: 0,
        };

        this.changeImage = this.changeImage.bind(this);
        this.mainImageRef = React.createRef();
    }

    changeImage(increase) {
        const { data } = this.props;
        const { currentImgIndex } = this.state;

        if (increase) {
            if (data.img[currentImgIndex + 1]) {
                this.setState((prevValue) => ({
                    currentImgIndex: prevValue.currentImgIndex + 1,
                }));
            }
            else {
                this.setState({
                    currentImgIndex: 0
                });
            }
        }
        else if (!increase) {
            if (data.img[currentImgIndex - 1]) {
                this.setState((prevValue) => ({
                    currentImgIndex: prevValue.currentImgIndex - 1,
                }));
            }
            else {
                this.setState({
                    currentImgIndex: data.img.length - 1,
                });
            }
        }
    }

    render() {
        const mode = this.props.size === 'small' ? '__minicart' : '' ;
        const { size, data } = this.props;
        const { currentImgIndex } = this.state;

        return (
            <div className = { `image-slider${mode}` }>
                <img className = { `image-slider__image${mode}` } src = { data?.img[currentImgIndex] } alt = "product" />

                { size === 'normal' && data?.img.length > 1 ?
                    <>
                        <div onClick = { ()=>{ this.changeImage(false) }} className={`slider-btn-left slider-btn${mode}` }>
                            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                <path d="M7.25 1.06857L1.625 6.6876L7.25 12.3066" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div onClick = { ()=>{ this.changeImage(true) }} className={`slider-btn-right slider-btn${mode}` }>
                            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.75 1.06808L6.375 6.68711L0.75 12.3062" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </>
                    : 
                    null 
                }   
            </div>
        )
    }
}

CartItemSlider.defaultProps = {
    size: 'normal',
};
