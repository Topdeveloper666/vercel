import React, { Fragment, useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { isMobile } from 'react-device-detect';
import Sonnet from "../components/AppointmentsTab";
import AppointmentsMobile from "../components/AppointmentsTab/AppointmentsMobile";

import { IoIosArrowBack } from "react-icons/io";

const Appointments = () => {

  const [_isMobile, setMobile] = useState();

  useEffect(() => {
    setMobile(isMobile);
  }, [setMobile]);


  return (
    <Fragment>

      <div className="background2" hidden={_isMobile}>
        <div className="refer-head-d appointments-head">
          <IoIosArrowBack size={35} className="refer-arrow-icon" />

          <h2 className="refer-title-d">Appointments</h2>
        </div>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <div className="appointments-nav">
            <Nav variant="pills" className="d-flex">
              <Nav.Item>
                <Nav.Link eventKey="first">ONGOING</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">HISTORY</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <Row>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <div className="jus-for-bg">
                  <Sonnet />
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <Sonnet />
              </Tab.Pane>
            </Tab.Content>
          </Row>
        </Tab.Container>
      </div>

      <div className="background2" hidden={!_isMobile}>
        <div className="refer-head">
          <IoIosArrowBack size={30} className="refer-arrow-icon" />
          <h2 className="refer-title">Appointments</h2>
        </div>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <div className="appointments-nav">
            <Nav variant="pills" className="d-flex">
              <Nav.Item>
                <Nav.Link eventKey="first" className="appointments-nav-link">
                  ONGOING
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second" className="appointments-nav-link">
                  HISTORY
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <Row>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <div className="jus-for-bg">
                  <AppointmentsMobile />
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <AppointmentsMobile />
              </Tab.Pane>
            </Tab.Content>
          </Row>
        </Tab.Container>
      </div>

    </Fragment>
  );
};

export default Appointments;
