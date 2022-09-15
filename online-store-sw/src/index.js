import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Switch, Route, Link, Navigate } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

import './index.css';
import App from './containers/App/App';
import ProductCard from './components/ProductCard';
import ProductDescriptionPage from './containers/ProductDescriptionPage/ProductDescriptionPage';
import CartPage from './containers/CartPage/CartPage';
import MainSection from './containers/MainSection/MainSection';



export const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

// client

//   .query({

//     query: gql`

//     query{
//       categories {
//           name,
//         products {
//           id,
//           name, 
//           brand,
//           description,
//           prices {
//             currency {label, symbol},
//             amount
//           },
//           attributes {
//             items {
//               displayValue,
//               value,
//               id
//             },
//             type,
//             name
//           }
//         }
//       },
//       currencies {
//         label,
//         symbol
        
//       }
//     }
//     `,

//   })

// .then((result) => console.log(result));

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render (
  <Router>
    <ApolloProvider client = { client }>
      <App />
    </ApolloProvider>

    {/* <Routes>
      <Route  path = '/main' element = { <MainSection/> }/>    
      <Route  path = '/product' element = { <ProductDescriptionPage/> }/>
      <Route  path = '/cart' element = { <CartPage/> }/>

      <Route path = '*' element = { <Navigate to = '/main' /> } />
    </Routes> */}
  </Router>
);