// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom"; // To get the gig ID from the URL
// import "../styles/GigDetail.css";

// const GigDetailsPage = () => {
//     const { gigId } = useParams(); // Get the gig ID from the URL
//     const [gigDetails, setGigDetails] = useState(null);

//     useEffect(() => {
//         // Fetch the gig details based on the gig ID
//         axios.get(`/api/gigs/${gigId}`)
//             .then(response => {
//                 setGigDetails(response.data.gig);
//             })
//             .catch(error => {
//                 console.error("Error fetching gig details", error);
//             });
//     }, [gigId]);

//     if (!gigDetails) {
//         return <p>Loading...</p>;
//     }

//    return (
//   <div className="gig-details">
//     {/* Sidebar (Left side) */}
//     <div className="gig-details-sidebar">
//       <img
//         src={gigDetails.imageUrl} // Assume gigDetails.imageUrl contains the image URL
//         alt={gigDetails.title}
//         className="gig-image"
//       />
//       <p>{gigDetails.description}</p> {/* Description below the image */}
//     </div>

//     {/* Main Content (Right side) */}
//     <div className="gig-details-content">
//       <h2>{gigDetails.title}</h2>
//       <p className="info-item">Price: ${gigDetails.price}</p>
//       <p className="info-item">Location: {gigDetails.location}</p>
//       <p className="info-item">Orders Completed: {gigDetails.ordersCompleted}</p>
//       <p className="info-item">Overall Earnings: ${gigDetails.overallEarnings}</p>
//     </div>
//   </div>
// );

// };

// export default GigDetailsPage;
