// import React, { useState } from "react";
// import Modal from "react-bootstrap/Modal";
// import { useForm } from "react-hook-form";
// import { frontService } from "../../_services/front.services";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Router from "next/router";
// import { useDispatch } from "react-redux";
// import { userData } from "../../store/actions/index";
// import { useEffect } from "react";
// import { isMobile } from "react-device-detect";
// import Image from "next/image";

// let toastOptions = {
//   position: "bottom-center",
//   autoClose: 5000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
//   theme: "light",
// };

// function OtpModal({ show, handleClose }) {
//   const dispatch = useDispatch();
//   const [mainOtp, setMainotp] = useState(false);
//   const [dataMb, setDataMb] = useState([]);
//   const [sending, setSending] = useState(true);
//   const [isTermsChecked, setIsTermsChecked] = useState(false);
//   const [mobileBlocks, setMobileBlocks] = useState([
//     "",
//     "",
//     "",
//     "",
//     "",
//     "",
//     "",
//     "",
//     "",
//     "",
//   ]);
//   const handleCheckboxChange = () => {
//     setIsTermsChecked(!isTermsChecked);
//   };

//   const {
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   useEffect(() => {}, [isTermsChecked]);

//   const onSubmit = (data) => {
//     setSending(true);
//     frontService.sendOtpcode({ phone: mobileBlocks.join("") }).then((res) => {
//       if (res.status == "success") {
//         setMobileBlocks(["", "", "", ""]);
//         localStorage.setItem("phonenumber", data.phone);
//         setMainotp(true);
//         reset();
//         setDataMb(res.mb);
//       } else if (res.status == "fail") {
//         toast.warning(res.message, toastOptions);
//       } else {
//         toast.warning("Invalid", toastOptions);
//       }
//       setSending(false);
//     });
//     setSending(false);
//   };

//   const onOtp = (data) => {
//     setSending(true);
//     if (parseInt(mobileBlocks.join("")) === parseInt(dataMb.otp)) {
//       const dat = {
//         mobile: dataMb.mobile,
//       };
//       frontService.sendOtpverify(dat).then((res) => {
//         if (res.status === "success") {
//           let userDataAsPerCashBack = res.user;
//           localStorage.setItem(
//             "gluserDetails",
//             JSON.stringify(userDataAsPerCashBack)
//           );
//           dispatch(userData(userDataAsPerCashBack));
//           handleClose();
//           reset();
//           localStorage.getItem("page")
//             ? Router.push("/checkout")
//             : Router.push("/");
//         } else if (res.status === "fail") {
//           toast.warning(res.message, toastOptions);
//         } else {
//           toast.warning("Invalid", toastOptions);
//         }
//         setSending(false);
//       });
//     } else {
//       toast.error("Wrong OTP", toastOptions);
//     }
//     setSending(false);
//   };

//   const handleMobileBlockChange = (index, value, type, e) => {
//     if (!isNaN(parseInt(value))) {
//       const updatedMobileBlocks = [...mobileBlocks];
//       updatedMobileBlocks[index] = value;
//       setMobileBlocks(updatedMobileBlocks);
//       if (type === "mob") {
//         if (value.length === 1 && index < mobileBlocks.length - 1) {
//           document.getElementById(`mob-${index + 1}`).focus();
//         }
//       } else {
//         if (value.length === 1 && index < 3) {
//           document.getElementById(`otp-${index + 1}`).focus();
//         }
//       }
//     }
//     if (e?.code == "Backspace" && index > 0) {
//       const updatedMobileBlocks = [...mobileBlocks];
//       console.log("updatedMobileBlocks", updatedMobileBlocks);
//       updatedMobileBlocks[index] = "";
//       setMobileBlocks(updatedMobileBlocks);
//       if (type === "mob") {
//         if (value.length === 1 && index < mobileBlocks.length) {
//           document.getElementById(`mob-${index - 1}`).focus();
//         }
//       } else {
//         if (value.length === 1 && index <= 3) {
//           document.getElementById(`otp-${index - 1}`).focus();
//         }
//       }
//     } else if (e?.code == "Backspace" && index == 0) {
//       const updatedMobileBlocks = [...mobileBlocks];
//       updatedMobileBlocks[index] = "";
//       setMobileBlocks(updatedMobileBlocks);
//       if (type === "mob") {
//         if (value.length === 1 && index < mobileBlocks.length) {
//           document.getElementById(`mob-${index}`).focus();
//         }
//       } else {
//         if (value.length === 1 && index <= 3) {
//           document.getElementById(`otp-${index}`).focus();
//         }
//       }
//     }
//     if (e?.code == "ArrowLeft" && index > 0) {
//       if (type === "mob") {
//         if (value.length === 1 && index < mobileBlocks.length - 1) {
//           document.getElementById(`mob-${index - 1}`).focus();
//         }
//       } else {
//         if (value.length === 1 && index <= 3) {
//           document.getElementById(`otp-${index - 1}`).focus();
//         }
//       }
//     }
//   };

