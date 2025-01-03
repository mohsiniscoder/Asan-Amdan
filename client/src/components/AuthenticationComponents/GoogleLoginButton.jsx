import React from "react";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.open("https://asan-amdan-py4u.vercel.app/api/v1/auth/google", "_self");
  };

  return (
    <button onClick={handleGoogleLogin} style={buttonStyles}>
      Login with Google
    </button>
  );
};

const buttonStyles = {
  backgroundColor: "#4285F4",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
};

export default GoogleLoginButton;
