const fsLibrary = require('fs');

//Reads testcases and builds drivers
function buildTestsAndOracle(testCasesPath, testExecTemplatePath, testLocations) {
    //read through directory of testCases
    fsLibrary.readdir(testCasesPath, function(err, fileNames) {
    if (err) {
        throw err;
        }
    //reads testCase file
    fileNames.forEach(function(filename) {
        fsLibrary.readFile(testCasesPath + filename, "utf-8", function(err, testCaseContent) {
            if (err) {
                throw err;
                
            }

            //assignment block of testCase file content
            const testCaseInfo  = JSON.parse(testCaseContent);
            const comp = JSON.stringify(testCaseInfo.module);
            const testId = testCaseInfo.ID;
            const funName = JSON.stringify(testCaseInfo.functionName);
            const meta = JSON.stringify(testCaseInfo.metaData);
            const input = JSON.stringify(testCaseInfo.input);
            const oracle = JSON.stringify(testCaseInfo.expectedOutput);

            //find Driver
            fsLibrary.readdir(testExecTemplatePath, function(err, fileDriverNames) {
                if (err) {
                    throw err;
                    }
                
                //reads testCase file
                fileDriverNames.forEach(function(fileDriverName) {
                    //identifies driver by module name
                    if (fileDriverName.includes(comp.replace(/\"/g, ""))) {
                        fsLibrary.readFile(testExecTemplatePath + fileDriverName, "utf-8", function(err, driverContent) {
                            if (err) {
                                throw err;
                            }
                            
                            //modify driver by replacing $TOKEN$ phrases
                            const mergeFunArg = funName.replace(/\"/g, "") + "(" + input + ");";
                            const substitute = [ 
                                /\$TESTID\$/g,
                                testId,
                                /\$METHODANDARGUMENT\$/g,
                                mergeFunArg,
                                /\$EXPECTED\$/g,
                                oracle,
                                /\$METADATA\$/g,
                                meta,
                                /\$COMP\$/g,    
                                comp,
                                /\$FUNC\$/g,
                                funName,
                                /\$INPUT\$/g,
                                input
                            ]
                            for(let i = 0; i < substitute.length; i+=2){
                                driverContent = driverContent.replace(substitute[i], substitute[i+1]);
                            }
                            let modifiedDriver = driverContent;
                            
                            //write modified driver
                            const driverName = 'testDriver' + testId + '.js'
                            fsLibrary.writeFile(testLocations + driverName , modifiedDriver, (error) => {
                                if (error) {
                                    throw error;
                                }
                            
                                
                            })
                            
                        }); 
                    } else {
                        if(!fileDriverNames.includes(comp.replace(/\"/g, "") + "Driver.js")){
                            console.log("Error: Driver for " + comp + "does not exist, please create one.");
                        }
                        //comp does not match driver name
                        
                    }
                });
            });

        });
    });
});
}

buildTestsAndOracle('../testCases/', '../testCasesExecutables/' ,'../project/MarsMapMaker/src/__tests__/');
