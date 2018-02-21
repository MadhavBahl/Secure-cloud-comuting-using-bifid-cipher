var key = "WWOOOWWOAFALSDFNEILQFRNQERF";
key = key.toUpperCase();
console.log(key);

var square = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
console.log(square);
var row = [];
var count=0, row=-1;

var keyArr = key.split('');
var len = keyArr.length;

// Remove the repetitions from Array

// keyArr.splice(1, 1);


for (let i=0;i<len;i++) {
    if(keyArr[i] == 'J') {
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

console.log('Key without repetition is: ', keyArr);

// Fill the Polybius square with key

for(let i=0; i<len; i++) {
    if (count%5 == 0) {
        row++;
    }
    square[row][count%5] = keyArr[i];
    count++;
}

console.log(square);
