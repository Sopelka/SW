import React from 'react';
import './App.css';

import Header from '../../components/Header/index';
import MainSection from '../MainSection/MainSection';

export default class App extends React.Component {
    constructor() {
        super()

        this.state={
            dark: false,
        }

        this.setDark = this.setDark.bind(this);
    }

    setDark(childData) {
        this.setState({
            dark: childData,
        })
    }

    render() {
        return(
            <div className='app'>
                <Header appCallback={ this.setDark } />
                
                <div className={ this.state.dark ? "dark-screen" : "dark-screen disactivated" }/>
                <MainSection />
            </div>
        )
    }
}
