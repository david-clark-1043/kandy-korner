import React, { useEffect, useState } from "react"
import { fetchLocations } from "../ApiManager"

const API = "http://localhost:8088"

export const LocationList = () => {
    const [locations, setLocations] = useState([])
    

    useEffect(
        () => {
            fetchLocations()
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