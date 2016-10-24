// server/app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const apolloExpress = require('apollo-server').apolloExpress;
const graphiqlExpress = require('apollo-server').graphiqlExpress;
const addSchemaLevelResolveFunction = require('graphql-tools').addSchemaLevelResolveFunction;
const schema = require('./schema').schema;
const resolvers = require('./resolvers').resolvers;

app.use('*', cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const executableSchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers: resolvers
});


addSchemaLevelResolveFunction(executableSchema, (root, args, context, info) => {
    // if (!context || !context.authorization) {
    //     throw new Error('non-auth');
    // }
});

app.use('/graphql', apolloExpress((req) => {
    return {
        schema:executableSchema,
        context: {
            authorization: req.headers.authorization
        }
    }
}));

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));
module.exports = app;