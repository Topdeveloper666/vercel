import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Modalpup from "../Modal/loction";





const externaImageLoader = ({ src, width }) => `${src}?w=${width}`;

const PreferredPackages = ({ setting, data }) => {



  const [modalShow, setModalShow] = React.useState(false);
  const [noRedirect, setRedirect] = React.useState(false);

  const settings = {
    dots: false,
    // infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
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

  return (
    <>
      {/* <hr className="hr-white" /> */}
      {/* <Container className="preferred-packages">
        <div className="title-content">
          {setting ? (
            ""
          ) : (
            <h2
              className="title font-familt-jost mb-5"
              style={{ width: "100%", textAlign: "center" }}
            >
              Preferred Packages
            </h2>
          )}
        </div>

        <Slider {...settings} {...setting}>
          {data.map((pack, i) => (
            <div
              key={`pack_${pack.name}_${i}`}
              className="package-item"
              style={{
                height: "100%",
              }}
            >
              <div
                className="mobile-product-info-wrapper"
                style={{ width: "15rem" }}
                onClick={() => setModalShow(true)}
              >
                <Card className="border-0 rounded-0 package-info card">
                  <Card.Header className="date text-center bg-white card-header">
                    {pack.name}
                  </Card.Header>
                  <Card.Body className="card-body p-2 p-md-4">
                    <div className="d-flex justify-content-around">
                      <Card.Text className="fw-semibold card-text mb-2 mb-md-3 Price">
                        Rs {pack.price}
                      </Card.Text>
                      <Card.Text className="fw-semibold card-text mb-2 mb-md-3">
                        {pack.time} MINS
                      </Card.Text>
                    </div>
                    <div className="d-flex justify-content-around align-items-center">
                      <h5 className="fw-semibold extra-small-text">
                        {pack.discount}% OFF
                      </h5>
                      <h5 className="fw-semibold save-text rounded-1 mx-1">
                        Save Rs {pack.price - pack.discounted_price}
                      </h5>
                      <h5 className="fw-semibold extra-small-text">
                        Rs {pack.discounted_price}
                      </h5>
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white py-md-3 d-flex justify-content-center justify-content-md-around card-footer">
                    <Button
                      type="button"
                      className="extra-small-text package-btn border-0 me-2 py-1 py-md-2 mb-md-1 mb-xl-0 btn btn-primary"
                    >
                      Add to card
                    </Button>
                    <Button
                      type="button"
                      className="extra-small-text package-btn border-0 py-md-2 btn btn-primary"
                    >
                      View Details
                    </Button>
                  </Card.Footer>
                </Card>
              </div>

              <Image
                loader={externaImageLoader}
                alt=""
                src={pack.service_image_url}
                width={240}
                height={200}
                className="pre-img"
                style={{
                  width: "100%", // Adjust the width or height using CSS
                  height: "auto", // Set the other dimension to "auto"
                  objectFit: "cover",
                }}
                priority
              />
            </div>
          ))}
        </Slider>

        {modalShow && (
          <Modalpup
            show={modalShow}
            noRedirect={noRedirect}
            onHide={() => {
              setRedirect(false);
              setModalShow(false);
            }}
          />
        )}
      </Container> */}
    </>
  );
};

export default PreferredPackages;
