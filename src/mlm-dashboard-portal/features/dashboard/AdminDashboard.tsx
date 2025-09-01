import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard-content">
      <h1 style={{ color: "#333", fontSize: "32px", marginBottom: "20px" }}>
        Admin Dashboard
      </h1>

      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ color: "#666", marginBottom: "15px" }}>
          Welcome to MLM Admin Panel
        </h2>
        <p style={{ fontSize: "16px", lineHeight: "1.5", color: "#333" }}>
          This is your admin dashboard. You can manage users, packages, and
          system settings from here.
        </p>
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ color: "#666", marginBottom: "15px" }}>Quick Stats</h3>
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "#007bff" }}
            >
              1,234
            </div>
            <div style={{ color: "#666" }}>Total Users</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "#28a745" }}
            >
              567
            </div>
            <div style={{ color: "#666" }}>Active Users</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "#ffc107" }}
            >
              $12,345
            </div>
            <div style={{ color: "#666" }}>Revenue</div>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h3 style={{ color: "#666", marginBottom: "15px" }}>Recent Activity</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
            <span style={{ color: "#007bff" }}>•</span> New user registered - 2
            minutes ago
          </li>
          <li style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
            <span style={{ color: "#28a745" }}>•</span> Payment received - 5
            minutes ago
          </li>
          <li style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
            <span style={{ color: "#ffc107" }}>•</span> User profile updated -
            10 minutes ago
          </li>
          <li style={{ padding: "10px 0" }}>
            <span style={{ color: "#dc3545" }}>•</span> System backup completed
            - 1 hour ago
          </li>
        </ul>
      </div>

      {/* Add more content to test scrolling */}
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h4 style={{ color: "#666", marginBottom: "10px" }}>
            Section {i + 1}
          </h4>
          <p style={{ fontSize: "14px", lineHeight: "1.4", color: "#333" }}>
            This is additional content to test scrolling functionality. Section{" "}
            {i + 1} contains sample data and information.
          </p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
