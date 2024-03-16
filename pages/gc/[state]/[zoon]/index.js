import React, { useEffect, useState } from "react";
import Head from "next/head";
import { isMobile } from 'react-device-detect';
import { Container, Row, Col } from "react-bootstrap";
import Global from "../../../../_helpers/global";
import { Link } from "react-scroll";
import dynamic from "next/dynamic";
import { useDispatch } from 'react-redux';
import { dataLocation, mainLocation } from '../../../../store/actions';
import Pageslider from '../../../../components/Slider/pageSlider';


import Maincategory from '../../../../components/Maincategory/maincategory';
import Maincategorymobile from '../../../../components/Maincategory/Maincategorymobile';
import Faqs from '../../../../components/Faqs/index';
import Knowmore from '../../../../components/Knowmore';
import Serving from '../../../../components/Serving';
import { useRouter } from "next/router";
const Header = dynamic(() => import('../../../../components/Header/index'),
    { ssr: false });
export default function multslug({ servicesData }) {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {

        localStorage.setItem('id', servicesData.location.id);
        localStorage.setItem('cityname', servicesData.location.city);
        localStorage.setItem('locAddress', servicesData.location.name);
        localStorage.setItem('loc_min_booking_amount', servicesData.location.price);
        const locationData = {
            id: servicesData.location.id,
            cityname: servicesData.location.city,
            locAddress: servicesData.location.name,
            loc_min_booking_amount: servicesData.location.price,
        }
        dispatch(dataLocation(servicesData.location));
        dispatch(mainLocation(servicesData.locations));


    }, [servicesData]);
    const [_isMobile, setMobile] = useState();
    useEffect(() => {
        setMobile(isMobile);
    }, [setMobile]);


    return (
        <>

            <div className='background2'>
                <Head>
                    <title>{servicesData?.homegc?.title}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta
                        name="title"
                        content={servicesData?.homegc?.title}
                        data-react-helmet="true"
                    ></meta>

                    <meta
                        name="description"
                        content={servicesData?.homegc?.meta_content}
                        data-react-helmet="true"
                    ></meta>

                    <meta
                        name="keywords"
                        content={servicesData?.homegc?.meta_key}
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
                    <meta name="language" content="English" data-react-helmet="true"></meta>
                    <meta
                        name="revisit-after"
                        content="1 days"
                        data-react-helmet="true"
                    ></meta>
                    <meta name="author" content="Glamcode" data-react-helmet="true"></meta>
                    <meta name="zipcode" content="201301" data-react-helmet="true"></meta>
                    <meta name="city" content="Noida" data-react-helmet="true"></meta>
                    <meta name="country" content="India" data-react-helmet="true"></meta>
                    <meta
                        name="Geography"
                        content="B1002 Amrapali Zodiac, Sector 120, Noida, Uttar Pradesh 201301"
                        data-react-helmet="true"
                    ></meta>
                    <meta
                        name="geo.position"
                        content="28.5839021,77.3959942"
                        data-react-helmet="true"
                    ></meta>
                    <meta
                        name="ICBM"
                        content="28.5839021,77.3959942"
                        data-react-helmet="true"
                    ></meta>

                </Head>
                <Header />
                <Pageslider slider={servicesData?.slider_images} />
                <div className="title-content">
                    <p
                        className="title font-familt-jost"
                        style={{ width: "100%", textAlign: "center", fontSize: '2em' }}
                    >
                        Home Salon Services
                    </p>
                </div>
                <div hidden={_isMobile}>
                    <Maincategory data={servicesData?.maincategory} />
                </div>


                <div hidden={!_isMobile}>
                    <hr className="hr-white"></hr>
                    <Maincategorymobile data={servicesData?.maincategory} />
                </div>
                <Faqs data={servicesData?.faqs} />

                <div hidden={_isMobile}><Serving data={servicesData?.locations} /></div>
                <Knowmore data={servicesData?.homegc?.pagecontent} />
            </div>
        </>
    );
}


export const getServerSideProps = async (context) => {
    const { params } = context;
    const slug = params.state;
    const slug1 = params.zoon;
    const url1 = Global.BASE_API_PATH + `/gc/${slug}/${slug1}`;

    try {
        const res1 = await fetch(url1, {
            headers: {
                Accept: "application/json",
                method: "GET",
            },
        });
        const ServicesData = await res1.json();
        if (ServicesData?.homegc === null) {

            return {
                redirect: {
                    permanent: false,
                    destination: `/${ServicesData?.home?.slug}`,
                },
                props: {},
            };
        } else {
            return {
                props: {
                    servicesData: ServicesData,
                },
            };
        }
    } catch (error) {
        console.log(error);
    }

};