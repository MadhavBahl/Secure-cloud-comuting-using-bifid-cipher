const {encrypt} = require('./encrypt');

function hash (pass, secretKey) {
    var passArr = pass.split('');
    var x = passArr.length; 
    var n = 56-(x+1);
    passArr = passArr.concat('$');

    var hashTable = {
        0: 'm',
        1: 'f',
        2: 'g',
        3: 'e',
        4: 'r',
        5: 'y',
        6: 'z',
        7: 'q',
        8: 'r',
        9: 'g',
        10: 'i',
        11: 'o',
        12: 'a',
        13: 'q',
        14: 'e',
        15: 's'
    }
    
    for (let i=0; i<n;i++) {
        let temp = Math.pow((2*i + x), 3);
        temp /= 2;
        temp = Math.floor(temp);
        passArr = passArr.concat(hashTable[temp%16]);
    }

    passArr = passArr.join('');

    crypted = encrypt(passArr, secretKey);
    return crypted;

}

module.exports = {hash}