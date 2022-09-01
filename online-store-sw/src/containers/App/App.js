import React from 'react';

import Header from '../../components/Header/index';
import MainSection from '../MainSection/MainSection';

export default class App extends React.Component {
    constructor(){
        super()

        this.state={
            dark: true
        }

        this.setDark = this.setDark.bind(this);
    }

    setDark(){
        console.log("123123")
    }

    render() {
        return (
            <div className='app'>
                <Header />
                <MainSection />
            </div>
        )
    }
}