```javascript
//client batching
const client = new ApolloClient({
    networkInterface,
    shouldBatch: true
});
````

````javascript
//Server batching and caching
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

````
