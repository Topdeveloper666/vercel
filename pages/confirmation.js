import { useEffect, useState } from "react";
import Scratch from "../components/Modal/Scratch";
import { frontService } from "../_services/front.services";
import Image from "next/image";

export default function Confirmation() {
  const emptyCard = {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cashBackData, setCashBackData] = useState({
    cashback: [],
    cashbackService: [],
    thirdPartyCoupon: [],
  });
  const [contentInScratchCard, setContentInScratchCard] = useState(null);
  const [isScratched, setIsScratched] = useState(false);
  function changeScratchValueForId(id, value) {
    frontService.changeScratchValueForId(id, value).then((res) => {
      console.log(res.data[0]);
      let scratchAfterBooking = JSON.parse(
        localStorage.getItem("scratchAfterBooking")
      );
      localStorage.setItem(
        "scratchAfterBooking",
        JSON.stringify({
          ...scratchAfterBooking,
          card: {
            ...scratchAfterBooking.card,
            scratched: res.data[0].scratched,
          },
        })
      );
      setContentInScratchCard({
        ...scratchAfterBooking.card,
        scratched: res.data[0].scratched,
      });
      if (res?.status === "Success") {
        setCashBackData(res.data);
      }
    });
  }
  const closeModal = () => {
    setIsModalOpen(false);
  };
  function setScratchData() {
    let scratchAfterBooking =
      localStorage.getItem("scratchAfterBooking") == "undefined"
        ? emptyCard
        : JSON.parse(localStorage.getItem("scratchAfterBooking"));
    setIsScratched(
      scratchAfterBooking?.card
        ? scratchAfterBooking?.card?.scratched === "true"
        : scratchAfterBooking == emptyCard
    );
    setContentInScratchCard(
      scratchAfterBooking?.card
        ? scratchAfterBooking?.card
        : !(scratchAfterBooking == emptyCard)
    );
  }
  useEffect(() => {
    setScratchData();
  }, []);
  return (
    <div className="wrapper" id="confirmation">
      <main className="main-content">
        <div className="checkout-all">
          <div className="thanksImg">
            <span className="material-symbols-outlined iconsixe">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={150}
                height={150}
                viewBox="0 0 24 24"
              >
                <path
                  fill="blue"
                  d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45Zm.85-2.55l2.55-1.1l2.6 1.1l1.4-2.4l2.75-.65l-.25-2.8l1.85-2.1l-1.85-2.15l.25-2.8l-2.75-.6l-1.45-2.4L12 5.15l-2.6-1.1L8 6.45l-2.75.6l.25 2.8L3.65 12l1.85 2.1l-.25 2.85l2.75.6ZM12 12Zm-1.05 3.55L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12Z"
                />
              </svg>
            </span>
          </div>
          <p className="thankstitle">Thank You</p>
          {/* https://i.ibb.co/3kKcbhK/download.jpg */}
          <p className="thanksinside">
            {!isScratched ? (
              <span onClick={() => setIsModalOpen(true)}>
                <Image
                  width={150}
                  height={150}
                  src="https://i.ibb.co/3kKcbhK/download.jpg"
                  alt="approval"
                />
              </span>
            ) : (
              contentInScratchCard && (
                <p className="thankssubtitle">
                  You Have Won {contentInScratchCard.amount} Points{" "}
                  <a href="/wallet">(View)</a>
                </p>
              )
            )}
          </p>
          {!isScratched && (
            <>
              <p className="thankssubtitle">
                Congratulations! You've unlocked an exclusive Cashback
                ScratchCard.
              </p>
            </>
          )}
          <p className="thanksinside">
            You can find the order details on your registered email/phone
          </p>
          <p className="thanksinside">
            <a href="/mybookings">Click Here</a> to view all your Bookings.
          </p>
          <div className="hrading-section">
            {/* <p className="subtitle-all">
              if you choose to cancel, you can do it anytime before 4 Hours of
              the appointment time. Post which a cancellation fee will we
              charged of Rs200
            </p> */}
            <div className="inside-section-bg container">
              <p className="thinsidetext">
                Note- Dear customer! your timely contribution can provide this
                opportunity to other needed customer
              </p>
            </div>
          </div>
          <div className="spaBeet d-flex justify-content-center pb-4">
            <div>
              <a href="/">
                <button className="Homebutton">Home</button>
              </a>
            </div>
            <div>
              <a href="/mybookings">
                <button className="Bookbutton">My Booking</button>
              </a>
            </div>
          </div>
          <div className="py-4">{/* <Index /> */}</div>
        </div>
        <Scratch
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          contentInScratchCard={contentInScratchCard}
          setCashBackData={setCashBackData}
          changeScratchValueForId={changeScratchValueForId}
          setIsScratched={setIsScratched}
        />
      </main>
    </div>
  );
}
