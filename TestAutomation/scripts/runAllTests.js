const fsLibrary = require('fs');

//this allows for the testcases to be read before outputting to testRunner
function resolveAfter2Seconds() {
    return new Promise( resolve => {
        setTimeout(() => {
            resolve('resolved');

        }, 2000);
    });
}

function testRunnerContent(fromCases) {
    let imports = "import React from \'react\';\nimport { shallow } from \'enzyme\'\n//{ } imports non default component\n"
    console.log("sdfasffdsfa " + fromCases.length)
    for (let i = 0; i < fromCases.length; i++) {
        let tCase = fromCases[i]
        if (!imports.includes(tCase.module))
            imports = imports + "import { " + tCase.module + " } from \"../components/" + tCase.module + ";\n"
    }
    imports = imports + "\n"

    return imports;
}




//Reads testcases and writes to test runner based on results
async function asyncReadWrite() {
let infoForTestRunner = []
fsLibrary.readdir('../testCases/', function(err, fileNames) {
    if (err) {
        throw err;
        }
       
    fileNames.forEach(function(filename) {
        fsLibrary.readFile('../testCases/' + filename, "utf-8", function(err, content) {
            if (err) {
                throw err;
                
            }

            infoForTestRunner.push(JSON.parse(content))
        });
    });
});
 console.log("processing Test Cases.....")

const waiting = await resolveAfter2Seconds();

console.log('Finished Processing ' + infoForTestRunner.length + " Test Case(s).")

//this will write the proper file information soon
const data = testRunnerContent(infoForTestRunner);

//write the info to testRunner
fsLibrary.writeFile('../project/MarsMapMaker-1/src/__tests__/testRunner.js', data, (error) => {
    
    if (error) throw error;
    
    }) 

}

// call the function
asyncReadWrite();