import React from "react";
import vectorImg from '../../public/vector-img.svg';
import { useNavigate } from 'react-router-dom';
import downloadIcon from '../../public/download-icon.svg';

export default function LoginPage() {
     const navigate = useNavigate();

    function handleSubmit() {        
          navigate('/employees', { replace: true });
      }

  return (
    <div style={styles.container}>
      {/* Left Section */}
      <div style={styles.leftSection}>
        <img
          src={vectorImg}
          alt="Logo"
          style={styles.logo}
        />
        <h1 style={styles.title}>FARALLON</h1>
        <p style={styles.subtitle}>ESTABLISHED 1986</p>
      </div>

      {/* Right Section */}
      <div style={styles.rightSection}>
        <button onClick={handleSubmit} style={styles.loginButton}>
          LOGIN
          <img
            src={downloadIcon}
            alt="icon"
            style={styles.icon}
          />
        </button>

        <p style={styles.infoText}>Unable to login into your account?</p>
        <a href="#" style={styles.resetLink}>Reset Password</a>

        {/* Footer */}
        <div style={styles.footer}>
          <a href="#" style={styles.footerLink}>Privacy Policy</a>
          <span style={styles.footerDot}>•</span>
          <a href="#" style={styles.footerLink}>Terms & Conditions</a>
          <span style={styles.footerDot}>•</span>
          <p style={styles.footerLink}>© 2025 CBS Limited. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    backgroundColor: "white",
    fontFamily: "Arial, sans-serif",
  },
  leftSection: {
    backgroundColor: "#dfe2ec",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "120px",
    marginBottom: "12px",
  },
  title: {
    fontSize: "36px",
    color: "#1d3f91",
    fontWeight: 600,
    letterSpacing: "2px",
  },
  subtitle: {
    fontSize: "10px",
    marginTop: "4px",
    color: "#555",
  },
  rightSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  loginButton: {
    backgroundColor: "#1d3f91",
    color: "white",
    padding: "12px 90px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    fontSize: "14px",
    cursor: "pointer",
  },
  icon: {
    marginLeft: "10px",
  },
  infoText: {
    marginTop: "16px",
    fontSize: "12px",
    color: "gray",
  },
  resetLink: {
    marginTop: "4px",
    fontSize: "12px",
    color: "#1d3f91",
    textDecoration: "underline",
  },
  footer: {
    position: "absolute",
    bottom: "10px",
    display: "flex",
    fontSize: "10px",
    color: "gray",
    gap: "6px",
  },
  footerLink: {
    color: "gray",
    textDecoration: "none",
  },
  footerDot: {
    color: "gray",
  },
};
