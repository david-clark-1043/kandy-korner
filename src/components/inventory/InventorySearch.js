import React from "react";

export const InventorySearch = (props) => {
    //const [inventory, setInventory] = useState()
    return (
        <>
            <form className="inventorySearchBar">
                <h2 className="searchInputForm__title">Search our Inventory!</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Product: </label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Product name"
                            onChange={(evt) => {
                                props.setSearchInput(evt.target.value)
                            }} />
                    </div>
                </fieldset>
            </form>
        </>
    )
}