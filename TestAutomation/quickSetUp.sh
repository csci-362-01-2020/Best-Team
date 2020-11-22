#script to get dependencies
echo "getting react.js dependencies"
sudo apt update
sudo apt install nodejs npm
cd project/MarsMapMaker/
echo "grabbing project dependencies, please wait..."
npm install
npm audit fix
cd ../../
echo "good to go, run command: bash runAllTests.sh"
