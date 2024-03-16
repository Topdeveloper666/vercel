import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useRouter } from "next/router";
import moment from "moment";
import { DateTime } from 'luxon';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { commonData } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { frontService } from "../_services/front.services";
import { useCallback } from "react";
import { connected } from "process";

const h = DateTime.now().hour;

function formatTime(inputTime) {
  try {
    const parsedTime = DateTime.fromFormat(inputTime, 'HH:mm:ss');
    const formattedTime = parsedTime.toLocaleString(DateTime.TIME_SIMPLE);
    return formattedTime;
  } catch (error) {
    return 'Invalid Time'; // Handle invalid input
  }
}


// function getSlotWithTimeRange(data) {
//   let slotTime = 0;

//   const slots = data?.map((x, i) => {
//     const startTime = DateTime.fromFormat(x.otherDate, 'HH:mm:ss');
//     let endTime;

//     if (i < data.length - 1) {
//       endTime = DateTime.fromFormat(data[i + 1]?.otherDate, 'HH:mm:ss');
//     } else {
//       endTime = startTime.plus({ minutes: slotTime });
//     }

//     x.startTime = startTime.toFormat('hh:mm a');
//     x.endTime = endTime.toFormat('hh:mm a');
//     x.timeRange = `${x.startTime} - ${x.endTime}`;

//     slotTime = endTime.diff(startTime, 'minutes').minutes;

//     return x;
//   });

//   return slots;
// }



function getSlotWithTimeRange2(data) {
  let slotTime = 0;

  const slots = data?.map((x, i) => {
    const startTime = DateTime.fromFormat(x.otherDate, 'HH:mm:ss');
    let endTime;

    if (i < data.length - 1) {
      endTime = DateTime.fromFormat(data[i + 1]?.otherDate, 'HH:mm:ss');
    } else {
      endTime = startTime.plus({ minutes: slotTime });
    }

    x.startTime = startTime.toFormat('hh:mm a');
    x.endTime = endTime.toFormat('hh:mm a');
    x.timeRange = `${x.startTime} - ${x.endTime}`;
    x.slots = 1
    slotTime = endTime.diff(startTime, 'minutes').minutes;

    return x;
  });

  return slots;
}




