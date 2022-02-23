import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"


const API = "http://localhost:8088"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const [totalEmployeeMessage, updateMessage] = useState("")
    const history = useHistory()

    const fetchEmployees = () => {
        return fetch(`${API}/employees?_expand=location`)
            .then(res => res.json())
            .then((employeeArray) => {
                setEmployees(employeeArray)
            })
    }

    useEffect(
        fetchEmployees,
        []
    )

    const deleteEmployee = (id) => {
        fetch(`http://localhost:8088/employees/${id}`, {
            method: "DELETE"
        })
            .then(fetchEmployees)
    }

    return (
        <>
            <div>
                <button onClick={() => history.push("/employees/hire")}>Hire Employee</button>
            </div>
            {
                employees.map(
                    (employeeObject) => {
                        return (<div key={`employee--${employeeObject.id}`}>
                            <div>{employeeObject.name}</div>
                            <div>{employeeObject.locationId}</div>
                            <div>{employeeObject.location.name}</div>
                            <button
                                onClick={() => {
                                    deleteEmployee(employeeObject.id)
                                }}>
                                Fire Employee
                            </button>
                        </div>
                        )
                    }
                )
            }
        </>
    )
}