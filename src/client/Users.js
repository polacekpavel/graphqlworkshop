import React, { Component } from "react";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetail: true,
            // users: [{
            //     id: 1,
            //     firstName: 'Test',
            //     lastName: 'User 1'
            // }, {
            //     id: 2,
            //     firstName: 'Test',
            //     lastName: 'User 2'
            // }]
        }
    }

    render() {

        let content = <div>{/**/}
            {
                this.props.data.users && this.props.data.users.filter((item) => item).map((item) => {
                    return <div className="row" onClick={() => {
                        if (this.props.onClick) {
                            this.props.onClick(item);
                        }
                    }
                    }>
                        {item.id} : {item.firstName} {item.lastName}
                    </div>
                })
            }
        </div>;
        return content;
    }
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