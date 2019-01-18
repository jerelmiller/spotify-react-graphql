export type Hex = string

export interface Colors {
  green: Hex
  offWhite: Hex
  white: Hex
  [key: string]: Hex
}

export const colors: Colors = {
  green: '#2ab759',
  offWhite: '#B3B3B3',
  white: '#fff'
}
