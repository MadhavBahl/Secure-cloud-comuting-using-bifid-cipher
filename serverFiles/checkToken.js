const {mongoose} = require('./mongoose');
const {User} = require('./userSchema');

const checkToken = (user, callback) => {
    User.findOne(user, (err, result) => {
        if (err) {
            callback(err);
        } else {
            if (result) {
                console.log('Found the user!', result);
                console.log('Length of Tokens', result.tokens.length)
                callback(undefined, result);
            } else {
                callback(undefined, undefined);
            }
        }
    });
};

module.exports = {checkToken}
