import React, { useEffect } from "react";
import "../styles/globals.min.css";
import "../styles/mobilepage.css";
import "../styles/ChatPage.css";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import store from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "../components/Layout/index";
import "font-awesome/css/font-awesome.css";
import "swiper/css";
import Script from "next/script";
import persistor from "../store/store";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { hotjar } from "react-hotjar";
import Logo from "/glamcode.svg";
function MyApp({ Component, pageProps, name }) {
  const router = useRouter();

  console.log(pageProps, "pageProps------")
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag('config', 'G-L37GNL91S4', { page_path: url });
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    // hotjar.initialize(3302739, 6);
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );

    fbq("init", "817472469800426");
    fbq("track", "PageView");

    hotjar.initialize(3302739, 1)
  }, []);
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCTonsNxc9VkjHdsdxK_2t6MIAPkDQ5dpw&libraries=places"
      />
      <Script

        src="https://www.googletagmanager.com/gtag/js?id=G-L37GNL91S4"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-L37GNL91S4');
               `}
      </Script>
      <Head>
        <meta
          name="p:domain_verify"
          content="74b83f2fc1f6b702815166d707bdcaad"
        />
        <meta
          name="google-site-verification"
          content="PoD0vRbbegsOcDDOZQHhcrbieW2ZPB616nsMmnWSKhA"
        />
        <link
          rel="canonical"
          href={
            typeof window !== "undefined"
              ? `${window.location.origin}${useRouter().asPath}`
              : undefined
          }
          key="canonical"
        />

        {/* <link rel="preconnect" href="https://admin.glamcode.in/user-uploads/carousel-images/21e7bb521040147483e85335fc32ed3e.png.webp" /> */}
        {/* <link
          rel="preload"
          as="image"
          type="image/webp"
          href="https://admin.glamcode.in/user-uploads/carousel-images/21e7bb521040147483e85335fc32ed3e.png.webp" ></link>

        <link
          rel="preload"
          as="image"
          type="image/webp"
          href="https://admin.glamcode.in/user-uploads/carousel-images/fbe24ff0dc054411be4ea92e498d3399.png.webp" ></link> */}


        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="shortcut icon" href={Logo.src} />

        {/* <script
            dangerouslySetInnerHTML={{
              __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '817472469800426');
              fbq('track', 'PageView');
            `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.fbAsyncInit = function() {
                FB.init({
                  appId      : '522254448651629',
                  xfbml      : true,
                  version    : 'v18.0'
                });
                FB.AppEvents.logPageView();
              };
              (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));
            `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=817472469800426&ev=PageView&noscript=1"
            />
          </noscript> */}
      </Head >
      <React.Fragment>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {() => (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </PersistGate>
        </Provider>
      </React.Fragment>

    </>
  );
}

export default MyApp;
