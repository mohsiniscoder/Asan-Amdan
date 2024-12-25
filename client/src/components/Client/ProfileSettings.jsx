import React from "react";

const ProfileSettings = () => {
    return (
        <div className="profile-settings">
            <h2>Profile Settings</h2>
            <form>
                <label>
                    Name:
                    <input type="text" placeholder="Enter your name" />
                </label>
                <label>
                    Email:
                    <input type="email" placeholder="Enter your email" />
                </label>
                <label>
                    Password:
                    <input type="password" placeholder="Enter a new password" />
                </label>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default ProfileSettings;
