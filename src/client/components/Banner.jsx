
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Banner = () => {

    const images = [
        "https://picsum.photos/1200/600?random=1",
        "https://picsum.photos/1200/600?random=2",
        "https://picsum.photos/1200/600?random=3"
    ]


    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <div className="container">
            <Carousel
                showDots={true}
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
            >
                {
                    images.map((image, index) => (
                        <div className="h-[60vh]">
                            <img src={image} alt="" className="w-full h-full object-cover"/>
                        </div>
                    ))
                }
            </Carousel>;
        </div>
    )
}

export default Banner
