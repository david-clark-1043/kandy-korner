import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchCustomerPurchases } from "../ApiManager";
import "./MyOrders.css";

export const MyOrders = () => {
    const [purchases, setPurchases] = useState([{}])
    let { customerId } = useParams()  // Variable storing the route parameter
    const history = useHistory()

    useEffect(
        () => {
            fetchCustomerPurchases(customerId)
                .then(setPurchases)
        },
        [customerId]  // Above function runs when the value of customerId change
    )

    const modifiedPurchases = purchases.reduce((purchaseWithCount, currentPurchase, currentIndex) => {
        if (currentPurchase.product?.id in purchaseWithCount[0]) {
            const indexLookup = purchaseWithCount[0][currentPurchase.product?.id]["productIndex"]
            purchaseWithCount[0][currentPurchase.product.id]["count"]++
            const count = purchaseWithCount[0][currentPurchase.product?.id].count
            const totalPrice = count * purchaseWithCount[0][currentPurchase.product?.id].price
            const formattedPrice = totalPrice.toLocaleString("en-US",
                                             { style: 'currency', currency: 'USD' })
            purchaseWithCount[indexLookup] = (<tr key={`product--${currentPurchase.product.id}`}>
                                                <td>{purchaseWithCount[0][currentPurchase.product?.id].name}</td>
                                                <td>{count}</td>
                                                <td>{formattedPrice}</td>
                                            </tr>)
        } else {
            const newProduct = {
                id: currentPurchase.product?.id,
                name: currentPurchase.product?.name,
                count: 1,
                price: currentPurchase.product?.price,
                productIndex: purchaseWithCount.length
            }
            purchaseWithCount[0][newProduct.id] = newProduct
            purchaseWithCount.push(<tr key={`product--${currentPurchase.product?.id}`}>
                <td>
                    {newProduct.name}
                </td>
                <td>{newProduct.count}</td>
                <td>{newProduct.price}</td>
            </tr>);
        }
        if(currentIndex === purchases.length - 1){
            purchaseWithCount.shift()
        }
        return purchaseWithCount
    }, [{}])

    return (
        <>
            <table className="orderTable">
                <caption>Total Purchases</caption>
                <thead>
                    <tr>
                        <th>Candy</th>
                        <th>Quantity</th>
                        <th>Price/Unit</th>
                    </tr>
                </thead>
                <tbody>
                    {modifiedPurchases}
                </tbody>
            </table>

        </>
    )
}

// {if (currentPurchase.product?.id in purchaseWithCount) {
//     const copy = {...purchaseWithCount[currentPurchase.productId]}
//     purchaseWithCount[currentPurchase.product.id]["count"]++;
//     return purchaseWithCount;
// } else {
//     purchaseWithCount[currentPurchase.product?.id] = {
//         name: currentPurchase.product.name,
//         count: 1,
//         price: currentPurchase.product.price
//     };
//     return purchaseWithCount
// }
                // .map(purchase => {
                //     return <div>{JSON.stringify(purchase)}<br /></div>
                // })
                    /* .map((purchase) => {
                            return (<tr key={`purchase--${purchase.id}`}>
                                <td>{purchase.product.name}</td>
                                <td>{purchase.product.price}</td>
                                <td></td>
                            </tr>)
                        }) */