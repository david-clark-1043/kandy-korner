import React from "react";
import { Route } from "react-router-dom";
import { CustomerList } from "./customers/CustomerList";
import { MyOrders } from "./customers/MyOrders";
import { EmployeeForm } from "./employees/EmployeeForm";
import { EmployeeList } from "./employees/EmployeeList";
import { LocationList } from "./locations/LocationList";
import { ProductList } from "./products/ProductList";
import { Inventory } from "./inventory/Inventory";

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/locations">
                <LocationList />
            </Route>
            <Route exact path="/products">
                <ProductList />
            </Route>
            <Route exact path="/employees">
                <EmployeeList />
            </Route>
            <Route exact path="/employees/hire">
                <EmployeeForm />
            </Route>
            <Route exact path="/customers">
                <CustomerList />
            </Route>
            <Route exact path="/customers/:customerId(\d+)">
                <MyOrders />
            </Route>
            <Route exact path="/inventory">
                <Inventory />
            </Route>
        </>
    )
}