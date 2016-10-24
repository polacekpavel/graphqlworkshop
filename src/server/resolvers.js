const user = require('./db').user;
const DataLoader = require('dataloader');
const fetch = require('node-fetch');
const Promise = require('bluebird');

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
            return user.findOne({ where: { githubUsername: args.githubUsername } });
        }
    },
    Mutation: {
        createUser(root, args, context) {
            return Promise.delay(5000).then(() => user.create({
                firstName: args.firstName,
                lastName: args.lastName,
                githubUsername: args.githubUsername
            }));
        }
    },
    User: {
        github(root, args, context) {
            return fetch(`https://api.github.com/users/${root.githubUsername}`)
                .then((res) => res.json())
                .then((res) => {
                    return {
                        username: root.githubUsername,
                        avatarSrc: res.avatar_url,
                        location: res.location
                    }
                });
        }
    },
    Github: {
        events(root, args, context) {
            return fetch(`https://api.github.com/users/${root.username}/events`)
                .then((res) => res.json())
                .then((res) => {
                    return res.map((event) => {
                        return {
                            eventType: event.type,
                            createdAt: event.created_at,
                            location: root.location
                        }
                    });
                })
        }
    },
    Event: {
        weather(root, args, context) {
            const apiKey = '458461701954a3df9a801e38d6033d17';
            return locationLoader.load(root.location).then((res) => {
                const time = Math.round(new Date(root.createdAt).getTime() / 1000);
                return fetch(`https://api.darksky.net/forecast/${apiKey}/${res.lat},${res.long},${time}?exclude=currently,flags`)
                    .then((res) => res.json())
                    .then((res) => {
                        return {
                            condition: res.daily.data[0].icon
                        }
                    });
            });
        }
    }
}