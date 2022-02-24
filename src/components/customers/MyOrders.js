import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchCustomerPurchases } from "../ApiManager";
import "./MyOrders.css";

export const MyOrders = () => {
    const [purchases, setPurchases] = useState([])
    const [customer, setCustomer] = useState({}) // State variable for current customer object
    let { customerId } = useParams()  // Variable storing the route parameter
    const history = useHistory()

    useEffect(
        () => {
            fetchCustomerPurchases(customerId)
                .then(setPurchases)
        },
        [customerId]  // Above function runs when the value of customerId change
    )

    useEffect(
        () => {
            const customerCopy = JSON.parse(JSON.stringify(customer))

        },
        [purchases]
    )

    return (
        <>
            <table className="orderTable">
                <caption>Total Purchases</caption>
                <thead>
                    <tr>
                        <th>Candy</th>
                        <th>Quantity</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        purchases.map((purchase) => {
                            return (<tr key={`purchase--${purchase.id}`}>
                                <td>{purchase.product.name}</td>
                                <td>{purchase.product.price}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </>
    )
}