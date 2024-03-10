import Head from "next/head";

export const MainHead = ({ homeData }) => {
    return (
        <Head>
            <title>{homeData.home.seo_title}</title>

            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta
                name="title"
                content={homeData.home.seo_title}
                data-react-helmet="true"
            ></meta>

            <meta
                name="description"
                content={homeData.home.seo_desc}
                data-react-helmet="true"
            ></meta>

            <meta
                name="keywords"
                content={homeData.home.seo_key}
                data-react-helmet="true"
            ></meta>

            <meta
                name="robots"
                content="index, follow"
                data-react-helmet="true"
            ></meta>
            <meta
                httpEquiv="Content-Type"
                content="text/html; charset=utf-8"
                data-react-helmet="true"
            ></meta>
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
    );
};
