import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import LocationSearchInput from "../../components/PlaceAutocomplete";
import { frontService } from "../../_services/front.services";
import { userAddress, userData } from "../../store/actions/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddressAndUserDetail = (props) => {
  const dispatch = useDispatch();
  const userdetails = useSelector((state) => state.userdetails?.userdetails);
  const [newDddress, setNewAddress] = useState(false);

  const [location, setLocation] = useState("");
  const [latLng, setLatLng] = useState({ lat: "", lng: "" });

  const router = useRouter();
  const [addressl, setAddresslist] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function fetchAddress() {
    frontService.addressList(userdetails?.id, props.currentaddress?.address_id).then(
      (res) => {
        if (res?.status === "success") {
          setAddresslist(res.address);
          props.setcurrentaddress(res.address.filter(element => element.is_primary === 1).length > 0 ? res.address.filter(element => element.is_primary === 1)[0] : res.address[0]);
          dispatch(userAddress(res.address.filter(element => element.is_primary === 1).length > 0 ? res.address.filter(element => element.is_primary === 1)[0] : res.address[0]));
          setNewAddress(true);
        } else {
          toast.error(res.message, "error");
        }
      },
      (error) => {
        console.log("Something went wrong !!");
      }
    );
  }

  useEffect(() => {
    if (!userdetails) {
      router.push("/login");
    }
    fetchAddress();
    frontService.getCashBackOffers(userdetails?.id).then((res) => {
      if (res?.status === "Success") {
        props.setdatafromcashbackservice(res.data.cashbackService[0]);
        props.setdatafrom3rdpartycoupon(res.data.thirdPartyCoupon);
      } else {
        props.setdatafromcashbackservice([]);
      }
    });
  }, [newDddress]);

  function replaceSingleQuotes(inputString) {
    const modifiedString = inputString.replace(/'/g, "`");
    return modifiedString;
  }

  const handleRegistration = (data) => {
    const adde = {
      addressHome: replaceSingleQuotes(data.addressHome),
      address: replaceSingleQuotes(data.address),
      id: data.id,
      location: replaceSingleQuotes(location),
      lat: latLng.lat,
      lng: latLng.lng,
      name: data.name ? data.name : userdetails?.name,
      email: data.email ? data.email : userdetails?.email,
    };
    frontService.updateAddress(adde).then(
      (res) => {
        if (res.status === "success") {
          dispatch(userAddress(res.data));
          dispatch(userData(res.user));
          setNewAddress(true);
          props.setcurrentaddress(res.data);
          props.onHide();
        } else {
          toast.error(res.message, "error");
        }
      },
      (error) => {
        console.log("Something went wrong !!");
      }
    );
  };

  const handleUserRegistration = (data) => {
    frontService.useSave(data).then(
      (res) => {
        if (res.status == "success") {
          dispatch(userData(res.user));
          toast(res.message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (res.status == "fail") {
          toast(res.message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast("Invalid", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      },
      (error) => {
        toast("Invalid", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    );
  };

  function deleteThisAddress(data) {
    frontService
      .addressDeleteByIdAndUserId(data.address_id, data.user_id)
      .then((res) => {
        if (res.status === "success") {
          setNewAddress(false);
          setTimeout(toast("Address Deleted Successfully"), 300);
          props.onHide();
        } else {
          toast.error(res.message, "error");
        }
      });
  }
  // console.log(props, "=====>props")
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      backdrop="static"
      keyboard={false}
      centered
      aria-labelledby="contained-modal-title-vcenter"
      className="modbox"
    >
      {/* from props.showChangeAddressModal */}
      {props.showaddresslistmodal && (
        <>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Address
            </Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit(handleRegistration)}>
            <Modal.Body className="show-grid">
              <div className="card p-4 mb-2">
                {!userdetails.name && (
                  <div className="form-group mb-2">
                    <label htmlFor="addressHome">Youe Name*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter Your Name*"
                      name="name"
                      defaultValue={userdetails?.name}
                      {...register("name")}
                      required
                    />
                  </div>
                )}
                {!userdetails.email && (
                  <div className="form-group mb-2">
                    <label htmlFor="addressHome">Youe Email*</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter Your Name"
                      name="email"
                      defaultValue={userdetails?.email}
                      {...register("email")}
                      required
                    />
                  </div>
                )}
                <div className="form-group mb-2">
                  <label htmlFor="addressHome">Building Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="addressHome"
                    placeholder="Building Name"
                    name="addressHome"
                    {...register("addressHome")}
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="home">Address*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="home"
                    name="address"
                    {...register("address")}
                    placeholder="Address"
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="location">Location*</label>
                  <input
                    name="id"
                    {...register("id")}
                    type="hidden"
                    defaultValue={userdetails?.id}
                  />
                  <input
                    name="location"
                    {...register("location")}
                    type="hidden"
                    value={location}
                  />
                  <input
                    name="lat"
                    {...register("lat")}
                    type="hidden"
                    value={latLng?.lat}
                  />
                  <input
                    name="lng"
                    {...register("lng")}
                    type="hidden"
                    value={latLng?.lng}
                  />
                  <LocationSearchInput
                    onChangeValue={setLocation}
                    onValue={setLatLng}
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="primary"
                    type="submit"
                    className="ms-2"
                    style={{
                      background: "#7c00b7",
                      border: "1px solid #7c00b7",
                    }}
                  >
                    Save changes
                  </Button>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </form>
        </>
      )}
      {addressl.length > 0 && props.showaddresslistmodal && (
        <>
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Address List
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
            {addressl.map((element) => {
              return (
                <div className="card p-4 mb-2">
                  <div className="add-address-show">
                    <div className="d-flex justify-content-between align-Items-center">
                      <p className="m-0">{element.address_heading}</p>
                      <div className="d-flex align-items-center">
                        {/* <i className="fa fa-pencil" aria-hidden="true"></i> */}
                        <i
                          className="fa fa-trash ms-4"
                          aria-hidden="true"
                          onClick={() => {
                            deleteThisAddress(element);
                            props.setcurrentaddress({});
                          }}
                        ></i>
                      </div>
                    </div>
                    <p className="my-3">
                      {element.street + " " + element.address}
                    </p>
                    <div className="d-flex align-items-center justify-content-between">
                      <i className="fa fa-phone" aria-hidden="true"></i>
                      <div
                        className="btn btn-outline-light bgsalon"
                        onClick={() => {
                          dispatch(userAddress(element));
                          props.setcurrentaddress(element);
                          props.onHide();
                        }}
                      >
                        Apply This Address
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Modal.Body>
        </>
      )}
    </Modal>
  );
};

export default AddressAndUserDetail;
