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
    let propHandle = ""
    let useUtility = [{mod: "CardList", funcImp: "typeField } from \"../util/helper\""}]
    
    
    let imports = "import React from \'react\';\nimport { shallow } from \'enzyme\'\n//{ } imports non default component\n"
    
    for (let i = 0; i < fromCases.length; i++) {
        let tCase = fromCases[i]
        if (!imports.includes(tCase.module) && tCase.module !== useUtility[0].mod)
            imports = imports + "import { " + tCase.module + " } from \"../components/" + tCase.module + "\";\n"
        else if (!imports.includes(useUtility[0].funcImp) && tCase.module === useUtility[0].mod) {
            imports = imports + "import { " + useUtility[0].funcImp + ";\n"
        }
    }
    imports = imports + "\nconst fsLibrary = require('fs');\n"

    let oracleFile = { oracle: []}
    for(let i = 0; i < fromCases.length; i++){
        let tCase = fromCases[i]
       oracleFile.oracle[i] = { ID: tCase.ID, expectedResult: tCase.expectedOutput, behavior: tCase.metaData, mod: tCase.module, fun: tCase.functionName, in: tCase.input
        }
    }
    const oracleFileWrite = JSON.stringify(oracleFile, null, 4)
  

    let testCalls = "\nlet actualValues = []\n\n"
    
    for(let i = 0; i < fromCases.length; i++){
        let tCase = fromCases[i]
        
        if (tCase.module === "DropDown") {
            propHandle = "list={[]}"
        }
        

        //third line of function
        if (!testCalls.includes("<" + tCase.module) && tCase.module !== useUtility[0].mod){
        testCalls = testCalls + "const wrapper = shallow(<" + tCase.module + " " + propHandle + " />);\n\n"
        }
        //fourth line of funciton
        if(tCase.module !== useUtility[0].mod){
        testCalls = testCalls + "let resultOf" + tCase.ID + " = wrapper.instance()." + tCase.functionName + "(" + JSON.stringify(tCase.input) + ");\n"
        } else { testCalls = testCalls + "let resultOf" + tCase.ID + " = " + tCase.functionName + "(" + JSON.stringify(tCase.input) + ");\n"}
        
        testCalls = testCalls + "actualValues.push({ \"ID\": " + tCase.ID + ", \"actualResult\": resultOf" + tCase.ID + "});\n\n"
    }

    //write out to file
    testCalls = testCalls + "\nconst returnValuesWrapped = { results: actualValues }\n"
    testCalls = testCalls + "const converttoJSON = JSON.stringify(returnValuesWrapped, null, 4)\n"
    testCalls = testCalls + "fsLibrary.writeFile('../../reports/actualResults.json', converttoJSON, (error) => {\n\tif (error) throw error;\n});"
    
    //creates a successful jest test to avoid unnecessary console output

    testCalls = testCalls + "\n\ndescribe('dummy', () => {"
    testCalls = testCalls + "\n\tit('0 to be 0', () => {"
    testCalls = testCalls + "\n\t\texpect(0).toBe(0);});});\n"

    const testRun = imports + testCalls



    return {testRun, oracleFileWrite};
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
let {testRun, oracleFileWrite} = testRunnerContent(infoForTestRunner);

const anotherWait = await resolveAfter2Seconds();
//console.log( "hello" + data)
//console.log("boodbye" + infoForTestRunner)
//write the info to testRunner

fsLibrary.writeFile('../oracles/testOracles.json', oracleFileWrite, (error) => {
    
    if (error) throw error;
    
    }) 



fsLibrary.writeFile('../project/MarsMapMaker/src/__tests__/testRunner.js', testRun, (error) => {
    
    if (error) throw error;
    
    }) 

}

// call the function
asyncReadWrite();

