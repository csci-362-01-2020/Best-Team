const fsLibrary = require('fs');

//creates header of HTML file
function createHeader() {
    let headers = ["Pass/Fail", "ID", "Module", "Function", "Input","Description", "Expected Result", "Actual Result"]
    let finalReportHTML = "<!DOCTYPE html>\n<html>\n<head>\n<link rel=\"stylesheet\" href=\"finalReport.css\">\n</head>\n<body>\n\n"
    finalReportHTML = finalReportHTML + "<table class=\"greyGridTable\">\n<thead>\n<tr>\n"
    for (let i = 0; i < headers.length; i++) {
        finalReportHTML = finalReportHTML + "<th>"+headers[i]+"</th>\n"
    }
    finalReportHTML = finalReportHTML + "</tr>\n</thead>\n<tbody>\n"

    try {
        fsLibrary.writeFileSync('../reports/finalReport.HTML', finalReportHTML);
    }
    catch (e) {
        console.log("error writing header to finalReport.html");
        throw e;
    }
}
//read each result and append the final report
function createReport(pathToResults) {
    try {
        //read the directory of test results
        const fileNames = fsLibrary.readdirSync(pathToResults);
        
        //sort the files
        const captureNumber = /[0-9]+/g
        fileNames.sort((a, b) => (parseInt(a.match(captureNumber).join("")) > parseInt(b.match(captureNumber).join(""))) ? 1 : -1);
        
        //creates finalReport File and adds header, css and beginning of table
        createHeader();

        //append finalReport for each test result
        fileNames.forEach(file => {
            try {
                //read each test result and parse information
                const eachFile = fsLibrary.readFileSync(pathToResults + file, "utf-8");
                const testResult = JSON.parse(eachFile);

                //determine pass/fail status if expectedResult === actualResult
                let passFail = "Error"
                if (JSON.stringify(testResult.expectedResult) === JSON.stringify(testResult.actualResult) && typeof testResult.expectedResult === typeof testResult.actualResult) {
                passFail = "pass";
                } else { 
                    passFail = "fail"; 
                }
                
                let finalReportFile = ""

                //display html for a row pass/fail, ID, component, method, input, metadata, expectedResult, actualResult
                finalReportFile = finalReportFile + "<tr>\n"
                finalReportFile = finalReportFile + "<td class=\"" + passFail + "\">" + passFail + "</td>\n"
                finalReportFile = finalReportFile + "<td>" + testResult.ID + "</td>"
                finalReportFile = finalReportFile + "<td>" + testResult.component + "</td>"
                finalReportFile = finalReportFile + "<td>" + testResult.method + "</td>"
                finalReportFile = finalReportFile + "<td>" + JSON.stringify(testResult.input) + "</td>"
                finalReportFile = finalReportFile + "<td>" + testResult.meta + "</td>"
                finalReportFile = finalReportFile + "<td>" + JSON.stringify(testResult.expectedResult) + "</td>"
                finalReportFile = finalReportFile + "<td>" + JSON.stringify(testResult.actualResult) + "</td>"
                finalReportFile = finalReportFile + "</tr>"

                //append the file with results of the test
                try {
                    fsLibrary.appendFileSync('../reports/finalReport.HTML', finalReportFile);
                }
                catch (e) {
                    console.log("error with writing file");
                    throw e;
                }
            } 
            catch (e) {
                console.log("error with reading files");
                throw e;
            }
        })
    
        //add final closing line to file
        let finalLine = "</tbody>\n</table>\n\n</body>\n</html>\n"
    
        //write out last line
        try {
            fsLibrary.appendFileSync('../reports/finalReport.HTML', finalLine);

        }
        catch (e) {
            console.log("error with writing file");
            throw e;
        }
    } 
    catch (e) {
        console.log("error with reading directory")
        throw e;
    }
}

//read test results from temp directory
const resultsFilePath = '../temp/';    
createReport(resultsFilePath);