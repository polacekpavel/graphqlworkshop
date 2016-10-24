import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class UserDetail extends Component {
    render() {
        console.log('this.props', this.props);
        let content = <div>
            <button className={'btn btn-danger'}
                    onClick={() => this.props.onBack()}>
                Back
            </button>
            <div>
                { this.props.data.user &&
                <h3>{this.props.data.user.firstName} {this.props.data.user.lastName}</h3>
                }
                {
                    this.props.data.loading &&
                    <h3>Loading</h3>
                }
            </div>
            { !this.props.data.loading && this.props.data.user && this.props.data.user.github &&
            <div>
                <div>
                    <img src={this.props.data.user.github.avatarSrc} width={50} height={50}/>
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
                    {this.props.data.user.github.events.map((event) => {
                        return <tr>
                            <td>{event.eventType}</td>
                            <td><img src={`weather/${event.weather.condition}.png`} width={24} height={24}/></td>
                        </tr>
                    })}

                </table>
            </div>
            }
        </div>;
        return content;
    }
}
const UserDetailQuery = gql`
    query getUserDetail($githubUsername: String!) {
        user(githubUsername: $githubUsername) {
            firstName,
            lastName,
            github {
                username,
                location,
                avatarSrc,
                events {
                    eventType,
                    weather {
                        condition
                    }
                }
            }
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