//grab dependancies
var mongoose = require('mongoose')
,   User = require('./users')
,   Schema = mongoose.Schema;

chirpSchema = new Schema({
    author: { type: String, ref: User.username },
    title: { type: String, required: true },
    body: { type: String, required: true }
});

module.exports = mongoose.model('Chirps', chirpSchema);