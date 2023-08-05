
module.exports = {
  "development": {
    "username": process.env.username,
    "password": process.env.dbpassword,
    "database": "bibliotekadb",
    "host": process.env.host,
    "url": process.env.url,
    "port": 5432,
    "dialect": "postgres",
    "sl1": true,
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  },
  "production": {
    "username": process.env.username,
    "password": process.env.dbpassword,
    "database": "bibliotekadb",
    "host": process.env.host,
    "url": process.env.url,
    "port": 5432,
    "dialect": "postgres",
    "sl1": true,
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  }
}