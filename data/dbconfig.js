const knex = require('knex');
const {NODE_ENV} = require('../config/config');
const config = require('../knexfile');


module.exports = knex(config[NODE_ENV]);

