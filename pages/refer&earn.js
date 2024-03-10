
import React, { useEffect, useState, Fragment } from 'react';

import { Col, Container, Row } from "react-bootstrap";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import Refer from "../assets/img/Refer.jpg";
import Refer2 from "../assets/img/Refer.png";
import Ern from "../assets/img/Rectangle 999.png";


const refer = () => {
  const [_isMobile, setMobile] = useState();

  useEffect(() => {
    setMobile(_isMobile);
  }, [setMobile]);

  return (
    <Fragment>
      <div className="background2" hidden={_isMobile}>
        <div className="d-flex">
          <span className='justify-self-center'><IoIosArrowBack size={35} className="refer-arrow-icon" /></span>
          <h2 className="refer-title-d">Refer To Earn</h2>
        </div>
        <div className="testimonial ">
          <Image
            src={Ern.src}
            width={1080}
            height={214}
            alt=""
            style={{ objectFit: "cover" }}
          />
        </div>
        <Row className="mt-3">
          <Col lg="6" md="6">
            <div className="refer-text">
              <h4 className="refer-text-head">Invite and Earn</h4>
              <div className="refer-text-list">
                <p>
                  1. Refer a friend to Download and Sign Up on Glamcode App.
                </p>
                <p>
                  2. As soon as the referees sign up using the refer code,
                  they will receive INR 100 in their GC Wallet.
                </p>
                <p>
                  3. For every referee who completes his/her first booking,
                  the referrer’s GC Wallet will be credited with INR 150.
                </p>
                <p>
                  4 Thereafter every time the referees complete a booking, the
                  referrers will keep receiving INR 50 in their GC Wallet.
                </p>
              </div>
            </div>
          </Col>
          <Col lg="6" md="6">
            <div className="refer-text">
              <h4 className="refer-text-head">Rewards</h4>
              <div className="refer-text-position">
                <div className="refer-d-title2">
                  <h2 className="refer-d-title2-text1">
                    Total Glamcode Credits Earned
                  </h2>
                  <h2 className="refer-d-title2-text1"> 0/-</h2>
                </div>
                <div className="refer-text-btn ">
                  <div className="refer-text-btn-1">
                    <span>Your Referral Code</span>
                    <br />
                    <span className="refer-text-btn-1-span">YXSHCOOL</span>
                  </div>
                  <div className="refer-text-btn-2">
                    <span>
                      copy <br /> code
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="background2" hidden={!_isMobile}>
        <div className="refer-head">
          <IoIosArrowBack size={30} className="refer-arrow-icon" />
          <h2 className="refer-title">Refer To Earn</h2>
        </div>
        <div className="refer-img">
          <Image
            src={Refer.src}
            alt="refer image"
            width={250}

            height={31}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="refer-img2">
          <Image
            src={Refer2.src}
            width={350}
            height={43}
            alt=""
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="refer-text-btn ">
          <div className="refer-text-btn-1">
            <span>Your Referral Code</span>
            <br />
            <span className="refer-text-btn-1-span">YXSHCOOL</span>
          </div>
          <div className="refer-text-btn-2">
            <span>
              copy <br /> code
            </span>
          </div>
        </div>

        <div className="refer-text">
          <h6 className="refer-text-head">Invite and Earn</h6>
          <div className="refer-text-list">
            <p>1. Refer a friend to Download and Sign Up on Glamcode App.</p>
            <p>
              2. As soon as the referees sign up using the refer code, they
              will receive INR 100 in their GC Wallet.
            </p>
            <p>
              3. For every referee who completes his/her first booking, the
              referrer’s GC Wallet will be credited with INR 150.
            </p>
            <p>
              4 Thereafter every time the referees complete a booking, the
              referrers will keep receiving INR 50 in their GC Wallet.
            </p>
          </div>
        </div>
        <div className="refer-btn-div">
          <button className="refer-btn">REFER NOW</button>
        </div>
      </div>

    </Fragment>
  );
};

export default refer;
