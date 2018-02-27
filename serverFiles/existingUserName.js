const {mongoose} = require('./mongoose');
const {User} = require('./userSchema');

const existingUserName = (username, callback) => {
    User.findOne({username: username}, (err, result) => {
        if (err) {
            callback(err);
        } else {
            if (result) {
                console.log('Found the user!', result);
                callback(undefined, result);
            } else {
                callback(undefined, undefined);
            }
        }
    });
};

module.exports = {existingUserName}
