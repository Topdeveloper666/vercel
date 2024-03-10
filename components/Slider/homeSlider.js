import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import glame from "../../assets/img/glam.png";
import Image from "next/image";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import 'swiper/swiper.min.css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
function Slider(props) {
  const externaImageLoader = ({ src, width }) => `${src}?w=${width}`;
  const category = props.slider?.slider_images;

  return (
    <div className="mid-2 d-flex mt-md-4 mt-0">
      <Container className="d-md-block d-none">
        <Row className="slidesection">
          <Col lg="4" md="12">
            <div>
              <Image
                loader={externaImageLoader}
                src={glame.src}
                width="80"
                height="80"
                alt="Glam code"
                priority
              />
              <p style={{ fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.2 }}>Salon at Home for Women</p>
              <p className="spanp">
                <span className="fa fa-star faimg"></span>4.76(978k)
              </p>
            </div>
          </Col>
          <Col lg="8" md="12">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={0}
              autoplay={false}
              onImagesReady={(swiper) => {
                swiper.params.autoplay = {
                  delay: 2500,
                  disableOnInteraction: false,
                }
                swiper.autoplay.start()
              }}
              slidesPerView={"auto"}
              speed={500}
            >
              {category?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="slideimage">
                      <Image
                        src={item.slider_image_base_url}

                        alt="sliderImage"
                        style={{
                          borderRadius: "10px",
                        }}
                        height={750}
                        width={750}
                        loading={index > 0 ? 'lazy' : 'eager'}
                        priority={index > 0 ? false : true}

                      />

                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Col>
        </Row>
      </Container>
      <Container className="d-md-none d-block">
        <Col lg="12" md="12">
          {/* <Skeleton height="206px" /> */}
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={0}
            autoplay={false}
            onImagesReady={(swiper) => {
              swiper.params.autoplay = {
                delay: 2500,
                disableOnInteraction: false,
              }
              swiper.autoplay.start()
            }}
            slidesPerView={"auto"}
            speed={500}
            height={206}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
          >
            {category?.map((item, index) => {
              return (
                <SwiperSlide key={item.slider_image_base_url}>
                  <div className="slideimage2 mobile">
                    <Image
                      loader={externaImageLoader}
                      src={item.slider_image_base_url}
                      alt="sliderImage"
                      style={{
                        borderRadius: "10px",
                        width: "100%", // Ensure image fills its container
                        height: "auto", // Maintain aspect ratio
                      }}
                      height={253}
                      width={450}
                      loading={index > 0 ? 'lazy' : 'eager'}
                      priority={index > 0 ? false : true}
                    />

                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>


        </Col>
      </Container>
    </div>
  );
}

export default Slider;




