import Client from '../src/index'

it('Can obtain a token', async () => {
    const client = new Client()

    const token = await client.getToken()
    expect(typeof token).toBe('string')
    expect(token.length).toBe(43)
})