function Checkout() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [active, setActive] = useState(0);
  const [letLoadData, setLetLoadData] = useState(false);
  const [isselected, setIsselected] = useState(-1);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [slotList, setSlotList] = useState([]);

  const userdetails = useSelector((state) => state.userdetails?.userdetails);
  const dataloction = useSelector((state) => state.datalocation.locationData);
  const info = useSelector((state) => state.commonData.common);

  function SetLoadData(bool) {
    setLetLoadData(bool);
  }

  const loadData = useCallback((index) => {
    if (dataloction?.id) {
      const h = DateTime.now().hour;
      const date = DateTime.now().plus({ days: (h > 17 ? 1 : (index ? index : 0)) });
      const formattedNewDateToCheck = date.toFormat('yyyy-MM-dd');
      const payload = {
        location_id: dataloction?.id,
        bookingDate: formattedNewDateToCheck,
      };


      console.log('hellooooooooooooo');
      frontService.getAvailableBookingSlots(payload).then(
        (res) => {
          const { status, available_slots = [] } = res || {};
          if (status == "Success" && available_slots?.length > 0) {
            const slots = getSlotWithTimeRange2(available_slots);
            setSlotList(slots);
            SetLoadData(false);
          } else {
            setSlotList([]);
            setError("Something went wrong !!");
          }
        },
        (error) => {
          setError("Something went wrong !!");
        }
      );
    }
  }, [dataloction?.id]);

  useEffect(() => {
    if (!userdetails) {
      router.push("/login");
    }
    if (h > 17) setActive(1);
    else setActive(0);
    loadData();
  }, []);

  useEffect(() => {
    const rightBtn = document.querySelector("#right-button");
    const leftBtn = document.querySelector("#left-button");
    const content = document.querySelector("#content");
    const width = content?.offsetWidth;
    rightBtn.addEventListener("click", function (event) {
      content.scrollLeft += width - 20;
      event.preventDefault();
    });

    leftBtn.addEventListener("click", function (event) {
      content.scrollLeft -= width - 20;
      event.preventDefault();
    });
  });

  const onClickProceed = () => {
    if (isselected === -1) {
      setError("Please Select slot to continue");
      return;
    } else {
      const selectedSlot = slotList.find((e, i) => i === isselected) || {};
      const time = selectedSlot.otherDate
        ? selectedSlot.otherDate : "00:00:00";
      const date = DateTime.now()
        .plus({ days: active })
        .toFormat('yyyy-MM-dd');
      const common = {
        ...info,
        booking_time: `${date} ${time}`,
      };
      dispatch(commonData(common));
      //localStorage.setItem('booking_time', `${date} ${time}:00`);
      router.push("/payment");
    }
  };



  console.log(letLoadData);

  return (
    <>
      {/* {!user && <Login show={!user} />} */}

      <div
        className="servicedesk-bg checkout-all"
        style={{ paddingBottom: "50px" }}
      >
        <div className="header-css-head">
          <Container fluid>
            <div className="d-flex flex-row" onClick={() => router.back()}>
              <div className="icon-alignments">
                <i className="fa fa-chevron-left fontSize-m-20" />
              </div>
              <h3 className="inside-text-head">Select Booking Slots</h3>
            </div>
          </Container>
        </div>
        <div className="pt-5">
          {/* <Datedata /> */}

          <div
            className="date_sec  flex-column"
            style={
              dataloction.id === 12 ? { display: "none" } : { display: "block" }
            }
          >
            {/* <Slider {...settings}> */}
            <div className="d-flex position-relative">
              <div className="prev-date-btn" style={{ zIndex: 2 }}>
                <button
                  id="left-button"
                  className=""
                  style={{ background: "rgb(55, 78, 140)" }}
                >
                  &lt;
                </button>
              </div>
              <div className="section-selectBooking flex-column" id="content">
                <div className="d-flex align-items-end date-card-container">
                  {[...Array(100)].map((elementInArray, index) => {
                    const currentDate = DateTime.now();
                    const targetDate = currentDate.plus({ days: index + 1 });
                    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    const dayIndex = targetDate.weekday;
                    const day_ = daysOfWeek[dayIndex - 1];
                    const day = day_.substring(0, 3);
                    const d = targetDate.toFormat('dd');
                    const months = [
                      'January', 'February', 'March', 'April', 'May', 'June', 'July',
                      'August', 'September', 'October', 'November', 'December'
                    ];
                    const monthColor = [
                      { month: 'January', color: '#FF0000' },
                      { month: 'February', color: '#00FF00' },
                      { month: 'March', color: '#0000FF' },
                      { month: 'April', color: '#800080' },
                      { month: 'May', color: '#FFA500' },
                      { month: 'June', color: '#FFFF00' },
                      { month: 'July', color: '#FFC0CB' },
                      { month: 'August', color: '#008080' },
                      { month: 'September', color: '#A52A2A' },
                      { month: 'October', color: '#00FFFF' },
                      { month: 'November', color: '#006400' },
                      { month: 'December', color: '#800000' }
                    ];
                    const m = months[targetDate.month - 1];
                    const monthBackgroundColor = monthColor.find(item => item.month === m)?.color;
                    return (
                      <span key={Math.random()}>
                        {d === "01" || index === 0 ? (
                          <div className="month-name" style={{ color: monthBackgroundColor }}>{m}</div>
                        ) : (
                          <></>
                        )}
                        <div
                          className={`date-card`}
                          key={Math.random()}
                          id={index}
                          onClick={() => {
                            setIsselected(-1);
                            setActive(index);
                            loadData(index);
                            SetLoadData(true);
                          }}
                        >
                          <div
                            className={`d-flex flex-column ${active === index ? "active" : ""
                              }`}
                          >
                            <span className="day">{day}</span>
                            <span className="date">
                              {currentDate.plus({ days: index }).toFormat('dd')}

                            </span>
                          </div>
                        </div>
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="next-date-btn" style={{ zIndex: 2 }}>
                <button
                  id="right-button"
                  className=""
                  style={{ background: "rgb(55, 78, 140)" }}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>

          {letLoadData ? <>
            Data Loading...
          </> : <div
            className="timeSlot-all"
            style={
              dataloction.id === 12 ? { display: "none" } : { display: "block" }
            }
          >
            <p className="inside-title mx-3">Prime Time Slots</p>
            {/* {active === 0 && h > 17 && <p className="">No slots available</p>} */}

            <div className="row-m-check">
              {slotList.length == 0 && <p className="">No slots available</p>}
              {slotList?.map((item, index) => {
                if (item?.is_current) {
                  return (
                    <div
                      className="col-6-m-check time-slots m-1"
                      key={Math.random()}
                      onClick={() => {
                        setIsselected(index);
                        setError("");
                      }}
                    >
                      <div
                        className={
                          isselected === index
                            ? "divinside-items selected"
                            : "divinside-items"
                        }
                      >
                        <p className="timeslots-texts my-2">
                          {item.startTime}
                        </p>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>}
          {error && (
            <div>
              <p className="text-danger text-center my-2 fw-bold">{error}</p>
            </div>
          )}
          {!letLoadData && <div
            className="checkoutBtn-container"
            style={{
              width: "30%",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <button
              style={
                dataloction.id === 12
                  ? { display: "none" }
                  : { display: "block" }
              }
              className="checkoutBtn-all w-auto px-5"
              type="button"
              onClick={onClickProceed}
            >
              Proceed
            </button>

            {dataloction.id === 12 ? (
              <>
                <p style={{ color: "red", fontSize: "30px" }}>
                  Oop slot not be available !!!
                </p>
              </>
            ) : (
              ""
            )}
          </div>}
        </div>
      </div>
    </>
  );
}
export default Checkout;
