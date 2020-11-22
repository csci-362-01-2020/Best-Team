import React from "react";
import { connect } from "react-redux";

// CSS & Styling
import "semantic-ui-react";

// Action Creators
import { addToSizeArray, clearSizeArray, addSingleMeasure, setSecondToSize, removeContent, clearSingleMeasureArray } from "../actions/"

class FormatDropdown extends React.Component {

    sizeArrayLoop = () => {
        let count = 0;
        for (let i = 0; i < this.props.ent.length; i++) {
            if (this.props.ent[i].sesarTitle === "size")
                count += 1
        }
        return count
    }

    metricFunction = (firstInPair, secondInPair) => {

        // alert box for anything that isn't an integer of cm or mm


        let finalProduct = parseInt(firstInPair);

        if (secondInPair !== "") {
            let second = parseInt(secondInPair)
            finalProduct = finalProduct + second / 10
        }
        else {
            finalProduct = String(finalProduct) + ".0 cm"
            return finalProduct
        }

        finalProduct = String(finalProduct) + " cm"

        return finalProduct
    }

    updateValue = e => {
        let value = e.target.value
        let dex = -1

        // If "First in Pair" is selected
        if (value === "first") {
            dex = 0
            let numbers = /^[-0-9.^$]*$/;

            if (!this.props.ent[this.props.id + 1].isGreen) {
                alert("ERROR: \"" + this.props.ent[this.props.id + 1].header + "\" : \"" + this.props.ent[this.props.id + 1].value + " is not checked to be used in the map!")
                const obj = {
                    id: this.props.id
                }
                const removeEntObj = {
                    cardID: this.props.id,
                    id: this.props.id,
                    oldValue: this.props.ent[this.props.id].oldValue,
                    header: this.props.ent[this.props.id].header,
                    value: this.props.ent[this.props.id].value,
                    isGreen: this.props.ent[this.props.id].isGreen
                }
                this.props.removeContent(removeEntObj)
                this.props.clearSingleMeasureArray(obj)
                this.props.refresh()
                return
            }

            if (this.props.id === this.props.ent.lenth - 1) {
                alert("ERROR: \"" + this.props.ent[this.props.id + 1].header + "\" : \"" + this.props.ent[this.props.id + 1].value + " is the last entry which cannot be assigned as a pair.")
                const obj = {
                    id: this.props.id
                }
                const removeEntObj = {
                    cardID: this.props.id,
                    id: this.props.id,
                    oldValue: this.props.ent[this.props.id].oldValue,
                    header: this.props.ent[this.props.id].header,
                    value: this.props.ent[this.props.id].value,
                    isGreen: this.props.ent[this.props.id].isGreen
                }
                this.props.removeContent(removeEntObj)
                this.props.clearSingleMeasureArray(obj)

                this.props.refresh()
                return
            }

            if ((numbers.test(this.props.ent[this.props.id + 1].value) === false || numbers.test(this.props.ent[this.props.id].value) === false)) {
                alert("ERROR: \"" + this.props.ent[this.props.id + 1].header + "\" has the content \"" + this.props.ent[this.props.id + 1].value + "\" which is not a number! \n**SOLUTION**\nYou're first in pair should be the initial metric (CM) where the next card down should be your precision metric (MM)!")
                const obj = {
                    id: this.props.id
                }
                const removeEntObj = {
                    cardID: this.props.id,
                    id: this.props.id,
                    oldValue: this.props.ent[this.props.id].oldValue,
                    header: this.props.ent[this.props.id].header,
                    value: this.props.ent[this.props.id].value,
                    isGreen: this.props.ent[this.props.id].isGreen
                }
                this.props.removeContent(removeEntObj)
                this.props.clearSingleMeasureArray(obj)
                this.props.refresh()
                return
            }

            const obj = {
                id: this.props.id
            }
            this.props.clearSingleMeasureArray(obj)



        }


        // If "Measurment" is selected 
        else {
            if (this.props.hasInit && this.props.id > 0 && this.props.pairArr[this.props.id][0].pairHeader !== "") {
                const objEntArr = {
                    cardID: this.props.id + 1,
                    id: this.props.id + 1,
                    oldValue: this.props.ent[this.props.id + 1].oldValue,
                    header: this.props.ent[this.props.id + 1].header,
                    value: this.props.ent[this.props.id + 1].value,
                    isGreen: this.props.ent[this.props.id + 1].isGreen
                }
                this.props.removeContent(objEntArr)
            }


            dex = 2
            const obj = {
                cardID: this.props.id,
                index: 0
            }
            this.props.clearSizeArray(obj)

        }
        
        //covers possible case of turning empty string into 0 for precision unit
        let zeroSub = this.props.ent[this.props.id + 1].value
        
        if (value === "first") {
            if (zeroSub === "")
                zeroSub = "0"

            const objSizeArr = {
                header: this.props.title,
                value: this.props.mapValue,
                index: dex,
                cardID: this.props.id,

                nextHeader: this.props.ent[this.props.id + 1].header,
                nextValue: zeroSub,
                nextID: this.props.id + 1
            }
            const objEntArr = {
                cardID: this.props.id + 1,
                id: this.props.id + 1,
                oldValue: this.props.ent[this.props.id + 1].oldValue,
                header: this.props.ent[this.props.id + 1].header,
                value: zeroSub,
                isGreen: this.props.ent[this.props.id + 1].isGreen
            }
            this.props.addToSizeArray(objSizeArr)
            this.props.setSecondToSize(objEntArr)

            this.props.callback(this.metricFunction(this.props.ent[this.props.id].value, this.props.ent[this.props.id + 1].value))

        } else {
            const obj = {
                header: this.props.title,
                value: this.props.mapValue,
                cardID: this.props.id
            }
            this.props.addSingleMeasure(obj)
        }


    }

