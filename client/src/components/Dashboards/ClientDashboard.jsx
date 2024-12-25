import React, { useState } from "react";
import AppliedOrders from "../Client/AppliedOrders.jsx"; // Component to display orders the client applied for
import ProfileSettings from "../Client/ProfileSettings.jsx"; // Component for managing client profile
import Notifications from "../Client/Notifications.jsx"; // Component to display client notifications
import "../styles/Dashboards/ClientDashboard.css";

const ClientDashboard = () => {
    const [activeTab, setActiveTab] = useState("appliedOrders");

    const renderContent = () => {
        switch (activeTab) {
            case "appliedOrders":
                return <AppliedOrders />;
            case "profile":
                return <ProfileSettings />;
            case "notifications":
                return <Notifications />;
            default:
                return <h2>Select an option from the panel</h2>;
        }
    };

    return (
        <div className="client-dashboard">
            <div className="side-panel">
                <ul>
                    <li 
                        className={activeTab === "appliedOrders" ? "active" : ""}
                        onClick={() => setActiveTab("appliedOrders")}
                    >
                        Applied Orders
                    </li>
                    <li 
                        className={activeTab === "profile" ? "active" : ""}
                        onClick={() => setActiveTab("profile")}
                    >
                        Profile Settings
                    </li>
                    <li 
                        className={activeTab === "notifications" ? "active" : ""}
                        onClick={() => setActiveTab("notifications")}
                    >
                        Notifications
                    </li>
                </ul>
            </div>
            <div className="main-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default ClientDashboard;
