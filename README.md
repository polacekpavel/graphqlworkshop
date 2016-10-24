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