    render() {
        /*
        if (
            (((this.sizeArrayLoop() === 2 && this.props.ent[this.props.id].sesarTitle === "size" && this.props.sizeArray[1].pairHeader !== "") &&
                (this.sizeArrayLoop() === 2 && this.props.ent[this.props.id].sesarTitle === "size" && this.props.sizeArray[0].pairHeader !== "")) ||
                (this.sizeArrayLoop() === 1 && this.props.sizeArray[2].pairHeader !== "")
            )
        ) {
            return (
                <select disabled onChange={this.updateValue}>
                    <option value={"choose data format"} disabled selected hidden>format type</option>
                    <option value={"first"}>1st in Pair </option>
                    <option value={"second"}>2nd in Pair</option>
                    <option value={"measurement"}>Measurement</option>
                </select>
            );
        }
        */

        if (this.props.hasInit && this.props.id > 0 && this.props.pairArr[this.props.id - 1][0].pairHeader !== "") {
            return (
                <select onChange={this.updateValue}>
                    <option value={"choose data format"} disabled hidden>format type</option>
                    <option value={"first"} disabled >1st in Pair </option>
                    <option value={"second"} disabled selected>  2nd in Pair</option>
                </select>
            );

        }


        else {
            return (
                <select onChange={this.updateValue}>
                    <option value={"choose data format"} disabled selected hidden>format type</option>
                    <option value={"first"}>1st in Pair </option>
                    <option value={"measurement"}>single field</option>
                </select>
            );
        }

    }


}



const mapStateToProps = (state) => {
    return {
        ent: state.entries,
        useOnce: state.useOnce,
        dateFormat: state.chosenDateFormat,
        hasChosen: state.hasChosenDateFormat,
        sizeArray: state.sizeArray,
        pairArr: state.sizeOuterArray,
        hasInit: state.hasInit,
        singleMeasureArr: state.singleMeasureArr
    };
};

export default connect(mapStateToProps, { addToSizeArray, clearSizeArray, addSingleMeasure, setSecondToSize, removeContent, clearSingleMeasureArray })(FormatDropdown);