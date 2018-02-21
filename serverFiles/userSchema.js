var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    }, email: {
        type: String,
        required: true,
        trim: true
    }, username: {
        type: String,
        required: true,
        trim: true
    }, password: {
        type: String,
        required: true,
        minlength: 2
    }, key: {
        type: String,
        required: true
    }
});

var User = mongoose.model('User', userSchema);

module.exports = {User};