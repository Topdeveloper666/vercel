import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import coupon from "../../assets/img/coupon.svg"
import Image from 'next/image'

const CouponAppliedModal = (props) => {
    const { show, handleClose } = props

  return (
      <Modal
          show={show}
          onHide={handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className='mobilepopud coupon-modal coupon-success-modal'
          >
            <Modal.Body className='py-4 px-0'>
                <Image src={coupon.src} width={100} height={50} alt="coupon" />
                <h6 className='lh-base'>Yay! You will receive up to ₹43 cashback on this order </h6>
                <h6 className='offer-success-text'>‘GCPAYTM’ applied successfully</h6>
                <Button onClick={handleClose} className='offer-got-btn py-2 mt-3'>Okay, got it</Button>
            </Modal.Body>
      </Modal>
  )
}

export default CouponAppliedModal