import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboards/AppliedOrder.css";
import { useAuth } from "../../Contexts/userContexts";

const AppliedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("pending"); // Default status to 'pending'
  const { userAuth } = useAuth();

  // Fetching orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!userAuth?.user?._id) {
          throw new Error("Client ID not available.");
        }

        const clientId = userAuth.user._id;
        const token = localStorage.getItem("authToken");

        if (!token) throw new Error("Unauthorized: No token found");

        const response = await axios.get(
          `http://localhost:4000/api/v1/orders/getClientOrders/${clientId}`,
          {
            headers: { Authorization: token },
          }
        );

        // Initially, filter orders based on the default status ('pending')
        const filtered = response.data.clientOrders.filter((order) => order.orderStatus === selectedStatus);
        
        setOrders(response.data.clientOrders); // Store all orders
        setFilteredOrders(filtered); // Initially show orders with 'pending' status
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to fetch orders");
      } finally {
        setLoading(false); // End loading state
      }
    };

    if (userAuth?.user?._id) {
      fetchOrders();
    } else {
      setLoading(false); // Avoid indefinite loading if `userAuth.user` is unavailable
    }
  }, [userAuth, selectedStatus]); // Dependency on selectedStatus to re-filter when it changes

  // Handling filter change
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    const filtered = orders.filter((order) => order.orderStatus === event.target.value);
    setFilteredOrders(filtered); // Update orders based on selected status
  };

  // Handling "Complete Order" button click
  const handleCompleteOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) throw new Error("Unauthorized: No token found");

      const response = await axios.put(
        `http://localhost:4000/api/v1/orders/updateClientOrderStatus/${orderId}`,
        {status:""},
        {
          headers: { Authorization: token },
        }
      );

      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, orderStatus: "completed" }
              : order
          )
        );
        setFilteredOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, orderStatus: "completed" }
              : order
          )
        );
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to complete order");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="applied-orders">
      <h2>My Applied Orders</h2>

      {/* Dropdown for selecting order status */}
      <div className="order-filter">
        <label htmlFor="status">Filter by Status: </label>
        <select id="status" value={selectedStatus} onChange={handleStatusChange}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders based on selected status */}
      {filteredOrders.length > 0 ? (
        <ul>
          {filteredOrders.map((order) => (
            <li key={order._id}>
              <h3>{order.orderDetails.title}</h3>
              <p><strong>Price:</strong> ${order.orderDetails.price}</p>
              <p><strong>Order Status:</strong> {order.orderStatus}</p>
              <p><strong>Payment Status:</strong> {order.payment_status}</p>
              <p><strong>Delivery Time:</strong> {order.orderDetails.delivery_time}</p>
              <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              {order.orderStatus === "in-progress" && (
                <button onClick={() => handleCompleteOrder(order._id)}>Complete Order</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found for the selected status.</p>
      )}
    </div>
  );
};

export default AppliedOrders;
