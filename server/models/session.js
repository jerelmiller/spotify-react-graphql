'use strict'
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define(
    'session',
    {
      refreshToken: DataTypes.STRING
    },
    {}
  )
  Session.associate = models => {
    // associations can be defined here
  }

  return Session
}
