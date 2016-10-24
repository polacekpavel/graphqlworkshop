#Step 2

Postgres connection `postgres://oakbmqixdijogm:WaIgtJyBSg9KBHa7sasNzNwBc1@ec2-54-228-192-254.eu-west-1.compute.amazonaws.com:5432/db7uuofu104gv6`  


```javascript
const db = new Sequelize('postgres://oakbmqixdijogm:WaIgtJyBSg9KBHa7sasNzNwBc1@ec2-54-228-192-254.eu-west-1.compute.amazonaws.com:5432/db7uuofu104gv6', {    
    dialectOptions: {
        "ssl": true
    },
    dialect: 'postgres',
    pool: {
        max: 1,
        min: 0,
        idle: 10000
    }
});


const UserModel = db.define('User', {
    githubUsername: { type: Sequelize.STRING, fieldName: 'github_username' },
    firstName: { type: Sequelize.STRING, fieldName: 'first_name' },
    lastName: { type: Sequelize.STRING, fieldName: 'last_name' },
}, {
    timestamps: false
});

const User = db.models.User

db.sync();

exports.user = User;

```