import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
function Hero({deviceType="desktop"}) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={deviceType !== "mobile" ? true : false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        
        <div className="relative h-[70vh] md:h-[80vh] mt-20">

          <img src="/book1.jpg" className="block h-full w-full object-cover "></img>
        </div>
      <div className="relative h-[70vh] md:h-[70vh] mt-20">

          <img src="/book2.jpg" className="block h-full w-full object-cover"></img>
        </div>
       <div className="relative h-[70vh] md:h-[70vh]">

          <img src="/book3.jpg" className="block h-full w-full object-cover"></img>
        </div>
      </Carousel>
      
    </>
  );
}

export default Hero;
