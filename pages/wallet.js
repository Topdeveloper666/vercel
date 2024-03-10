
import React, { useEffect, useState, Fragment } from 'react';

import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { isMobile } from "react-device-detect";

import Sonnet from "../components/WalletTab";

import { IoIosArrowBack } from "react-icons/io";
import Scratch from '../components/Modal/Scratch';
import { frontService } from '../_services/front.services';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Wallet = () => {
  const router = useRouter();
  const [_isMobile, setMobile] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cashBackData, setCashBackData] = useState({
    cashback: [],
    cashbackService: [],
    thirdPartyCoupon: []
  });
  const [contentInScratchCard, setContentInScratchCard] = useState(null);
  const [userWalletDetail, setUserWalletDetail] = useState({
    status: null,
    Wallet: []
  });
  const userdetails = useSelector((state) => state.userdetails?.userdetails);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  function getUserDetailAndSetWalletDetail() {
    frontService.getUserWalletDetail(userdetails.id).then(
      (res) => {
        setUserWalletDetail(res)
      })
  }
  function setInitialCashBack() {
    frontService.getCashBackOffers(userdetails?.id).then(
      (res) => {
        if (res?.status === 'Success') {
          setCashBackData(res.data);
        }
      }
    )
  }
  function changeScratchValueForId(id, value) {
    frontService.changeScratchValueForId(id, value).then(
      (res) => {
        if (res?.status === 'Success') {
          setCashBackData(res.data);
        }
      }
    )
  }
  function setContentInThisScratchCard(data) {
    setContentInScratchCard(data)
  }
  useEffect(() => {
    setMobile(isMobile);
    getUserDetailAndSetWalletDetail();
  }, [setMobile, userWalletDetail.status]);
  useEffect(() => {
    setInitialCashBack();
  }, [])
  return (
    <Fragment>
      <div className="background3">
        <div className="refer-head-d appointments-head">
          <a href='/'><IoIosArrowBack size={35} className="refer-arrow-icon" /></a>
          <h2 className="refer-title-d">Wallet & Cash Back</h2>
        </div>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <div className="appointments-nav">
            <Nav variant="pills" className="d-flex">
              <Nav.Item>
                <Nav.Link eventKey="first">Wallet</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Cashback</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <Row>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <div className="jus-for-bg">
                  <Sonnet tab={'wallet'} IsMobile={_isMobile} userWalletDetail={userWalletDetail} />
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <Sonnet tab={'cashback'} IsMobile={_isMobile} openModal={openModal} userWalletDetail={userWalletDetail} cashBackData={cashBackData} setContentInScratchCard={setContentInThisScratchCard} />
              </Tab.Pane>
            </Tab.Content>
          </Row>
        </Tab.Container>
      </div>
      <Scratch isModalOpen={isModalOpen} closeModal={closeModal} contentInScratchCard={contentInScratchCard} setCashBackData={setCashBackData} changeScratchValueForId={changeScratchValueForId}/>
    </Fragment>
  );
};

export default Wallet;
