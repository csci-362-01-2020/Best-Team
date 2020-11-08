node runAllTests.js
echo "building tests..."
sleep 2
echo "done"
cd ../project/MarsMapMaker/
npm test
cd ../../scripts
echo "verifying results..."
node verifyResults.js
sleep 2
echo "displaying results to HTML, please wait..."
xdg-open ../reports/finalReport.HTML
echo "test results desplaying..."
sleep 10
rm ../temp/actualResults.json ../oracles/testOracles.json ../reports/finalReport.HTML ../project/MarsMapMaker/src/__tests/testRunner.js
