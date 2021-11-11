const fs = require('fs');

function makeId(data){
    let initialId = 1;

    for (var i = 0; i <= data.length; i++) {
        initialId = data.length + 1;
        }
    return initialId;
}
module.exports = makeId

function getRandomUid(min,max){
    let maxMin = max - min + 1;
    let maxMinRandom = Math.random() * maxMin;
    let result = Math.floor(maxMinRandom) + min;

    return result;
}
module.exports = getRandomUid