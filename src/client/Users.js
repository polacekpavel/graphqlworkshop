import React, { Component } from "react";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetail: true,
            users: [{
                id: 1,
                firstName: 'Test',
                lastName: 'User 1'
            }, {
                id: 2,
                firstName: 'Test',
                lastName: 'User 2'
            }]
        }
    }

    render() {
        let content = <div>
            {
                this.state.users.map((item) => {
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

export default Users;