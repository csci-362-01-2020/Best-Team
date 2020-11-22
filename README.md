# Best-Team

##  Run Tests  ##

** Please run the quickSetUp.sh script before running tests for the first time. **
Run tests by with command: bash runAllTests.sh in /TestAutomation/ or /scripts/ directory

##  How to Add Tests  ##
* **If a driver exists for your component to be tested**  
    * Add a JSON file to the /testCases/ directory with the following information
    (Replace # marks and content between # marks, examples can be found inside /testCases/)
    {
    "module": "#COMPONENT#",
    "ID": #TESTCASEID#,
    "functionName": "#FUNCTIONNAME#",
    "metaData": "#TESTCASEDESCRIPTION#",
    "metaDataShort": "#SHORTERTESTCASEDESCRIPTION#",
    "input": "#INPUTTOFUNCTION#",
    "expectedOutput": "#ORACLEVALUE#"
    }

* **If you want to add another component to be tested**
    * In addition to adding a test case JSON file you must also add a new Driver file inside /testCaseExecutables/.
    You must specify which component to import and which default props must be passed to the instance.
    Cross reference line 4 and 9 of dropdownDriver.js and fieldCardDriver.js to get examples.

## How it works ##

runAllTests.sh calls runAllTests.js to reference test cases inside /testCases/ 
and the drivers inside /testCaseExecutables/ to create the tests. The tests are
then executed and the results of each test case are stored inside the /temp/
folder. These are processed sequentially by verifyResults.js and the result
of each test is appended to the finalReport.HTML file. After all results of
the test cases are processed and appended to finalReport.HTML, it is opened
in a browser to display the results of the tests.  