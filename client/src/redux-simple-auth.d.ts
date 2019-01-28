declare module 'redux-simple-auth' {
  export interface MiddlewareOptions<Data> {
    authenticators: any[]
    authorize(data: Data, header: (name: string, value: string) => void): void
  }

  export function getSessionData(state: Object): any
  export function invalidateSession(): Promise<any>
  export function authenticate(name: string, data: object): Promise<any>
  export function createAuthMiddleware<Data>(
    options: MiddlewareOptions<Data>
  ): Redux.Middleware
}
