node runAllTests.js
echo "building tests..."
sleep 2
echo "done"
cd ../project/MarsMapMaker/
npm test
cd ../../scripts
node verifyResults.js
echo "verifying results..."
sleep 2
echo "displaying results..."
xdg-open ../reports/finalReport.HTML
