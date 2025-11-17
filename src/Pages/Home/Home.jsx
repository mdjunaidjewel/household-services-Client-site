import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Banner from "../../Components/Banner/Banner";
import Services from "../Services/Services";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import UserFeedback from "../UserFeedback/UserFeedback";

const Home = () => {
  return (
    <div>
      <div className="py-8">
        <Banner></Banner>
      </div>
      <div>
        <Services></Services>
      </div>
      <div className="py-10">
        <WhyChooseUs></WhyChooseUs>
      </div>
      <div>
        <UserFeedback></UserFeedback>
      </div>
    </div>
  );
};

export default Home;
