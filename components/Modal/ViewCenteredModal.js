import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import {
  addtoCartData,
  decrementQty,
  removeFromCart,
} from '../../store/actions';
import { useDispatch } from 'react-redux';
import AddToCartModalView from '../Cart/AddToCartModalView';
import tag from '../../assets/img/tag.svg';
import clock from '../../assets/img/clock.png';
import Image from 'next/image';
export default function ViewCenteredModal(props) {
  //console.log(props);
  const handleClose = () => props.onHide();
  const dispatch = useDispatch();
  const [itemCount, setItemCount] = React.useState(0);
  const onDecrement = (itemsid) => {
    setItemCount(Math.max(itemCount - 1, 0));
    if (Math.max(itemCount - 1, 0) === 0) {
      dispatch(removeFromCart(itemsid));
    } else {
      dispatch(decrementQty(itemsid, 1));
    }
  };
  const onIncrement = (items) => {
    setItemCount(itemCount + 1);

    //     dispatch({
    //         type: 'FETCH_DATA',
    //         data: responseData
    //    })
    dispatch(addtoCartData(items, 1));
  };
  const mapItems = (items) => {
    return items.map((item, index) => {
      return (
        <li key={Math.random()} className="list">
          {/* <i className="fa fa-snowflake-o" aria-hidden="true" /> */}
          {` ` + item.toString()}
        </li>
      );
    });
  };
  return (
    <>
      <Modal
        {...props}
        // fullscreen
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="mobilepopud"
      >
        <div onClick={handleClose} className="image-d-location-close">
          x
        </div>
        <Modal.Body className="p-4">
          <Row>
            <Col sm={12} md={6}>
              <div className="product-single-thumb">
                <Image
                  src={props.datato.service_image_url}
                  alt="Luxury Party Makeup"
                  className="popimag"
                  width={200}
                  height={200}
                />
              </div>
            </Col>
            <Col className="d-md-block d-flex justify-content-between align-items-center max-mss">
              <div className="product-details-content">
                <div className="mt-2">
                  <h4 className="fs-5 fw-bold product-details-title">
                    {props.datato.name}
                  </h4>
                </div>

                <div className="d-flex flex-row align-items-center">
                  <div className="offerPrice fs-5">
                    Rs {Math.round(props.datato.discounted_price)}
                  </div>
                  <div className="pe-2 fs-6 price Price ms-2">
                    Rs {Math.round(props.datato.price)}
                  </div>

                  <div className="px-1 discountTitle ms-2">
                    {props.datato.discount}% Off
                  </div>
                </div>
                <div className="time-text mt-2 mb-3">
                  <li className="list-group-item">
                    <Image
                      src={clock.src}
                      width={20}
                      height={20}
                      className="me-2"
                      alt="clock"
                    />
                    {props.datato.time} {props.datato.time_type}
                  </li>
                </div>

                {/* <div className="product-details-action">
                   <div className="product-item prices">
                                        <span className="price">Rs {Math.round(props.datato.discounted_price)}</span>
                                        <span
                                            className="price-old"
                                            style={{ textDecorationLine: "line-through" }}
                                        >
                                            Rs {Math.round(props.datato.price)}
                                        </span>
                                    </div> */}
                {/* <div className="product-details-cart-wishlist" style={{ marginLeft: '35px' }}>
                                        <button type="button" className="btn">
                                            <i className="fa fa-clock-o" />&nbsp;
                                            {props.datato.time} {props.datato.time_type}
                                        </button>
                                    </div>
                </div>*/}
              </div>
              <div className="product-details-pro-qty">
                <AddToCartModalView data={props.datato} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="mt-3">
                <h6 className="fw-bold">Service Includes: </h6>
              </div>
              {props.datato.description && (
                <ul className="mb-6" style={{ paddingLeft: '0px' }}>
                  {mapItems(
                    props.datato.description
                      .replace(/(<([^>]+)>)/gi, '')
                      .replace(/(?:\r\n|\r|\n)/g, '')
                      .replace(/(?:&nbsp;)/g, '')
                      .replace(/&amp;/g, '&')
                      .toString()
                      .split('.')
                  )}
                </ul>
              )}
            </Col>

          </Row>
          <Row>
            {props.datato.long_description && (
              <Col>
                <div className="mt-3">
                  <h6 className="fw-bold">For Your Information: </h6>
                </div>

                <ul className="mb-6" style={{ paddingLeft: '0px' }}>
                  {mapItems(
                    props.datato.long_description
                      .replace(/(<([^>]+)>)/gi, '')
                      .replace(/(?:\r\n|\r|\n)/g, '')
                      .replace(/(?:&nbsp;)/g, '')
                      .replace(/&amp;/g, '&')
                      .toString()
                      .split('.')
                  )}
                </ul>

              </Col>
            )}
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
