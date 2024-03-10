import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function ViewDetails(props) {


    return (
        <Modal
            {...props} 
            // backdrop="static"
            size="lg" centered
            aria-labelledby="contained-modal-title-vcenter"
            className='modbox'
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Order Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Order Details :</h4>
                <p>
                    
                </p>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer> */}
        </Modal>
    );
}
