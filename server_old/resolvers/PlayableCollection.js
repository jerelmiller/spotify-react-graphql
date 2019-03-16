const capitalize = str => str.slice(0, 1).toUpperCase() + str.slice(1)

export default {
  __resolveType: ({ uri }) => {
    const [_, type, id] = uri.split(':')

    return capitalize(type)
  }
}
