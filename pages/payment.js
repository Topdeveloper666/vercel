import Logo from "/glamcode.svg";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Coupon from "../components/Coupon/Coupon";
import { frontService } from "../_services/front.services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearCart } from "../store/actions";
import useRazorpay from "react-razorpay";
import AddToCart from "../components/Cart/AddToCart";
import ViewDetails from "../components/ViewDetails/ViewDetails";
import addon_img from "../assets/img/addon_img.svg";
import coupon_icon from "../assets/img/coupon_icon.svg";
import upi_icon from "../assets/img/upi_icon.svg";
import celebration from "../assets/img/celebration.svg";
import AddressAndUserDetail from "../components/AddressAndUserDetail";
import PreferredPackages from "../components/PreferredPackages";
import { removeFromCart } from "../store/actions";
import { commonData } from "../store/actions";
import Image from "next/image";

import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Payment() {
  const Razorpay = useRazorpay();
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cardAdd?.cart);
  const [dataFromCashbackService, setDataFromCashbackService] = useState({});
  const [dataFrom3rdPartyCoupon, setDataFrom3rdPartyCoupon] = useState(null);
  const userAddress = useSelector((state) => state.userAddress?.useraddress);
  const userdetails = useSelector((state) => state.userdetails?.userdetails);
  const dataloction = useSelector((state) => state.datalocation.locationData);
  const info = useSelector((state) => {
    return state.commonData.common;
  });
  const [total, setTotal] = React.useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [couponModal, setCouponModal] = useState(false);
  const [sending, setSending] = useState(false);
  const [pType, setPType] = useState("cash");
  const [checkedd, setChekedd] = useState(false);
  const [update, setUpdate] = useState(1);
  const [changeAddressModal, setChangeAddressModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [wallet, setWallet] = useState({});
  const coupon_id = info?.coupon_id;
  const coupon_amount = info?.coupon_amount;
  const coupon_min = info?.coupon_min;
  const [currentAddress, setCurrentAddress] = useState({});
  const [disabled, setDisable] = useState(false);
  const [cashbackService, setCashbackService] = useState(false);
  const [walletCashback, setWalletCashback] = useState({});

  useEffect(() => {
    var total = 0, discount = 0;
    for (let i = 0; i < cart.length; i++) {
      total += parseInt(cart[i].sum);
      discount += parseInt(cart[i].discounted_price);
    }
    setTotal(total);
    setDiscountedPrice(discount);

    if (total < coupon_min) {
      emptyCoupon();
    } else {
    }
  }, [cart]);

  useEffect(() => {
    frontService.getUserWalletDetail(userdetails?.id).then((res) => {
      setWallet({ total: res.total, username: res.username })
    });
  }, []);

  useEffect(() => {
    frontService.getUserWalletCashBackDetail(userdetails?.id, total).then((res) => {
      setWalletCashback(res);
    });
  }, [total])

  function emptyCoupon() {
    const common = {
      ...info,
      coupon_id: "",
      coupon_amount: "",
      coupon_min: "",
    };
    dispatch(commonData(common));
  }

  // const dataFromCashbackService = {
  //   "id": 2084,
  //   "name": "Brazilian Skin Lightening Clean Up",
  //   "slug": "brazilian-skin-lightening-clean-up-noida",
  //   "description": "<p>Power Ingredients Dead sea mineral, Korean CICA,Hyaluronic, Aloevera.</p><p>Consists of cleanser , self melting scrub ,Detan pack &amp; gold fairness gel.</p><p>1st of its kind treatment for intimate areas</p>",
  //   "mobile_long_description": null,
  //   "mobile_long_description2": null,
  //   "mobile_long_description3": null,
  //   "mobile_long_description4": null,
  //   "long_description": "<p>Specifically designed to cleanse,lighten, &amp; provide hygiene at intimate areas. No more darkness out there , when doing this regularly . Can be done pre wax , post wax or while under going laser too</p>",
  //   "price": 1598,
  //   "time": 45,
  //   "sort": 1,
  //   "time_type": "minutes",
  //   "discount": 100,
  //   "discount_type": "percent", //"cashback service"
  //   "main_category_id": 99,
  //   "category_id": 341,
  //   "sub_category_id": null,
  //   "packages_id": 0,
  //   "location_id": 6,
  //   "image": [
  //     "4b6d94972fdce2f75f0ae9d974a16b30.png.webp"
  //   ],
  //   "default_image": "4b6d94972fdce2f75f0ae9d974a16b30.png.webp",
  //   "status": "active",
  //   "altImage": "",
  //   "prefered_service": "No",
  //   "location_city": "Noida",
  //   "home_page": 0,
  //   "seo_title": null,
  //   "seo_desc": null,
  //   "seo_key": null,
  //   "created_at": "2023-04-08 11:50:21",
  //   "updated_at": "2023-07-05 22:26:33",
  //   "rating_per": "4.75",
  //   "rating_pop": 12000,
  //   "inventory_id": null,
  //   "product_usage": null,
  //   "service_image_url": "https://admin.glamcode.in/user-uploads/service/2084/4b6d94972fdce2f75f0ae9d974a16b30.png.webp",
  //   "service_detail_url": "https://admin.glamcode.in/bikini-clean-up/brazilian-skin-lightening-clean-up-noida",
  //   "discounted_price": 0,
  //   "category": {
  //     "id": 341,
  //     "main_category_id": "99",
  //     "name": "Bikini Clean Up",
  //     "slug": "bikini-clean-up",
  //     "image": "aecf0011cfac8a7f24479dc7b3fd3443.png.webp",
  //     "status": "active",
  //     "sort_order": 1,
  //     "created_at": "2023-04-08 11:48:49",
  //     "updated_at": "2023-05-23 12:05:40",
  //     "rating_per": "4.75",
  //     "rating_pop": 12000,
  //     "category_image_url": "https://admin.glamcode.in/user-uploads/subcategory/aecf0011cfac8a7f24479dc7b3fd3443.png.webp"
  //   },
  //   "qty": 1,
  //   "sum": 1598
  // }

  const finalTotal =
    Math.round(total) + 49 - (coupon_id ? Math.round(coupon_amount) : 0);

  const onSubmit = () => {
    setDisable(true);
    const id = userdetails?.id;
    const dateTime = info?.booking_time;
    const data = {
      deal_id: "",
      deal_quantity: "",
      user_id: id,
      date_time: dateTime,
      status: "pending",
      payment_gateway: pType,
      total_amount: total,
      discount: "",
      coupon_id: coupon_id ? coupon_id : "",
      coupon_discount: coupon_id ? coupon_amount : "",
      discount_percent: "0",
      tax_name: "",
      tax_percent: "",
      tax_amount: "",
      extra_fees: "49",
      distance_fee: "",
      amount_to_pay: finalTotal,
      payment_status: pType === "cash" ? "pending" : "complete",
      additional_notes: "",
      item_details: cashbackService
        ? [...cart, dataFromCashbackService].map((e) => {
          return {
            business_service_id: e.business_service_id || e.id,
            unit_price: Math.round(e.discounted_price),
            quantity: e.qty,
            amount: Math.round(e.discounted_price) * e.qty,
            cashbackService:
              e.business_service_id == dataFromCashbackService.id ||
              e.id == dataFromCashbackService.id,
          };
        })
        : cart.map((e) => {
          return {
            business_service_id: e.business_service_id || e.id,
            unit_price: Math.round(e.discounted_price),
            quantity: e.qty,
            amount: Math.round(e.discounted_price) * e.qty,
            cashbackService: false,
          };
        }),
    };

    setSending(true);

    frontService.bookOrder(data).then(
      (res) => {
        if (res?.status == "success") {
          localStorage.setItem(
            "scratchAfterBooking",
            JSON.stringify(res.scratchAfterBooking)
          );
          setDisable(false);
          dispatch(clearCart());
          toast(res.message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          router.push("/confirmation");
        } else if (res?.status == "fail") {
          setSending(true);
          toast(res.message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            type: "error",
          });
        } else {
          setSending(true);
          toast("Invalid", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            type: "error",
          });
        }
      },
      (error) => {
        toast("Invalid", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          type: "error",
        });
        setSending(false);
      }
    );
  };

  const options = {
    key: "rzp_live_KBMHwbrgS5pC5c",
    amount: finalTotal * 100, //  = INR 1
    name: "Glam code",
    description: "",
    image: Logo,
    handler: function (response) {
      onSubmit();
      // alert(response.razorpay_payment_id);
      // alert(response.razorpay_order_id);
      // alert(response.razorpay_signature);
    },
    prefill: {
      name: userdetails?.name,
      contact: userdetails?.mobile,
      email: userdetails?.email,
    },
    notes: {
      address:
        userAddress?.address_heading +
        ", " +
        userAddress?.address +
        ", " +
        userAddress?.street,
    },
    theme: {
      color: "#3399cc",
      hide_topbar: false,
    },
  };
  const openPayModal = () => {
    var rzp1 = new Razorpay(options);
    rzp1.open();
  };

  const mapItems = (items) => {
    return items.map((item, index) => {
      return (
        <li
          key={index}
          className="text listService pb-2"
          style={{ listStyle: "disc" }}
        >
          {` ` + item.toString()}
        </li>
      );
    });
  };
  let minAmount = dataloction?.loc_min_booking_amount || "0";

  useEffect(() => {
    if (total < minAmount) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [total]);

  return (
    <>
      <Coupon
        show={couponModal}
        coupon={coupon_id}
        specialCoupon={
          typeof dataFrom3rdPartyCoupon === "object" && dataFrom3rdPartyCoupon
        }
        setCoupon={(c) => {
          if (c == null) {
            emptyCoupon();
          } else {
            const common = {
              ...info,
              coupon_id: c.id,
              coupon_amount: c.amount,
              coupon_min: c.minimum_purchase_amount,
            };
            dispatch(commonData(common));
          }
        }}
        total={total}
        handleClose={() => {
          setCouponModal(!couponModal);
        }}
        showRemove={coupon_id ? true : false}
      />
      <div
        className="servicedesk-bg checkout-all"
        style={{ paddingBottom: "50px" }}
        suppressHydrationWarning
      >
        <div className="header-css-head">
          <Container fluid>
            <div className="d-flex flex-row py-2" onClick={() => router.back()}>
              <div className="icon-alignments">
                <i className="fa fa-chevron-left fontSize-m-20" />
              </div>
              <h3 className="inside-text-head">Payment</h3>
            </div>
          </Container>
        </div>

        <Row className="mt-5 py-4 card-container">
          <Col md={1}></Col>
          {/* //mobile screen */}
          <Col md={5}>
            <div className="section-address d-block d-md-none mb-5">
              <a href="#" className="inside-title" style={{ fontSize: 22 }}>
                <i className="fa fa-home" aria-hidden="true"></i> My Address
                <span
                  className="inside-checkall"
                  onClick={() => setShowAddressModal(true)}
                >
                  {userAddress?.address_heading ? "Change" : "+ Add Address"}
                </span>
                {/* <span className="inside-checkall" onClick={() => setChangeAddressModal(true)}>+ Add New Address</span> */}
              </a>
              <p className="inside-items">
                {currentAddress?.address_heading ? (
                  <>
                    {currentAddress?.address_heading}
                    {currentAddress?.address ? "," : ""}
                    {currentAddress?.address}
                    {currentAddress?.street ? "," : ""}
                    {currentAddress?.street}
                  </>
                ) : (
                  "Place Your Address Here"
                )}
              </p>
            </div>
            {userdetails.cashbackService?.service &&
              dataFromCashbackService != undefined ? (
              <div className="servicesMD row servicesMD-bg-color-1 px-md-4 px-1 py-3">
                <div>
                  <u className="service-title">Available Cashback Service</u>
                </div>
                <>
                  <div className="col-12 pt-1 position-relative">
                    <div className="title d-flex align-items-center justify-content-between">
                      <a
                        href="#"
                        className="service-title"
                        style={{
                          fontWeight: "500",
                          fontFamily: "Alata",
                        }}
                      >
                        {dataFromCashbackService.name}
                      </a>
                      <div className="listService">
                        Apply{" "}
                        <input
                          type="checkbox"
                          checked={cashbackService}
                          onChange={() => setCashbackService(!cashbackService)}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div className="d-flex flex-row align-items-center">
                        <div className="p-rl-2 Price ps-0">
                          ₹ {Math.round(dataFromCashbackService.price)}
                        </div>
                        <div className="offerPrice">Effective Price ₹ 00</div>
                        <div className="px-1 discountTitle">100%</div>
                      </div>
                      <ViewDetails
                        alldata={dataFromCashbackService}
                        className="w-auto m-0"
                      />
                    </div>
                    <div className="descriptionServices d-flex justify-content-between align-items-center mt-3">
                      <ul className="p-0 ps-2 m-0" style={{ fontSize: 10 }}>
                        {dataFromCashbackService?.description &&
                          mapItems(
                            dataFromCashbackService.description
                              .replace(/(<([^>]+)>)/gi, "")
                              .replace(/(?:\r\n|\r|\n)/g, "")
                              .replace(/(?:&nbsp;)/g, "")
                              .replace(/&amp;/g, "&")
                              .toString()
                              .split(".")
                          )}
                      </ul>
                    </div>
                  </div>
                </>
              </div>
            ) : (
              ""
            )}

            <div className="row card-container">
              {cart?.length > 0 &&
                cart.map((item, index) => (
                  <div
                    className="col-12 p-md-5 pt-md-3 pb-md-0 p-2"
                    key={index}
                  >
                    <div className="servicesMD row servicesMD-bg-color-1 px-4 py-3">
                      <div className="col-12 pt-1 position-relative">
                        <div className="title d-flex align-items-center justify-content-between">
                          <a
                            href="#"
                            className="service-title"
                            style={{
                              fontWeight: "500",
                              fontFamily: "Alata",
                            }}
                          >
                            {item.name}
                          </a>
                          <AddToCart data={item} />
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <div className="d-flex flex-row align-items-center">
                            <div className="p-rl-2 Price">
                              ₹ {Math.round(item.price)}
                            </div>
                            <div className="offerPrice">
                              ₹ {Math.round(item.discounted_price)}
                            </div>
                            <div className="px-1 discountTitle">
                              {item.discount}%
                            </div>
                          </div>
                          <ViewDetails
                            alldata={item}
                            className="w-auto m-0"
                          />
                        </div>
                        <div className="descriptionServices d-flex justify-content-between align-items-center mt-3">
                          <ul
                            className="p-0 ps-2 m-0"
                            style={{ fontSize: 10 }}
                          >
                            {item.description &&
                              mapItems(
                                item.description
                                  .replace(/(<([^>]+)>)/gi, "")
                                  .replace(/(?:\r\n|\r|\n)/g, "")
                                  .replace(/(?:&nbsp;)/g, "")
                                  .replace(/&amp;/g, "&")
                                  .toString()
                                  .split(".")
                              )}
                          </ul>
                          <button
                            className="remove"
                            onClick={() => dispatch(removeFromCart(item.id))}
                          >
                            REMOVE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Col>
          <Col md={1}></Col>

          {/* //main screen */}
          <Col md={4}>
            <div className="section-address d-none d-md-block">
              <a href="#" className="inside-title" style={{ fontSize: 22 }}>
                <i className="fa fa-home" aria-hidden="true"></i> My Address
                <span
                  className="inside-checkall"
                  onClick={() => setShowAddressModal(true)}
                >
                  {userAddress?.address_heading ? "Change" : "+ Add Address"}
                </span>
                {/* <span className="inside-checkall" onClick={() => setChangeAddressModal(true)}>+ Add New Address</span> */}
              </a>
              <p className="inside-items">
                {currentAddress?.address_heading ? (
                  <>
                    {currentAddress?.address_heading}
                    {currentAddress?.address ? "," : ""}
                    {currentAddress?.address}
                    {currentAddress?.street ? "," : ""}
                    {currentAddress?.street}
                  </>
                ) : (
                  "Place Your Address Here"
                )}
              </p>
            </div>
            <div className="">
              <div className="col-12 mt-4">
                <div
                  className="background-deflex"
                  onClick={() => {
                    setPType("cash");
                  }}
                  style={{ background: 'white' }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div>
                        <i
                          className="fa fa-inr fontSize-m-20"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div style={{ marginLeft: "10px" }}>Cash</div>
                    </div>
                    <div>
                      {pType === "cash" ? (
                        <i
                          className="fa fa-dot-circle-o  fontSize-m-20"
                          style={{ fontSize: 24 }}
                        ></i>
                      ) : (
                        <i
                          className="fa fa-circle-thin  fontSize-m-20"
                          style={{ fontSize: 24 }}
                        ></i>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-4">
                <div
                  className="background-deflex"
                  onClick={() => {
                    setPType("razorpay");
                  }}
                  style={{ background: 'white' }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      setPType("razorpay");
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div>
                        <Image
                          src={upi_icon.src}
                          alt="upi_ico"
                          width={50}
                          height={50}
                        />
                      </div>
                      <div style={{ marginLeft: "10px" }}>Card & Upi</div>
                    </div>

                    <div>
                      {pType === "razorpay" ? (
                        <i
                          className="fa fa-dot-circle-o  fontSize-m-24"
                          style={{ fontSize: 24 }}
                        ></i>
                      ) : (
                        <i
                          className="fa fa-circle-thin  fontSize-m-24"
                          style={{ fontSize: 24 }}
                        ></i>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-4">
                <div
                  className="background-deflex"
                  style={{ background: 'white' }}
                  onClick={() => {
                    setChekedd(!checkedd)
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div>
                      </div>
                      <div style={{ marginLeft: "10px" }}>{`Use Wallet (Glam Coin - ${walletCashback?.wallet_points ? walletCashback?.wallet_points : 0})`}</div>
                    </div>
                    <Checkbox {...label} color="secondary" checked={checkedd} />
                  </div>
                </div>
              </div>
              {/* <div className="col-12 mt-4">
                <div
                  className="background-deflex"
                  onClick={() => {
                    if (!coupon_id) {
                      setCouponModal(true);
                      setUpdate(update - 1);
                    } else {
                      setCouponModal(true);
                      setUpdate(update + 1);
                    }
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div>
                        <Image src={coupon_icon.src} height={50} width={50} />
                      </div>
                      <div style={{ marginLeft: "10px" }}>
                        {!coupon_id ? "Apply Coupon" : "Change Coupon"}
                      </div>
                    </div>
                    <div>
                      <i className="fa fa-chevron-right fontSize-m-20"></i>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            {coupon_amount && (
              <div className="offerSuccess mt-3 d-flex align-items-center px-4">
                <Image src={celebration.src} width={28} height={28} />
                <h6 className="p-2 m-0">
                  Yay! you have saved ₹&nbsp;{Math.round(coupon_amount)} on
                  final bill
                </h6>
              </div>
            )}
            <Card className="timeSlot-all" style={{ boxShadow: 'none', border: '0', padding: '0' }}>
              <div className="d-flex">
                <p className="inside-title" style={{ width: '50%', marginTop: '10px', paddingLeft: '10px' }}>Price Details</p>
                <div
                  className="background-deflex purple-bg"
                  style={{ width: '50%', border: '0' }}
                  onClick={() => {
                    if (!coupon_id) {
                      setCouponModal(true);
                      setUpdate(update - 1);
                    } else {
                      setCouponModal(true);
                      setUpdate(update + 1);
                    }
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {!coupon_id ? <>Apply&nbsp;Coupon</> : <>Change&nbsp;Coupon</>}
                  </div>
                </div>
              </div>
              <div className="row-m-check py-2">
                <div className="col-12">
                  <div className="d-flex flex-row justify-content-between-flex">
                    <p className="m-1 font-family-alata" style={{ paddingLeft: '5px', fontSize: '16px' }}>Total Price</p>
                    <p className="m-1 font-family-alata" style={{ fontSize: '16px' }}>Rs&nbsp;{total}</p>
                  </div>
                </div>

                <div className="col-12">
                  <div className="d-flex flex-row justify-content-between-flex">
                    <p className="m-1 font-family-alata" style={{ paddingLeft: '5px', fontSize: '16px' }}>Coupon Discount</p>
                    <p className="m-1 font-family-alata" style={{ fontSize: '16px' }}>{discountedPrice}</p>
                  </div>
                </div>

                <div className="col-12">
                  <div className="d-flex flex-row justify-content-between-flex">
                    <p className="m-1 font-family-alata" style={{ paddingLeft: '5px', fontSize: '16px' }}>
                      {/* {" "} */}
                      Safety & Hygiene Fee
                    </p>
                    <p className="m-1 font-family-alata" style={{ fontSize: '16px' }}>49</p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex flex-row justify-content-between-flex">
                    <p className="m-1 font-family-alata" style={{ paddingLeft: '5px', fontSize: '16px' }}>Transportation Fee</p>
                    <p className="m-1 font-family-alata" style={{ fontSize: '16px' }}>0</p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex flex-row justify-content-between-flex">
                    <p className="m-1 font-family-alata" style={{ paddingLeft: '5px', fontSize: '16px' }}>Total Amount Payable</p>
                    <p className="m-1 font-family-alata" style={{ fontSize: '16px' }}>{wallet.total}</p>
                  </div>
                </div>

                {cashbackService && (
                  <div className="col-12">
                    <div className="d-flex flex-row justify-content-between-flex">
                      <p className="m-1 font-family-alata">
                        {" "}
                        Added Cashback Service Fee
                      </p>
                      <p className="m-1 font-family-alata">₹&nbsp;00</p>
                    </div>
                  </div>
                )}
              </div>
              <Card.Footer className="bg-white p-1">
                <div className="col-12">
                  {!coupon_id ? null : (
                    <div className="col-12">
                      <div className="d-flex flex-row justify-content-between-flex">
                        <p className="m-1 font-family-alata">Total Amount</p>
                        <p className="m-1 font-family-alata">
                          ₹&nbsp;{finalTotal + Math.round(coupon_amount)}
                        </p>
                      </div>
                    </div>
                  )}
                  {!coupon_id ? null : (
                    <div className="col-12">
                      <div className="d-flex flex-row justify-content-between-flex">
                        <p className="m-1 font-family-alata">Coupon</p>
                        <p className="m-1 font-family-alata">
                          -₹&nbsp;{Math.round(coupon_amount)}
                        </p>
                      </div>
                    </div>
                  )}
                  <div style={{ display: 'flex' }}>
                    <div className="d-flex" style={{ flexDirection: 'column', paddingLeft: '10px', width: '100%' }}>
                      <p className="m-0 font-family-alata" style={{ textAlign: 'center' }}>
                        Total Price
                      </p>
                      <p className="m-0 font-family-alata" style={{ textAlign: 'center' }}>Rs. {finalTotal}</p>
                    </div>
                  </div>
                </div>
              </Card.Footer>
            </Card>
            <div className="checkout-text mt-3">
              <p className="fw-semibold m-0">
                *A small fee towards 100% care for you!
              </p>
              This fee is spent on the training of the professional and the
              safety of the customer and the service provider, thereby ensuring
              the quality of service, which also includes disposables.
            </div>

            <div className="checkoutBtn-container ">
              <button
                className="checkoutBtn-all"
                type="button"
                //disabled={cart.length === 0 || sending}
                //disabled={minAmount >= finalTotal ? 'true' : ''}
                disabled={disabled}
                onClick={() => {
                  if (!userAddress || userAddress.length === 0) {
                    toast("Add address to book order", {
                      position: "bottom-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      type: "error",
                    });
                    return;
                  }
                  if (pType === "cash") {
                    onSubmit();
                  } else {
                    openPayModal();
                  }
                }}
              >
                {sending ? "Booking" : "Book Service"}
              </button>
            </div>
          </Col>
          <Col md={1}></Col>
        </Row>
        <ToastContainer />
        <AddressAndUserDetail
          // dataFromCashbackService={dataFromCashbackService}
          setdatafromcashbackservice={setDataFromCashbackService}
          setdatafrom3rdpartycoupon={setDataFrom3rdPartyCoupon}
          show={userAddress == undefined || changeAddressModal || showAddressModal}
          // showChangeAddressModal={changeAddressModal}
          showaddresslistmodal={(userAddress == undefined || showAddressModal) ? "1" : ""}
          setcurrentaddress={setCurrentAddress}
          currentaddress={currentAddress}
          onHide={() => {
            setChangeAddressModal(false);
            setShowAddressModal(false);
          }}
        />
      </div>
    </>
  );
}
export default Payment;
