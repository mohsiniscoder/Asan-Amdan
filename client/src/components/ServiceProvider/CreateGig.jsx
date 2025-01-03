import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/CreateGig/MakeGig.css";
import { useServiceProviderAuth } from "../../Contexts/serviceProviderContexts";

const CreateGig = () => {
  const { serviceProviderAuth } = useServiceProviderAuth();

  const [categories, setCategories] = useState([]);
  const [gigData, setGigData] = useState({
    title: "",
    description: "",
    price: "",
    experience: "",
    availabilityHours: "",
    categoryId: "",
    isTechnical: false,
    image: null,
  });

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          https://asan-amdan-py4u.vercel.app/api/v1/categories/getCategoriesByType",
          {
            params: { isTechnical: gigData.isTechnical },
            headers: {
              Authorization: `${serviceProviderAuth.token}`,
            },
          }
        );
        setCategories(response.data.categories || []);
      } catch (err) {
        setError("Failed to load categories. Please try again.");
      }
    };

    fetchCategories();
  }, [gigData.isTechnical, serviceProviderAuth.token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGigData({
      ...gigData,
      [name]: value,
    });
  };

  const handleTimeChange = () => {
    // Format the availabilityHours when startTime or endTime changes
    if (startTime && endTime) {
      setGigData({
        ...gigData,
        availabilityHours: `${startTime} - ${endTime}`,
      });
    }
  };

  useEffect(() => {
    handleTimeChange();
  }, [startTime, endTime]);

  const handleCheckboxChange = (e) => {
    setGigData({
      ...gigData,
      isTechnical: e.target.checked,
      categoryId: "", // Reset selected category
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGigData({ ...gigData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Submit button clicked");
    try {
      const formDataToUpload = new FormData();
      formDataToUpload.append("file", gigData.image);
      formDataToUpload.append("upload_preset", "sp-cnic");
  
      // Upload the image to Cloudinary
      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dfw3oi6am/image/upload",
        formDataToUpload
      );
  
      const imageUrl = uploadResponse?.data?.secure_url;

      if (!imageUrl) {
        setError("Image upload failed. Please try again.");
        return;
      }
  
      // Prepare data to send to the server (with service provider's ID and token)
      const dataToSend = {
        title: gigData.title,
        description: gigData.description,
        price: gigData.price,
        experience: gigData.experience,
        availabilityHours: gigData.availabilityHours,
        categoryId: gigData.categoryId,
        serviceProviderId: serviceProviderAuth.user._id,
        isTechnical: gigData.isTechnical,
        image: imageUrl,
      };

      console.log("it is data to send to the server while adding gig",dataToSend);

      const response = await axios.post(
        `http://localhost:4000/api/v1/gig/createGig/${dataToSend.serviceProviderId}`,
        dataToSend,
        {
          headers: {
            Authorization: `${serviceProviderAuth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response from server while adding gig", response);

      setSuccess("Gig created successfully!");
      setError("");
      setGigData({
        title: "",
        description: "",
        price: "",
        availabilityHours: "",
        categoryId: "",
        isTechnical: false,
        image: null,
      });
      setImagePreview(null);
      setStartTime("");
      setEndTime("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create gig. Please try again.");
      setSuccess("");
    }
  };
  

  return (
    <div className="unique-create-gig-container">
    <h2>Create a Gig</h2>
    <form onSubmit={handleSubmit} className="unique-create-gig-form">
      {error && <p className="unique-error">{error}</p>}
      {success && <p className="unique-success">{success}</p>}

      {/* Gig Title */}
      <div className="unique-form-row">
        <input
          type="text"
          name="title"
          placeholder="Gig Title"
          value={gigData.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Gig Description */}
      <div className="unique-form-row">
        <textarea
          name="description"
          placeholder="Gig Description"
          value={gigData.description}
          onChange={handleChange}
          rows="5"
          required
        ></textarea>
      </div>

      {/* Price and Experience */}
      <div className="unique-form-row">
        <input
          type="number"
          name="price"
          placeholder="Price ($)"
          value={gigData.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="experience"
          placeholder="Experience"
          value={gigData.experience}
          onChange={handleChange}
          required
          min="0"
          step="1"
          max="50"
        />
      </div>

      {/* Start Time and End Time */}
      <div className="unique-form-row">
        <div className="unique-time-input">
          <label>Start Time:</label>
          <input
            type="time"
            name="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        <div className="unique-time-input">
          <label>End Time:</label>
          <input
            type="time"
            name="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Availability Hours and Image Upload */}
      <div className="unique-form-row hours-row">
        <input
          type="text"
          name="availabilityHours"
          placeholder="Availability Hours"
          value={gigData.availabilityHours}
          readOnly
          onChange={handleChange}
        />
        <div className="unique-image-upload">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && <img src={imagePreview} alt="Preview" className="unique-image-preview" />}
        </div>
      </div>

      {/* Category and Is Technical */}
      <div className="unique-form-row">
        <select
          name="categoryId"
          value={gigData.categoryId}
          onChange={handleChange}
          required
        >
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="unique-checkbox">
          <label htmlFor="isTechnical">Is this a Technical Gig?</label>
          <input
            type="checkbox"
            id="isTechnical"
            name="isTechnical"
            checked={gigData.isTechnical}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="unique-form-row">
        <button type="submit" className="unique-submit-btn">
          Create Gig
        </button>
      </div>
    </form>
  </div>
    );
  
};

export default CreateGig;
