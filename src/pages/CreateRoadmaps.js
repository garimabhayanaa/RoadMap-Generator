import React, { useState } from "react";
import axios from "axios";
import RoadMapCard from "../components/RoadMapCard";
import "../styles/roadmap.css";
import jsPDF from "jspdf";
const apiKey = process.env.REACT_APP_COHERE_API_KEY;


const parseRoadmapText = (roadmapText) => {
  const topics = roadmapText.split("\n").filter(Boolean); // Split the text into topics using double newline characters
  return topics.map((topic) => {
    const [title, description] = topic.split(" - "); // Split each topic into title and description
    return { title, description };
  });
};

const CreateRoadmap = () => {
  const [roadmap, setRoadmap] = useState([]);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [skill, setSkill] = useState("");
  const [specification, setSpecification] = useState("");

  const handleSkillChange = (e) => {
    setSkill(e.target.value);
  };

  const handleMarkAsDone = (title) => {
    setCompletedSteps((prev) => new Set(prev).add(title));
  };

  const handleSpecificationChange = (e) => {
    setSpecification(e.target.value);
  };

  const handleSaveAsPdf = () => {
    const pdfDoc = new jsPDF();

    // Set the title
    pdfDoc.setFontSize(16);
    pdfDoc.text(`Roadmap for ${skill}`, 10, 10);

    // Set the font size for the roadmap items
    pdfDoc.setFontSize(12);

    // Add each topic from the roadmap
    roadmap.forEach((topic, index) => {
      const text = `${topic.title} \n ${topic.description}\n\n`;
      pdfDoc.text(text, 10, 20 + index * 15); // Adjust Y position based on index
    });

    // Save the PDF
    const pdfBlob = pdfDoc.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `roadmap-${skill}-${specification}.pdf`;
    a.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://api.cohere.ai/v2/chat",
        {
          model: "command-a-03-2025",
          messages: [
            {
              role: "user",
              content: `Generate a roadmap for learning ${skill} with the following specification ${specification}. Please format each step as follows:
      
      1. Topic Title - Description
      
      Example:
      1. JavaScript Basics - Learn about variables and functions.
      2. React Fundamentals - Understand components and state.
      
      Do not generate anything except the steps.`
            }
          ],
          temperature: 0.5,
          max_tokens: 1024
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      console.log(response);
      const roadmapText = response.data.message.content[0].text;
      const topics = parseRoadmapText(roadmapText);
      setRoadmap(topics);
    } catch (error) {
      setError(error.response ? error.response.data : error.message); // Improved error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="RoadmapCreation">
      <div className="top-right-buttons">
        <button onClick={handleSaveAsPdf}>Save as PDF</button>
      </div>
      <h1>Create New Roadmap</h1>
      <form onSubmit={handleSubmit}>
        <div id="user-specifications">
          <label>
            Skill:
            <input placeholder="Enter skill"
              type="text"
              value={skill}
              id="skill-input"
              onChange={handleSkillChange}
            />
          </label>
          <br />
          <label id="specs">
            <div id="specification-label">Specifications: </div>
            <textarea placeholder="Clearly specify all your requirements. For example, 'beginner level in a month'  Generate again if not satisfied."
              id="specifications-input"
              value={specification}
              onChange={handleSpecificationChange}
            />
          </label>
        </div>
        <br />
        <button type="submit">Generate Roadmap</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        roadmap.length > 0 && (
          <div className="roadmap-container">
            {roadmap.map((topic, index) => (
              <div className="roadmap-node-wrapper" key={index}>
                <RoadMapCard
                  title={topic.title}
                  description={topic.description}
                  onMarkAsDone={handleMarkAsDone}
                  isCompleted={completedSteps.has(topic.title)}
                />
                {index < roadmap.length - 1 && (
                  <div className="roadmap-connection-line">
                    <svg height="50" width="200">
                      <line x1="0" y1="0" x2="200" y2="0" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      )}
      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </div>
  );
};

export default CreateRoadmap;
