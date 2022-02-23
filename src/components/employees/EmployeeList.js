import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"


const API = "http://localhost:8088"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const [totalEmployeeMessage, updateMessage] = useState("")
    const history = useHistory()

    useEffect(
        () => {
            fetch(`${API}/employees?_expand=location`)
                .then(res => res.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
        },
        []
    )


    return (
        <>
            <div>
                <button onClick={() => history.push("/employees/hire")}>Hire Employee</button>
            </div>
            {
                employees.map(
                    (employeeObject) => {
                        return (<div key={`employee--${employeeObject.id}`}>
                            <p>{employeeObject.name}</p>
                            <p>{employeeObject.locationId}</p>
                            <p>{employeeObject.location.name}</p>
                        </div>
                        )
                    }
                )
            }
        </>
    )
}