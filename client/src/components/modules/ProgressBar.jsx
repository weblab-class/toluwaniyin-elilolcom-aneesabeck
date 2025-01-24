import React, { useState, useEffect } from "react";
import "./ProgressBar.css";
import { get, post } from "../../utilities";

const ProgressBar = ({ treeId }) => {
  const [progress, setProgress] = useState(0);

  // GET Progress
  useEffect(() => {
    get(`/api/treeprogress`, { treeId })
      .then((treeResponse) => {
        console.log(treeResponse); // Ensure this logs the entire tree object
        const progress = treeResponse.progress || 0; // Default to 0 if progress is undefined
        console.log(progress);
        setProgress(progress);
      })
      .catch((err) => {
        console.error("Error fetching tree progress:", err);
      });
  }, [treeId]);

  const handleButtonClick = () => {
    if (progress < 100) {
      const updatedProgress = progress + 10;
      setProgress(updatedProgress);

      // POST progress
      post("/api/treeprogress", { treeId: treeId, progress: updatedProgress }).then(
        (updatedTreeResponse) => {
          console.log("Progress updated:", updatedTreeResponse);
        }
      );
    }
  };

  const handleButtonReset = () => {
    setProgress(0);

    // POST progress
    post(`/api/treeprogress`, { treeId: treeId, progress: 0 }).then((resetResponse) => {
      console.log("Progress reset:", resetResponse);
    });
  };

  const getColor = () => {
    if (progress < 40) {
      return "#ff0000"; // Red for low progress
    } else if (progress < 70) {
      return "#ffa500"; // Orange for medium progress
    } else {
      return "#2ecc71"; // Green for high progress
    }
  };

  // const getTree = () => {
  //   if (progress==10) {
  //       return
  //   } else if (progress ==20) {
  //       return
  //   } else if (progress ==30) {
  //       return
  //   } else if (progress ==40) {
  //       return
  //   } else if (progress ==50) {
  //       return
  //   } else if (progress ==60) {
  //       return
  //   } else if (progress ==70) {
  //       return
  //   } else if (progress ==80) {
  //       return
  //   } else if (progress ==90) {
  //       return
  //   } else {
  //       return "#2ecc71";
  // }

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{
            width: `${progress}%`,
            backgroundColor: getColor(),
          }}
        ></div>
      </div>
      <div className="progress-label">{progress}</div>
      <div
        className="tree-container"
        style={{
          transform: `scale(${0.5 + progress / 100})`, // Scale from 0.5 to 1.5 as progress grows
          transition: "transform 0.5s ease-in-out", // Smooth scaling transition
        }}
      >
        <img
          src="/grow.jpg" // Replace with the path to your tree image
          alt="Growing Tree"
          className="tree-image"
        />
      </div>
      <button className="progress-button" onClick={handleButtonClick}>
        Grow
      </button>
      <button className="progress-button" onClick={handleButtonReset}>
        Reset
      </button>
    </div>
  );
};

export default ProgressBar;
