import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface('http://localhost:8000/graphql');

const client  = new ApolloClient({
    networkInterface: networkInterface
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    ,
    document.getElementById('root')
);
