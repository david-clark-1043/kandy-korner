import React, { useEffect, useState } from "react"
import "./ProductList.css";

const API = "http://localhost:8088"

export const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [purchase, setPurchase] = useState({});

    useEffect(
        () => {
            fetch(`${API}/products?_expand=productType&_sort=productTypeId`)
                .then(res => res.json())
                .then((productArray) => {
                    setProducts(productArray)
                })
        },
        []
    )

    const makePurchase = (event) => {
        const newPurchase = {
            customerId: parseInt(localStorage.getItem("kandy_customer")),
            productId: parseInt(event.target.id.split("--")[1])
        }
        //setPurchase(copy)

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newPurchase)
        }

        return fetch("http://localhost:8088/purchases", fetchOption)
            .then(() => {
                //history.push("/employees")
            })
    }

    return (
        <>
            {
                products.map(
                    (productObject) => {
                        return (
                            <div key={`product--${productObject.id}`} className="productListing">
                                <div>{productObject.name}  {`$`}{productObject.price}</div>
                                <div>{productObject.productType.type}</div>
                                <button
                                    id={`purchaseButton--${productObject.id}`}
                                    onClick={makePurchase}
                                >
                                        Purchase
                                </button>
                            </div>
                        )
                    }
                )
            }
        </>
    )
}