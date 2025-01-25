var bodyParser = require('body-parser')

// middlewares
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = {
    jsonParser,
    urlencodedParser
}