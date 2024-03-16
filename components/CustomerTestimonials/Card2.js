import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from 'mdb-react-ui-kit';
import { AiFillStar } from 'react-icons/ai';
// import girl from '../../assets/img/girl.jpg';
import girl from '../../assets/img/Cardimg.png';
import Image from 'next/image';

export default function App() {
  return (
    <MDBContainer fluid>
      <MDBRow className="text-center">
        <InnerCard />
      </MDBRow>
    </MDBContainer>
  );
}

export const InnerCard = () => {
  return (
    <MDBCol className="mb-2 mb-md-4" style={{ width: '90%' }}>
      <MDBCard>
        <MDBCardBody className="py-2 card2-csss">
          <div className="d-flex justify-content-center img-css">
            <Image
              src={girl.src}
              alt="Teresa May"
              className="rounded-circle shadow-1-strong bg-white p-2"
            />123
          </div>
          <div className="card2-css pt-5">
            <p className="font-weight-bold">Teresa May</p>
            {/* <h6 className="font-weight-bold my-3">Founder at ET Company</h6> */}
            <MDBTypography
              listUnStyled
              className="d-flex justify-content-center"
            >
              <li>
                <AiFillStar color="#FECC43" size={28} />
              </li>
              <li>
                <AiFillStar color="#FECC43" size={28} />
              </li>
              <li>
                <AiFillStar color="#FECC43" size={28} />
              </li>
              <li>
                <AiFillStar color="#FECC43" size={28} />
              </li>
              <li>
                <AiFillStar color="#FECC43" size={28} />
              </li>
            </MDBTypography>
            <p className="mb-2">
              <MDBIcon icon="quote-left" className="pe-2" />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};
