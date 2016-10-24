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