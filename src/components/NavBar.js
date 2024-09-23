// NavBar.js
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/components.css";
import logo from "../logo.png";
import CreateRoadmap from "../pages/CreateRoadmaps";
import App from "../App";
import jsPDF from "jspdf";

const NavBar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSaveAsPdf = () => {
    const pdfDoc = new jsPDF();

    // Set the title
    pdfDoc.setFontSize(16);
    pdfDoc.text(`In Today's Learning`, 10, 10);

    // Set the font size for the roadmap items
    pdfDoc.setFontSize(12);

    // Retrieve text from the textarea
    const notesText = document.getElementById("notepad").value;

    // Add the text from the textarea to the PDF
    const splitText = pdfDoc.splitTextToSize(notesText, 180); // Adjust width if necessary
    pdfDoc.text(splitText, 10, 20); // Start from Y position 20

    // Save the PDF
    const pdfBlob = pdfDoc.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `YourNotes.pdf`;
    a.click();
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src={logo}
          alt="Logo"
          onClick={() => {
            const root = ReactDOM.createRoot(document.getElementById("root"));
            root.render(<App />);
          }}
        />
      </div>
      <ul className="nav-tabs">
        <li>
          <button className="auth-button" onClick={() => {
            const root = ReactDOM.createRoot(document.getElementById("root"));
            root.render(<CreateRoadmap />);
          }}>
            Create RoadMap
          </button>
        </li>
        <li>
          <button className="auth-button" onClick={handleToggleSidebar}>
            Your Notes
          </button>
        </li>
      </ul>
      {showSidebar && (
        <div
          id="notes-area"
          className={`sidebar ${showSidebar ? "show" : ""}`}
          style={{
            width: "30%",
            height: "100vh",
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
          }}
        >
          <h3>Write now,  Save pdf later !</h3>
          <textarea id="notepad"></textarea>
          <button onClick={() => setShowSidebar(false)}>Close</button>
          <button onClick={handleSaveAsPdf}>Save PDF</button>
        </div>
      )}
      {showSidebar && (
        <div
          className="backdrop"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={() => setShowSidebar(false)}
        />
      )}
    </nav>
  );
};

export default NavBar;
