declare module 'redux-simple-auth' {
  export function getSessionData(state: Object): any
  export function invalidateSession(): Promise<any>
}
