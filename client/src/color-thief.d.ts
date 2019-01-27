declare module 'color-thief' {
  type Color = [string, string, string]

  export default class ColorThief {
    getColor(HTMLImageElement): Color
  }
}
