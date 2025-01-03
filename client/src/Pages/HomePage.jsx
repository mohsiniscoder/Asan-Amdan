import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SliderContainer from "../components/HomeComponents/SliderContainer";
import GigList from "../components/GigComponents/GigList";
import { slides } from "../data/slides";
import CategorySearchBar from "../components/HomeComponents/CategorySearchBar";
import Footer from "../components/HomeComponents/Footer";
import Quotes from "../components/HomeComponents/Qoutes";
import HeroSection from "../components/HomeComponents/HeroSection";

const HomePage = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchActiveGigs = async () => {
    try {
      const response = await axios.get("https://asan-amdan-py4u.vercel.app/api/v1/gig/getAllGigs", {
        headers: {
          Authorization: `${localStorage.getItem("authToken")}`,
        },
      });
      setGigs(response.data.gigs);
    } catch (err) {
      setError("Failed to fetch gigs. Please try again.");
      console.log("error while fetching gigs in home page",err");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveGigs();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    
    if (token) {
        // Store the token in local storage or state
        localStorage.setItem('authToken', token);
        // Redirect the user to the desired page
        window.location.href = '/'; // or wherever you'd like to redirect
    }
}, []);



  const handleGigClick = (gigId) => {
    navigate(`/gig/${gigId}`);
  };

  if (loading) return <p>Loading available gigs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <SliderContainer slides={slides} />
      {/* <HeroSection/> */}
      <CategorySearchBar />
      <section className="gigs-section">
        <div className="container">
          <h1 className="section-title">Available Gigs</h1>
          <GigList gigs={gigs} onGigClick={handleGigClick} />
        </div>
      </section>
      <Quotes/>
      <Footer />
    </>
  );
};

export default HomePage;
