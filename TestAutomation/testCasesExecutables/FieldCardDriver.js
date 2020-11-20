//necessary imports to test react components in this framework
import React from 'react';
import { shallow } from 'enzyme'
import { FieldCard } from "../components/FieldCard";

//$METHODANDARGUMENT$ and $TESTID$ are replaced with specific information from testCase file

const fileWriter = require('fs');

//renders the component as a unit
const wrapper = shallow(<FieldCard fieldValue={''} fieldTitle={''} />);

//runs an instance of the component and function
const result = wrapper.instance().$METHODANDARGUMENT$
//stores result and ID in object
const testResult = { "ID": $TESTID$, 
"actualResult": result,
"expectedResult": $EXPECTED$,
"meta": $METADATA$,
"component": $COMP$,
"method": $FUNC$,
"input": $INPUT$
}
console.log(__dirname + "asssad")
//stores result as JSON file to be compared to the oracle
fileWriter.writeFile('../../temp/result$TESTID$.json', JSON.stringify(testResult), 'utf8', (error) => {
    
    if (error) {
		console.log(__dirname + "asssad");
	throw error;
	}
    }); 

//necessary to avoid extraneous console output
describe('dummy', () => {
	it('0 to be 0', () => {
		expect(0).toBe(0);
	});
});
