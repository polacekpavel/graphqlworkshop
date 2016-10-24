import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface('http://localhost:8000/graphql');

networkInterface.use([{
    applyMiddleware(req, next) {
        if (!req.options.headers) {
            req.options.headers = {};
        }

        req.options.headers.authorization = 'xxx' //github api personal access token;
        next();
    }
}]);

const client  = new ApolloClient({
    networkInterface: networkInterface,
    shouldBatch: true
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    ,
    document.getElementById('root')
);
