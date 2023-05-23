
interface ClientConfig {
  username: ?string
  password: ?string
  domain: ?string
}

interface RequestParams {
  method: Dispatcher.HttpMethod
  headers?: Record<string, string | string[] | undefined> | string[] | null
  body?: string | Buffer | Uint8Array | stream.Readable | Iterable | AsyncIterable | null
  query?: Record<string, any>
}

type RequestOptions = Omit<Dispatcher.RequestOptions, 'path'>

interface AuthHeader {
  Authorization: string
}
