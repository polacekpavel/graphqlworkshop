import React, { Component } from "react";
import Users from "./Users";
import UserDetail from "./UserDetail";
import CreateUser from "./CreateUser";
export default class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCreateNewUser: false,
            selectedUser: null
        }
    }

    render() {
        const saveHideButtonClassName = this.state.showCreateNewUser ? 'btn btn-danger' : 'btn btn-success';

        let content = <div>
            {this.state.selectedUser && <div>
                <UserDetail user={this.state.selectedUser} onBack={() => this.setState({ selectedUser: null })}/></div>
            ||
            <Users ref={(ref) => this.users = ref} onClick={(item) => this.setState({ selectedUser: item })}/>}
            {
                !this.state.selectedUser &&
                <button className={saveHideButtonClassName}
                        onClick={() => this.setState({ showCreateNewUser: !this.state.showCreateNewUser })}>
                    {this.state.showCreateNewUser ? 'Hide' : 'Create new user'}
                </button>
            }

            {this.state.showCreateNewUser && <CreateUser onCreate={() => {
                this.users.data.refetch();
                this.setState({ showCreateNewUser: !this.state.showCreateNewUser })
            }
            }/> }
        </div>;
        return content;
    }
}