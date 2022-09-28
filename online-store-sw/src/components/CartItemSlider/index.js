import React from "react";
import './index.css'

export default class CartItemSlider extends React.Component {
    constructor() {
        super();

        this.state = {
            currentImgIndex: 0,
        }

        this.changeImage = this.changeImage.bind(this);

        this.mainImageRef = React.createRef();
    }


    changeImage(increase){
        if (increase) {
            if (this.props.data.img[this.state.currentImgIndex + 1]) {
                console.log('INCREASE', this.state.currentImgIndex)
                this.setState((prevValue) => ({
                    currentImgIndex: prevValue.currentImgIndex+1
                }))
            }
            else {
                this.setState({
                    currentImgIndex: 0
                })
            }
        }
        else if (!increase) {
            console.log('DECREASE0', this.state.currentImgIndex)
            console.log('this.props.data.img[this.state.currentImgIndex - 1]', this.props.data.img[this.state.currentImgIndex - 1])
            console.log('this.props.data.img[this.state.currentImgIndex - 1]>=0', this.props.data.img[this.state.currentImgIndex - 1]>=0)
            if (this.props.data.img[this.state.currentImgIndex - 1]) {
                console.log('DECREASE', this.state.currentImgIndex)
                this.setState((prevValue) => ({
                    currentImgIndex: prevValue.currentImgIndex-1
                }))
            }
            else {
                this.setState({
                    currentImgIndex: this.props.data.img.length-1
                })
            }
        }
    }

    render() {
        const mode = this.props.size === 'small' ? '__minicart' : '' ;
        console.log('sliderPROPS', this.props)
        return(
            <div className={`image-slider${mode}`}>
                <img className={`image-slider__image${mode}`} src={this.props?.data?.img[this.state.currentImgIndex]} alt="product" />

                { this.props.size === 'normal' && this.props?.data?.img.length > 1 ?
                    <>
                        <div onClick={()=>{ this.changeImage(false) }} className={`slider-btn-left slider-btn${mode}`}>
                            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                <path d="M7.25 1.06857L1.625 6.6876L7.25 12.3066" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div onClick={()=>{ this.changeImage(true) }} className={`slider-btn-right slider-btn${mode}`}>
                            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.75 1.06808L6.375 6.68711L0.75 12.3062" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </>
                    : null 
                }   
            </div>
        )
    }
}

CartItemSlider.defaultProps = {
    size: 'normal',
}