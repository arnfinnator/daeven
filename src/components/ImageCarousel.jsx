import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'


const ImageCarousel = (props) => {
    //amount of images

    const carouselItems = [
        {
            imgUrl: "https://www.w3schools.com/howto/img_nature_wide.jpg",
            altText: "Image of nature",
            captionText: "Nature kinda nice."
        },
        {
            imgUrl: "https://www.w3schools.com/howto/img_snow_wide.jpg",
            altText: "Image of nature",
            captionText: "Nature kinda awkward ngl."
        },
        {
            imgUrl: "https://www.w3schools.com/howto/img_lights_wide.jpg",
            altText: "Image of nature",
            captionText: "Nature kinda like that."
        },
    ]

    const CarouselItem = (props) => {
        return <>
            <img src={props.item.imgUrl} alt={props.item.altText} style={{ width: "100%", minHight: "100%" }} />
            <div style={{ position: "absolute", bottom: "0", width: "100%", textAlign: "center" }}>{props.item.captionText}</div>
        </>
    }
    return (
        <>
            <Carousel
                fullHeightHover={false}     // We want the nav buttons wrapper to only be as big as the button element is
                navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                    style: {
                        backgroundColor: 'black',
                        borderRadius: 50
                    }
                }}
            // navButtonsWrapperProps={{   // Move the buttons to the bottom. Unsetting top here to override default style.
            //     style: {
            //         bottom: '0',
            //         top: 'unset'
            //     }
            // }}
            // NextIcon='next'             // Change the "inside" of the next button to "next"
            // PrevIcon='prev'             // Change the "inside of the prev button to "prev"
            >
                {
                    carouselItems.map((item, i) => <CarouselItem key={i} item={item} />)
                }
            </Carousel>
        </>
    )
}

export default ImageCarousel