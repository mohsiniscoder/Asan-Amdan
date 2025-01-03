import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useServiceProviderAuth } from "../../Contexts/serviceProviderContexts";
import "../styles/CreateGig/UpdateGig.css";

const UpdateGig = () => {
    const { id } = useParams(); // Extract gigId from URL params
    const navigate = useNavigate();
    const { serviceProviderAuth } = useServiceProviderAuth();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        experience: "",
        price: "",
        availabilityHours: "",
        category: "",
        isTechnical: false,
    });

    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch the gig details based on the gigId from URL
    useEffect(() => {
        if (id) {
            const fetchGigDetails = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(
                        `https://asan-amdan-py4u.vercel.app/api/v1/gig/getGigById/${id}`,
                        {
                            headers: {
                                Authorization: `${serviceProviderAuth.token}`,
                            },
                        }
                    );

                    if (response.data.success) {
                        const gig = response.data.gig;
                        const [start, end] = gig.availabilityHours.split(" - ");

                        setFormData({
                            title: gig.title,
                            description: gig.description,
                            experience: gig.experience,
                            price: gig.price,
                            availabilityHours: gig.availabilityHours,
                            category: gig.category,
                            isTechnical: gig.isTechnical,
                        });

                        setStartTime(start);
                        setEndTime(end);
                    } else {
                        setError(response.data.msg || "Failed to fetch gig details.");
                    }
                } catch (err) {
                    console.error("Error fetching gig details:", err);
                    setError("Server error, please try again.");
                } finally {
                    setLoading(false);
                }
            };

            fetchGigDetails();
        }
    }, [id, serviceProviderAuth.token]);

    // Update availabilityHours dynamically when startTime or endTime changes
    useEffect(() => {
        if (startTime && endTime) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                availabilityHours: `${startTime} - ${endTime}`,
            }));
        }
    }, [startTime, endTime]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:4000/api/v1/gig/updateGig/${id}`,
                {
                    ...formData,
                    startTime,
                    endTime,
                },
                {
                    headers: {
                        Authorization: `${serviceProviderAuth.token}`,
                    },
                }
            );
            console.log("this response when updating gig",response.data);
            if (response.data.success) {
                navigate(`/service-provider-dashboard`); // Redirect after successful update
            } else {
                setError(response.data.msg || "Failed to update gig.");
            }
        } catch (err) {
            setError("Failed to update gig. Please try again.");
        }
    };

    return (
        <div className="update-gig-container">
          <h2>Update Gig</h2>
          <form onSubmit={handleSubmit} className="update-gig-form">
            {/* Error and Success Messages */}
            {loading && <p className="update-success">Loading...</p>}
            {error && <p className="update-error">{error}</p>}
      
            {/* Form Rows */}
            <div className="update-form-row">
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  placeholder="Enter Gig Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
      
            <div className="update-form-row">
              <label>
                Description:
                <textarea
                  name="description"
                  placeholder="Enter Gig Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </label>
            </div>
      
            <div className="update-form-row price-experience-row">
              <label>
                Price ($):
                <input
                  type="number"
                  name="price"
                  placeholder="Enter Price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Experience (Years):
                <input
                  type="number"
                  name="experience"
                  placeholder="Years of Experience"
                  value={formData.experience}
                  onChange={handleChange}
                  min="0"
                  max="50"
                  required
                />
              </label>
            </div>
      
            <div className="update-form-row time-row">
              <div className="update-time-input">
                <label>
                  Start Time:
                  <input
                    type="time"
                    name="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="update-time-input">
                <label>
                  End Time:
                  <input
                    type="time"
                    name="endTime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                </label>
              </div>
            </div>
      
            <div className="update-form-row">
              <label>
                Availability Hours:
                <input
                  type="text"
                  name="availabilityHours"
                  placeholder="Availability Hours"
                  value={formData.availabilityHours}
                  readOnly
                />
              </label>
            </div>
      
            {/* Submit Button */}
            <button type="submit" className="update-submit-btn">
              Update Gig
            </button>
          </form>
        </div>
      );
      
      
      
      
      
    
    
};

export default UpdateGig;
