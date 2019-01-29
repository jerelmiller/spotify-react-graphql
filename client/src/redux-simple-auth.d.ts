declare module 'redux-simple-auth' {
  export interface MiddlewareOptions<Data> {
    authenticators: Authenticator[]
    authorize(data: Data, header: (name: string, value: string) => void): void
  }

  export interface Authenticator<Data> {
    restore(data: Data): Promise<Data>
  }

  export interface AuthenticatorOptions<Data> {
    name: string
    authenticate(data: any): Promise<Data>
    restore(data: any): Promise<any>
  }

  export interface SessionState {
    isAuthenticated: boolean
    isRestored: boolean
  }

  export function getIsAuthenticated(state: Object): boolean
  export function getIsRestored(state: Object): boolean
  export function getSessionData(state: Object): any
  export function invalidateSession(): Promise<any>
  export function authenticate(name: string, data: object): Promise<any>
  export function createAuthMiddleware<Data>(
    options: MiddlewareOptions<Data>
  ): Redux.Middleware

  export function createAuthenticator<Data>(
    options: AuthenticatorOptions<Data>
  ): Authenticator
}
