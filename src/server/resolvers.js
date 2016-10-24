exports.resolvers = {
    Query: {
        users(root, args, context) {
            return [{
                firstName: 'First name 1',
                lastName: 'Last name'
            },{
                firstName: 'First name 2',
                lastName: 'Last name'
            }]
        },
        user(root, args, context) {
            return {
                firstName: 'First name 1',
                lastName: args.githubUsername
            }
        }
    },
    Mutation: {
        createUser(root, args, context) {
            return {
                firstName: args.firstName,
                lastName: args.lastName
            }
        }
    },
    User: {
        github(root, args, context) {
            return {
                username: root.firstName,
                location: 'Prague',
                avatarSrc: 'https://avatars0.githubusercontent.com/u/273551?v=3&s=140'
            }
        }
    },
    Github: {
        events(root, args, context) {
            return [{
                eventType: 'Fork',
            },{
                eventType: 'Watch',
            }]

        }
    },
    Event: {
        weather(root, args, context) {
            return {
                condition: 'fog'
            }
        }
    }
}