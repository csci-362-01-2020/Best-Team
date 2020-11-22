#script to get dependencies
echo "initiating start-up"
cd project/MarsMapMaker/
echo "grabbing dependencies, please wait..."
npm install
npm audit fix
cd ../../
echo "good to go, run command: bash runAllTests.sh"
