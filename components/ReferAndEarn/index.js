import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
import { useCallback } from "react";

// function CustomNextArrow(props) {
//   const { className, onClick } = props;
//   return (
//     <div
//       className={`${className}`}
//       onClick={onClick}
//       style={{
//         position: "absolute",
//         top: "32%",
//         left: "90%",
//       }}
//     ></div>
//   );
// }

// function CustomPrevArrow(props) {
//   const { className, onClick } = props;
//   return (
//     <div
//       className={className}
//       onClick={onClick}
//       style={{
//         position: "absolute",
//         top: "32%",
//         left: "3%",
//       }}
//     />
//   );
// }

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

const externaImageLoader = ({ src, width }) => `${src}?w=${width}`;

const settings = {
  dots: false,
  infinite: true,
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
        initialSlide: 1,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        variableWidth: true,
      },
    },
  ],
};

const ReferAndEarn = () => {
  let isFetching = false;
  const [bannerData, setBannerData] = useState(undefined);

  const fetchData = useCallback(async () => {
    if (isFetching) return;
    isFetching = true;
    try {
      const apiUrl = "https://admin.glamcode.in/api/offers-banners";
      const response = await fetch(apiUrl);
      const data = await response.json();
      setBannerData(data.offers_banner || []);
    } catch (error) {
      console.log("error", error);
    } finally {
      isFetching = false;
    }
  }, []);

  useEffect(() => {
    if (!bannerData) fetchData();
  }, [bannerData, fetchData]);

  return (
    <div className="refer-earn mx-2 mx-md-4 mx-lg-5">
      <Slider {...settings}>
        {bannerData?.map((banner, i) => (
          <Card
            className="border-0 rounded-3 px-2 card refer-earn-img position-relative"
            key={`banner_${banner.image}_${i+1}`}
          >
            <Link href="/">
              <div className="img-container">
                <Image
                  loader={externaImageLoader}
                  src={`https://admin.glamcode.in/${banner.image}`}
                  className="rounded-3"
                  width={280}
                  alt={`banner-image_${i}`}
                  height={160}
                  loading="lazy"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                  }}
                /> {/** to take hint from */}
              </div>

              {/* <div className="position-absolute top-0 left-0 p-3 text-white">
                <h6 className="fs-5 fw-bold m-0">Refer a Friend</h6>
                <p className="m-0">to download GC App and earn</p>
                <span className="fs-5 fw-bold"> ₹ 100</span>
                <button
                  className="d-block border-0 text-white px-2 py-1 mt-3 fw-normal"
                  style={{ background: '#0000004c' }}
                >
                  Explore Offer
                </button>
              </div> */}
            </Link>
            {/* <div className="w-100 h-100 bg-black position-absolute top-0 left-0 opacity-50"></div> */}
          </Card>
        ))}
      </Slider>
    </div>
  );
};

export default ReferAndEarn;

// export async function getServerSideProps(context) {
//   console.log('getServerSideProps ')
//   const res = await fetch(`https://admin.glamcode.in/api/offers-banners`);
//   const data = await res.json();

//   return {
//     props: data,
//   };
// }
