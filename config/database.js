//for database configurations

require('dotenv').config()

module.exports = {
    // database: 'mongodb://localhost/ecommerce'
    database: process.env.DB_STRING
}