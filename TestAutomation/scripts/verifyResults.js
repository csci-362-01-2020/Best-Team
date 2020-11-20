const fsLibrary = require('fs');

function createHeader() {
    let headers = ["Pass/Fail", "ID", "Module", "Function", "Input","Description", "Expected Result", "Actual Result"]
    let finalReportHTML = "<!DOCTYPE html>\n<html>\n<head>\n<link rel=\"stylesheet\" href=\"finalReport.css\">\n</head>\n<body>\n\n"
    finalReportHTML = finalReportHTML + "<table class=\"greyGridTable\">\n<thead>\n<tr>\n"
    for (let i = 0; i < headers.length; i++) {
        finalReportHTML = finalReportHTML + "<th>"+headers[i]+"</th>\n"
    }
    finalReportHTML = finalReportHTML + "</tr>\n</thead>\n<tbody>\n"

    return finalReportHTML;
}

function createReport(pathToResults) {

    //read each result and append the final report
    try {
    const fileNames = fsLibrary.readdirSync(pathToResults);
    
    //sort the files
    const captureNumber = /[0-9]+/g
    fileNames.sort((a, b) => (parseInt(a.match(captureNumber).join("")) > parseInt(b.match(captureNumber).join(""))) ? 1 : -1)
    
    //header and CSS declaration of the file
    let finalReportFile = createHeader();

    fileNames.forEach(file => {
        try {

            const eachFile = fsLibrary.readFileSync(pathToResults + file, "utf-8");
        
        const testResult = JSON.parse(eachFile);

        //determine pass/fail status
        let passFail = "Error"
        if (JSON.stringify(testResult.expectedResult) === JSON.stringify(testResult.actualResult) && typeof testResult.expectedResult === typeof testResult.actualResult) {
            passFail = "pass";
        } else { passFail = "fail"; }

        //display html for a row
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
    } catch (e) {
        console.log("error with reading files");
        throw e;
    }
    
    
    })
    
    finalReportFile = finalReportFile + "</tbody>\n</table>\n\n</body>\n</html>\n"
    try {
        fsLibrary.writeFileSync('../reports/finalReport.HTML', finalReportFile);

    }
    catch (e) {
        console.log("error with writing file");
        throw e;
    }

} catch (e) {
    console.log("error with reading directory")
    throw e;
}

}

const resultsFilePath = '../temp/';    
createReport(resultsFilePath);