import { Fragment } from "react";

const Index = () => {
  return (
    <Fragment>
      <div className="appointments-mobile">
        <div className="appointments-mobile-head">
          <h6>Booking ID</h6>
          <h6>RESIGN</h6>
        </div>
        <div className="appointments-mobile-item">
          <p>Booking Date</p>
          <p>29 Feb 2022</p>
        </div>
        <div className="appointments-mobile-item">
          <p>Booking Time</p>
          <p>29 Feb 2022</p>
        </div>
        <div className="appointments-mobile-item">
          <p>Payment Method</p>
          <p>Cash</p>
        </div>
        <div className="appointments-mobile-item">
          <p>Payment status</p>
          <p>pending</p>
        </div>
      </div>
      <div className="appointments-mobile">
        <div className="appointments-mobile-head">
          <h6>SERVICES</h6>
          <h6>PRICE</h6>
        </div>
        <div className="appointments-mobile-item">
          <p>Booking Date</p>
          <p>29 Feb 2022</p>
        </div>
        <div className="appointments-mobile-item">
          <p>Booking Time</p>
          <p>29 Feb 2022</p>
        </div>
        <div className="appointments-mobile-item">
          <p>Payment Method</p>
          <p>Cash</p>
        </div>
      </div>
      <div className="appointments-mobile">
        <div className="appointments-mobile-item">
          <p>Booking Date</p>
          <p>29 Feb 2022</p>
        </div>
        <div className="appointments-mobile-item">
          <p>Booking Time</p>
          <p>29 Feb 2022</p>
        </div>
        <div className="appointments-mobile-item">
          <p>Payment Method</p>
          <p>Cash</p>
        </div>
        <div className="appointments-mobile-item">
          <p>Payment status</p>
          <p>pending</p>
        </div>

        <div className="appointments-mobile-item just-border">
          <h6>TOTAL</h6>
          <h6>₹6999/-</h6>
        </div>
      </div>
      <div className="appointments-part-b-div-p just-margin-bottom">
        <p>A small fee towards 100% care for you!</p>
        <span>
          This fee is spent on the traing of the Proffessional and safety of the
          Customer & Service Provider suring the time of service which also
          includes like disposables.
        </span>
      </div>
      <div className="appointments-part-b-div-button just-margin-bottom">
        <button>Cancel</button>
        <button>Reschedule</button>
      </div>
    </Fragment>
  );
};

export default Index;
