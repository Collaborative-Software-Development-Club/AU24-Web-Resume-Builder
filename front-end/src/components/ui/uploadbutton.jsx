import React from "react";
import { Button } from "@/components/ui/button";

const UploadButton = () => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById("upload-input").click();
  };

  return (
    <div>
      <Button variant="default" onClick={handleButtonClick}>
        Upload File
      </Button>
      <input
        id="upload-input"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};