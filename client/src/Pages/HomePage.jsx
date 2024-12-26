import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SliderContainer from "../components/HomeComponents/SliderContainer";
import GigList from "../components/GigComponents/GigList";
import { slides } from "../data/slides";
import CategorySearchBar from "../components/HomeComponents/CategorySearchBar";
// import HeroSection from "../components/HomeComponents/HeroSection";
// import FeaturedCategories from "../components/HomeComponents/FeaturedCategories";
// import Testimonials from "../components/HomeComponents/Testimonials";
// import Statistics from "../components/HomeComponents/Statistics";
import Footer from "../components/HomeComponents/Footer";
import Quotes from "../components/HomeComponents/Qoutes";
// import NewsletterSignup from "../components/HomeComponents/NewsLetterSignUp";

const HomePage = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchActiveGigs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/gig/getApprovedGigs", {
        headers: {
          Authorization: `${localStorage.getItem("authToken")}`,
        },
      });
      setGigs(response.data.gigs);
    } catch (err) {
      // setError("Failed to fetch gigs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveGigs();
  }, []);

  const handleGigClick = (gigId) => {
    navigate(`/gig/${gigId}`);
  };

  if (loading) return <p>Loading available gigs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <SliderContainer slides={slides} />
      {/* <HeroSection /> */}
      <CategorySearchBar />
      <section className="gigs-section">
        <div className="container">
          <h1 className="section-title">Available Gigs</h1>
          <GigList gigs={gigs} onGigClick={handleGigClick} />
        </div>
      </section>
      {/* <FeaturedCategories /> */}
      <Quotes/>
      {/* <Statistics /> */}
      {/* <Testimonials /> */}
      {/* <NewsletterSignup /> */}
      <Footer />
    </>
  );
};

export default HomePage;
