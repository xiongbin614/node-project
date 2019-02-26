const db = require('../config/db');

const schem = new db.Schema({
    cinemaName: String,
    cinemaAdress: String
});

module.exports = db.model('cinema', schem);