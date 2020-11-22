
export const typeField = (f) => {

    let type;

    let numbers = /^[0-9,/.-]*$/;

    if (f === "")
        type = "both";
    else if (f === "<METADATA_ADD>") {
        type = "added_card"
    }
    else if (numbers.test(f) === true)
        type = "numbers";
    else
        type = "text"
    return type
}

//finds the last index in entries that contains an object with a key pair value of header:<METADATA_ADD>
//Used in CardList
export const lastMetaDataAdd = (entries) => {
    let lastPosition;
    try {

    for (let i = 0; i < entries.length; i++){
        if(!entries.header.includes("<METADATA_ADD")){
            lastPosition = i - 1
            break;
        }
    }
    return lastPosition;

    } catch (error){
        console.log("In util/helper called from CardList this value must be greater than ---->: " + lastPosition)
        console.error();
    }
}

//gets defalut value for select and options in Dropdown from store
export const dropdownSet = (hasStoreLoaded, entryStore, idInStore) => {
    let defaultVal = "Sesar Selection"

    if(hasStoreLoaded && entryStore[idInStore].sesarTitle !== "") {
        defaultVal = entryStore[idInStore].sesarTitle
        }
    return defaultVal;    
}

