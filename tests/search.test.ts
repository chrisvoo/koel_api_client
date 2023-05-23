import Client from '../src/index'

it('Can search a song', async () => {
    const client = new Client()

    const token = await client.getToken()
    const result = await client.search(token, 'lady')

    expect(Array.isArray(result)).toBeTruthy()
    /*
        {
          type: 'songs',
          id: 'fb0fa370-b189-4984-905b-498281546c48',
          title: 'She’s a Lady',
          lyrics: '',
          album_id: 4341,
          album_name: 'Fear and Loathing in Las Vegas',
          artist_id: 548,
          artist_name: 'Tom Jones',
          album_artist_id: 2,
          album_artist_name: 'Various Artists',
          album_cover: 'https://thecastles.duckdns.org/img/covers/1aba15a70bb0c14ed01d8189d1ca103ce88c6231.jpeg',
          length: 196.55,
          liked: false,
          play_count: 0,
          track: 3,
          disc: 1,
          genre: 'Folk Rock / Pop Rock / Rock',
          year: '1998',
          created_at: '2023-05-07T21:35:01.000000Z'
        }
     */
    if (result.length !== 0) {
        expect(result[0].hasOwnProperty('title')).toBeTruthy()
    }
})



