const user = require('./db').user;
const DataLoader = require('dataloader');

const locationLoader = new DataLoader((ids) => {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${ids}`)
        .then((res) => res.json())
        .then((res) => {
            const lat = res.results[0].geometry.location.lat;
            const long = res.results[0].geometry.location.lng;

            return [{
                lat,
                long
            }];
        })
}, {
    batch: false
});

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