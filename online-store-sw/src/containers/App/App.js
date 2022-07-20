//import logo from '../../logo.svg';
//import './App.css';
import React from 'react';

import Header from '../../components/Header/index';


export default class App extends React.Component {
    render() {
        return (
            <Header />
            // <div className="App">
            //     <header className="App-header">
            //         <img src={logo} className="App-logo" alt="logo" />
            //         <p>Save to reload.</p>
            //     </header>
            // </div>
        )
    }
}