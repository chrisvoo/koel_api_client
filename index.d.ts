
interface ClientConfig {
  username: ?string
  password: ?string
  domain: ?string
}

interface RequestParams {
  method: Dispatcher.HttpMethod
  headers?: Record<string, string | string[] | undefined> | string[] | null
  body?: string | Buffer | Uint8Array | stream.Readable | Iterable | AsyncIterable | null
}

type RequestOptions = { dispatcher?: Dispatcher } &
Omit<Dispatcher.RequestOptions, 'origin' | 'path' | 'method'> &
Partial<Pick<Dispatcher.RequestOptions, 'method'>>
