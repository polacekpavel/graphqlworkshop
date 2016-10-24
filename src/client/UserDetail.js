import React, { Component } from "react";

class UserDetail extends Component {
    render() {
        let content = <div>
            <button className={'btn btn-danger'}
                    onClick={() => this.props.onBack()}>
                Back
            </button>
            <div>
                <h3>{this.props.user.firstName} {this.props.user.lastName}</h3>
            </div>
            <table className="eventTable">
                <tr>
                    <th>
                        Event type
                    </th>
                    <th>
                        Weather
                    </th>
                </tr>
                <tr>
                    <td>Fork</td>
                    <td><img src={`weather/cloudy.png`} width={24} height={24}/></td>
                </tr>
                <tr>
                    <td>Watch</td>
                    <td><img src={`weather/snow.png`} width={24} height={24}/></td>
                </tr>
            </table>

        </div>;
        return content;
    }
}

export default UserDetail;