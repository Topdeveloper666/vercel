import React from "react";
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { useMemo } from "react";

const externaImageLoader = ({ src, width }) => `${src}?w=${width}`;

function CustomNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className}`}
      onClick={onClick}
    >
      <i className="fa fa-chevron-right"></i>
    </div>
  );
}

function CustomPrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
    >
      <i className="fa fa-chevron-left"></i>
    </div>
  );
}

const config = {
  dots: false,
  // infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 3000,
  nextArrow: <CustomNextArrow />,
  prevArrow: <CustomPrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
  ],
};

function CustomerTestimonials(props) {
  const renderStars = useMemo(() => {
    let stars = [1, 2, 3, 4, 5];
    stars = stars.map((x, i) => {
      return (
        <li key={`star_${x}_${i}`}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 1024 1024"
            color="#FECC43"
            style={{ color: "#FECC43" }}
            height={28}
            width={28}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
          </svg>
        </li>
      );
    });
    return stars;
  }, []);

  return (
    <div className="testimonial">
      <div className="title-content text-center my-5">
        <h2
          className="title font-familt-jost"
          style={{ width: "100%", textAlign: "center" }}
        >
          Customer Testimonials
        </h2>
      </div>
      <Slider {...config}>
        {props.data.map((x, i) => {
          return (
            <div className="container-fluid" key={`testimonial_${x.name}_${i}`}>
              <div className="row text-center">
                <div className="col mb-2 mb-md-4" style={{ width: "90%" }}>
                  <div className="card">
                    <div className="card-body py-2 card2-csss">
                      <div className="d-flex justify-content-center img-css">
                        <Image
                          loader={externaImageLoader}
                          src={x.reviews_image_url}
                          className="rounded-circle shadow-1-strong bg-white p-2"
                          width={20}
                          height={20}
                          alt="Glam-code Testimonials"
                        />
                      </div>
                      <div className="card2-css pt-5">
                        <h5 className="font-weight-bold">{x.name}</h5>
                        <ul className="list-unstyled d-flex justify-content-center">
                          {renderStars}
                        </ul>
                        <div className="mb-2">
                          <i className="fa fa-quote-left pe-2" />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: x.description.substring(0, 70) + " ...",
                            }}
                          />
                          {/* {x.description} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default CustomerTestimonials;
