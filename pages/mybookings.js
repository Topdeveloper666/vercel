import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import LoadingScreen from "../components/LoadingScreen/loadingScreen";
import { frontService } from "../_services/front.services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import ConfirmBooking from "../components/Modal/ConfirmBooking";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import ViewDetails from "../components/Modal/ViewDetails";
import Link from "next/link";
import Image from "next/image";
import Grid from '@mui/material/Grid';

export default function Bookings() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const userdetails = useSelector((state) => state.userdetails?.userdetails);
  const user = userdetails;


  useEffect(() => {
    if (!userdetails) {
      router.push("/login");
    }
    getBookings();
  }, []);

  const getBookings = () => {
    frontService.myBookings(user?.id).then(
      (res) => {
        if (res.status === "success") {
          setItems(res.ongoingBookings);
          console.log(items);
          //setHistoryItems(res.HistoryBookingsArr);
          setLoading(false);
        } else {
          console.log("Something went wrong !!");
          setLoading(false);
        }
      },
      (error) => {
        console.log("Something went wrong !!");
        setLoading(false);
      }
    );
  };

  return (
    <>
      <div
        className="servicedesk-bg checkout-all min-vh-100"
        id="myBookings"
        style={{ paddingBottom: "50px" }}
      >
        <div className="header-css-head">
          <Container fluid>
            <div className="d-flex flex-row" onClick={() => router.back()}>
              <div className="icon-alignments">
                <i className="fa fa-chevron-left fontSize-m-20" />
              </div>
              <h3 className="inside-text-head">Bookings</h3>
            </div>
          </Container>
        </div>
        {loading ? (
          <LoadingScreen />
        ) : (
          <Container>
            <div className="mt-4 pt-xl-5 pt-4  card-container">
              <h4 className="font-12 fw-bold mb-xl-4 mb-2">Bookings Orders</h4>
              <div className="row">
                {items && items.length > 0 ? (
                  items.map((e, i) => {
                    return (
                      <Item
                        e={e}
                        key={Math.random()}
                        user={user}
                        getBookings={getBookings}
                        update={true}
                      />
                    );
                  })
                ) : (
                  <div className="mt-5 col-12">No Ongoing Booking</div>
                )}
              </div>
            </div>
            {/* <div className='mt-4 pt-xl-5 pt-4 row card-container'>
                    <h4 className="font-12 fw-bold mb-xl-4 mb-2">History Bookings</h4>
                    <div className='row'>
                        {historyItems && historyItems.length > 0 ?
                            (historyItems.map((e) => {
                                return <Item e={e} key={e.booking_id} />
                            })) : <div className="mt-5 col-12">No History Booking</div>}
                    </div>
                </div> */}
          </Container>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

const Item = ({ e, user, getBookings, update = false }) => {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  console.log(e, "----")
  const cancelBooking = (data) => {
    const booking = { user_id: user.id, bookingid: e.service[0].business_service_id, ty: "1", id: data.service[0].id };
    setSending(true);
    frontService.cancelBooking(booking).then(
      (res) => {
        if (res.status === "success") {
          setOpen(false);
          toast.success("Booking Cancelled", "success");
          getBookings();
        } else {
          toast.error(res.message, "error");
        }
        setSending(false);
      },
      (error) => {
        console.log("Something went wrong !!");
        //toast.error("Something went wrong !!", "Fashion Store");
      }
    );
  };

  return (
    <div
      className="col-lg-12 col-12 mb-xl-4 mb-3"
      key={Math.random()}
      style={{ border: "1px solid", borderRadius: "10px", padding: "0px" }}
    >
      <ConfirmBooking
        sending={sending}
        show={open}
        onHide={() => setOpen(false)}
        cancelbooking={cancelBooking}
        item={e}
      />
      {/* <div className="servicesMD p-3   servicesMD-bg-color-1 d-flex justify-content-between  h-100 flex-column">
            <h5 className="text-center">{e.service_name}</h5>
            <div className="d-flex flex-row justify-content-between-flex">
                <p className="booking-title">Booking Date</p>
                <p className="booking-desc">{moment(e.booking_time).format('MM/DD/YYYY')}</p>
            </div>
            <div className="d-flex flex-row justify-content-between-flex">
                <p className="booking-title">Booking Time</p>
                <p className="booking-desc">{moment(e.booking_time).format('h:mm a')}</p>
            </div>
            <div className="d-flex flex-row justify-content-between-flex">
                <p className="booking-title">Payment Type</p>
                <p className="booking-desc">{e.payment_gateway}</p>
            </div>
            <div className="d-flex flex-row justify-content-between-flex">
                <p className="booking-title">Total Amount</p>
                <p className="booking-desc">₹{" "}{e.total_amount}</p>
            </div>
            <div className="d-flex flex-row justify-content-between-flex">
                <p className="booking-title">Order Status</p>
                <p className="booking-desc">{e.order_status}</p>
            </div>
            {update && e.order_status === "pending" &&
                <div className="row mt-2">
                    <div className="col-lg-6 col-6 px-2">
                        <button style={{ background: "rgb(124, 0, 183)", border: "1px solid rgb(124, 0, 183)" }} className="btn btn-danger w-100" onClick={() => setOpen(true)} >Cancel Order</button>
                    </div>
                    <div className="col-lg-6 col-6 px-2">
                        <button style={{ background: "rgb(124, 0, 183)", border: "1px solid rgb(124, 0, 183)" }} className="btn btn-primary w-100" onClick={() => router.push(`/reschedule/${e.booking_id}`)}>Reschedule</button>
                    </div>
                </div>
            }
        </div> */}
      <div className="h3 pt-2 pb-3 mb-0 bookingiddata">
        <p style={{ marginBottom: "0px" }}>Order Id : GC-{e.id}</p>
        <p style={{ marginBottom: "0px" }}>₹ {e.amount_to_pay}/-</p>
      </div>
      <div className="h6 pt-3 pb-3 mb-0 bookingiddata2">
        <p style={{ marginBottom: "0px" }}>
          Order Date: : {moment(e.created_at).format("MMM Do YY")}
        </p>
        <p className="textPletter" style={{ marginBottom: "0px" }}>
          Order Status: {e.status}
        </p>
      </div>
      <div className="row">
        {/* {e?.service?.length > 0 ? (
          e.service.map((e, i) => {
            return ( */}
        <ItemS
          e={e}
          key={Math.random()}
          user={user}
          getBookings={getBookings}
          update={true}
        />
        {/* );
          })
        ) : (
          <>No Booked Services To Show</>
        )} */}
      </div>
      <div className="bok boka">
        <div className="pll">
          <p>Booking Date : {moment(e.date_time).format("MMM Do YY")}</p>
          <p>Time : {moment(e.date_time).format("h:mm a")}</p>
        </div>
        <div className="pll">
          <p className="textPletter">Payment Status : {e.payment_status}</p>
        </div>
        <div>
          <div className="mt-2">
            {e.status === "pending" && (
              <>
                <button
                  style={{
                    background: "rgb(124, 0, 183)",
                    border: "1px solid rgb(124, 0, 183)",
                    marginRight: "10px",
                  }}
                  className="btn btn-danger"
                  onClick={() => setOpen(true)}
                >
                  Cancel Order
                </button>

                <button
                  style={{
                    background: "rgb(124, 0, 183)",
                    border: "1px solid rgb(124, 0, 183)",
                    marginRight: "10px",
                  }}
                  className="btn btn-primary"
                  onClick={() => router.push(`/reschedule/${e.id}`)}
                >
                  Reschedule
                </button>
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    marginRight: "10px",
                  }}
                  className="btn btn-danger"
                  onClick={() => {
                    copyToClipboard("9998887771");
                  }}
                >
                  <Image
                    width={25}
                    height={25}
                    src="https://img.icons8.com/ios-filled/50/phone.png"
                    alt="phone"
                  />
                </button>
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    marginRight: "10px",
                  }}
                  className="btn btn-danger"
                  onClick={() => {
                    router.push({
                      pathname: "/Chat",
                      query: { bookingId: e.business_service_id },
                    });
                  }}
                >
                  <Image
                    width={25}
                    height={25}
                    src="https://img.icons8.com/fluency-systems-filled/48/comments--v2.png"
                    alt="comments--v2"
                  />
                </button>
              </>
            )}
            {/* <Link
              style={{
                background: "rgb(124, 0, 183)",
                border: "1px solid rgb(124, 0, 183)",
                marginRight: "8px",
              }}
              className="btn btn-primary"
              href={{
                pathname: "/BookingServices",
                query: { data: JSON.stringify(e) },
              }}
            >
              View Details
            </Link> */}

            {/* <ViewDetails
              show={modalShow}
              onHide={() => setModalShow(false)}
              // datato={props.alldata}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const ItemS = ({ e }) => {
  console.log(e, "324f")
  const router = useRouter();
  const copyToClipboard = (text) => {
    const textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    if (!navigator.clipboard) {
      document.execCommand("copy");
    } else {
      navigator.clipboard
        .writeText(text)
        .then(function () {
          alert("Phone Number Copied To Clipboard"); // success
        })
        .catch(function () {
          alert("err"); // error
        });
    }
    textField.remove();
  };
  return (
    <Container>
      <div
        className="col-lg-12 col-12 mb-xl-4 mb-3"
        style={{
          borderRadius: "10px",
          background:
            "radial-gradient(422px at -10.3% 38.7%, rgb(255 255 255) 53.5%, rgb(255 255 255) 23.8%, rgb(255, 180, 241) 88.5%)",
          padding: "4px 10px",
          boxShadow: "8px 5px 20px -4px",
          position: "relative",
        }}
      >
        <div style={{ margin: "0 5px" }}>
          {e?.service.length > 0 ? (
            e.service.map((e, i) => {

              return (
                <Grid
                  container
                  key={i}
                  className="h6 pt-3 pb-3 mb-0"
                  sx={{
                    display: "flex",
                    padding: "25px",
                    justifyContent: "space-between"
                  }}
                >
                  <Grid md={8} item sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row', md: 'row', lg: 'row' } }}>
                    <p style={{ marginBottom: "0px", fontWeight: 800 }}>{e.name}</p>
                    <p className="textPletter" style={{ marginBottom: "0px" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="14"
                        height="14"
                        viewBox="0 0 50 50"
                      >
                        <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24.984375 6.9863281 A 1.0001 1.0001 0 0 0 24 8 L 24 22.173828 A 3 3 0 0 0 22 25 A 3 3 0 0 0 22.294922 26.291016 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 23.708984 27.705078 A 3 3 0 0 0 25 28 A 3 3 0 0 0 28 25 A 3 3 0 0 0 26 22.175781 L 26 8 A 1.0001 1.0001 0 0 0 24.984375 6.9863281 z"></path>
                      </svg>{" "}
                      {e.time} {e.time_type}
                    </p>
                    <p
                      className="textPletter"
                      style={{ marginBottom: "0px", display: "flex" }}
                    >
                      <h5>₹ {e.amount}/-</h5>
                      <del style={{ color: "gray" }}>₹ {e.price}/-</del>
                    </p>

                  </Grid>
                  <Grid md={4} item sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <Image
                      src={`https://admin.glamcode.in/user-uploads/service/${e.id}/${e.default_image}`}
                      alt="My Image"
                      height={160}
                      width={160}
                      style={{
                        borderRadius: "10px",
                        width: "160px",
                        height: "160px",
                        objectFit: "cover",
                      }}
                    />
                  </Grid>
                </Grid>
              );
            })
          ) : (
            <>No Booked Services To Show</>
          )}
          {/* <div
            className="h6 pt-3 pb-3 mb-0"
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "15px",
            }}
          >
            <p style={{ marginBottom: "0px", fontWeight: 800 }}>{e.name}</p>
            <p className="textPletter" style={{ marginBottom: "0px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="14"
                height="14"
                viewBox="0 0 50 50"
              >
                <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24.984375 6.9863281 A 1.0001 1.0001 0 0 0 24 8 L 24 22.173828 A 3 3 0 0 0 22 25 A 3 3 0 0 0 22.294922 26.291016 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 23.708984 27.705078 A 3 3 0 0 0 25 28 A 3 3 0 0 0 28 25 A 3 3 0 0 0 26 22.175781 L 26 8 A 1.0001 1.0001 0 0 0 24.984375 6.9863281 z"></path>
              </svg>{" "}
              {e.time} {e.time_type}
            </p>
            <p
              className="textPletter"
              style={{ marginBottom: "0px", display: "flex" }}
            >
              <h5>₹ {e.amount}/-</h5>
              <del style={{ color: "gray" }}>₹ {e.price}/-</del>
            </p>
            <Image
              src={`https://admin.glamcode.in/user-uploads/service/${e.id}/${e.default_image}`}
              alt="My Image"
              height={160}
              width={160}
              style={{
                borderRadius: "10px",
                width: "160px",
                height: "160px",
                objectFit: "cover",
              }}
            />
          </div> */}
          {/* <div
            className="h6 pt-3 pb-3 mb-0"
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "15px",
            }}
          >
            <p className="textPletter" style={{ marginBottom: "0px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="14"
                height="14"
                viewBox="0 0 50 50"
              >
                <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24.984375 6.9863281 A 1.0001 1.0001 0 0 0 24 8 L 24 22.173828 A 3 3 0 0 0 22 25 A 3 3 0 0 0 22.294922 26.291016 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 23.708984 27.705078 A 3 3 0 0 0 25 28 A 3 3 0 0 0 28 25 A 3 3 0 0 0 26 22.175781 L 26 8 A 1.0001 1.0001 0 0 0 24.984375 6.9863281 z"></path>
              </svg>{" "}
              {e.time} {e.time_type}
            </p>
          </div>
          <div
            className="h6 pt-3 pb-3 mb-0"
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "0",
              padding: "15px",
            }}
          >
            <p
              className="textPletter"
              style={{ marginBottom: "0px", display: "flex" }}
            >
              <h5>₹ {e.amount}/-</h5>
              <del style={{ color: "gray" }}>₹ {e.price}/-</del>
            </p>
          </div> */}
        </div>
        {/* <div style={{ position: "absolute", right: "15px", top: "63px" }}>
          <Image
            src={`https://admin.glamcode.in/user-uploads/service/${e.id}/${e.default_image}`}
            alt="My Image"
            height={160}
            width={160}
            style={{
              borderRadius: "10px",
              width: "160px",
              height: "160px",
              objectFit: "cover",
            }}
          />
        </div> */}
        {/* <div
          className="h6 pt-3 pb-3 mb-0 d-flex justify-content-center"
          style={{ borderTop: "1px solid black" }}
        >
          <button
            style={{
              background: "transparent",
              border: "none",
              marginRight: "10px",
            }}
            className="btn btn-danger"
            onClick={() => {
              copyToClipboard("9998887771");
            }}
          >
            <Image
              width={25}
              height={25}
              src="https://img.icons8.com/ios-filled/50/phone.png"
              alt="phone"
            />
          </button>
          <button
            style={{
              background: "transparent",
              border: "none",
              marginRight: "10px",
            }}
            className="btn btn-danger"
            onClick={() => {
              router.push({
                pathname: "/Chat",
                query: { bookingId: e.business_service_id },
              });
            }}
          >
            <Image
              width={25}
              height={25}
              src="https://img.icons8.com/fluency-systems-filled/48/comments--v2.png"
              alt="comments--v2"
            />
          </button>
          <span>
            <div style={{ marginLeft: "20px", marginTop: "10px" }}>
              {" "}
              Booking Service Id : {e.business_service_id}
            </div>
          </span>
        </div> */}
      </div>
    </Container>
  );
};
