import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import moment from "moment";
import { frontService } from "../../_services/front.services";
import Logo from "../../glamcode.svg";
import playstore from "../../assets/img/playstore.svg";
import appstore from "../../assets/img/appstore.svg";
import twitter_icon from "../../assets/img/twitter_icon.svg";
import youtube_icon from "../../assets/img/youtube_icon.svg";
import instagram_icon from "../../assets/img/instagram_icon.svg";
import facebook_icon from "../../assets/img/facebook_icon.svg";
import { Container } from "react-bootstrap";
import { CgMail } from "react-icons/cg";
import Image from "next/image";
import Link from "next/link";
import OtpModal from "../Modal/OtpModal";
import { isMobile, mobileModel } from "react-device-detect";
export const config = { amp: "hybrid" };

const externaImageLoader = ({ src, width }) => `${src}?w=${width}`;

function Footer() {
  let isFetching = false;
  const router = useRouter();

  const [total, setTotal] = useState(0);
  const [coupons, setCoupons] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cart = useSelector((state) => state.cardAdd?.cart);
  const dataloctions = useSelector((state) => state.loctions);
  const dataloction = useSelector((state) => state.datalocation.locationData);
  const userdetails = useSelector(
    (state) => state.userdetails?.userdetails?.mobile
  );

  useEffect(() => {
    var total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += parseInt(cart[i].sum);
    }
    setTotal(total);
  }, [cart]);

  useEffect(() => {
    var day = moment().format("dddd");

    if (isFetching) return;
    isFetching = true;

    frontService.coupons().then(
      (res) => {
        if (res.status === "success") {
          isFetching = false;
          setCoupons((arr) => [
            ...res.couponData.filter((e) => isDay(e.days, day)),
          ]);
        } else {
        }
      },
      (error) => { }
    );
  }, []);

  const shortedCoupons = coupons.sort(
    (a, b) => a.minimum_purchase_amount - b.minimum_purchase_amount
  );

  let dif = ((shortedCoupons[0] || {}).minimum_purchase_amount || 0) - total;

  let minAmount = dataloction?.loc_min_booking_amount || "0";
  minAmount = parseInt(minAmount);
  if (minAmount > total) {
    dif = 0;
  }

  const isDay = (s, day) => {
    let string = s.replaceAll('"', "");
    string = string.replace("[", "");
    string = string.replace("]", "");
    string = string.replaceAll('"', "");
    string = string.split(",");

    let has = false;
    string.forEach((element) => {
      if (!has) {
        if (element === day) {
          has = true;
        }
      }
    });
    return has;
  };

  const onClickCheckOut = useCallback(() => {
    let minAmount = dataloction?.loc_min_booking_amount || "0";
    minAmount = parseInt(minAmount);
    localStorage.setItem("page", "checkout");

    if (minAmount > total) toast.error("Add more items to checkout");
    else if (userdetails) router.push("/checkout");
    else handleShow();
  }, [
    dataloction?.loc_min_booking_amount,
    total,
    userdetails,
    router,
    handleShow,
  ]);
  const cls = "visible";

  return (
    <>
      <footer className="footer-container">
        <Container>
          <>
            <div className="row mt-5 desc-footer d-none d-md-flex py-5">
              <div className="d-md-none d-lg-inline-flex col-lg-3">
                <div className="log footer-logo">
                  <Link href="#">
                    <Image
                      src={Logo.src}
                      alt="Glam code"
                      width={152}
                      height={152}
                      loading="lazy"
                      style={{ objectFit: "cover" }}
                    />
                  </Link>
                </div>
              </div>
              <div className="col-md-12 col-lg-9">
                <div className="row text-white">
                  <div className="col-5">
                    <h4 className="text-white footer-heading">
                      Contact Information
                    </h4>
                    {/* <div className="d-flex align-items-center mt-3">
                      <CgMail size={28} />
                      <p className="m-0 ps-3">glamourministry@gmail.com</p>
                    </div> */}
                  </div>
                  <div className="col-3 footer-menu-text">
                    <h4 className="text-white footer-heading">Main Menu</h4>
                    <p className="mb-1">
                      <a href="/about-us" className="footer-text">
                        About Us
                      </a>
                    </p>
                    <p className="mb-1">
                      <a href="/contact-us" className="footer-text">
                        Contact Us
                      </a>
                    </p>
                    <p className="mb-1">
                      <a href="/membership" className="footer-text">
                        Membership
                      </a>
                    </p>
                    <p className="mb-1">
                      <a href="/refer&earn" className="footer-text">
                        Refer&nbsp;and Earn
                      </a>
                    </p>
                    <p className="mb-1">
                      <a href="/wallet" className="footer-text">
                        Wallet&nbsp;/ Cashback
                      </a>
                    </p>
                  </div>
                  <div className="col-3 footer-menu-text">
                    <h4 className="text-white footer-heading">Serving in</h4>
                    {dataloctions.location?.map((x, i) => (
                      <p className="mb-1" key={`serve_${x?.slug}_${i}`}>
                        <a style={{ color: "#fff" }} href={`/${x.slug}`}>
                          {" "}
                          {x.city}{" "}
                        </a>
                      </p>
                    ))}
                  </div>
                  <h4 className="footer-heading">Download the GC App</h4>
                  <div className="d-flex align-items-center ">
                    <Link href="#">
                      <Image
                        src={playstore.src}
                        alt="Glam code"
                        className="me-2"
                        width={135}
                        height={45}
                      />
                    </Link>

                    <Link href="#">
                      <Image
                        src={appstore.src}
                        alt="Glam code"
                        className="me-2"
                        width={135}
                        height={45}
                      />
                    </Link>
                  </div>
                  <div className="d-flex justify-content-end">
                    <a
                      href="https://instagram.com/myglamcode?igshid=YmMyMTA2M2Y="
                      className="social-icon me-3"
                      style={{
                        display: "inline-block",
                        width: 40,
                        height: 40,
                        position: "relative",
                        overflow: "hidden",
                        verticalAlign: "middle",
                      }}
                      target="_blank"
                      aria-label="twitter"
                    >
                      <div
                        className="social-container"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <Image
                          loader={externaImageLoader}
                          src={instagram_icon.src}
                          width={50}
                          height={50}
                          alt=""
                        />
                      </div>
                    </a>
                    <a
                      href="https://youtube.com/channel/UC0tPgNGS96oVlkUqBf4ZM2Q"
                      className="social-icon me-3"
                      style={{
                        display: "inline-block",
                        width: 40,
                        height: 40,
                        position: "relative",
                        overflow: "hidden",
                        verticalAlign: "middle",
                      }}
                      target="_blank"
                      aria-label="twitter"
                    >
                      <div
                        className="social-container"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <Image
                          loader={externaImageLoader}
                          src={youtube_icon.src}
                          width={50}
                          height={50}
                          alt=""
                        />
                      </div>
                    </a>
                    <a
                      href="https://twitter.com/GlamCode3?t=medt6YYBVczVXZ-IWiUObg&s=08"
                      className="social-icon me-3"
                      style={{
                        display: "inline-block",
                        width: 40,
                        height: 40,
                        position: "relative",
                        overflow: "hidden",
                        verticalAlign: "middle",
                      }}
                      target="_blank"
                      aria-label="twitter"
                    >
                      <div
                        className="social-container"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <Image
                          loader={externaImageLoader}
                          src={twitter_icon.src}
                          width={50}
                          height={50}
                          alt=""
                        />
                      </div>
                    </a>
                    <a
                      href="https://www.facebook.com/myglamcode"
                      className="social-icon me-3"
                      style={{
                        display: "inline-block",
                        width: 40,
                        height: 40,
                        position: "relative",
                        overflow: "hidden",
                        verticalAlign: "middle",
                      }}
                      target="_blank"
                      aria-label="twitter"
                    >
                      <div
                        className="social-container"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <Image
                          loader={externaImageLoader}
                          src={facebook_icon.src}
                          width={50}
                          height={50}
                          alt=""
                        />
                      </div>
                    </a>
                  </div>
                  <p className="mt-3 ps-6 last-text">
                    Copyright 2024 @Glamcode
                  </p>
                </div>
              </div>
            </div>
            <div className="row mobile-footer d-md-none pb-5 pt-2">
              <div className="col-12">
                <div className="row text-white">
                  <div className="col-12 text-center">
                    <p className="mb-1">
                      <a href="/about-us" className="footer-text">
                        About Us
                      </a>
                    </p>
                    <p className="mb-1">
                      <a href="/terms-conditions" className="footer-text">
                        Terms & Condition
                      </a>
                    </p>
                    <p className="mb-1">
                      <a href="/privacy-policy" className="footer-text">
                        Privacy Policy
                      </a>
                    </p>
                    <p className="mb-1">
                      <a href="/" className="footer-text">
                        FAQs
                      </a>
                    </p>
                    <p className="mb-1">
                      <a
                        href="http://localhost:3000/contact-us"
                        className="footer-text"
                      >
                        Contact Us
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <hr className="bg-white w-full border" />
                <div className="d-flex justify-content-center">
                  <a
                    href="https://instagram.com/myglamcode?igshid=YmMyMTA2M2Y="
                    className="social-icon me-3"
                    style={{
                      display: "inline-block",
                      width: 40,
                      height: 40,
                      position: "relative",
                      overflow: "hidden",
                      verticalAlign: "middle",
                    }}
                    target="_blank"
                    aria-label="twitter"
                  >
                    <div
                      className="social-container"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        src={instagram_icon.src}
                        alt="insta_ico"
                        width={40}
                        height={40}
                      />
                    </div>
                  </a>
                  <a
                    href="https://youtube.com/channel/UC0tPgNGS96oVlkUqBf4ZM2Q"
                    className="social-icon me-3"
                    style={{
                      display: "inline-block",
                      width: 40,
                      height: 40,
                      position: "relative",
                      overflow: "hidden",
                      verticalAlign: "middle",
                    }}
                    target="_blank"
                    aria-label="twitter"
                  >
                    <div
                      className="social-container"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        src={youtube_icon.src}
                        width={40}
                        height={40}
                        alt="youtube_ico"
                      />
                    </div>
                  </a>
                  <a
                    href="https://twitter.com/GlamCode3?t=medt6YYBVczVXZ-IWiUObg&s=08"
                    className="social-icon me-3"
                    style={{
                      display: "inline-block",
                      width: 40,
                      height: 40,
                      position: "relative",
                      overflow: "hidden",
                      verticalAlign: "middle",
                    }}
                    target="_blank"
                    aria-label="twitter"
                  >
                    <div
                      className="social-container"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        src={twitter_icon.src}
                        width={40}
                        height={40}
                        alt="twitter_ico"
                      />
                    </div>
                  </a>
                  <a
                    href="https://www.facebook.com/myglamcode"
                    className="social-icon me-3"
                    style={{
                      display: "inline-block",
                      width: 40,
                      height: 40,
                      position: "relative",
                      overflow: "hidden",
                      verticalAlign: "middle",
                    }}
                    target="_blank"
                    aria-label="twitter"
                  >
                    <div
                      className="social-container"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        src={facebook_icon.src}
                        width={40}
                        height={40}
                        alt="facebook_ico"
                      />
                    </div>
                  </a>
                  <Link href="https://play.google.com/store/search?q=glamcode&c=apps&hl=en-IN">
                    <Image
                      src={playstore.src}
                      alt="Glam code"
                      className="me-2"
                      width={135}
                      height={45}
                    />
                  </Link>
                  <Link href="https://apps.apple.com/in/app/glamcode/id6449648391">
                    <Image
                      src={appstore.src}
                      alt="Glam code"
                      className="me-2"
                      width={135}
                      height={45}
                    />
                  </Link>
                </div>
                <p className="mt-3 fs-6 text-white text-center">
                  Copyright 2024 @Glamcode
                </p>
              </div>
            </div>
          </>
        </Container>
      </footer>

      {(isMobile && router.pathname === "/") ||
        (isMobile && router?.query?.data === "lucknow-home-salon-services") ||
        (isMobile && router?.query?.data === "noida-salon-at-home") ||
        (isMobile && router?.query?.data === "Delhi-salon-at-home") ||
        (isMobile &&
          router?.query?.data === "gurugram-parlour-services-at-home") ||
        (isMobile &&
          router?.query?.data === "ghaziabad-beauty-parlour-services") ||
        (isMobile &&
          router?.query?.data === "greater-noida-beauty-services-at-home") ? (
        <>
          {mobileModel === "iPhone" ? (
            <div
              className={`menu-category-d ${cls}`}
              style={
                isMobile
                  ? cart?.length > 0
                    ? { marginBottom: "65px" }
                    : { marginBottom: 0 }
                  : null
              }
            >
              <a
                href="https://apps.apple.com/in/app/glamcode/id6449648391"
                style={{ color: "#ffff" }}
              >
                Open In App
              </a>
              <i
                className="fa fa-mobile-phone"
                style={{ fontSize: "24px", marginLeft: "5px" }}
              ></i>
            </div>
          ) : (
            <div
              className={`menu-category-d ${cls}`}
              style={
                isMobile
                  ? cart?.length > 0
                    ? { marginBottom: "65px" }
                    : { marginBottom: 0 }
                  : null
              }
            >
              <a
                href="https://play.google.com/store/apps/details?id=com.glamcode.app"
                style={{ color: "#ffff" }}
              >
                {" "}
                Open In App
              </a>
              <i
                className="fa fa-mobile-phone"
                style={{ fontSize: "24px", marginLeft: "5px" }}
              ></i>
            </div>
          )}
        </>
      ) : (
        ""
      )}
      {router.pathname === "/login" ||
        router.pathname === "/payment" ||
        router.pathname === "/checkout" ? (
        ""
      ) : cart.length > 0 ? (
        <div
          className={`bottomservicesCheckout ${isMobile && "rounded-top"}`}
          key={0}
        >
          <div className="topinside">
            <p className="text">
              {dif > 0 ? (
                <span
                  style={{ paddingLeft: "6px" }}
                >{` Add Rs${dif} more to avail coupon`}</span>
              ) : dif < 0 ? (
                <span>You can now avail coupon</span>
              ) : (
                <span>{`Minimum Booking Amount :- Rs  ${dataloction?.loc_min_booking_amount}`}</span>
              )}
            </p>
          </div>
          <div className="bottominside">
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-column-m">
                <p className="textHead">
                  Total Price Rs {total} {/*{dif > 0 && (*/}
                  {/*  <span*/}
                  {/*    style={{ paddingLeft: "6px" }}*/}
                  {/*  >{` Add Rs${dif} more to avail coupon`}</span>*/}
                  {/*)}*/}
                </p>
              </div>

              <span
                onClick={onClickCheckOut}
                className="textHead btn"
                style={{
                  cursor: "pointer",
                  background: "#882edf",
                  boxShadow: "0px 4px 7px -2px rgb(217 74 253) !important",
                  border: "1px solid #fff",
                }}
              >
                Checkout{" "}
                <i
                  className="fa fa-chevron-right"
                  style={{ marginLeft: 10 }}
                  aria-hidden="true"
                ></i>
              </span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {show && (
        <OtpModal
          show={show}
          handleShow={handleShow}
          handleClose={handleClose}
        />
      )}
    </>
  );
}

export default Footer;
