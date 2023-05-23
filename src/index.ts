/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { request, type Dispatcher } from 'undici'

export default class Client {
  private readonly domain: string
  private readonly username: string
  private readonly password: string
  private readonly token: string | null = null

  constructor (config?: ClientConfig) {
    if (
      (config == null && this.hasOneEnvVarEmpty()) ||
      this.isDomainEmpty(config) || this.isUsernameEmpty(config) || this.isPasswordEmpty(config)
    ) {
      throw new Error('Missing one or more required parameters: username, password, domain')
    }

    this.domain = (config?.domain ?? process.env.KOEL_DOMAIN)!
    this.password = (config?.password ?? process.env.KOEL_PASSWORD)!
    this.username = (config?.username ?? process.env.KOEL_USERNAME)!
  }

  private hasOneEnvVarEmpty (): boolean {
    return process.env.KOEL_DOMAIN == null || process.env.KOEL_DOMAIN.trim() === '' ||
           process.env.KOEL_USERNAME == null || process.env.KOEL_USERNAME.trim() === '' ||
           process.env.KOEL_PASSWORD == null || process.env.KOEL_PASSWORD.trim() === ''
  }

  private isDomainEmpty (config?: ClientConfig): boolean {
    return (config?.domain == null || config?.domain.trim() === '') &&
           (process.env.KOEL_DOMAIN == null || process.env.KOEL_DOMAIN.trim() === '')
  }

  private isUsernameEmpty (config?: ClientConfig): boolean {
    return (config?.username == null || config?.username.trim() === '') &&
           (process.env.KOEL_USERNAME == null || process.env.KOEL_USERNAME.trim() === '')
  }

  private isPasswordEmpty (config?: ClientConfig): boolean {
    return (config?.password == null || config?.password.trim() === '') &&
           (process.env.KOEL_PASSWORD == null || process.env.KOEL_PASSWORD.trim() === '')
  }

  /**
   * Shared part for making a request.
   * @param endpoint The endpoint (without domain)
   * @param options The request's options
   * @returns The response
   */
  private async doRequest (endpoint: string, options: RequestOptions): Promise<Dispatcher.ResponseData> {
    const finalOptions: RequestParams = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Api-Version': 'v6',
        ...options.headers
      },
      body: JSON.stringify(options.body),
      method: options.method,
      query: options.query
    }

    return await request(new URL(endpoint, this.domain), finalOptions)
  }

  /**
   * Retrieve the JSON response or throw an error if the  status code is not 200/201
   * @param data Main data returned by a request Promise already resolved.
   */
  private async getJsonResponse (data: Dispatcher.ResponseData): Promise<any> {
    const { statusCode, body } = data

    const response = await body.json()
    if (statusCode !== 200 && statusCode !== 201) {
      throw new Error(`Response: ${statusCode}, ${JSON.stringify(response)}`)
    }

    return response
  }

  private bearerToken (token: string): AuthHeader {
    return {
      Authorization: `Bearer ${token}`
    }
  }

  /**
   * Login a user
   * @returns The bearer token
   */
  public async getToken (): Promise<string> {
    const data = await this.doRequest('/api/me', {
      method: 'POST',
      body: { email: this.username, password: this.password }
    })

    const response = await this.getJsonResponse(data)
    return response.token
  }

  public async search (token: string, name: string, artist: string | null = null): Promise<any> {
    const data = await this.doRequest('/api/search/songs', {
      method: 'GET',
      query: {
        q: name
      },
      headers: this.bearerToken(token)
    })

    const response = await this.getJsonResponse(data)
    return response
  }
}
