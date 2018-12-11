export default uri => {
  const [, , id] = uri.split(':')

  return id
}
