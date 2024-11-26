import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Custom CSS for styling

const App = () => {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Locked");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [adminPass, setAdminPass] = useState("admin123");
  const [adminPassTyped, setAdminPassTyped] = useState("");

  const handleUnlock = async () => {
    try {
      // Send password as a query parameter
      const response = await axios.get(
        `https://finalmajorproject.onrender.com/api/unlock?password=${password}`
      );

      if (response.data === "success") {
        setStatus("Unlocked");
        setTimeout(() => setStatus("Locked"), 3000);
        // Auto-lock after 3 seconds
      } else {
        alert("Wrong Password");
      }
    } catch (error) {
      alert("Wrong Password");
      console.error("Error unlocking the door:", error);
    }
  };

  const handleChangePassword = async () => {
    if (adminPass !== adminPassTyped) {
      alert("Admin Password is Wrong.");
      return;
    }

    try {
      const response = await axios.post(
        "https://finalmajorproject.onrender.com/api/change-password",
        {
          currentPassword,
          newPassword,
          adminPassword: adminPassTyped, // Include admin password in the request
        }
      );
      if (response.data.success) {
        alert("Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setAdminPassTyped("");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(response.data.message);
      console.error("Error changing password:", error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="heading">IoT-Based Access Control System</h1>
        <p className={`status ${status.toLowerCase()}`}>Status: {status}</p>

        {/* Unlock Section */}
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="input"
          />
          <button onClick={handleUnlock} className="btn primary">
            Unlock Door
          </button>
        </div>

        {/* Change Password Section */}
        <h2 className="sub-heading">Change Password</h2>
        <div className="form-group">
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current Password"
            className="input"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="input"
          />
          <input
            type="password"
            value={adminPassTyped}
            onChange={(e) => setAdminPassTyped(e.target.value)}
            placeholder="Admin Password"
            className="input"
          />
          <button onClick={handleChangePassword} className="btn secondary">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
