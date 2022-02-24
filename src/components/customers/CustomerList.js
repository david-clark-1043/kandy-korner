import React, { useEffect, useState } from "react";
import { fetchCustomers, fetchPurchases } from "../ApiManager";
import "./CustomerList.css";

const API = "http://localhost:8088"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])
    const [purchases, setPurchases] = useState([])

    /*
     current steps
        2 fetch calls
        1 iteration of customers
        - n iterations of purchases (n = number of customers)
        or
        - 1 iternation of purchases to add to a new object
        - 1 iteration of new object to push to customers array
    */
    useEffect(
        () => {

            fetchPurchases()
                .then((purchaseArray) => {
                    setPurchases(purchaseArray)
                })
        },
        []
    )

    useEffect(
        () => {
            const customerArray = []
            const organizedCustomers = findAllPurchasesByCustomer()
            for (const id in organizedCustomers) {
                customerArray.push(organizedCustomers[id])
            }
            setCustomers(customerArray)
        },
        [purchases]
    )

    const findAllPurchasesByCustomer = () => {
        let organizedPurchases = {}
        for (const purchase of purchases) {
            if (!(purchase.customer.id in organizedPurchases)) {
                const customer = JSON.parse(JSON.stringify(purchase.customer))
                organizedPurchases[purchase.customer.id] = customer
                organizedPurchases[purchase.customer.id]["purchases"] = 1
            } else {
                organizedPurchases[purchase.customer.id]["purchases"]++
            }
        }

        return organizedPurchases
    }

    // const findNumPurchases = (customerId) => {
    //     const singleCustomerPurchases = purchases.filter(purchase => purchase.customerId === customerId)
    //     const totalCandies = singleCustomerPurchases.length
    //     return totalCandies
    // }

    const customerHTML = () => {
        return customers.map(
            (customerObject) => {
                return (
                    <tr key={`customer--${customerObject.id}`}>
                        <td>{customerObject.name}</td>
                        <td>{customerObject.purchases}</td>
                        {/* <td>{findNumPurchases(customerObject.id)}</td> */}
                    </tr>
                )
            }
        )
    }

    const html = customerHTML()

    return (
        <>
            <table className="customerTable">
                <caption>Total Purchases by Each Customer</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Purchases</th>
                    </tr>
                </thead>
                <tbody>
                    {html}
                </tbody>
            </table>
            {/* <div>
                {
                    JSON.stringify(generatePurchaseList())
                }
            </div>
            <div>{ }</div> */}
        </>
    )
}