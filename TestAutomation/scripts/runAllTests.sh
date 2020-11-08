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
echo "displaying results to HTML..."
xdg-open ../reports/finalReport.HTML
