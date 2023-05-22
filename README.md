# koel_api_client

A Node.js client written with TypeScript for Koel

## Usage

```typescript

import Client from 'koel_api_client'

// when using env variables (KOEL_DOMAIN, KOEL_USERNAME, KOEL_PASSWORD), no need to pass anything to the constructor
const client = new Client()
const token = await client.getToken()

// otherwise
const client = new Client({
    domain: 'blah',
    username: 'blah',
    password: 'blah'
}))
const token = await client.getToken()
```


## Tests

The tests provided here could be thought as integration tests with your streaming server. They're pretty generic to be compatible with every instance, without relying on specific content.
If there aren't any items to be tested, a warning will be produced.

1. Create a `tests/envVars.js` file copying it from `tests/envVars.js.dist`
2. Replace the placeholders values with the ones used by your streaming server
3. Run `npm test`
