const db = require('../config/db');

const schem = new db.Schema({
    name: String,
    imgUrl: String
});

module.exports = db.model('film', schem);