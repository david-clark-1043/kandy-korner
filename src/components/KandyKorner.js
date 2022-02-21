import { LocationList } from "./locations/LocationList"
import { ProductList } from "./products/ProductList"

export const KandyKorner = () => {
    return (
        <>
        <h1>Kandy Korner</h1>
        <h2 key="locations">Locations</h2>
        <LocationList />
        <h2 key="products">Products</h2>
        <ProductList />s
        </>
    )
}