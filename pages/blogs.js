import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import LoadingScreen from '../components/LoadingScreen/loadingScreen';
import Global from '../_helpers/global';
import { frontService } from '../_services/front.services';
import blogLogo from '../assets/img/blog-logo.png';
import Head from 'next/head';
import Image from 'next/image';

export default function Blogs({ bloglist, blogcat }) {
    const router = useRouter();
    const [active, setActive] = useState('all');

    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //   frontService.blogs().then(
    //     (res) => {
    //       if (res.status === 'success') {
    //         setItems(res.blogs);
    //         setLoading(false);
    //       } else {
    //         console.log('Something went wrong !!');
    //         setLoading(false);
    //       }
    //     },
    //     (error) => {
    //       console.log('Something went wrong !!');
    //       setLoading(false);
    //     }
    //   );
    // }, []);
    console.log(active);
    return (
        <>
            <Head>
                <title>Glam Code - Best Beauty Tips and Hacks at GC Beauty Blogs | Salon at home</title>

                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />

                <meta name="title" content="Glam Code - Best Beauty Tips and Hacks at GC Beauty Blogs | Salon at home" data-react-helmet="true"></meta>

                <meta name="description" content="Discover the best beauty tips and tricks with Glam Code Beauty Blogs. From simple mehndi designs, bridal makeup, hair care, hairstyles, keratin treatments, face wash regimens to engagement hairstyles and nail extensions - learn all newest trends in beauty. Get the perfect advice on haircuts. Stay tune with our daily blogs" data-react-helmet="true"></meta>

                <meta name="keywords" content="simplest design of mehndi, mehndi designs, bridal makeup, haircare, hairstyle, keratin, face wash, engagement hairstyle, hair cut, nails extenstion, hair colouring, men simple hairstyles" data-react-helmet="true"></meta>

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

            <section id="blogs">
                <Container fluid>
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <Link href="/">
                                <Image width={200} height={200} src={blogLogo.src} alt='blogLogo' className="w-auto banner-img" />
                            </Link>
                        </div>
                        {/* <div className="col-lg-5 social">
                    <div className="">
                        <ul>
                            <li><a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24   " viewBox="0 0 24 24"><g fill="none"><g clipPath="url(#akarIconsFacebookFill0)"><path fill="currentColor" fillRule="evenodd" d="M0 12.067C0 18.033 4.333 22.994 10 24v-8.667H7V12h3V9.333c0-3 1.933-4.666 4.667-4.666c.866 0 1.8.133 2.666.266V8H15.8c-1.467 0-1.8.733-1.8 1.667V12h3.2l-.533 3.333H14V24c5.667-1.006 10-5.966 10-11.933C24 5.43 18.6 0 12 0S0 5.43 0 12.067Z" clipRule="evenodd" /></g><defs><clipPath id="akarIconsFacebookFill0"><path fill="#fff" d="M0 0h24v24H0z" /></clipPath></defs></g></svg>
                            </a></li>
                            <li>
                                <a>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" /></svg>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.829 6.302c-.738-.034-.96-.04-2.829-.04s-2.09.007-2.828.04c-1.899.087-2.783.986-2.87 2.87-.033.738-.041.959-.041 2.828s.008 2.09.041 2.829c.087 1.879.967 2.783 2.87 2.87.737.033.959.041 2.828.041 1.87 0 2.091-.007 2.829-.041 1.899-.086 2.782-.988 2.87-2.87.033-.738.04-.96.04-2.829s-.007-2.09-.04-2.828c-.088-1.883-.973-2.783-2.87-2.87zm-2.829 9.293c-1.985 0-3.595-1.609-3.595-3.595 0-1.985 1.61-3.594 3.595-3.594s3.595 1.609 3.595 3.594c0 1.985-1.61 3.595-3.595 3.595zm3.737-6.491c-.464 0-.84-.376-.84-.84 0-.464.376-.84.84-.84.464 0 .84.376.84.84 0 .463-.376.84-.84.84zm-1.404 2.896c0 1.289-1.045 2.333-2.333 2.333s-2.333-1.044-2.333-2.333c0-1.289 1.045-2.333 2.333-2.333s2.333 1.044 2.333 2.333zm-2.333-12c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.958 14.886c-.115 2.545-1.532 3.955-4.071 4.072-.747.034-.986.042-2.887.042s-2.139-.008-2.886-.042c-2.544-.117-3.955-1.529-4.072-4.072-.034-.746-.042-.985-.042-2.886 0-1.901.008-2.139.042-2.886.117-2.544 1.529-3.955 4.072-4.071.747-.035.985-.043 2.886-.043s2.14.008 2.887.043c2.545.117 3.957 1.532 4.071 4.071.034.747.042.985.042 2.886 0 1.901-.008 2.14-.042 2.886z" /></svg>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" /></svg>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-2.102.144-6.784.144-8.883 0-2.276-.156-2.541-1.27-2.558-4.892.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zm-6.441-7.234l4.917 2.338-4.917 2.346v-4.684z" /></svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div> */}
                    </div>

                    <div className="row mb-2">
                        {blogcat.blogscat ? (
                            <>
                                <div className="g-3 g-sm-6 gap-2 categories-top-header">

                                    <h3
                                        className={`fontFamily-alata-only blogcat  ${active === 'all' ? 'active' : ''}`}
                                        onClick={() => {
                                            router.push('/blogs');
                                            setActive('all');

                                        }}

                                    >
                                        All
                                    </h3>


                                    {blogcat.blogscat?.map((x, i) => (
                                        <>
                                            <h3
                                                className={`fontFamily-alata-only blogcat  ${active === x.category_name ? 'active' : ''}`}

                                                key={Math.random()}
                                                onClick={() => {
                                                    router.push('/blogs?type=' + x.category_name);
                                                    setActive(x.category_name);
                                                }}

                                            >
                                                {x.category_name}
                                            </h3>

                                        </>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <Audio
                                    height="80"
                                    width="80"
                                    radius="9"
                                    color="green"
                                    ariaLabel="loading"
                                    wrapperStyle
                                    wrapperClass
                                />
                            </>
                        )}
                        <div className="col-lg-8 mt-4 blog-container">
                            <div className="row blogs">
                                {bloglist.blogs.map((e) => {
                                    return (
                                        <Link
                                            href={'/blogs/' + e.post_name}
                                            className="blog-item"
                                            key={e.ID}
                                        >
                                            <Image width={200} height={200} src={e.image_url} alt="blog_img" />
                                            <p className="post-title">{e.post_title}</p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="col-lg-4 mt-4 recent-posts-container">
                            <div className="recent-post-card">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="title-box">Recent Post</div>
                                    </div>
                                    <div className="col-lg-12 recent-posts">
                                        {bloglist.blogs.map((e) => {
                                            return (
                                                <Link
                                                    key={e.ID}
                                                    className="d-flex recent-post"
                                                    href={'/blogs/' + e.post_name}
                                                >
                                                    <div className="img-box">
                                                        <Image width={200} height={200} src={e.image_url} alt="blog_image" />
                                                    </div>
                                                    <div className="post-title">{e.post_title}</div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </Container>
            </section>
        </>
    );
}
export const getServerSideProps = async (context) => {
    var type = context.query["type"];
    //console.log(type);
    //Slider
    if (type === undefined) {
        try {
            //Slider
            const url = Global.BASE_API_PATH + `/list-blogs`;
            const res = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    method: 'GET',
                },
            });
            const dataslide = await res.json();


            const url1 = Global.BASE_API_PATH + `/list-blogs-cat`;
            const res2 = await fetch(url1, {
                headers: {
                    Accept: 'application/json',
                    method: 'GET',
                },
            });
            const datacat = await res2.json();


            return {
                props: {
                    bloglist: dataslide,
                    blogcat: datacat
                },
            };
        } catch (error) {
            console.log(error);
        }
    } else {

        try {
            //Slider
            const url = Global.BASE_API_PATH + `/list-blogs-catlist/${type}`;
            const res = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    method: 'GET',
                },
            });
            const dataslide = await res.json();


            const url1 = Global.BASE_API_PATH + `/list-blogs-cat`;
            const res2 = await fetch(url1, {
                headers: {
                    Accept: 'application/json',
                    method: 'GET',
                },
            });
            const datacat = await res2.json();


            return {
                props: {
                    bloglist: dataslide,
                    blogcat: datacat
                },
            };
        } catch (error) {
            console.log(error);
        }
    }



};