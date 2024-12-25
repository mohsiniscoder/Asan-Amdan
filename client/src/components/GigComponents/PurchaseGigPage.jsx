import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PurchaseGigPage = () => {
  const { gigId } = useParams(); // Get the gigId from the URL
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchaseDetails, setPurchaseDetails] = useState({
    message: "",
    additionalRequests: "",
    categoryId: "",
    isTechnical: false,
  });
  const navigate = useNavigate(); // Hook to handle navigation
  
  // Fetch gig details
  const fetchGigDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/gig/getGigById/${gigId}`);
      const gigData = response.data.gig;
      setGig(gigData);
      setPurchaseDetails((prev) => ({
        ...prev,
        categoryId: gigData.categoryId, // Pre-fill categoryId from gig data
      }));
    } catch (err) {
      setError("Failed to fetch gig details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGigDetails();
  }, [gigId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPurchaseDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle purchase submission
  const handlePurchase = async () => {
    try {
      const clientId = "loggedInUserId"; // Replace with actual client ID from auth context
      const serviceProviderId = gig?.serviceProviderId;

      if (!clientId || !serviceProviderId || !gigId || !purchaseDetails.categoryId) {
        alert("All required fields must be provided.");
        return;
      }

      const response = await axios.post(`http://localhost:4000/api/v1/addOrder`, {
        clientId,
        serviceProviderId,
        gigId,
        orderDetails: {
          message: purchaseDetails.message,
          additionalRequests: purchaseDetails.additionalRequests,
        },
        categoryId: purchaseDetails.categoryId,
        isTechnical: purchaseDetails.isTechnical,
      });

      if (response.status === 201) {
        alert("Purchase successful!");
        navigate("/orders"); // Redirect to orders page after successful purchase
      }
    } catch (err) {
      alert("Failed to complete purchase. Please try again.");
    }
  };

  if (loading) return <p>Loading purchase page...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="purchase-gig-container">
      {gig && (
        <>
          <h1>Purchase {gig.title}</h1>
          <p><b>Price:</b> ${gig.price}</p>
          <p><b>Description:</b> {gig.description}</p>
          <div className="purchase-form">
            <h3>Purchase Details</h3>
            <textarea
              name="message"
              placeholder="Message to the service provider (optional)"
              value={purchaseDetails.message}
              onChange={handleChange}
              style={{ width: "100%", height: "100px", marginBottom: "10px" }}
            />
            <textarea
              name="additionalRequests"
              placeholder="Additional requests or requirements (optional)"
              value={purchaseDetails.additionalRequests}
              onChange={handleChange}
              style={{ width: "100%", height: "100px", marginBottom: "10px" }}
            />
            <label>
              <input
                type="checkbox"
                name="isTechnical"
                checked={purchaseDetails.isTechnical}
                onChange={handleChange}
              />
              Is this a technical order?
            </label>
            <button
              onClick={handlePurchase}
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "20px",
              }}
            >
              Confirm Purchase
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PurchaseGigPage;
