//necessary imports to test react components in this framework
import React from 'react';
import { shallow } from 'enzyme'
import { DropDown } from "../project/MarsMapMaker/src/components/DropDown";

//$METHODANDARGUMENT$ and $TESTID$ are replaced with specific information from testCase file

const fileWriter = require('fs');

//renders the component as a unit
const wrapper = shallow(<DropDown list={[]} />);

//runs an instance of the component and function
const result = wrapper.instance().$METHODANDARGUMENT$
//stores result and ID in object
const testResult = { "ID": $TESTID$, "actualResult": result}

//stores result as JSON file to be compared to the oracle
fileWriter.writeFileSync('../temp/result$TESTID$.json', JSON.stringify(testResult), 'utf8', (error) => {
    
    if (error) throw error;
    
    }); 

//necessary to avoid extraneous console output
describe('dummy', () => {
	it('0 to be 0', () => {
		expect(0).toBe(0);
	});
});
