import React, { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Global from "../_helpers/global";
import { isMobile } from "react-device-detect";
const Header = dynamic(() => import("../components/Header/index"), {
  ssr: false,
});
import Faqs from "../components/Faqs/index";
import Knowmore from "../components/Knowmore";
// import Preferedservices from '../components/Preferedservices/Preferedservices'
import Pageslider from "../components/Slider/pageSlider";
import Maincategory from "../components/Maincategory/maincategory";
import Maincategorymobile from "../components/Maincategory/Maincategorymobile";
// import PreferredPackages from '../components/PreferredPackages';
// import Serving from '../components/Serving';
import { useDispatch } from "react-redux";
import { dataLocation, mainLocation } from "../store/actions";
import Slider from "../components/Slider/homeSlider";
export default function getRoute({ homeData }) {


  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("id", homeData.home[0].id);
    localStorage.setItem("cityname", homeData.home[0].city);
    localStorage.setItem("locAddress", homeData.home[0].name);
    localStorage.setItem("loc_min_booking_amount", homeData.home[0].price);
    const locationData = {
      id: homeData.home[0].id,
      cityname: homeData.home[0].city,
      locAddress: homeData.home[0].name,
      loc_min_booking_amount: homeData.home[0].price,
    };
    dispatch(dataLocation(locationData));

    dispatch(mainLocation(homeData.locations));
  }, [homeData]);

  const [_isMobile, setMobile] = useState();
  useEffect(() => {
    setMobile(isMobile);
  }, [setMobile]);

  return (
    <>
      <div className="background2">
        <Head>
          <title>{homeData?.home[0]?.seo_title}</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta
            name="title"
            content={homeData?.home[0]?.seo_title}
            data-react-helmet="true"
          ></meta>
          <meta
            name="description"
            content={homeData?.home[0]?.seo_desc}
            data-react-helmet="true"
          ></meta>
          <meta
            name="keywords"
            content={homeData?.home[0]?.seo_key}
            data-react-helmet="true"
          ></meta>
          <meta
            name="robots"
            content="index, follow"
            data-react-helmet="true"
          ></meta>
          {/* <meta
            httpEquiv="Content-Type"
            content="text/html; charset=utf-8"
            data-react-helmet="true"
          ></meta> */}
          <meta
            name="language"
            content="English"
            data-react-helmet="true"
          ></meta>
          <meta
            name="revisit-after"
            content="1 days"
            data-react-helmet="true"
          ></meta>
          <meta
            name="author"
            content="Glamcode"
            data-react-helmet="true"
          ></meta>
          <meta
            name="zipcode"
            content={homeData?.home[0]?.zip}
            data-react-helmet="true"
          ></meta>
          <meta
            name="city"
            content={homeData?.home[0]?.city}
            data-react-helmet="true"
          ></meta>
          <meta name="country" content="India" data-react-helmet="true"></meta>
          <meta name="Geography" content="" data-react-helmet="true"></meta>
          <meta name="geo.position" content="" data-react-helmet="true"></meta>
          <meta name="ICBM" content="" data-react-helmet="true"></meta>
        </Head>
        <Header />

        {/* <Pageslider slider={homeData.slider_images} /> */}
        <Slider slider={homeData} />

        {/* <div className="col-12 " hidden={_isMobile}>
                    <hr style={{ border: '2px solid #ff6', margin: 10, boxShadow: '0px 0.5px 0.5px rgba(0, 0, 0, 0.25)', backgroundColor: '#FFFFFF' }} />
                </div> */}

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
          <Maincategory data={homeData.maincategory} />
        </div>
        <hr className="hr-whit d-md-none d-block"></hr>

        <div hidden={!_isMobile}>
          <Maincategorymobile data={homeData.maincategory} />
        </div>
        {/* <Preferedservices data={homeData.preferredPack} /> */}

        {/* <PreferredPackages /> */}

        <Faqs data={homeData.faqs} />

        {/* <div hidden={_isMobile}><Serving data={homeData.locations} /></div> */}

        <Knowmore data={homeData.home[0].content} />
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { params } = context;

  const url1 = Global.BASE_API_PATH + `/loctionSlug/${params.data}`;


  try {
    const res1 = await fetch(url1, {
      headers: {
        Accept: "application/json",
        method: "GET",
      },
    });
    const HomeData = await res1.json();
    console.log(HomeData);

    return {
      props: {
        homeData: HomeData,
      },
    };
  } catch (error) {

    console.log(error);
  }
};
