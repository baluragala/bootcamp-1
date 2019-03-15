const path = require('path')
const ROOT = path.resolve(__dirname, './')
const options = {
  client: 'mysql',
  connection: {
	host : 'localhost',
	user : 'root',
	password : 'password',
	database : 'recipe'
  },
  migrations: {
    directory: path.join(ROOT, 'migrations'),
    tableName: 'migrations'
  },
  debug: false,
  pool : {
    min: 2,
    max: 10
  }
}

module.exports = {
  development: Object.assign({}, options)
}