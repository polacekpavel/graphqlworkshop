import React, { Component } from "react";

class UserDetail extends Component {
    render() {
        let content = <div>
            <button className={'btn btn-danger'}
                    onClick={() => this.props.onBack()}>
                Back
            </button>
            <div>
                <h3>{this.props.user.firstName} {this.props.user.lastName} {this.props.user.github && (this.props.user.github.username)} </h3>
            </div>
            <div>
                <img src="https://avatars0.githubusercontent.com/u/273551?v=3&s=140" width={50} height={50}/>
            </div>
            <div>
                <p>Prague</p>
            </div>
            <table className="eventTable">
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
                        <td><img src={`weather/clear-day.png`} width={24} height={24}/></td>
                    </tr>
                    <tr>
                        <td>Watch</td>
                        <td><img src={`weather/clear-day.png`} width={24} height={24}/></td>
                    </tr>
                </table>
            </table>

        </div>;
        return content;
    }
}

export default UserDetail;