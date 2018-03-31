var encrypt = (cipher, key) => {
    var key = "ASDaslfknarqrppoj";
    key = key.toUpperCase();
    key = key.replace(/[^a-zA-Z ]/g, "");
    // console.log(key);

    var square = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    var row = [];
    var count=0, row=-1;

    var keyArr = key.split('');
    var len = keyArr.length;

    // Remove the repetitions from Array

    for (let i=0;i<len;i++) {
        if(keyArr[i] == 'J' || keyArr == ' ') {
            keyArr[i] = 'I';
        }
        for (let j=i+1;j<len;j++) {
            if (keyArr[i] == keyArr[j]) {
                keyArr.splice(j, 1);
                len = keyArr.length;
                i--; j--;
            }
        }
    }

    // console.log('Key without repetition is: ', keyArr);

    // Fill the Polybius square with key

    for(let i=0; i<len; i++) {
        if (count%5 == 0) {
            row++;
        }
        square[row][count%5] = keyArr[i];
        count++;
    }

    // Make an array of the remaining elements

    function nextChar(c) {
        return String.fromCharCode(c.charCodeAt(0) + 1).toUpperCase();
    }

    var remArr = [];

    for(let i='A';i<='Z';i=nextChar(i)) {
        let flag = 1;
        for (let j=0; j<keyArr.length; j++ ) {
            if (i == keyArr[j] || i == 'J') {
                flag = 0;
                j = keyArr.length;
            }

        }
        if (flag == 1) {
            remArr.push(i);
        }
    }

    // Fill the polybus square with remaining elements

    var r = Math.floor(count/5);
    var c = count%5;
    var index = 0;

    for(let i=r; i<5;i++) {
        for (let j=0; j<5;j++) {
            if (square[i][j] != 0) {
                
            } else {
                square[i][j] = remArr[index];
                index++;
            }
        }
    }

    // console.log('Polybus square is: ');
    // console.log(square);

    // Read the input

    plainText = plainText.toUpperCase();

    var ipArr = plainText.split('');
    var iplen = ipArr.length;

    // Convert Message to its coordinates

    // console.log(ipArr);
    var xco = [];
    var yco = [];

    for(let i=0;i<ipArr.length;i++) {
        for (let j=0;j<5;j++) {
            for (let k=0;k<5;k++) {
                if (ipArr[i] == square[j][k]) {
                    xco.push(j);
                    yco.push(k);
                    j=5;k=5;
                }
            }
        }
    }

    // Concat both coordinates

    xco = xco.concat(yco);

    // Encrypt the message

    var encryptMes = [];

    for (let i=0; i<xco.length; i+=2) {
        encryptMes.push(square[xco[i]][xco[i+1]]);
    }

    encryptMes = encryptMes.join('');

    return encryptMes
}

module.exports = {encrypt};