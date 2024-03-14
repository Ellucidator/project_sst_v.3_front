'use client'
//@ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Item, ItemPromotion } from '@/types/itemsTypes';
import CardItem from '../../common/cardItem';

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