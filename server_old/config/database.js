module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'spotify_development',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'postgres',
    database: 'spotify_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'spotify',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
}
