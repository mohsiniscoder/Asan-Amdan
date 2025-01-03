import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import GigList from "../components/GigComponents/GigList";
import Footer from "../components/HomeComponents/Footer";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const categoryId = new URLSearchParams(location.search).get('category');

  const fetchGigsByCategory = async (categoryId) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://asan-amdan-py4u.vercel.app/api/v1/gig/getGigByCategoryId/${categoryId}`);
      setGigs(response.data.gigs);
    } catch (err) {
      
      setError("Failed to fetch gigs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchGigsByCategory(categoryId); // Fetch gigs based on category
    }
  }, [categoryId]);

  if (loading) return <p>Loading gigs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <section className="gigs-section">
        <div className="container">
          <GigList gigs={gigs} onGigClick={(gigId) => navigate(`/gig/${gigId}`)} />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SearchPage;
