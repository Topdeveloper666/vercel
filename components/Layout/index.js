import React from 'react';
//import Footer from '../Footer';
import dynamic from 'next/dynamic'
const Footer = dynamic(() => import('../Footer'),
  { ssr: false });
import LoadingScreen from '../LoadingScreen/loadingScreen';
import { frontService } from '../../_services/front.services';
import {
  menuSave,
  mainCategory,
  mainLocation,
} from '../../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { responsiveReturn } from '../../responsiveCheck';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';

function Layout({ children }) {

  const dispatch = useDispatch();
  // React.useEffect(() => {
  //   frontService.allSlider().then(
  //     (res) => {
  //       if (res.status === 'success') {
  //         dispatch(menuSave(res.slider_images));
  //       } else {
  //         console.log('Something went wrong !!');
  //       }
  //     },
  //     (error) => {
  //       console.log('Something went wrong !!');
  //     }
  //   );

  //   frontService.maincategory().then(
  //     (res) => {
  //       if (res.status === 'success') {
  //         dispatch(mainCategory(res.maincategory));
  //       } else {
  //         console.log('Something went wrong !!');
  //       }
  //     },
  //     (error) => {
  //       console.log('Something went wrong !!');
  //       //toast.error("Something went wrong !!", "Fashion Store");
  //     }
  //   );





  //   frontService.locationall().then(
  //     (res) => {
  //       if (res.status === 'success') {
  //         dispatch(mainLocation(res.locations));
  //       } else {
  //         console.log('Something went wrong !!');
  //       }
  //     },
  //     (error) => {
  //       console.log('Something went wrong !!');
  //       //toast.error("Something went wrong !!", "Fashion Store");
  //     }
  //   );
  // }, []);

  return (
    <>

      <div className="allsection">
        <ToastContainer />
        {children}
        <Footer />
      </div>


    </>
  );
}
export default Layout;
