import React from "react";

const Notifications = () => {
    const notifications = [
        "Your order 'Website Design' has been approved.",
        "The gig 'App Development' has been updated.",
        "New message from the service provider.",
    ];

    return (
        <div className="notifications">
            <h2>Notifications</h2>
            <ul>
                {notifications.map((note, index) => (
                    <li key={index}>{note}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
