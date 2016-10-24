import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import update from 'react-addons-update';
class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: null,
            lastName: null,
            githubUsername: null
        }
    }

    render() {
        return (
            <div className="create-user-form">
                <div>
                    <label>First name: </label>
                    <input type="text" className="main-input" placeholder="First name"
                           onChange={(e) => this.setState({ firstName: e.target.value }) }/>
                </div>
                <div>
                    <label>Last name: </label>
                    <input type="text" className="main-input" placeholder="Last name"
                           onChange={(e) => this.setState({ lastName: e.target.value }) }/>
                </div>
                <div>
                    <label>Github username: </label>
                    <input type="text" className="main-input" placeholder="Github username"
                           onChange={(e) => this.setState({ githubUsername: e.target.value }) }/>
                </div>
                <button className="btn btn-success"
                        onClick={() => {
                            this.props.mutate({
                                variables: {
                                    firstName: this.state.firstName,
                                    lastName: this.state.lastName,
                                    githubUsername: this.state.githubUsername
                                },
                                optimisticResponse: {
                                    createUser: {
                                        id: 123123,
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
                                    }
                                }
                            }).then(() => this.props.onCreate());
                        }}>
                    Save
                </button>
            </div>
        )
    }
}
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
