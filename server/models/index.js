const env = process.env.NODE_ENV || 'development'
const Sequelize = require('sequelize')
const config = require('../config/database')[env]
const { getRelativeFiles } = require('../utils/fs')

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

const models = getRelativeFiles(__dirname).reduce((models, file) => {
  const model = sequelize.import(path.join(__dirname, file))

  return { ...models, [model.name]: model }
}, {})

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

module.exports = {
  sequelize,
  Sequelize,
  ...models
}
