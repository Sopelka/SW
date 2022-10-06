//Core
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import  store from './lib/redux/store';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

//Locals
import './index.css';
import App from './containers/App/App';

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
    },
    query: {
        fetchPolicy: 'no-cache',
    }
}

export const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render (
    <Provider store = { store }>
        <Router>
            <ApolloProvider client = { client }>
                <App />
            </ApolloProvider>
        </Router>
    </Provider>
);
