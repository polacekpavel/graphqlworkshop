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
.
.
.
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

Test your queries in graphiql [http://localhost:8000/graphiql](http://localhost:8000/graphiql) 
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
````

Resolvers.js
````javascript
  Query: {
        users(root, args, context) {
            return user.findAll();
        },
        user(root, args, context) {
            return user.findOne({ where: { githubUsername: args.githubUsername }});
        }
    },
    Mutation: {
        createUser(root, args, context) {
            return user.create({
                firstName: args.firstName,
                lastName: args.lastName,
                githubUsername: args.githubUsername
            })
        }
    },
````

Test your queries and mutation in graphiql [http://localhost:8000/graphiql](http://localhost:8000/graphiql)

#Step 3

0.(optional) Update your schema `apollo-codegen download-schema http://localhost:8000/graphql --output ./graphql.schema.json`
1.Bootstrap Apollo client
```javascript
import { ApolloProvider } from "react-apollo";
import ApolloClient, { createNetworkInterface } from "apollo-client";


const networkInterface = createNetworkInterface('http://localhost:8000/graphql');

const client = new ApolloClient({
    networkInterface
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);

````
2.Connect your react component with ApolloData (Users.js)

````javascript
class Users extends Component {
 ...   
}


const UsersQuery = gql`
    query getAllUsers {
        users {
            id
            firstName,
            lastName,
            github {
                username
            }
        }
    }
`;
export default graphql(UsersQuery)(Users);

````
3.Connect your react component (UserDetail) with ApolloData and using variables (UserDetail.js)
````javascript
import { graphql } from "react-apollo";
import gql from "graphql-tag";
class UserDetail extends Component {
 ...   
}
const UserDetailQuery = gql`
    query getUsersDetail($githubUsername: String!) {
        user(githubUsername: $githubUsername) {
            firstName,
            github {
                avatarSrc,
                events {
                    createdAt,
                    eventType,
                    weather {
                        condition
                    }
                },
                username,
                location
            },
            lastName
        }
    }
`
export default graphql(UserDetailQuery, {
    options: (props) => {
        return {
            variables: {
                githubUsername: props.user.github.username
            }
        }
    }
})(UserDetail);
````

# Step 4
```javascript
import { graphql } from "react-apollo";
import gql from "graphql-tag";
````
```javascript
 <button className="btn btn-success"
                        onClick={() => {
                            this.props.mutate({
                                variables: {
                                    firstName: this.state.firstName,
                                    lastName: this.state.lastName,
                                    githubUsername: this.state.githubUsername
                                }
                            }).then(() => this.props.onCreate());

                        }}>
                    Save
                </button>
````
```javascript
const CreateUserQuery = gql`
    mutation createUser ($firstName: String!, $lastName: String!, $githubUsername: String!) {
        createUser(firstName: $firstName, lastName: $lastName, githubUsername: $githubUsername) {
            firstName,
            id,
            github {
                username
            }
            lastName
        }
    }
`
export default graphql(CreateUserQuery)(CreateUser);
````

Refetch data
```javascript
this.users.data.refetch();
````

# Step 5
```javascript
//Client index .js
networkInterface.use([{
    applyMiddleware(req, next) {
        if (!req.options.headers) {
            req.options.headers = {};
        }

        req.options.headers.authorization = 'xxx' //github api personal access token; 
        next();
    }
}]);
````
```javascript
//Server App.js
const addSchemaLevelResolveFunction = require('graphql-tools').addSchemaLevelResolveFunction;
addSchemaLevelResolveFunction(executableSchema, (root, args, context, info) => {
    if (!context || !context.authorization) {
        throw new Error('non-auth');
    }
});
````

```javascript
app.use('/graphql', apolloExpress((req) => {
    return {
        schema: executableSchema,
        context: {
            authorization: req.headers.authorization
        },
    }
}));

````
#Step 6
```javascript
//client batching
const client = new ApolloClient({
    networkInterface,
    shouldBatch: true
});
````

````javascript
//Server batching and caching
const locationLoader = new DataLoader((ids) => {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${ids}`)
        .then((res) => res.json())
        .then((res) => {
            const lat = res.results[0].geometry.location.lat;
            const long = res.results[0].geometry.location.lng;

            return [{
                lat,
                long
            }];
        })
}, {
    batch: false
});

````
Google places api 
`https://maps.googleapis.com/maps/api/geocode/json?address=${location}`

Weather api - time machine
`https://api.darksky.net/forecast/${apiKey}/${lat},${long},${time}?exclude=currently,flags`

Github events api
`https://api.github.com/users/${username}/events`

Github user detail api
`https://api.github.com/users/${githubUsername}`


#Step 7
````javascript
import update from 'react-addons-update';
...

this.props.mutate({
                                variables: {
                                    ...
                                },
                                optimisticResponse: {
                                    createUser: {
                                        id: 100,
                                        firstName: this.state.firstName,
                                        lastName: this.state.lastName,
                                      github: {
                                          username: this.state.githubUsername
                                      }
                                    }
                                },
                                updateQueries: {
                                    getAllUsers: (prev, { mutationResult }) => {
                                        const newUser = mutationResult.data.createUser;
                                        return update(prev, {
                                            users: {
                                                $unshift: [newUser]
                                            }
                                        });
                                   
````

