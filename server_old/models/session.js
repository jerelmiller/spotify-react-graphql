'use strict'
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define(
    'session',
    {
      accessToken: DataTypes.TEXT,
      refreshToken: DataTypes.TEXT,
      scopes: DataTypes.TEXT,
      expiresAt: DataTypes.DATE
    },
    {}
  )
  Session.associate = models => {
    // associations can be defined here
  }

  return Session
}
