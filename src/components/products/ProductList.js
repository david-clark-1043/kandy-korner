import React, { useEffect, useState } from "react"

const API = "http://localhost:8088"

export const ProductList = () => {
    const [products, setProducts] = useState([])
    const [totalproductMessage, updateMessage] = useState("")

    useEffect(
        () => {
            fetch(`${API}/products?_expand=productType`)
                .then(res => res.json())
                .then((productArray) => {
                    setProducts(productArray)
                })
        },
        []
    )

    return (
        <>
        {
            products.map(
                (productObject) => {
                    return (<div key={`product--${productObject.id}`}>
                        <p>{productObject.name}</p>
                        <p>{productObject.productType.type}</p>
                        <p>{productObject.price}</p>
                        </div>
                    )
                }
            )
        }
        </>
    )
}