'use client'
//@ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Item, ItemPromotion } from '@/types/itemsTypes';
import CardItem from '../../common/cardItem';

type Props = {
    allItems: Item[] | ItemPromotion[]
    perPage?: number
    perMove?: number
    itemId?: number
}
const SlideSection = ({allItems, perPage = 5, perMove = 1 ,itemId}: Props) => {
    if(allItems.length < 2) return (<></>)

    return (
        <>
            <Splide
                tag="section"
                options={{
                    type: 'loop',

                    perPage: perPage,
                    perMove: perMove,
                    padding: { left: 30, right: 0 },
                    breakpoints: {
                        1720: {
                            perPage: 4,
                        },
                        1375: {
                            perPage: 3,
                        },
                        1061: {
                            perPage: 2,
                            padding: { left: 60, right: 0 }
                        },
                        775: {
                            perPage: 2,
                            gap:'1.5rem',
                            padding: { left: 0, right: 0 }
                        },
                        655: {
                            perPage: 1,
                            gap:'2.5rem',
                            padding: { left: 120, right: 0 }
                        },
                        575: {
                            perPage: 1,
                            padding: { left: 75, right: 0 }
                        },
                        434: {
                            perPage: 1,
                            padding: { left: 30, right: 0 }
                        }
                    }
                }}
            >
                {
                    allItems.map((item)=>{
                        if(itemId === item.id) return
                        return (
                            <SplideSlide key={item.id}>
                                <CardItem item={item} />
                            </SplideSlide>
                        )
                    })
                }
            </Splide>
        </>
    )
}

export default SlideSection