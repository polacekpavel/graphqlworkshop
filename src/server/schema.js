exports.schema = [`
    # Entry point to our application
    type Query {
        # List of all users
        users: [User]
        # Get user detail
        user(githubUsername: String!): User
    }
    
    # Entry point for modifications
    type Mutation {
        # Create new user
        createUser(firstName: String, lastName: String, githubUsername: String!): User
    }
    
    type User {
        id: Int,
        firstName: String
        lastName: String
        github: Github
    }
    
    type Github {
        username: String
        location: String
        avatarSrc: String
        events: [Event]
    }
    
    type Event {
        eventType: String,
        weather: Weather
    }
    
    type Weather {
        condition: String
    }
`]