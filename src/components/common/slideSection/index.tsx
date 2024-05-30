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
                    gap:'1.5rem',
                    breakpoints: {
                        1536: {
                            perPage: perPage-1,
                        },
                        1281: {
                            perPage: perPage-2,
                        },
                        1023: {
                            perPage: perPage-3,
                            padding: { left: 0, right: 0 }
                        },
                        768: {
                            perPage: perPage-4,
                            gap:'4rem',
                            padding: { left: 30, right: 0 }
                        },
                        575: {
                            perPage: perPage-4,
                            padding: { left: 0, right: 0 }
                        },
                        462: {
                            perPage: 1,
                            padding: { left: 100, right: 0 }
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