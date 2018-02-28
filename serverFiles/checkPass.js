const {mongoose} = require('./mongoose');
const {User} = require('./userSchema');
const {hash} = require('./g_hash');
const randomstring = require("randomstring");

const secretKey = 'ThisIsServerSecret';

const checkPass = (user, callback) => {
    User.findOne({username: user.username}, (err, result) => {
        if (err) {
            var er = 'Check the username';
            callback(er);
        } else {
            if (result) {
                console.log('Length of Tokens', result.tokens.length);
                console.log('MOD RESULT: ',result);
                if (result.password == user.password) {
                    var session = randomstring.generate({
                        length: 30,
                        charset: 'alphabetic'
                    });
                    var session = hash(session, secretKey);
                    var token = {};
                    token['token'] = session;
                    var newTokens = [token];

                    User.update({ username: result.username }, { $set: { tokens: newTokens } }, { multi: true }, (err, res) => {

                        if (err) {
                            console.log(err);
                            return callback(undefined, undefined);
                        }
                        console.log('Token Added');
                        callback(undefined, result);
                    });
                } else {
                    var eror = 'Password Incorrect!';
                    callback(eror, undefined);
                }
                
            } else {          
                var errr = 'User not found!'      ;
                callback(errr, undefined);
            }
        }
    });
};

module.exports = {checkPass}
