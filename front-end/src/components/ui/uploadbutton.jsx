import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const UploadButton = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleProceed = () => {
    document.getElementById("file-upload-input").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      // Parse file here
    }
  };

  return (
    <div>
      <Button onClick={handleProceed}>Proceed</Button>
      <input
        type="file"
        id="file-upload-input"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadButton;
