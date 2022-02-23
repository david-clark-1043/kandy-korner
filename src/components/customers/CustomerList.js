import React, { useEffect, useState } from "react"

const API = "http://localhost:8088"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])
    const [totalcustomerMessage, updateMessage] = useState("")

    useEffect(
        () => {
            fetch(`${API}/customers`)
                .then(res => res.json())
                .then((customerArray) => {
                    setCustomers(customerArray)
                })
        },
        []
    )

    return (
        <>
        {
            customers.map(
                (customerObject) => {
                    return (<div key={`customer--${customerObject.id}`}>
                        <p>{customerObject.name}</p>
                        </div>
                    )
                }
            )
        }
        </>
    )
}