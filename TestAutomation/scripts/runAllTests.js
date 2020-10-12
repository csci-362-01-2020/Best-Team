const fsLibrary = require('fs');

function resolveAfter2Seconds() {
    return new Promise( resolve => {
        setTimeout(() => {
            resolve('resolved');

        }, 2000);
    });
}





async function asyncReadWrite() {
let incomingInfo = []
fsLibrary.readdir('../testCases/', function(err, fileNames) {
    if (err) {
        throw err;
        }
       
    fileNames.forEach(function(filename) {
        fsLibrary.readFile('../testCases/' + filename, "utf-8", function(err, content) {
            if (err) {
                throw err;
                
            }

            incomingInfo.push(JSON.parse(content))
        });
    });
});
 console.log("processing Test Cases.....")
const waiting = await resolveAfter2Seconds();
console.log('Finished Processing ' + incomingInfo.length + " Test Case(s).")
let data = 'hello there' + incomingInfo[1].module;
fsLibrary.writeFile('../project/MarsMapMaker-1/src/__tests__/testRunner.js', data, (error) => {
    if (error) throw error;
    }) 

}


asyncReadWrite();