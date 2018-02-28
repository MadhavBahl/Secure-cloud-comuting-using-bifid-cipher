const {mongoose} = require('./mongoose');
const {User} = require('./userSchema');

const checkToken = (user, callback) => {
    User.findOne({username: user.username}, (err, result) => {
        if (err) {
            callback(err);
        } else {
            if (result) {
                console.log('Found the user!', result);
                console.log('Length of Tokens', result.tokens.length);
                // var consitions = { username: result.username };
                // var newTokens = result.tokens.pop();
                // var update = { $set: { tokens: newTokens } };
                // var options = { multi: true };
                // console.log('UPDATING');
                // User.update({ username: result.username }, { $set: { tokens: newTokens } }, { multi: true }, (err, res) => {

                //     if (err) {
                //         console.log(err);
                //         return callback(undefined, undefined);
                //     }
                //     console.log('Token Removed');
                //     callback(undefined, res);
                // });

                var numTokens = result.tokens.length;
                if(numTokens > 0) {

                    return callback(undefined, result);
                }
                
                callback(undefined, undefined);
                
            } else {
                console.log('Could not find the user');
                callback(undefined, undefined);
            }
        }
    });
};

module.exports = {checkToken}
