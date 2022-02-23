import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"

export const MyOrders = () => {
    const [purchases, setPurchases] = useState([])
    const [customer, setCustomer] = useState({}) // State variable for current customer object
    let { customerId } = useParams()  // Variable storing the route parameter
    const history = useHistory()

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers/${customerId}`)
                .then(res => res.json())
                .then(setCustomer)
        },
        [customerId]  // Above function runs when the value of customerId change
    )



    useEffect(
        () => {
            fetch(`http://localhost:8088/purchases?customerId=${customerId}&_expand=product`)
                .then(res => res.json())
                .then(setPurchases)
        },
        [customerId]  // Above function runs when the value of customerId change
    )

    return (
        <>
            <div key="orderList">
                {
                    purchases.map((purchase) => {
                        return <div key={`purchase--${purchase.id}`}>{purchase.product.name}</div>
                    })
                }
            </div>
        </>
    )
}