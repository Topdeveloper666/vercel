import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import LoadingScreen from '../components/LoadingScreen/loadingScreen';
import { ToastContainer } from 'react-toastify';
import { frontService } from '../_services/front.services';
import ConfirmBooking from '../components/Modal/ConfirmBooking';
import moment from 'moment';
import Link from 'next/link';
import { relative } from 'path';
import Image from 'next/image';

function BookingServices() {
    const router = useRouter();
    const [items, setItems] = useState([]);
    const [show, setShow] = useState(false);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const userdetails = useSelector((state) => state.userdetails?.userdetails);
    const user = userdetails;

    function setNewDataFromQuery() {
        setData(JSON.parse(router.query.data))
        setShow(true);
    }

    useEffect(() => {
        if (router.query.data != undefined) {
            console.log('data2', data);
            setNewDataFromQuery()
        }
        if (!userdetails) {
            router.push('/login');
        }
        getBookings();
    }, [router.query.data, show]);

    const getBookings = () => {
        frontService.myBookings(user?.id).then(
            (res) => {
                if (res.status === 'success') {
                    setItems(res.ongoingBookings);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            }
        );
    };

    return (
        <>
            <div
                className="servicedesk-bg checkout-all min-vh-100"
                id="myBookings"
                style={{ paddingBottom: '50px', background: "linear-gradient(109.6deg, rgb(255, 221, 225) 11.2%, rgb(255, 255, 255) 92.2%)" }}
            >
                <div className="header-css-head">
                    <Container fluid>
                        <div className="d-flex flex-row" onClick={() => router.back()}>
                            <div className="icon-alignments">
                                <i className="fa fa-chevron-left fontSize-m-20" />
                            </div>
                            <h3 className="inside-text-head">Bookings</h3>
                        </div>
                    </Container>
                </div>
                {loading ? (
                    <LoadingScreen />
                ) : (
                    <Container>
                        <div className="mt-4 pt-xl-5 pt-4  card-container">
                            <h4 className="font-12 fw-bold mb-xl-4 mb-5">Booked Services</h4>
                            <div className="row">
                                {data?.service?.length > 0 ? data.service.map((e, i) => {
                                    return (
                                        <Item
                                            e={e}
                                            key={Math.random()}
                                            user={user}
                                            getBookings={getBookings}
                                            update={true}
                                        />
                                    );
                                }) : <>No Booked Services To Show</>}
                            </div>
                        </div>
                    </Container>
                )}
            </div>
            <ToastContainer />
        </>
    );
}

const Item = ({ e }) => {
    const copyToClipboard = (text) => {
        const textField = document.createElement('textarea');
        textField.innerText = text;
        document.body.appendChild(textField);
        textField.select();
        if (!navigator.clipboard) {
            document.execCommand('copy');
        } else {
            navigator.clipboard.writeText(text).then(
                function () {
                    alert("Phone Number Copied To Clipboard"); // success
                })
                .catch(
                    function () {
                        alert("err"); // error
                    });
        }
        textField.remove();
    };
    return (
        <Container>
            <div className="col-lg-12 col-12 mb-xl-4 mb-3" style={{
                borderRadius: "10px", background: "radial-gradient(422px at -10.3% 38.7%, rgb(255 255 255) 53.5%, rgb(255 255 255) 23.8%, rgb(255, 180, 241) 88.5%)", padding: '4px 10px',
                boxShadow: "8px 5px 20px -4px", position: 'relative'
            }}>
                <div className="h3 pt-2 pb-3 mb-0" style={{ padding: "15px", paddingLeft: "0", borderRadius: "10px 10px 0 0", textAlign: 'center' }}>
                    <p style={{ marginBottom: "0px" }}>{moment(e.updated_at).format('MMM Do YY')} AT {moment(e.updated_at).format('h:mm a')}</p>
                </div>
                <div style={{ margin: '0 5px' }}>
                    <div className="h6 pt-3 pb-3 mb-0" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px' }}>
                        <p style={{ marginBottom: "0px", fontWeight: 800 }}>{e.name}</p>
                    </div>
                    <div className="h6 pt-3 pb-3 mb-0" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px' }}>
                        <p className="textPletter" style={{ marginBottom: "0px" }}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 50 50">
                            <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24.984375 6.9863281 A 1.0001 1.0001 0 0 0 24 8 L 24 22.173828 A 3 3 0 0 0 22 25 A 3 3 0 0 0 22.294922 26.291016 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 23.708984 27.705078 A 3 3 0 0 0 25 28 A 3 3 0 0 0 28 25 A 3 3 0 0 0 26 22.175781 L 26 8 A 1.0001 1.0001 0 0 0 24.984375 6.9863281 z"></path>
                        </svg> {e.time} {e.time_type}</p>
                    </div>
                    <div className="h6 pt-3 pb-3 mb-0" style={{ display: "flex", justifyContent: "space-between", paddingLeft: "0", padding: "15px" }}>
                        <p className="textPletter" style={{ marginBottom: "0px", display: 'flex' }}><h5>Rs {e.amount}/-</h5><del style={{ color: 'gray' }}>Rs {e.price}/-</del></p>
                    </div>
                    <div className="h6 pt-3 pb-3 mb-0" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', paddingLeft: '0' }}>
                        <button style={{ background: '#000', border: 'none', marginRight: '10px' }} className="btn btn-danger" >Status - {e.status}</button>
                    </div>
                </div>
                <div style={{ position: 'absolute', right: '15px', top: '98px' }}>
                    <Image
                        src={`https://admin.glamcode.in/user-uploads/service/${e.id}/${e.default_image}`}
                        alt="My Image"
                        width={160}
                        height={160}
                        style={{
                            borderRadius: "10px",
                            width: '160px', height: '160px',
                            objectFit: 'cover',
                        }}
                    /></div>
                <div className="h6 pt-3 pb-3 mb-0 d-flex justify-content-center" style={{ borderTop: '1px solid black' }}>
                    <button style={{ background: 'transparent', border: 'none', marginRight: '10px' }} className="btn btn-danger" onClick={() => { copyToClipboard('9998887771') }} ><Image width={25} height={25} src="https://img.icons8.com/ios-filled/50/phone.png" alt="phone" /></button>
                    <button style={{ background: 'transparent', border: 'none', marginRight: '10px' }} className="btn btn-danger" ><Image width={25} height={25} src="https://img.icons8.com/fluency-systems-filled/48/comments--v2.png" alt="comments--v2" /></button>
                    <span className=''>
                        <div style={{ marginLeft: '20px' }}>Booking Id : {e.booking_id}</div>
                        <div style={{ marginLeft: '20px' }}> Booking Service Id : {e.business_service_id}</div>
                    </span>
                </div>
            </div>
        </Container>
    );
};

export default BookingServices