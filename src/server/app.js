// server/app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const apolloExpress = require('apollo-server').apolloExpress;
const graphiqlExpress = require('apollo-server').graphiqlExpress;

const schema = require('./schema').schema;
const resolvers = require('./resolvers').resolvers;

app.use('*', cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const executableSchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers: resolvers
});
app.use('/graphql', apolloExpress((req) => {
    return {
        schema:executableSchema
    }
}));

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));
module.exports = app;