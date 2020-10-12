const fsLibrary = require('fs');
let data = 'hello there';
fsLibrary.writeFile('../project/MarsMapMaker-1/src/__tests__/testRunner.js', data, (error) => {
    if (error) throw error;
    })