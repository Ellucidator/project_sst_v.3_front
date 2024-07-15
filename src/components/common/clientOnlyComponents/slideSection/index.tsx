'use client'
//@ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Item, ItemPromotion } from '@/types/itemsTypes';
import CardItem from '../../cards/cardItem';

type Props = {
    allItems: Item[] | ItemPromotion[]
    perPage?: number
    perMove?: number
    itemId?: number
}
const SlideSection = ({allItems, perPage = 5, perMove = 1 ,itemId}: Props) => {
    if(allItems.length < 1) return (<></>)
    return (
        <>
            <Splide
                tag="section"
                options={{
                    type: 'loop',
                    perPage: perPage,
                    perMove: perMove,
                    gap:'1.5rem',
                    breakpoints: {
                        1536: {
                            perPage: perPage-1,
                        },
                        1281: {
                            perPage: perPage-2,
                        },
                        768: {
                            perPage: perPage-3,
                            padding: { left: 30, right: 0 }
                        },
                        575: {
                            padding: { left: 10, right: 0 }
                        },
                        481: {
                            perPage: 2,
                            padding: { left: 50, right: 0 }
                        },
                        440: {
                            perPage: 2,
                            padding: { left: 20, right: 0 }
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