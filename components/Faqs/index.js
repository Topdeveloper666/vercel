import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

export default function Faqs({ data }) {

    return (
        <>
            <Container fluid className="mt-3">
                <div className="title-content text-center">
                    <h2 className="title font-familt-jost">Faqs</h2>
                    <p>Know More About Salon at Home Services</p>
                </div>
                <Accordion defaultActiveKey="0">
                    <Row>
                        {/* {data?.map((item, index) => {
                            return (
                                <Col md="6" key={index}>
                                    <Accordion.Item eventKey={index}>
                                        <Accordion.Header>{item.topic}</Accordion.Header>
                                        <Accordion.Body
                                            className="faq-desc"
                                            dangerouslySetInnerHTML={{ __html: item.content }}
                                        ></Accordion.Body>
                                    </Accordion.Item>
                                </Col>
                            );
                        })} */}

                        {/* <Accordion.Item eventKey="1">
                        <Accordion.Header>Accordion Item #2</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </Accordion.Body>
                    </Accordion.Item> */}
                    </Row>
                </Accordion>
            </Container>
        </>
    );
}
