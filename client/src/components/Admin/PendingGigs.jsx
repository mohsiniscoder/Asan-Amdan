import React, { useState, useEffect } from "react";
import axios from "axios";

const PendingGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pending gigs
  const fetchPendingGigs = async () => {
    try {
      const response = await axios.get("https://asan-amdan-py4u.vercel.app/api/v1/gig/getPendingGigs", {
        headers: {
          Authorization: `${localStorage.getItem("authToken")}`,
        },
      });
      setGigs(response.data.gigs);
    } catch (err) {
      setError("Failed to fetch pending gigs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update Gig Status
  const updateGigStatus = async (gigId, status) => {
    try {
      const response = await axios.put(
        `https://asan-amdan-py4u.vercel.app/api/v1/gig/updateGigStatus/${gigId}`,
        { status },
        {
          headers: {
            Authorization: `${localStorage.getItem("authToken")}`,
          },
        }
      );
      const updatedGig = response.data.gig;
      setGigs((prevGigs) => prevGigs.filter((gig) => gig._id !== updatedGig._id));
      alert(`Gig ${status === "approved" ? "approved" : "rejected"} successfully!`);
    } catch (err) {
      alert(`Failed to update gig status to ${status}. Please try again.`);
    }
  };

  useEffect(() => {
    fetchPendingGigs();
  }, []);

  if (loading) return <p>Loading pending gigs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Pending Gigs</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {gigs?.map((gig) => (
          <div
            key={gig._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              width: "300px",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={gig.image}
              alt={gig.title}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <h3>{gig.title}</h3>
            <p><b>Description:</b> {gig.description}</p>
            <p><b>Experience:</b> {gig.experience} years</p>
            <p><b>Price:</b> ${gig.price}</p>
            <p><b>Availability:</b> {gig.availabilityHours}</p>
            <p><b>Location:</b> {gig.location || "Not specified"}</p>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
              <button
                style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => updateGigStatus(gig._id, "approved")}
              > 
                Approve
              </button>
              <button
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => updateGigStatus(gig._id, "rejected")}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingGigs;
