#script to get dependencies
sudo apt update
sudo apt install nodejs npm
echo "initiating start-up"
echo "getting react.js dependencies"
cd project/MarsMapMaker/
echo "grabbing project dependencies, please wait..."
npm install
npm audit fix
cd ../../
echo "good to go, run command: bash runAllTests.sh"
