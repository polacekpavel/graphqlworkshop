#Step 3

0. (optional) Update your schema `apollo-codegen download-schema http://localhost:8000/graphql --output ./graphql.schema.json`
1. Bootstrap Apollo client
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

2. Connect your react containers with ApolloData
````javascript
import { graphql } from "react-apollo";
import gql from "graphql-tag";

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
`