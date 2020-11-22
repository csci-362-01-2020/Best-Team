#sleeps included for identifing steps of the process
# temp files are removed if they exist currently
rm -f ../reports/finalReport.HTML
rm -f ../temp/* ../project/MarsMapMaker/src/__tests__/*
echo "building tests..."
sleep 3
node runAllTests.js
echo "running tests..."
sleep 3
cd ../project/MarsMapMaker/
npm test
cd ../../scripts
echo "verifying results..."
node verifyResults.js
sleep 3
echo "displaying results to HTML, please wait..."
xdg-open ../reports/finalReport.HTML
echo "test results desplaying..."
sleep 15
cd ../
#relevent files to testing process are removed for cleaning before next script call
rm ./temp/* ./project/MarsMapMaker/src/__tests__/*
#empty but necessary directories are touched so github doesn't delete the directories
touch ./temp/foobar.txt ./project/MarsMapMaker/src/__tests__/foobar.txt