import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { deleteEmployee, fetchEmployees } from "../ApiManager"


const API = "http://localhost:8088"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const history = useHistory()

    const getEmployees = () => {
        return fetchEmployees()
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
    }

    useEffect(
        getEmployees,
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
                            <div>{employeeObject.name}</div>
                            <div>{employeeObject.locationId}</div>
                            <div>{employeeObject.location.name}</div>
                            <button
                                onClick={() => {
                                    deleteEmployee(employeeObject.id)
                                        .then(getEmployees)
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