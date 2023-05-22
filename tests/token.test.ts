import Client from '../src/index'

test('sac', async () => {

    const client = new Client()

    const token = await client.getToken()
    expect(typeof token).toBe('string')
    expect(token.length).toBe(43)
})