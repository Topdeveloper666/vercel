import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useSelector } from "react-redux";
import Image from "next/image";

import "swiper/css/navigation";
import "swiper/css/pagination";

function Pageslider(props) {
  const [showResults, setShowResults] = React.useState([]);

  const dataslide = useSelector((state) => state.slide);
  const [_isMobile, setMobile] = useState();

  useEffect(() => {
    setMobile(isMobile);
  }, [setMobile]);
  return (
    <>
      <div className="mid-2 d-flex justify-content-center">
        <div hidden={_isMobile}>
          <div className="slidesection mt-5">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={0}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              slidesPerView={2.2}
              pagination={{ clickable: true }}
            >
              {props.slider.map((item, index) => {
                return (
                  <SwiperSlide key={Math.random()}>
                    {/* <div className='slideimage'>
                                                <img src={item.slider_image_base_url} alt="loading" style={{
                                                    borderRadius: "10px",
                                                    width: 750,
                                                }} />
                                            </div> */}
                    <div
                      key={Math.random()}
                      style={{
                        width: "100%",
                        height: "50%",
                        paddingLeft: 5,
                        paddingTop: 10,
                        paddingBottom: 40,
                      }}
                    >
                      <Image
                        height={300}
                        width={300}
                        src={item.slider_image_base_url}
                        alt="loading"
                        style={{
                          borderRadius: "10px",
                        }}
                        unoptimized={true}
                        loading="eager"
                        layout="fixed"
                        priority
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
        <div hidden={!_isMobile}>
          <Container>
            <Row className="">
              <Col lg="12" md="12">
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  speed={500}
                  spaceBetween={15}
                  slidesPerView={"auto"}
                  navigation={{
                    prevEl: ".swiper-button-prev",
                    nextEl: ".swiper-button-next",
                  }}
                  freeMode={true}
                >
                  {props.slider.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <div className="slideimage2">
                          <Image
                            height={300}
                            width={300}
                            src={item.slider_image_base_url}
                            alt="loading"
                            style={{
                              borderRadius: "10px",
                            }}
                            unoptimized={true}
                            loading="eager"
                            layout="fixed"
                            priority


                          />{" "}
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Pageslider;
