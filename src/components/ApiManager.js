const API = "http://localhost:8088"

export const fetchCustomers = () => {
    return fetch(`${API}/customers`)
        .then(res => res.json())
}

export const fetchCustomerPurchases = (customerId) => {
    return fetch(`${API}/purchases?customerId=${customerId}&_expand=product`)
        .then(res => res.json())
}

export const fetchLocations = () => {
    return fetch(`${API}/locations`)
            .then(res => res.json())
}

export const fetchEmployees = () => {
    return fetch(`${API}/employees?_expand=location`)
        .then(res => res.json())
}

export const fetchPurchases = () => {
    return fetch(`${API}/purchases?_expand=customer&_expand=product`)
        .then(res => res.json())
}

export const fetchProducts = () => {
    return fetch(`${API}/products?_expand=productType&_sort=productTypeId`)
    .then(res => res.json())
}

export const deleteEmployee = (id) => {
    return fetch(`${API}/employees/${id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
}

export const sendEmployee = (newEmployee) => {
    const fetchOption = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(newEmployee)
    }

    return fetch(`${API}/employees`, fetchOption)
        .then(res => res.json())
}

export const sendPurchase = (newPurchase) => {
    const fetchOption = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(newPurchase)
    }

    return fetch("http://localhost:8088/purchases", fetchOption)
        .then(res => res.json())
}