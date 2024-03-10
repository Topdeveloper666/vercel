import React, { useEffect, useState, lazy } from "react";
import dynamic from "next/dynamic";
import Slider from "../components/Slider/homeSlider";
import Maincategory from "../components/Maincategory/maincategory";
import Maincategorymobile from "../components/Maincategory/Maincategorymobile";
import Faqs from "../components/Faqs/index";
import Knowmore from "../components/Knowmore";
import { menuSave, mainLocation } from "../store/actions/index";
import PreferredPackages from "../components/PreferredPackages";
import ReferAndEarn from "../components/ReferAndEarn";
import CustomerTestimonials from "../components/CustomerTestimonials";
import { isMobile } from "react-device-detect";
import OtpModal from "../components/Modal/OtpModal";
import Global from "../_helpers/global";
import { useDispatch } from "react-redux";
import { MainHead } from "../components/Head";
import Header from "../components/Header";
import Head from 'next/head';
// const Header = lazy(() => import('../components/Header'));
// const Header = dynamic(() => import("../components/Header/index"), {
//   ssr: false,
// });




export default function Home({ slider, homeData = {} }) {
  const { locations, maincategory, services, review, faqs, home } = homeData;
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.clear();
    dispatch(mainLocation(locations));
  }, [homeData]);

  const [_isMobile, setMobile] = useState();

  useEffect(() => {
    setMobile(isMobile);
  }, [setMobile]);

  useEffect(() => {
    dispatch(menuSave(slider));
  }, []);

  return (
    <div className="background2">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/img/appleico.png" />
        <link rel="icon" href="/favicon.png" />
        <meta property="og:title" content="glamcode" />
        <meta property="og:description" content="salon at home for women" />
        <meta property="og:image" content="https://admin.glamcode.in/user-uploads/carousel-images/563a8734ea86c5df956964d0b9bbedc3.png.webp" />
        <meta property="og:url" content="https://youtube.com/channel/UC0tPgNGS96oVlkUqBf4ZM2Q" />
        <meta property="og:url" content="https://instagram.com/myglamcode?igshid=YmMyMTA2M2Y=" />
        <meta property="og:url" content="https://twitter.com/GlamCode3?t=medt6YYBVczVXZ-IWiUObg&s=08" />
        <meta property="og:url" content="https://www.facebook.com/myglamcode" />
      </Head>
      <MainHead homeData={homeData} />
      <Header />
      <Slider slider={slider} />

      <div
        className="col-12 "
        style={{ marginTop: _isMobile ? "50px" : "20px" }}
        hidden={_isMobile}
      >
        <hr
          style={{
            border: "2px solid rgb(102, 102, 102)",
            margin: "10px",
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.5px 0.5px",
            backgroundColor: "rgb(255, 255, 255)",
          }}
        />
      </div>

      <div className="title-content" style={{ marginTop: "32px" }}>
        <p
          className="title font-familt-jost"
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: _isMobile ? "large" : "2em",
          }}
        >
          Home Salon Services
        </p>
      </div>

      <div hidden={_isMobile} className="d-md-block d-none">
        <Maincategory data={maincategory} />
      </div>
      <div className="d-md-none d-block">
        <hr className="hr-whit"></hr>
        <Maincategorymobile data={maincategory} />
      </div>

      <div className="col-12" style={{ marginTop: "50px" }} hidden={_isMobile}>
        <hr
          style={{
            border: "2px solid rgb(102, 102, 102)",
            margin: "10px",
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.5px 0.5px",
            backgroundColor: "rgb(255, 255, 255)",
          }}
        />
      </div>
      <ReferAndEarn />
      <PreferredPackages data={services} />
      <CustomerTestimonials data={review} />

      <Faqs data={faqs} />

      <div className="col-12 " style={{ marginTop: "50px" }} hidden={_isMobile}>
        <hr
          style={{
            border: "2px solid rgb(102, 102, 102)",
            margin: "10px",
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.5px 0.5px",
            backgroundColor: "rgb(255, 255, 255)",
          }}
        />
      </div>

      <Knowmore data={home.content} />

      <OtpModal />
    </div>
  );
}

export const getServerSideProps = async ({ req }) => {
  //Slider
  try {
    const headers = {
      headers: {
        Accept: "application/json",
        method: "GET",
      },
    };

    //Slider
    const url = Global.BASE_API_PATH + `/allslider`;

    //HomeData
    const url1 = Global.BASE_API_PATH + `/homedata`;

    const urls = [
      url,
      url1
    ]
    const [dataslide, HomeData] = await Promise.all(urls.map(async url => {
      const resp = await fetch(url, headers);
      return await resp.json();
    }));

    return {
      props: {
        slider: dataslide,
        homeData: HomeData,
      },
    };
  } catch (error) {
    console.log(error);
  }
};
