import React, { Fragment, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import Special from "../assets/img/Specialoffer.png";
import { isMobile } from 'react-device-detect';
import Ern from "../assets/img/Membership.png";
import { CiDiscount1 } from "react-icons/ci";
import { FaHandHoldingMedical } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { AiTwotoneLock } from "react-icons/ai";

const refer = () => {
  const [_isMobile, setMobile] = useState();

  useEffect(() => {
    setMobile(isMobile);
  }, [setMobile]);
  return (
    <Fragment>
      <div className="background2" hidden={_isMobile}>
        <div className="refer-head-d">
          <IoIosArrowBack size={35} className="refer-arrow-icon" />
          <h2 className="refer-title-d">Glamcode Membership</h2>
        </div>
        <div className="testimonial " style={{ textAlign: 'center' }}>
          <Image
            src={Ern.src}
            width={1080}
            alt=""
            height={214}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="membership-text-card">
          <div className="membership-text-card-in">
            <div className="membership-text-card-position">
              <FaHandHoldingMedical size={40} />
              <div className="membership-text-p-all">
                <p className="membership-text-p">Extra 10% Discount</p>
                <p className="membership-text-p2">
                  Get Flat 10% Discount on every purchase of Individual
                  services.
                </p>
              </div>
            </div>
            <div className="membership-text-card-position">
              <CiDiscount1 size={40} />
              <div className="membership-text-p-all">
                <p className="membership-text-p">
                  Extra 5% Discount on Packages
                </p>
                <p className="membership-text-p2">
                  Get addtional Flat 5% Discount on every Purchase of packages
                  and can be clubbed with other offers as well.
                </p>
              </div>
            </div>
            <div className="membership-text-card-position">
              <FaCalendarAlt size={40} />

              <div className="membership-text-p-all">
                <p className="membership-text-p">
                  Priority Access to Prime Slots
                </p>
                <p className="membership-text-p2">
                  Exclusive time slot priority will be given to GlamCode
                  Members.
                </p>
              </div>
            </div>
            <div className="membership-text-card-position">
              <AiTwotoneLock size={40} />

              <div className="membership-text-p-all">
                <p className="membership-text-p">
                  Unlock Additional Free Services
                </p>
                <p className="membership-text-p2">
                  Exclusive Free Services will be given to GlamCode Members.
                </p>
              </div>
            </div>
          </div>
          <div className=" membership-btn">
            <div>
              <button type="button" className="membership-btn-1">
                Join at a special price of just <br />{" "}
                <span className="span-delate">Rs999</span>
                <span className="span-bold">Rs999</span>/ For 6 Months
              </button>
            </div>

            <div>
              <button className="membership-btn-2" type="button">
                BECOME A MEMBER NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="background2" hidden={!_isMobile}>
        <div className="refer-head">
          <IoIosArrowBack size={30} className="refer-arrow-icon" />
          <h2 className="refer-title">Glamcode Membership</h2>
        </div>
        <div className="membership-img">
          <Image
            src={Special.src}
            alt="refer image"
            width={250}

            height={31}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="membership-button-f">
          <button
            type="button"
            className="membership-btn-1 membership-btn-1-sm "
          >
            Join at a special price of just <br />
            <span className="span-delate">Rs999</span>
            <span className="span-bold">Rs999</span>/ For 6 Months
          </button>
        </div>
        <div className="membership-text-card-sm">
          <div className="membership-text-card-in">
            <div className="membership-text-card-position">
              <FaHandHoldingMedical size={30} />

              <div className="membership-text-p-all">
                <p className="membership-text-p">Extra 10% Discount</p>
                <p className="membership-text-p2">
                  Get Flat 10% Discount on every purchase of Individual
                  services.
                </p>
              </div>
            </div>
            <div className="membership-text-card-position">
              <CiDiscount1 size={40} />

              <div className="membership-text-p-all">
                <p className="membership-text-p">
                  Extra 5% Discount on Packages
                </p>
                <p className="membership-text-p2">
                  Get addtional Flat 5% Discount on every Purchase of packages
                  and can be clubbed with other offers as well.
                </p>
              </div>
            </div>
            <div className="membership-text-card-position">
              <FaCalendarAlt size={30} />

              <div className="membership-text-p-all">
                <p className="membership-text-p">
                  Priority Access to Prime Slots
                </p>
                <p className="membership-text-p2">
                  Exclusive time slot priority will be given to GlamCode
                  Members.
                </p>
              </div>
            </div>
            <div className="membership-text-card-position">
              <AiTwotoneLock size={30} />

              <div className="membership-text-p-all">
                <p className="membership-text-p">
                  Unlock Additional Free Services
                </p>
                <p className="membership-text-p2">
                  Exclusive Free Services will be given to GlamCode Members.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="membership-last-button">
          <button className="membership-btn-2" type="button">
            BECOME A MEMBER NOW
          </button>
        </div>
      </div>

    </Fragment>
  );
};

export default refer;
