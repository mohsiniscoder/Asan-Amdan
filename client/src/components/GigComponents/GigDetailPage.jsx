import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/GigDetail.css"

const GigDetailPage = () => {
  const { gigId } = useParams(); // Get the gigId from the URL
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to handle navigation

  // Fetch the gig details
  const fetchGigDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/gig/getGigById/${gigId}`);
      setGig(response.data.gig);
    } catch (err) {
      setError("Failed to fetch gig details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGigDetails();
  }, [gigId]);

  // Handler for the "Purchase Gig" button
  const handlePurchase = () => {
    navigate(`/purchase/${gigId}`); // Redirect to the purchase page with gigId
  };

  if (loading) return <p>Loading gig details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="gig-detail-container">
      {gig && (
        <>
          {/* Sidebar - Gig Image and Description */}
          <div className="gig-detail-sidebar">
            <img
              src={gig.image} // Gig image URL
              alt={gig.title}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <p><b>Description:</b> {gig.description}</p>
          </div>
  
          {/* Main Content - Other Details */}
          <div className="gig-detail-content">
            <h1>{gig.title}</h1>
            <p><b>Price:</b> ${gig.price}</p>
            <p><b>Location:</b> {gig.location}</p>
            <p><b>Availability:</b> {gig.availabilityHours}</p>
            <p><b>Experience:</b> {gig.experience} years</p>
  
            {/* Buttons */}
            <button >Contact the Service Provider</button>
            <button
              onClick={handlePurchase}
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Purchase Gig
            </button>
          </div>
        </>
      )}
    </div>
  );
  
};

export default GigDetailPage;
