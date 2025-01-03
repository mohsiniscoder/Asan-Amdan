import React, { useEffect, useState } from "react";
import axios from "axios";
import { useServiceProviderAuth } from "../../Contexts/serviceProviderContexts";

const ServiceProviderOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { serviceProviderAuth } = useServiceProviderAuth();

  const serviceProviderId = serviceProviderAuth?.user?._id;

  // Fetch orders for the service provider
  const fetchOrders = async () => {
    if (!serviceProviderId) {
      alert("No service provider");
      return; 
    }
    try {
      const response = await axios.get(
        `https://asan-amdan-py4u.vercel.app/api/v1/orders/getServiceProviderOrders/${serviceProviderId}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("Token")}`,
          },
        }
      );
      setOrders(response.data.providerOrders || []);
    } catch (err) {
      setError("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Approve order (update status to "in-progress")
  const handleApprove = async (orderId) => {
    try {
      await axios.put(
        `https://asan-amdan-py4u.vercel.app/api/v1/orders/updateServiceProviderOrderStatus/${orderId}`,
        { status: "in-progress" },
        {
          headers: {
            Authorization: `${localStorage.getItem("Token")}`,
          },
        }
      );
      alert("Order approved successfully!");
      fetchOrders(); // Refresh orders after updating
    } catch (err) {
      console.error("Failed to approve order", err);
      alert("Failed to approve order. Please try again.");
    }
  };
  const handleReject = async (orderId) => {
    try {
      await axios.put(
        `https://asan-amdan-py4u.vercel.app/api/v1/orders/updateServiceProviderOrderStatus/${orderId}`,
        { status: "cancelled" },
        {
          headers: {
            Authorization: `${localStorage.getItem("Token")}`,
          },
        }
      );
      alert("Order cancelled successfully!");
      fetchOrders(); // Refresh orders after updating
    } catch (err) {
      console.error("Failed to reject order", err);
      alert("Failed to reject order. Please try again.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="service-provider-orders-container">
      <h1>Received Orders</h1>
      {orders.length === 0 ? (
        <p>No orders received yet.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#f4f4f4",
                borderBottom: "1px solid #ddd",
              }}
            >
              <th style={{ padding: "10px", textAlign: "left" }}>Order ID</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Title</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Price</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Status</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{order._id}</td>
                <td style={{ padding: "10px" }}>
                  {order.orderDetails?.title || "N/A"}
                </td>
                <td style={{ padding: "10px" }}>
                  ${order.orderDetails?.price || "0.00"}
                </td>
                <td style={{ padding: "10px" }}>{order.orderStatus || "Pending"}</td>
                <td style={{ padding: "10px" }}>
                  <button
                    onClick={() => handleApprove(order._id)}
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      marginRight: "5px",
                      cursor: "pointer",
                      borderRadius: "3px",
                    }}
                  >
                    Approve
                  </button>
                  <button
                   onClick={() => handleReject(order._id)}
                    style={{
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                      borderRadius: "3px",
                    }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ServiceProviderOrders;
