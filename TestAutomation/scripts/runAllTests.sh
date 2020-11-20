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
sleep 15
cd ../
rm ./temp/* ./project/MarsMapMaker/src/__tests__/*
