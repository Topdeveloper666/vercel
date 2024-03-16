import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Logo from "../../glamcode.svg";
import Image from "next/image";
import Modalpup from "../Modal/loction";
import styled from "styled-components";
import { useRouter } from "next/router";
import { userData, userAddress } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import OtpModal from "../Modal/OtpModal";
import {
  isMobile,
} from "react-device-detect";
import Type from "../Typewritter/type";

const externaImageLoader = ({ src, width }) => `${src}?w=${width}`;
const SidebarNav = styled.nav`
  background: linear-gradient(
    180deg,
    rgba(143, 99, 186, 0.89) 0%,
    #d9bef4 100%
  );
  width: 80%;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  opacity: 1;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;
const SidebarWrap = styled.div`
  width: 100%;
`;

function Header() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const router = useRouter();
  const dispatch = useDispatch();
  const dataloc = useSelector((state) => state.datalocation);
  const [showResults, setShowResults] = useState(false);
  const onClick = () => setShowResults((value) => !value);
  const [modalShow, setModalShow] = useState(false);
  const [noRedirect, setRedirect] = useState(false);

  const [sidebar, setSidebar] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const showSidebar = () => setSidebar(!sidebar);

  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    if (dataloc.locationData.cityname != '') {
      setIsClient(true)
    }
  }, [dataloc]);


  const callurl = (v) => {
    if (!localStorage.getItem("id")) {
      setRedirect(true);
      setModalShow(true);
      return;
    }
    if (v) {
      router.push("/search/" + v);
    }
  };

  const userdetails = useSelector(
    (state) => state.userdetails?.userdetails?.mobile
  );

  return (
    <Fragment>
      <div>
        <Container className="headerclass background1 menufix desktopView d-md-block d-none" fluid>
          <Row>
            <Col lg="5" md="12">
              <div className="logsection">
                <div className="log">
                  <a href="/">
                    <Image
                      loader={externaImageLoader}
                      src={Logo.src}
                      alt="Glam code"
                      width={50}
                      height={50}
                      priority
                    />
                  </a>
                </div>
                <div className="selectloction">
                  <div>
                    <button
                      onClick={() => setModalShow(true)}
                      className="dropdown-toggle dropdownborder"
                      type="button"
                      id="dropdownMenuButton1"
                    >
                      {isClient
                        ? dataloc.locationData.cityname
                        : "Select your Location"}
                    </button>
                    {modalShow && (
                      <Modalpup
                        show={modalShow}
                        noredirect={noRedirect?.toString()}
                        onHide={() => {
                          setRedirect(false);
                          setModalShow(false);
                        }}
                        onSelect={() => {
                          if (searchValue) {
                            router.push("/search/" + searchValue);
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </Col>
            <Col lg="7" md="12" className="menutop">
              <div className="d-flex gap-4 justify-content-end ">
                <a href="/" className="btn btn-outline-light bgsalon">
                  Home
                </a>
                <a href="/blogs" className="btn btn-outline-light bgsalon">
                  Blogs
                </a>

                <a
                  className="btn btn-outline-light bgsalon"
                  href="https://play.google.com/store/apps/details?id=in.glamcode.app"
                  target="_blank"
                >
                  <i className="fa fa-download mr-2"></i>&nbsp;Use App
                </a>
                <button
                  className="btn btn-outline-light bgsalon2"
                  onClick={onClick}
                  name="open_menu"
                  style={{ color: 'black' }}
                >
                  <i
                    className="fa fa-bars bgsalon3 icon-m"
                    aria-hidden="true"
                  />
                  Menu
                </button>
              </div>
              {showResults ? (
                <div
                  className="sidemenu-modal-d"
                  style={{ display: "block" }}
                >
                  <div
                    className="sidemenu-outbox-d"
                    onClick={() => {
                      router.push("/about-us");
                    }}
                  >
                    <i
                      className="fa fa-info-circle  icon-m"
                      aria-hidden="true"
                    />
                    <span style={{ marginLeft: "20px" }}>About us</span>
                  </div>
                  <div
                    className="sidemenu-outbox-d"
                    onClick={() => {
                      router.push("/contact-us");
                    }}
                  >
                    <i className="fa fa-comment  icon-m" aria-hidden="true" />
                    <span style={{ marginLeft: "20px" }}>Contact us</span>
                  </div>
                  {userdetails && (
                    <>
                      <div
                        className="sidemenu-outbox-d"
                        onClick={() => {
                          router.push("/mybookings");
                        }}
                      >
                        <i className="fa fa-user  icon-m" aria-hidden="true" />
                        <span style={{ marginLeft: "20px" }}>My Bookings</span>
                      </div>
                      <div className="sidemenu-outbox-d">
                        <i
                          className="fa fa-star  icon-m"
                          aria-hidden="true"
                        />
                        <span style={{ marginLeft: "20px" }} onClick={() => {
                          router.push("/membership");
                        }}>Membership</span>
                      </div>
                      <div className="sidemenu-outbox-d">
                        <i
                          className="fa fa-share  icon-m"
                          aria-hidden="true"
                        />
                        <span style={{ marginLeft: "20px" }} onClick={() => {
                          router.push("/refer&earn");
                        }}>
                          Refer&nbsp;And Earn
                        </span>
                      </div>
                      <div className="sidemenu-outbox-d">
                        <i className="fa fa-google-wallet" aria-hidden="true"></i>
                        <span style={{ marginLeft: "20px" }} onClick={() => {
                          router.push("/wallet");
                        }}>
                          Wallet&nbsp;/ Cashback
                        </span>
                      </div>
                    </>
                  )}
                  {userdetails ? (
                    <div
                      className="sidemenu-outbox-d"
                      onClick={() => {
                        dispatch(userData(null));
                        dispatch(userAddress(null));
                        localStorage.removeItem("userDetails");
                        localStorage.removeItem("userdata");
                        localStorage.removeItem("page");
                        localStorage.removeItem("gluserDetails");
                        localStorage.removeItem('userAddress');
                        onClick();
                      }}
                    >
                      <i
                        className="fa fa-sign-in  icon-m"
                        aria-hidden="true"
                      />
                      <span style={{ marginLeft: "20px" }}>Logout</span>
                    </div>
                  ) : (
                    <div
                      className="sidemenu-outbox-d"
                      onClick={() => {
                        handleShow(), setShowResults(false);
                      }}
                    >
                      <i
                        className="fa fa-sign-in  icon-m"
                        aria-hidden="true"
                      />
                      <span style={{ marginLeft: "20px" }}>Login</span>
                    </div>
                  )}
                </div>
              ) : null}
            </Col>
          </Row>
        </Container>
      </div>
      <Fragment>
        <Container className="mobilepop d-md-none d-block" fluid>
          <div className="header-top-aream header-top-area--style-1">
            <ul className="event-list" style={{ paddingTop: "5px" }}>

              <li className="list-item">
                <h2 className="title text-center font-familt-jost">
                  GLAMCODE
                </h2>
              </li>
              <li className="list-item">
              </li>
              <li className="list-item">
                <a
                  onClick={showSidebar}
                  className="btn btn--size-33-33 btn--center btn--round btn--color-radical-red btn--bg-white btn--box-shadow main-menu offcanvas-toggle offside-menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                  >
                    <g
                      id="Group_1"
                      data-name="Group 1"
                      transform="translate(-28 -63)"
                    >
                      <path
                        id="Rectangle_3"
                        data-name="Rectangle 3"
                        d="M0,0H5A2,2,0,0,1,7,2V5A2,2,0,0,1,5,7H2A2,2,0,0,1,0,5V0A0,0,0,0,1,0,0Z"
                        transform="translate(28 63)"
                        fill="#7c00b7"
                      />
                      <path
                        id="Rectangle_6"
                        data-name="Rectangle 6"
                        d="M2,0H5A2,2,0,0,1,7,2V5A2,2,0,0,1,5,7H0A0,0,0,0,1,0,7V2A2,2,0,0,1,2,0Z"
                        transform="translate(28 72)"
                        fill="#7c00b7"
                      />
                      <path
                        id="Rectangle_4"
                        data-name="Rectangle 4"
                        d="M2,0H7A0,0,0,0,1,7,0V5A2,2,0,0,1,5,7H2A2,2,0,0,1,0,5V2A2,2,0,0,1,2,0Z"
                        transform="translate(37 63)"
                        fill="#7c00b7"
                      />
                      <path
                        id="Rectangle_5"
                        data-name="Rectangle 5"
                        d="M2,0H5A2,2,0,0,1,7,2V7A0,0,0,0,1,7,7H2A2,2,0,0,1,0,5V2A2,2,0,0,1,2,0Z"
                        transform="translate(37 72)"
                        fill="#7c00b7"
                      />
                    </g>
                  </svg>
                </a>
              </li>
            </ul>

            <div className="selectloction">
              <div>
                <i
                  className=" p-1 fa fa-map-marker"
                  style={{ fontSize: 18 }}
                  aria-hidden="true"
                />
                <button
                  onClick={() => setModalShow(true)}
                  className="dropdown-toggle dropdownborder"
                  type="button"
                  id="dropdownMenuButton2"
                >
                  {isClient
                    ? dataloc.locationData.cityname
                    : "Select your Location"}
                </button>
                {modalShow && (
                  <Modalpup
                    show={modalShow}
                    noredirect={noRedirect?.toString()}
                    onHide={() => {
                      setRedirect(false);
                      setModalShow(false);
                    }}
                    onSelect={() => {
                      if (searchValue) {
                        router.push("/search/" + searchValue);
                      }
                    }}
                  />
                )}
              </div>
              <div className="notifcation-btn">
                <i
                  className="fa fa-bell"
                  style={{ color: "rgb(255, 212, 0)" }}
                />
              </div>
            </div>

            <div className="search-box">
              <div className="search-conatiner">
                <input
                  className="search-input" id="text-search"
                  value={searchValue}
                  aria-label="search_input"
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                />
                {!searchValue && <span className="bgg">
                  Search For <Type textToShow={['Mani-Pedi', 'Facial', 'Waxing']} />
                </span>}
                <button
                  className="search-btn"
                  name="search_button"
                  aria-label="search_button"
                  type="button"
                  onClick={() => {
                    callurl(searchValue);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={12}
                    height="12.003"
                    viewBox="0 0 12 12.003"
                  >
                    <path
                      id="Icon_ionic-ios-search"
                      data-name="Icon ionic-ios-search"
                      d="M13.859,13.131,10.522,9.762a4.756,4.756,0,1,0-.722.731l3.316,3.347a.514.514,0,0,0,.725.019A.517.517,0,0,0,13.859,13.131Zm-7.075-2.6a3.756,3.756,0,1,1,2.656-1.1A3.732,3.732,0,0,1,6.784,10.534Z"
                      transform="translate(-2 -1.997)"
                      fill="#171717"
                    />
                  </svg>
                </button>
              </div>

            </div>
          </div>
        </Container>

        <SidebarNav style={{
          position: 'fixed',
        }} sidebar={sidebar} hidden={isMobile}>

          <SidebarWrap>
            <button
              onClick={showSidebar}
              className="offcanvas-close  d-flex align-items-center justify-content-center"
              aria-label="offcanvas svg icon"
            >
              <svg
                style={{ verticalAlign: "middle" }}
                xmlns="http://www.w3.org/2000/svg"
                width="5.973"
                height="10.449"
                viewBox="0 0 5.973 10.449"
              >
                <path
                  id="Icon_ionic-ios-arrow-back"
                  d="M13.051,11.417,17,7.466a.747.747,0,0,0-1.058-1.054l-4.479,4.476a.745.745,0,0,0-.022,1.03l4.5,4.507A.747.747,0,1,0,17,15.37Z"
                  transform="translate(-11.251 -6.194)"
                ></path>
              </svg>
            </button>
            <div className="offcanvas-header flex-end">
              <div
                className="logo imagelogo-sidemenu "
                style={{ margin: "auto", paddingTop: "23px" }}
              >
                <a href="/">
                  <Image
                    loader={externaImageLoader}
                    className="img-fluid"
                    src={Logo.src}
                    alt="Glamcode"
                    width={120}
                    height={26}
                    unoptimized
                  />
                </a>
              </div>
              <button
                onClick={showSidebar}
                className="offcanvas-close  d-flex align-items-center justify-content-center"
                aria-label="offcanvas svg icon"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="5.973"
                  height="10.449"
                  viewBox="0 0 5.973 10.449"
                >
                  <path
                    id="Icon_ionic-ios-arrow-back"
                    data-name="Icon ionic-ios-arrow-back"
                    d="M13.051,11.417,17,7.466a.747.747,0,0,0-1.058-1.054l-4.479,4.476a.745.745,0,0,0-.022,1.03l4.5,4.507A.747.747,0,1,0,17,15.37Z"
                    transform="translate(-11.251 -6.194)"
                  />
                </svg>
                <div />
              </button>
            </div>
            <div className="offcanvas-mobile-menu-wrapper" >
              <div className="mobile-menu-bottom">
                <div className="offcanvas-menu">
                  <ul>
                    <li>
                      <a href="/" className="side-menu-box">
                        <span className="side-text">
                          <i
                            className="fa fa-home  icon-m"
                            aria-hidden="true"
                          />
                          Home
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/blogs" className="side-menu-box">
                        <span className="side-text">
                          <i
                            className="fa fa-file-text  icon-m"
                            aria-hidden="true"
                          />
                          Blogs
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/about-us" className="side-menu-box">
                        <span className="side-text">
                          <i
                            className="fa fa-info-circle  icon-m"
                            aria-hidden="true"
                          />
                          About us
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/contact-us" className="side-menu-box">
                        <span className="side-text">
                          <i
                            className="fa fa-comment  icon-m"
                            aria-hidden="true"
                          />
                          Contact us
                        </span>
                      </a>
                    </li>
                    {userdetails ? (
                      <>
                        <li>
                          <a href="/mybookings" className="side-menu-box">
                            <span className="side-text">
                              <i
                                className="fa fa-user  icon-m"
                                aria-hidden="true"
                              />
                              My Bookings
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="/membership" className="side-menu-box">
                            <span className="side-text">
                              <i
                                className="fa fa-star  icon-m"
                                aria-hidden="true"
                              />
                              Membership
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="/refer&earn" className="side-menu-box">
                            <span className="side-text">
                              <i
                                className="fa fa-share  icon-m"
                                aria-hidden="true"
                              />
                              Refer&nbsp;And Earn
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="/wallet" className="side-menu-box">
                            <span className="side-text">
                              <i className="fa fa-google-wallet me-4" aria-hidden="true"></i>
                              Wallet&nbsp;/ Cashback
                            </span>
                          </a>
                        </li>
                      </>
                    ) : (
                      ""
                    )}
                    {userdetails ? (
                      <li>
                        <div
                          className="side-menu-box"
                          onClick={() => {
                            dispatch(userData(null));
                            dispatch(userAddress(null));
                            localStorage.removeItem("userDetails");
                            localStorage.removeItem("userdata");
                            localStorage.removeItem("page");
                            localStorage.removeItem("gluserDetails");
                            localStorage.removeItem("userAddress");
                            onClick();
                          }}
                        >
                          <span className="side-text">
                            <i
                              className="fa fa-sign-in  icon-m"
                              aria-hidden="true"
                            />
                            Logout
                          </span>
                        </div>
                      </li>
                    ) : (
                      <li>
                        <div
                          className="side-menu-box"
                          onClick={() => handleShow()}
                        >
                          <span className="side-text">
                            <i
                              className="fa fa-sign-in  icon-m"
                              aria-hidden="true"
                            />
                            Login
                          </span>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </SidebarWrap>
        </SidebarNav>
      </Fragment>
      {/* )} */}

      {show && (
        <OtpModal
          show={show}
          handleShow={handleShow}
          handleClose={handleClose}
        />
      )}
    </Fragment>
  );
}

export default Header;
