const db = {}

const Sequelize = require('sequelize')
jest.mock('sequelize', () => {
  const __sqltemp = require('sequelize-mock')
  return __sqltemp
})
let sequelize = new Sequelize()
const claim = require('../claim')
const minetype = require('../minetype')

db.sequelize = sequelize
db.Sequelize = Sequelize
db[claim.name] = claim
db[minetype.name] = minetype
module.exports = db
