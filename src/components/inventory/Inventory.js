import React, { useEffect, useState } from "react";
import { InventoryList } from "./InventoryList";
import { InventorySearch } from "./InventorySearch";

export const Inventory = () => {
    const [searchInput, setSearchInput] = useState("")
    return (
        <>
            <InventorySearch setSearchInput={setSearchInput} />
            <InventoryList searchInput={searchInput} />
        </>
        )
}