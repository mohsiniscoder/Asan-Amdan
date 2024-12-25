import React from "react";

const AppliedOrders = () => {
    const orders = [
        { id: 1, title: "Website Design", status: "Pending" },
        { id: 2, title: "App Development", status: "In Progress" },
        { id: 3, title: "Logo Creation", status: "Completed" },
    ];

    return (
        <div className="applied-orders">
            <h2>My Applied Orders</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        <h3>{order.title}</h3>
                        <p>Status: {order.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppliedOrders;
