import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Contexts/userContexts";

const PurchaseGigPage = () => {
  const { gigId } = useParams(); // Get the gigId from the URL
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchaseDetails, setPurchaseDetails] = useState({
    message: "",
    additionalRequests: "",
    isTechnical: false,
  });

  const {userAuth,setUserAuth}=useAuth();


  const navigate = useNavigate(); // Hook to handle navigation

  // Fetch gig details
  const fetchGigDetails = async () => {
    try {
      const response = await axios.get(
        `https://asan-amdan-py4u.vercel.app/api/v1/gig/getGigById/${gigId}`
      );
      const gigData = response.data.gig;
      setGig(gigData);
      setPurchaseDetails((prev) => ({
        ...prev,
        isTechnical: gigData.isTechnical || false, // Use default or fetched value
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
      const clientId = userAuth?.user?._id;
      alert(`client ID ${userAuth.user}`);

      
      const serviceProviderId = gig?.serviceProviderId;

      if (!clientId || !serviceProviderId || !gigId) {
        alert("All required fields must be provided.");
        return;
      }

      const response = await axios.post(
        `https://asan-amdan-py4u.vercel.app/api/v1/orders/addOrder`,
        {
          clientId,
          serviceProviderId,
          gigId,
          orderDetails: {
            title: gig.title,
            description: purchaseDetails.message || "No description provided.",
            price: gig.price,
            delivery_time: gig.deliveryTime || "N/A", // Use gig's delivery time
          },
          categoryId: gig.categoryId,
          isTechnical: purchaseDetails.isTechnical,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("authToken")}`,
          },
        }
      );

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
          <p>
            <b>Price:</b> ${gig.price}
          </p>
          <p>
            <b>Description:</b> {gig.description}
          </p>
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
