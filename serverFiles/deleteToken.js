const {mongoose} = require('./mongoose');
const {User} = require('./userSchema');

const deleteToken = (user, callback) => {
    User.findOne({username: user.username}, (err, result) => {
        if (err) {
            callback(err);
        } else {
            if (result) {
                console.log('Found the user!', result);
                console.log('Length of Tokens', result.tokens.length);
                console.log('DELETE RESULT: ',result);
                var newTokens = []
                User.update({ username: result.username }, { $set: { tokens: newTokens } }, { multi: true }, (err, res) => {

                    if (err) {
                        console.log(err);
                        return callback(undefined, undefined);
                    }
                    console.log('Token Removed');
                    callback(undefined, res);
                });
                
            } else {
                console.log('Could not find the user');
                callback(undefined, undefined);
            }
        }
    });
};

module.exports = {deleteToken}
