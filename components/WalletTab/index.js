import Image from "next/image";
import React, { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import gift from "../../assets/img/gift.png";

const Index = ({
  tab,
  IsMobile,
  openModal,
  userWalletDetail,
  cashBackData,
  setContentInScratchCard,
  walletCashback
}) => {
  console.log(walletCashback, "walletCashback")
  return (
    <Fragment>
      {tab == "wallet" ? (
        <>
          <Container>
            <Row className="justify-content-center">
              <Col xs lg="6">
                <div
                  className="points"
                  style={{
                    backgroundImage:
                      "linear-gradient(315deg, #726cf8 0%, #e975a8 74%)",
                    padding: "20px",
                    borderRadius: "20px",
                    margin: "3rem 0",
                  }}
                >
                  <h1 style={{ color: "gold", fontStyle: "italic" }}>
                    {userWalletDetail?.username
                      ? userWalletDetail.username
                      : "Test"}
                  </h1>
                  <h1 style={{ color: "gold", paddingBottom: "10px" }}>
                    {walletCashback?.wallet_use ? walletCashback?.wallet_use : "0"}{" "}
                    <span
                      style={{
                        fontSize: "20px",
                        paddingBottom: "10px",
                        fontStyle: "italic",
                      }}
                    >
                      GlamPoints
                    </span>
                  </h1>
                  <div
                    className="d-flex justify-content-center"
                    style={{ borderTop: "1px solid #938f8f" }}
                  >
                    <button
                      style={{
                        color: "#fff",
                        border: "none",
                        paddingTop: "10px",
                        textAlign: "center",
                        letterSpacing: "8px",
                        background: "transparent",
                      }}
                    >
                      REDEEM NOW!
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
          <div className="wallet-table">
            <Table striped>
              <thead>
                <tr>
                  <th>S.no.</th>
                  <th>Points</th>
                  <th>Expiry</th>
                  <th>Created At</th>
                  {/* <th>Wallet Points</th>
                  <th>Free Service</th>
                  <th>Credit</th>
                  <th>Debit</th> */}
                </tr>
              </thead>
              <tbody>
                {userWalletDetail.wallet_information?.length != 0 ? (
                  userWalletDetail.wallet_information?.map((element, index) => {
                    return (
                      <tr>
                        <th>{index + 1}</th>
                        <th>{element.points}</th>
                        <th>{element.expiry}</th>
                        <th>{element.created_at}</th>
                        {/* <th>{element.walletPoint}</th>
                        <th>{element.freeService}</th>
                        <th>{element.credit}</th>
                        <th>{element.debit}</th> */}
                      </tr>
                    );
                  })
                ) : (
                  <tr>No Data To Show...</tr>
                )}
              </tbody>
            </Table>
          </div>
        </>
      ) : (
        <>
          <Container>
            <div className="wallet-withdraw-line">
              <div className={`data ${IsMobile ? "w-75" : "w-25"}`}>
                <div className="d-flex">
                  <h6>Name: </h6>
                  <h6>
                    {userWalletDetail?.username
                      ? userWalletDetail.username
                      : "Test"}
                  </h6>
                </div>
                <div className="d-flex">
                  <h6>Coins: </h6>
                  <h6>
                    {userWalletDetail?.total ? userWalletDetail.total : 0}
                  </h6>
                </div>
              </div>
              {console.log("cashBackData", cashBackData)}
              <div className="ScratchButtonList">
                {cashBackData.thirdPartyCoupon.length == 0 &&
                  cashBackData.cashback.length == 0 &&
                  cashBackData.cashbackService.length == 0 && (
                    <div>No Scratch Available</div>
                  )}
                {cashBackData.thirdPartyCoupon.length > 0 && (
                  <div className="button-gift d-flex flex-column align-items-center">
                    <div>Coupon</div>
                    {cashBackData.thirdPartyCoupon[0].scratched == "true" ? (
                      <div>
                        <button>
                          <Image
                            width={64}
                            height={64}
                            src={
                              cashBackData.thirdPartyCoupon[0].service_image_url
                            }
                            alt="gift"
                          />
                          {cashBackData.thirdPartyCoupon[0].name}
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={() => {
                            openModal();
                            setContentInScratchCard({
                              ...cashBackData.thirdPartyCoupon[0],
                              type: "coupon",
                            });
                          }}
                        >
                          <Image
                            width={64}
                            height={64}
                            src="https://img.icons8.com/nolan/64/gift.png"
                            alt="gift"
                          />
                        </button>
                      </div>
                    )}
                  </div>
                )}
                {cashBackData.cashback.length > 0 && (
                  <div className="button-gift d-flex flex-column align-items-center">
                    <div>CashBack</div>
                    <div className="d-flex mt-2">
                      {cashBackData.cashback.map((cashback) => {
                        if (cashback.scratched == "true") {
                          return (
                            <div className="mx-2">
                              <button className="h-auto w-auto">
                                {/* <Image
                                width={100}
                                height={100}
                                src={gift.src}
                                alt="gift"
                              /> */}
                                <div className="d-flex justify-content-center medium-text">
                                  {cashback.amount} {cashback.unit}
                                </div>
                                <div className="small-text">You can use these points<br />After completion of booking</div>
                              </button>
                            </div>
                          );
                        } else {
                          return (
                            <div className="mx-2">
                              <button
                                onClick={() => {
                                  openModal();
                                  setContentInScratchCard({
                                    ...cashback,
                                    type: "cashback",
                                  });
                                }}
                              >
                                <Image
                                  width={64}
                                  height={64}
                                  src="https://img.icons8.com/nolan/64/gift.png"
                                  alt="gift"
                                />
                              </button>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                )}
                {cashBackData.cashbackService.length > 0 && (
                  <div className="button-gift d-flex flex-column align-items-center">
                    <div>Service</div>
                    {cashBackData.cashbackService[0].scratched == "true" ? (
                      <div>
                        <button>
                          <Image
                            width={64}
                            height={64}
                            src={
                              cashBackData.cashbackService[0].service_image_url
                            }
                            alt="gift"
                          />
                          {cashBackData.cashbackService[0].name}
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={() => {
                            openModal();
                            setContentInScratchCard({
                              ...cashBackData.cashbackService[0],
                              type: "service",
                            });
                          }}
                        >
                          <Image
                            width={64}
                            height={64}
                            src="https://img.icons8.com/nolan/64/gift.png"
                            alt="gift"
                          />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Container>
        </>
      )}
    </Fragment>
  );
};

export default Index;
