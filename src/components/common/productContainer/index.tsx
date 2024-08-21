import { Item, ItemPromotion } from "@/types/itemsTypes"
import Container, { ContainerAttributes } from "../container"
import CardItem from "../cards/cardItem"

type Props = {
    containerAttributes: Omit<ContainerAttributes, 'children'>
    products?:Item[]|ItemPromotion[]|false
}
const ProductContainer = ({containerAttributes,products}:Props) => {
    if(!products)return<></>

    return (
        <Container {...containerAttributes}>
            {products.map((elem) => {
                return <CardItem item={elem} key={elem.id} />
            })}
        </Container>
    )
}

export default ProductContainer