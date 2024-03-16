import React, { useState } from "react";
import ScratchCard from "react-scratchcard";
import Link from "next/link";
import { frontService } from "../../_services/front.services";
import Image from "next/image";

const Scratch = ({
  isModalOpen,
  closeModal,
  contentInScratchCard,
  setCashBackData,
  changeScratchValueForId,
  setIsScratched,
}) => {
  const [showCongrats, setShowCongrats] = useState(false);
  return (
    <div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>You Got Scratch Card As You Service is Completed</p>
            {showCongrats && (
              <>
                <div onClick={closeModal} className="image-d-location-close">
                  x
                </div>
                <div>
                  <Image
                    width={40}
                    height={40}
                    src="https://img.icons8.com/ultraviolet/40/approval.png"
                    alt="approval"
                  />
                </div>
                <h2>
                  Congratulations now you can avail this{" "}
                  {contentInScratchCard?.type}
                </h2>
              </>
            )}
            <App
              setShowCongrats={setShowCongrats}
              contentInScratchCard={contentInScratchCard}
              setCashBackData={setCashBackData}
              changeScratchValueForId={changeScratchValueForId}
              setIsScratched={setIsScratched}
            />
            {/* <button><Link href={{ pathname: '/refer&earn' }}>Refer & Earn</Link></button>
            <span>Refer your Friend and Earn Cash</span> */}
            {/* <button className='d-flex justify-content-center align-items-center mt-5' style={{ width: '50px', height: '30px', fontSize: '12px', borderRadius: '10px', textAlign: 'center' }} onClick={closeModal}>Done</button> */}
          </div>
        </div>
      )}
      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          text-align: center;
        }
        img {
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};

function App({
  setShowCongrats,
  contentInScratchCard,
  setCashBackData,
  changeScratchValueForId,
  setIsScratched
}) {
  const [scratchedText, setScratchedText] = useState("Scratching");
  const handleScratchComplete = () => {
    console.log("The card is now clear!", contentInScratchCard);
    setScratchedText(`<img width="140px" height="140px" src="${contentInScratchCard?.type == "service"
      ? contentInScratchCard.service_image_url
      : "https://img.icons8.com/ultraviolet/40/approval.png"
      }" alt="approval" />
    <p>${contentInScratchCard?.type}: ${contentInScratchCard?.type == "service"
        ? contentInScratchCard?.name
        : contentInScratchCard?.type == "cashback"
          ? contentInScratchCard?.amount + " " + contentInScratchCard?.unit
          : contentInScratchCard?.type == "coupon"
            ? contentInScratchCard?.title
            : ""
      }</p>`);
    setShowCongrats(true);
    if (
      location.pathname == "/confirmation/" ||
      location.pathname == "/confirmation"
    )
      setIsScratched(true);
    setCashBackData((prevData) => {
      switch (contentInScratchCard?.type) {
        case "coupon":
          return {
            ...prevData,
            thirdPartyCoupon: [{ ...contentInScratchCard, scratched: "true" }],
          };
        case "service":
          return {
            ...prevData,
            cashbackService: [{ ...contentInScratchCard, scratched: "true" }],
          };
        case "cashback":
          return {
            ...prevData,
            cashback: [{ ...contentInScratchCard, scratched: "true" }],
          };
      }
      const updatedData = { ...prevData, cashbackAmount: 10 };
      return updatedData;
    });
    changeScratchValueForId(contentInScratchCard?.cashbackId, true);
  };
  const geht = false;
  const settings = {
    width: 200,
    height: 200,
    image: "https://i.ibb.co/3kKcbhK/download.jpg",
    finishPercent: 70,
    onComplete: () => handleScratchComplete(),
  };
  return (
    <div className="Appo">
      <ScratchCard {...settings}>
        {geht ? (
          <div>
            <p>hallo</p>
          </div>
        ) : (
          <div className="Text">
            <div dangerouslySetInnerHTML={{ __html: scratchedText }} />
          </div>
        )}
      </ScratchCard>
    </div>
  );
}

export default Scratch;
