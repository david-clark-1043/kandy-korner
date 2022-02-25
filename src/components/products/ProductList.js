import React, { useEffect, useState } from "react"
import { fetchProducts, sendPurchase } from "../ApiManager";
import "./ProductList.css";

const API = "http://localhost:8088"

export const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [purchase, setPurchase] = useState({});

    useEffect(
        () => {
            fetchProducts()
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

        return sendPurchase(newPurchase)
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