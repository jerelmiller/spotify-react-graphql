declare module 'color-thief' {
  type Color = [number, number, number]

  export default class ColorThief {
    getColor(HTMLImageElement): Color
  }
}
