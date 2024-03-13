'use client'
//@ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import SlideCard from '../slideCard';
import { Item, ItemPromotion } from '@/types/itemsTypes';

type Props = {
    allItems: Item[] | ItemPromotion[]
}
const SlideSection = ({allItems}: Props) => {
    return (
        <>
            <Splide
                aria-label="My Favorite Images"

                options={{
                    type: 'loop',
                    perPage: 6,
                    perMove: 1,
                    width: '100%',
                    height:'100%',
                    gap: '1.5rem',
                }}
            >
                {
                    allItems.map((item)=>{
                        return (
                            <SplideSlide key={item.id}>
                                <SlideCard item={item} />
                            </SplideSlide>
                        )
                    })
                }
            </Splide>
        </>
    )
}

export default SlideSection