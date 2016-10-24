const user = require('./db').user;

exports.resolvers = {
    Query: {
        users(root, args, context) {
            return user.findAll();
        },
        user(root, args, context) {
            return user.findOne({ where: { githubUsername: args.githubUsername }});
        }
    },
    Mutation: {
        createUser(root, args, context) {
            return user.create({
                firstName: args.firstName,
                lastName: args.lastName,
                githubUsername: args.githubUsername
            })
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