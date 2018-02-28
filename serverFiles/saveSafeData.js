const {mongoose} = require('./mongoose');
const {User} = require('./userSchema');
const {encrypt} = require('./encrypt');

const saveSafeData = (user, callback) => {
    User.findOne({username: user.username}, (err, result) => {
        if (err) {
            callback(err);
        } else {
            if (result) {
                console.log('Found the user!', result);
                var plainText = user.safeData;
                console.log('Secret Key: ', result.key);
                console.log('Plaintext is: ', plainText);
                var secretKey = result.key;
                var encryptKey = encrypt(plainText, secretKey);
                if (result.safeData === 'NIL') { 
                    result.safeData = encryptKey;
                } else {
                    result.safeData = result.safeData.concat(encryptKey);
                }

                // console.log('DELETE RESULT: ',result);
                // var newTokens = []
                
                User.update({ username: result.username }, { $set: { safeData: result.safeData } }, { multi: true }, (err, res) => {

                    if (err) {
                        console.log(err);
                        return callback(undefined, undefined);
                    }
                    console.log('Data Updated');
                    callback(undefined, result);
                });

            } else {
                console.log('Could not find the user');
                callback(undefined, undefined);
            }
        }
    });
};

module.exports = {saveSafeData}
