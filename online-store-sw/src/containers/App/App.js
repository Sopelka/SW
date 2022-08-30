import React from 'react';

import Header from '../../components/Header/index';
import MainSection from '../MainSection/MainSection';

export default class App extends React.Component {
    render() {
        return (
            <>
                <Header />
                <MainSection />
            </>
        )
    }
}