///////////////////////////////////////////////////////////////////////////////////////
// DATEDROPDOWN.JS ///////////////////////////////////////////////////////////////////
// This component displays  a checkbox on the left of each fieldCard ////////////////
// Giving the user to decide if they want to use that fieldCard in the map or not //
///////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { connect } from "react-redux";

// CSS & Styling
import "semantic-ui-react";

// Action Creators
import { formatDate } from "../actions/"

////////////////////////////////////////////////
///////////////////////////////////////////////


class DateDropdown extends React.Component {

    state = {
        currentChosen: null
    };

    // uses the clicked list-item in the dropdown to create an object to be passed into the dropdownUpdate action
    // updates specific object in the redux store
    updateValue = e => {
        const newValue = e.target.value
        let needsCenturySelection = false

        // Vets the dropdown selection of have 2 or 4 whys for the purposes of using/not using the century dropdown
        if (newValue.includes("YY") && !newValue.includes("YYYY"))
            needsCenturySelection = true

        const obj = {
            dateFormat: newValue,
            hasTwoYs: needsCenturySelection
        }
        this.props.formatDate(obj)
    }

    dateFormatSelection = () => {
        let valid = false;
        for (let i = 0; i < this.props.ent.length; i++) {
            if (this.props.ent[i].sesarTitle === "collection_start_date" || this.props.ent[i].sesarTitle === "collection_end_date") {
                valid = true
            }
        }
        return valid
    }



    render() {

        let num = -1
        // helper function to list "options" based on the 'type' of field (numbers or letters...) 
        let filter = (f) => {
            num += 1
            if (num === 0)
                return <option style={{ fontFamily: "Lucida Grande" }} key={num} value="Select Date Format" disabled hidden>Select Date Format</option>;
            else
                return <option key={num} value={f.title}>{f.title}</option>;
        };

        // creates the dropdown, uses filter() to specify which items are included in dropdown
        // IFF You have selected a date formate and SUCCESSFULLY selected sesar option, disable date dropdown

        // case for loaded in js mapping file where the date is already previously selected  
        if (this.props.hasInit === true && this.props.hasChosenDateFormat && this.dateFormatSelection()) {
            return (
                <select style={{ fontFamily: "Lucida Grande" }} defaultValue={this.dateFormatSelection()} disabled selected className="ui search dropdown" onChange={this.updateValue}>
                    {this.props.list.map((field) => filter(field))}
                </select>
            );
        }

        else if (this.props.hasInit === true && this.dateFormatSelection() && this.props.hasChosenDropdown) {
            return (
                <select style={{ fontFamily: "Lucida Grande" }} defaultValue={'Select Date Format'} disabled selected className="ui search dropdown" onChange={this.updateValue}>
                    {this.props.list.map((field) => filter(field))}
                </select>
            );
        }

        else {
            return (
                <select style={{ fontFamily: "Lucida Grande" }} className="ui search dropdown" onChange={this.updateValue}>
                    {this.props.list.map((field) => filter(field))}
                </select>
            );
        }

    }
}

const mapStateToProps = (state) => {
    return {
        hasChosenDropdown: state.hasChosenDropdownOption,
        hasChosenDateFormat: state.hasChosenDateFormat,
        dateFormatSelected: state.chosenDateFormat,
        hasInit: state.hasInit,
        ent: state.entries
    };
};


export default connect(mapStateToProps, { formatDate })(DateDropdown);