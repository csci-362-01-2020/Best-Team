echo "initiating start-up"
cd project/MarsMapMaker/
git submodule update --init
git pull https://github.com/hafey1/MarsMapMaker
echo "grabbing dependencies, please wait..."
npm install
cd ../../
echo "good to go, run command: bash runAllTests.sh"
