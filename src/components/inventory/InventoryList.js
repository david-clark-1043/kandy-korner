import React, { useEffect, useState } from "react";
import { fetchProducts, sendPurchase } from "../ApiManager";

export const InventoryList = (props) => {
    const [inventory, setInventory] = useState([])

    useEffect(
        () => {
            fetchProducts()
                .then((productArray) => {
                    setInventory(productArray)
                })
        },
        []
    )    
    
    const makePurchase = (event) => {
        const newPurchase = {
            customerId: parseInt(localStorage.getItem("kandy_customer")),
            productId: parseInt(event.target.id.split("--")[1])
        }
        //setPurchase(copy)

        return sendPurchase(newPurchase)
                    .then(() => {
                        //history.push("/employees")
                    })
    }

    return (
        <>
            {
                inventory.map(item => {
                    const itemName = item.name.toLowerCase()
                    const inputLower = props.searchInput.toLowerCase()
                    if (itemName.includes(inputLower)) {
                        return (<div key={`product--${item.id}`} className="productListing">
                            <div>{item.name}  {`$`}{item.price}</div>
                            <div>{item.productType.type}</div>
                            <button
                                id={`purchaseButton--${item.id}`}
                                onClick={makePurchase}
                            >
                                Purchase
                            </button>
                        </div>)
                    }
                })
            }
        </>
    )
}