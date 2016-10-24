# Plan
1. Every functionality has own branch
2. Every step has readme.md
3. If you get lost you can checkout next step `git checkout step1` or take a look into readme

## Step 0 
1. `git clone https://github.com/polacekpavel/graphqlworkshop`
2. `cd graphqlworkshop`
3. `npm install`
4. Start a client `npm start` -> http://localhost:3000
5. Start a server `nodemon src/server` -> http://localhost:8000

### Optional
1. Install nodemon `npm install nodemon -g` for live reloading
2. Install schema generator `npm install apollo-codegen -g` for schema generating

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
#Step 2

Postgres connection `postgres://oakbmqixdijogm:WaIgtJyBSg9KBHa7sasNzNwBc1@ec2-54-228-192-254.eu-west-1.compute.amazonaws.com:5432/db7uuofu104gv6`  


```javascript
const db = new Sequelize('postgres://oakbmqixdijogm:WaIgtJyBSg9KBHa7sasNzNwBc1@ec2-54-228-192-254.eu-west-1.compute.amazonaws.com:5432/db7uuofu104gv6', {    
    dialectOptions: {
        "ssl": true
    },
    dialect: 'postgres',
    pool: {
        max: 1,
        min: 0,
        idle: 10000
    }
});


const UserModel = db.define('User', {
    githubUsername: { type: Sequelize.STRING, fieldName: 'github_username' },
    firstName: { type: Sequelize.STRING, fieldName: 'first_name' },
    lastName: { type: Sequelize.STRING, fieldName: 'last_name' },
}, {
    timestamps: false
});

const User = db.models.User

db.sync();

exports.user = User;

```

