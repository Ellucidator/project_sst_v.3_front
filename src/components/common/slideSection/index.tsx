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
const SlideSection = ({allItems, perPage = 6, perMove = 1 ,itemId}: Props) => {
    if(allItems.length < 2) return (<></>)

    return (
        <>
            <Splide
                tag="section"
                options={{
                    type: 'loop',
                    perPage: perPage,
                    perMove: perMove,
                    width: '100%',
                    height:'100%',
                    gap: '1.5rem',
                    breakpoints: {
                        1725: {
                            perPage: 5,
                        },
                        1426: {
                            perPage: 4,
                        },
                        1179: {
                            perPage: 3,
                        },
                        900: {
                            perPage: 2,
                        },
                        400: {
                            perPage: 1,
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