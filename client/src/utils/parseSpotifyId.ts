export default (uri: string) => {
  const parts = uri.split(':')
  const id = parts[parts.length - 1]
  const type = parts[parts.length - 2]

  return { id, type }
}
