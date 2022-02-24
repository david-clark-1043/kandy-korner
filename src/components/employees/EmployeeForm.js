import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { fetchLocations, sendEmployee } from "../ApiManager";

const API = "http://localhost:8088"
export const EmployeeForm = () => {
    const [employee, updateEmployee] = useState();
    const [locations, setLocations] = useState([]);


    const history = useHistory()

    const submitEmployee = (evt) => {
        evt.preventDefault()
        const newEmployee = JSON.parse(JSON.stringify(employee))

        return sendEmployee(newEmployee)
                .then(() => {
                    history.push("/employees")
                })
    }

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
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        onChange={(evt) => {
                            const copy = { ...employee }
                            copy.name = evt.target.value
                            updateEmployee(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location: </label>
                    <select name="location"
                        onChange={(evt) => {
                            const copy = { ...employee }
                            copy.locationId = parseInt(evt.target.value)
                            updateEmployee(copy)
                        }}
                        defaultValue="0"
                    >
                        <option value="0" disabled hidden>Select Location...</option>
                        {
                            locations.map(
                                (location) => {
                                    return (
                                        <option key={`location--${location.id}`} value={`${location.id}`}>
                                            {`${location.name}`}
                                        </option>
                                    )
                                }
                            )
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="managerStatus">Manager: </label>
                    <select name="managerStatus"
                        onChange={(evt) => {
                            const copy = { ...employee }
                            copy.managerStatus = evt.target.value === "true"
                            updateEmployee(copy)
                        }}
                        defaultValue="0">
                        <option value="0" disabled hidden>Select Manager Status...</option>
                        <option value={true}>
                            Yes
                        </option>
                        <option value={false}>
                            No
                        </option>
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="fullTimeStatus">Full-Time: </label>
                    <select name="fullTimeStatus"
                        onChange={(evt) => {
                            const copy = { ...employee }
                            copy.fullTimeStatus = evt.target.value === "true"
                            updateEmployee(copy)
                        }}
                        defaultValue="0">
                        <option value="0" disabled hidden>Select Full-Time Status...</option>
                        <option value={true}>
                            Yes
                        </option>
                        <option value={false}>
                            No
                        </option>
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="fullTimeStatus">Full-Time: </label>
                    <input
                        required
                        type="number"
                        className="form-control"
                        placeholder="Hourly Rate"
                        onChange={(evt) => {
                            const copy = { ...employee }
                            copy.rate = parseInt(evt.target.value)
                            updateEmployee(copy)
                        }} />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={submitEmployee}>
                Hire Employee
            </button>
        </form>
    )
}