//   return (
//     <div className="otpModal">
//       {show && (
//         <Modal show={show} onHide={handleClose} centered>
//           <div onClick={handleClose} className="image-d-location-close">
//             X
//           </div>
//           <div className="section-login-background">
//             <div className="section-model-login">
//               <div className="headsecftion">
//                 <Image
//                   className="imagelogo"
//                   src="https://admin.glamcode.in/img/fav.png"
//                   alt="Glamcode"
//                   height={100}
//                   width={100}
//                 />
//               </div>
//               <div
//                 className={` bottomsecftion ${isMobile && "bottomsecftionSm"}`}
//               >
//                 {mainOtp ? (
//                   <form onSubmit={handleSubmit(onOtp)}>
//                     <div className="d-flex justify-content-center align-items-center inputField xyz inputFieldT">
//                       {mobileBlocks.map((block, index) => (
//                         <input
//                           key={index}
//                           id={`otp-${index}`}
//                           className="inputFieldMobDigit"
//                           value={block}
//                           onChange={(e) =>
//                             handleMobileBlockChange(
//                               index,
//                               e.target.value,
//                               "otp"
//                             )
//                           }
//                           onKeyDown={(e) =>
//                             handleMobileBlockChange(index, block, "otp", e)
//                           }
//                           maxLength={1}
//                         />
//                       ))}
//                     </div>
//                     {errors.otp && (
//                       <span style={{ marginLeft: "58px", color: "red" }}>
//                         {errors.otp.message}
//                       </span>
//                     )}
//                     <button className="button mt-4">Verify</button>
//                   </form>
//                 ) : (
//                   <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className="d-flex justify-content-center align-items-center inputField xyz inputFieldT mt-md-0">
//                       {mobileBlocks.map((block, index) => (
//                         <input
//                           key={index}
//                           id={`mob-${index}`}
//                           className={` inputFieldMobDigit ${
//                             isMobile && "MobiSmInput"
//                           }`}
//                           value={block}
//                           onChange={(e) =>
//                             handleMobileBlockChange(
//                               index,
//                               e.target.value,
//                               "mob",
//                               e
//                             )
//                           }
//                           onKeyDown={(e) =>
//                             handleMobileBlockChange(index, block, "mob", e)
//                           }
//                           maxLength={1}
//                         />
//                       ))}
//                     </div>
//                     <div
//                       className="inputField xyz mt-md-3"
//                       //  style={{boxShadow: "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"}}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={isTermsChecked}
//                         onChange={handleCheckboxChange}
//                       />
//                       Agree to{" "}
//                       <a href="/terms-conditions">Terms and Conditions</a>
//                     </div>
//                     <button
//                       className="button mt-md-3"
//                       type="submit"
//                       disabled={!sending || !isTermsChecked}
//                       onClick={() => {
//                         setSending(true);
//                       }}
//                     >
//                       {!sending ? "OTP Sent" : "Send OTP"}
//                     </button>
//                   </form>
//                 )}
//               </div>
//             </div>
//           </div>
//         </Modal>
//       )}
//       <ToastContainer position="top-right" autoClose={5000} />
//     </div>
//   );
// }

// export default OtpModal;

import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
// import Button from 'react-bootstrap/Button';

import { useForm } from "react-hook-form";
import { frontService } from "../../_services/front.services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { userData } from "../../store/actions/index";
import { useEffect } from "react";

