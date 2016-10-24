```javascript
//Client index .js
networkInterface.use([{
    applyMiddleware(req, next) {
        if (!req.options.headers) {
            req.options.headers = {};
        }

        req.options.headers.authorization = 'xxx' //github api personal access token; 
        next();
    }
}]);
````
```javascript
//Server App.js
const addSchemaLevelResolveFunction = require('graphql-tools').addSchemaLevelResolveFunction;
addSchemaLevelResolveFunction(executableSchema, (root, args, context, info) => {
    if (!context || !context.authorization) {
        throw new Error('non-auth');
    }
});
````

```javascript
app.use('/graphql', apolloExpress((req) => {
    return {
        schema: executableSchema,
        context: {
            authorization: req.headers.authorization
        },
    }
}));

````
