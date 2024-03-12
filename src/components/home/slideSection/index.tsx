'use client'
//@ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';


const SlideSection = () => {
    return (
        <>
            <Splide
                aria-label="My Favorite Images"

                options={{
                    type: 'loop',
                    perPage: 5,
                    perMove: 1,
                    width: '100%',
                }}
            >
                <SplideSlide>
                    <p>teste</p>
                </SplideSlide>
                <SplideSlide>
                    <p>teste</p>
                </SplideSlide>
                <SplideSlide>
                    <p>teste</p>
                </SplideSlide>
            </Splide>
        </>
    )
}

export default SlideSection