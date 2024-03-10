import React from "react";
import { Row, Col } from "react-bootstrap";
import Card from "./Card";

export default function Maincategory({ data }) {
  return (
    <div className="small-card">
      <Row>
        {data?.map((item, index) => {
          return (
            <Col lg="2" md="4" sm="5" className="mt-5 " key={index}>
              <Card
                cname="salonehome-all-Category"
                id={item.id}
                name={item.name}
                image={item.image}
                slug={item.slug}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
