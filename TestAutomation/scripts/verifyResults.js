const { info } = require('console');
const fsLibrary = require('fs');

function resolveAfter2Seconds() {
    return new Promise( resolve => {
        setTimeout(() => {
            resolve('resolved');

        }, 2000);
    });
}


async function readFromFiles(oracleFile, ResultFile) {
let infoForTestVerification = []

let fileLocations = [oracleFile, ResultFile]

    for (let i = 0; i < fileLocations.length; i++){
        fsLibrary.readFile(fileLocations[i], "utf-8", function(err, content) {
            if (err) {
                throw err;
                
            }
            infoForTestVerification.push(JSON.parse(content))
        
        });}
await resolveAfter2Seconds();    
//console.log(infoForTestVerification[0].oracle[1])

let Mergedresults = {finalReport:[]}
for (let i = 0; i < 5; i++) {
    Mergedresults.finalReport[i] = {...infoForTestVerification[0].oracle[i], ...infoForTestVerification[1].results[i]}
}
console.log(Mergedresults.finalReport[1])
return infoForTestVerification;
}
//now create html file with merged results and make bash script open it up
const resultsToMerge = readFromFiles("../oracles/testOracles.json", "../reports/actualResults.json")
console.log(typeof resultsToMerge)

console.log("Hello I am in verify results")