let toastOptions = {
  position: "bottom-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

function OtpModal({ show, handleClose }) {
  const dispatch = useDispatch();

  const [mainOtp, setMainotp] = useState(false);
  const [dataMb, setDataMb] = useState([]);
  const [sending, setSending] = useState(true);
  const [isTermsChecked, setIsTermsChecked] = useState(true);
  const handleCheckboxChange = () => {
    setIsTermsChecked(!isTermsChecked);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm(); // initialize the hook

  useEffect(() => { }, [isTermsChecked]);

  const onSubmit = (data) => {
    setSending(true);
    frontService.sendOtpcode(data).then(
      (res) => {
        if (res.status == "success") {
          localStorage.setItem("phonenumber", data.phone);
          setMainotp(true);
          reset();
          setDataMb(res.mb);
        } else if (res.status == "fail") {
          toast.warning(res.message, toastOptions);
        } else {
          toast.warning("Invalid", toastOptions);
        }
        setSending(false);
      },
      (error) => {
        toast.error("Invalid", toastOptions);
        setSending(false);
      }
    );
    setSending(false);
  };

  const onOtp = (data) => {
    setSending(true);
    if (parseInt(data.otp) === parseInt(dataMb.otp)) {
      const dat = {
        mobile: dataMb.mobile,
      };
      frontService.sendOtpverify(dat).then(
        (res) => {
          if (res.status === "success") {
            let userDataAsPerCashBack = res.user;
            localStorage.setItem(
              "gluserDetails",
              JSON.stringify(userDataAsPerCashBack)
            );
            dispatch(userData(userDataAsPerCashBack));
            handleClose();
            reset();
            localStorage.getItem("page")
              ? Router.push("/checkout")
              : Router.push("/");
          } else if (res.status === "fail") {
            toast.warning(res.message, toastOptions);
          } else {
            toast.warning("Invalid", toastOptions);
          }
          setSending(false);
        },
        (error) => {
          toast.warning("Invalid", toastOptions);
          setSending(false);
        }
      );
    } else {
      toast.error("Wrong OTP", toastOptions);
    }
    setSending(false);
  };

  return (
    <div className="otpModal">
      {show && (
        <Modal show={show} onHide={handleClose} centered className="otpMdl">
          <div onClick={handleClose} className="image-d-location-close">
            X
          </div>
          <div className="section-login-background">
            <div className={"section-model-login section-model-login2"}>
              <div className="headsecftion">
                <img
                  className="imagelogo"
                  src="https://admin.glamcode.in/img/fav.png"
                  alt="Glamcode"
                />
              </div>
              <div className="bottomsecftion">
                {mainOtp ? (
                  <form onSubmit={handleSubmit(onOtp)}>
                    <input
                      className="inputField mt-3"
                      placeholder="Enter OTP here"
                      defaultValue=""
                      maxLength={4}
                      {...register("otp", {
                        required: "Otp is Required",
                      })}
                      onKeyUp={() => {
                        trigger("otp");
                      }}
                    />
                    {errors.otp && (
                      <span style={{ marginLeft: "58px", color: "red" }}>
                        {errors.otp.message}
                      </span>
                    )}

                    <button className="button mt-3">Verify</button>
                  </form>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      className="inputField mt-3"
                      maxLength={10}
                      placeholder="Enter the 10 digit mobile"
                      defaultValue=""
                      {...register("phone", {
                        required: "Phone is Required",
                        pattern: {
                          value:
                            /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                          message: "Invalid Phone No",
                        },
                      })}
                      onKeyUp={() => {
                        trigger("phone");
                      }}
                    />
                    {errors.phone && (
                      <span style={{ marginLeft: "58px", color: "red" }}>
                        {errors.phone.message}
                      </span>
                    )}
                    <div className="inputField xyz">
                      <input
                        type="checkbox"
                        checked={isTermsChecked}
                        onChange={handleCheckboxChange}
                      />
                      Agree to terms and condition to continue
                    </div>
                    <button
                      className="button"
                      type="submit"
                      disabled={!sending || !isTermsChecked}
                      onClick={() => {
                        setSending(true);
                      }}
                    >
                      {!sending ? "OTP Sent" : "Send OTP"}
                    </button>

                  </form>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default OtpModal;
