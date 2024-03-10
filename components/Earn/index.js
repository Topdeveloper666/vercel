// import Image from "next/image";
import React from "react";
// import Logo from "../../assets/img/Rectangle 999.png";

const Index = () => {
  // const [bannerData, setBannerData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const apiUrl = 'https://admin.glamcode.in/api/offers-banners';
  //     const response = await fetch(apiUrl);
  //     const data = await response.json();
  //     //console.log(data.offers_banner, 'ddddf');
  //     setBannerData(data.offers_banner);
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="testimonial ">
      {/* {bannerData.map((img) => (
        <>
          <img
            src={img.image}
            width={1080}
            height={214}
            style={{ objectFit: 'cover' }}
          />
        </>
      ))} */}
      <img
        src={`https://admin.glamcode.in/Offerbanner/1675896733_term-bg-1-666de2d941529c25aa511dc18d727160.jpg`}
        style={{ width: "100%", height: "20rem", objectFit: "cover" }}
      />
    </div>
  );
};

export default Index;
