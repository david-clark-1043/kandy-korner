import React, { useEffect, useState } from "react"

const API = "http://localhost:8088"

export const LocationList = () => {
    const [locations, setLocations] = useState([])
    const [totallocationMessage, updateMessage] = useState("")

    useEffect(
        () => {
            fetch(`${API}/locations`)
                .then(res => res.json())
                .then((locationArray) => {
                    setLocations(locationArray)
                })
        },
        []
    )

    return (
        <>
        {
            locations.map(
                (locationObject) => {
                    return (<div key={`location--${locationObject.id}`}>
                        <p>{locationObject.name}</p>
                        <p>{locationObject.address}</p>
                        </div>
                    )
                }
            )
        }
        </>
    )
}