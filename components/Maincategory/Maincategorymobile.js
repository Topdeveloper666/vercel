import React from "react";
import { Row } from "react-bootstrap";
import Card from "./Card";

export default function Maincategory({ data }) {
    return (
        <Row>
            {data?.map((item, index) => {
                return (
                    <Card
                        cname="salonehome-all-Categorym"
                        key={index}
                        name={item.name}
                        id={item.id}
                        image={item.image}
                        slug={item.slug}
                    />
                );
            })}
        </Row>
    );
}
