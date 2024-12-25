import React, { useEffect, useState } from "react";
import axios from "axios";
import { ServiceProviderAuth, useServiceProviderAuth } from "../../Contexts/serviceProviderContexts";

const ServiceProviderOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {serviceProviderAuth,setServiceProviderAuth}=useServiceProviderAuth();

  const serviceProviderId = serviceProviderAuth?.user?._id;

  // Fetch orders for the service provider
  const fetchOrders = async () => {
    if(!serviceProviderId){
        alert("No service provider");
        return;
    }
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/orders/getServiceProviderOrders/${serviceProviderId}`,{
            headers: {
              Authorization: `${localStorage.getItem('Token')}`,
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
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4", borderBottom: "1px solid #ddd" }}>
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
                <td style={{ padding: "10px" }}>{order.orderDetails?.title || "N/A"}</td>
                <td style={{ padding: "10px" }}>${order.orderDetails?.price || "0.00"}</td>
                <td style={{ padding: "10px" }}>{order.orderStatus || "Pending"}</td>
                <td style={{ padding: "10px" }}>
                  {/* Example of actions: View or Update */}
                  <button
                    onClick={() => alert(`View Order ${order._id}`)}
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
                    View
                  </button>
                  <button
                    onClick={() => alert(`Update Order ${order._id}`)}
                    style={{
                      backgroundColor: "#008CBA",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                      borderRadius: "3px",
                    }}
                  >
                    Update
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
