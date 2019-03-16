'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('sessions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        accessToken: {
          allowNull: false,
          type: Sequelize.TEXT
        },
        refreshToken: {
          allowNull: false,
          type: Sequelize.TEXT
        },
        expiresAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        scopes: {
          allowNull: false,
          type: Sequelize.TEXT,
          defaultValue: ''
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
      .then(() =>
        queryInterface.addConstraint('sessions', ['accessToken'], {
          type: 'unique'
        })
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sessions')
  }
}
