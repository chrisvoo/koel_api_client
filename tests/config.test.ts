import Client from '../src/index'

// jest setup files automatically populates the env vars below with the one you've specified in tests/envVars.js.
// To make the tests in this file work, we overwrite them with empty values
process.env = Object.assign(process.env, {
  KOEL_DOMAIN: '',
  KOEL_USERNAME: '',
  KOEL_PASSWORD: '',
});

test('Exception if config is missing', () => {
  expect(() => new Client(undefined))
    .toThrow('Missing one or more required parameters: username, password, domain')
})

test('Exception if one param is missing', () => {
  expect(() => new Client({ domain: null, username: '', password: '' }))
    .toThrow('Missing one or more required parameters: username, password, domain')
})

test('Exception if one param is empty', () => {
  expect(() => new Client({ domain: 'blah', username: 'blah', password: '  ' }))
    .toThrow('Missing one or more required parameters: username, password, domain')
})
