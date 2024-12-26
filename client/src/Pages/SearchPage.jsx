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
  const categoryId = new URLSearchParams(location.search).get('category'); // Extract the category from query params

  const fetchGigsByCategory = async (categoryId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:4000/api/v1/gig/search`, {
        params: { categoryId },
        headers: {
          Authorization: `${localStorage.getItem("authToken")}`,
        },
      });
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
      <h1>Search Results for Category: {categoryId}</h1>
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
