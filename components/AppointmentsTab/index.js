import Image from "next/image";
import Ern from "../../assets/img/Cardimg.png";

const Index = () => {
  return (
    <div className="appointments-card-w">
      <div className="appointments-card">
        <div className="appointments-card-head">
          <p>Air Brush Makeup</p>
          <p>₹6999/-</p>
        </div>
        <div className="appointments-card-head2">
          <p>Order Date: 18 Oct 2022</p>
          <p>Order Id: 18 YXSHDOPE</p>
        </div>
        <div className="appointments-card-data">
          <div>
            <p>Booking Date</p> <p>Order Status</p>
            <p>Payment Mode</p>
          </div>
          <div className="appointments-card-data-in">
            <div>
              <p className="appointments-p">29 Feb 2022</p> <p>New Order</p>{" "}
              <p>Cash</p>
            </div>
          </div>
          <div>
            <span>Booking Time</span>
          </div>
          <div>
            <span>04:00 - 04:15 PM</span>
          </div>
        </div>
        <div className="appointments-card-data">
          <div>
            <p>Stylist Name</p> <p>Product Cost</p>
            <p>Convenience Fee</p> <p>Total Amount</p>
          </div>
          <div className="appointments-card-data-in">
            <div>
              <p className="appointments-p">Urvashi</p> <p>₹999</p>
              <p>₹1198</p> <p>₹1198</p>
            </div>
          </div>
          <div>
            <p>T.Service Charges</p>
            <p>Transport Charges</p>
          </div>
          <div>
            <p>₹1146</p>
            <p>₹1146</p>
          </div>
        </div>

        <div className="appointments-card-A">
          <h5 className="appointments-card-part-light">SERVICE CART</h5>
          <div className="appointments-card-flex">
            <div className="appointments-card-main">
              <div className="appointments-img">
                <Image
                  src={Ern.src}
                  width={200}
                  height={150}
                  style={{ objectFit: "cover" }}
                  alt=""
                />
              </div>
              <div className="appointments-card-part-2">
                <h4>Air Brush Makeup</h4>
                <div className="appointments-card-btn-line">
                  <p className="appointments-card-btn-line-d">₹13998</p>
                  <p className="appointments-card-btn-line-b">₹6999/-</p>
                  <p className="appointments-card-btn-line-f">50%</p>
                </div>
                <div className="appointments-card-list-line">
                  <ul>
                    <li>Air Brush Makeup</li>
                    <li>Advance Hair Do</li>
                    <li>Dress/Saree Droping</li>
                    <li>Professional Makeup Artist</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="appointments-part-b-main">
              <div>
                <div className="appointments-part-b">
                  <p>Sub Total</p>
                  <p>₹1698/-</p>
                </div>
                <div className="appointments-part-b">
                  <p>Safety & Hygine*</p>
                  <p>₹1698/-</p>
                </div>
                <div className="appointments-part-b">
                  <p>Transport Fee</p>
                  <p>₹1698/-</p>
                </div>
                <div className="appointments-part-b">
                  <p>GST (18%) </p>
                  <p>₹1698/-</p>
                </div>
              </div>
              <hr className="appointments-part-hr" />
              <h3 className="appointments-part-b-h3">Total Amount: ₹6999/-</h3>
              <div className="appointments-part-b-div-p">
                <p>A small fee towards 100% care for you!</p>
                <span>
                  This fee is spent on the traing of the Proffessional and
                  safety of the Customer & Service Provider suring the time of
                  service which also includes like disposables.
                </span>
              </div>
              <div className="appointments-part-b-div-button">
                <button>Cancel</button>
                <button>Reschedule</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
