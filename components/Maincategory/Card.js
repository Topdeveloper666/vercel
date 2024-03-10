import React from "react";
import Modalpup from "../Modal/loction";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
export default function Card(props) {
  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);

  const callurl = (slug, id) => {
    localStorage.setItem("mid", id);
    router.push(
      "/category/" +
      slug +
      "/" +
      localStorage.getItem("cityname")?.toLowerCase()
    );
  };

  const allready = () => {



    if (router.query.data === undefined) {
      setModalShow(true)
    } else {
      router.push(
        "/category/" +
        props.slug +
        "/" +
        localStorage.getItem("cityname")?.toLowerCase()
      );
    }


  }


  return (
    <>
      <div className={props.cname} onClick={allready}>
        <div
          className="salonehome-all-Category-box"
          style={{ backgroundColor: "rgb(255, 255, 255)" }}
        >
          <div className="salonehome-all-Category-images">
            <Image
              src={`https://admin.glamcode.in/user-uploads/maincategory/${props.image}?q=70`}
              srcSet={`https://admin.glamcode.in/user-uploads/maincategory/${props.image}?q=70 1200w,
              https://admin.glamcode.in/user-uploads/maincategory/${props.image}?w=200&q=70 200w,
              https://admin.glamcode.in/user-uploads/maincategory/${props.image}?w=400&q=70 400w,
              https://admin.glamcode.in/user-uploads/maincategory/${props.image}?w=800&q=70 800w,
              https://admin.glamcode.in/user-uploads/maincategory/${props.image}?w=1024&q=70 1024w`}
              alt={props.name}
              height={165}
              width={165}
            />
          </div>
        </div>
        <div className="salone-all-category-text mt-1">
          <p
            className="salone-all-category-text"
            style={{ fontSize: "small" }}
          >
            {props.name}
          </p>
        </div>
      </div>
      {modalShow && (
        <Modalpup
          show={modalShow}
          onHide={() => setModalShow(false)}
          noRedirect={true}
          onSelect={(id, name) => {
            localStorage.setItem("mid", props.id);
            localStorage.setItem("tid", id);
            router.push("/category/" + props.slug + "/" + name?.toLowerCase());
          }}
        />
      )}
    </>
  );
}
