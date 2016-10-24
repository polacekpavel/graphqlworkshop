#Step 1

Basic schema definition
```javascript
    # comment    
    type NameOfType {
        # Nullable string
        title: String
        # Non-Nullable string
        title: String!
        # Nullable integer
        count: Int
        # Non-Nullable integer
        count: Int!
        # Boolean
        completed: Boolean
        # Array of strings
        comments: [String]
        # Custom type
        avatar: Image
        # Array
        avatar: [Image]
    }
```
Basic resolvers
```javascript
Query: {
        users(root, args, context) {
            return [{
                id: 1,
                firstName: 'myFirstName',
                lastName: 'myLastName',
                githubUsername: 'fake'
            }]
        }
    }
```

Express
```javascript
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const apolloExpress = require('apollo-server').apolloExpress;
const graphiqlExpress = require('apollo-server').graphiqlExpress;

const schema = require('./schema').schema;
const resolvers = require('./resolvers').resolvers;


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
```
