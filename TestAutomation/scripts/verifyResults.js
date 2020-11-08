const { info } = require('console');
const fsLibrary = require('fs');

function resolveAfter2Seconds() {
    return new Promise( resolve => {
        setTimeout(() => {
            resolve('resolved');

        }, 2000);
    });
}



async function readWriteFromFiles(oracleFile, ResultFile) {
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


let Mergedresults = {finalReport:[]}
for (let i = 0; i < infoForTestVerification[0].oracle.length; i++) {
    Mergedresults.finalReport[i] = {...infoForTestVerification[0].oracle[i], ...infoForTestVerification[1].results[i]}
}

let headers = ["Pass/Fail", "ID", "Module", "Function", "Input","Description", "Expected Result", "Actual Result"]

let finalReportHTML = "<!DOCTYPE html>\n<html>\n<head>\n<link rel=\"stylesheet\" href=\"finalReport.css\">\n</head>\n<body>\n\n"


finalReportHTML = finalReportHTML + "<table class=\"greyGridTable\">\n<thead>\n<tr>\n"
for (let i = 0; i < headers.length; i++) {
    finalReportHTML = finalReportHTML + "<th>"+headers[i]+"</th>\n"
}
finalReportHTML = finalReportHTML + "</tr>\n</thead>\n<tbody>\n"

let fRep = Mergedresults.finalReport
for (let i = 0; i < fRep.length; i++) {
    
    let passFail = "Error"
    if (fRep[i].expectedResult === fRep[i].actualResult){
        passFail = "pass"
    } else { passFail = "fail"}
    finalReportHTML = finalReportHTML + "<tr>\n"
    finalReportHTML = finalReportHTML + "<td class=\""+passFail+"\">"+passFail+"</td>\n"
    finalReportHTML = finalReportHTML + "<td>" +fRep[i].ID+ "</td>"
    finalReportHTML = finalReportHTML + "<td>" +fRep[i].mod+ "</td>"
    finalReportHTML = finalReportHTML + "<td>" +fRep[i].fun+ "</td>"
    finalReportHTML = finalReportHTML + "<td>" +JSON.stringify(fRep[i].in)+ "</td>"
    finalReportHTML = finalReportHTML + "<td>" +fRep[i].behavior+ "</td>"
    finalReportHTML = finalReportHTML + "<td>" +fRep[i].expectedResult+ "</td>"
    finalReportHTML = finalReportHTML + "<td>" +fRep[i].actualResult+ "</td>"
    finalReportHTML = finalReportHTML + "</tr>"
}


finalReportHTML = finalReportHTML + "</tbody>\n</table>\n\n</body>\n</html>\n"

fsLibrary.writeFile('../reports/finalReport.HTML', finalReportHTML, (error) => {
    
    if (error) throw error;
    
    }) 

return infoForTestVerification;
}
//now create html file with merged results and make bash script open it up
const resultsToMerge = readWriteFromFiles("../oracles/testOracles.json", "../temp/actualResults.json")
