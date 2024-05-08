import React, { useState } from "react";
import axios from "axios";

interface DataType {
  postId: string;
  id: string;
  name: string;
  email: string;
  body: string;
}

interface UploadComponentProps {
  setTableData: (page: DataType[]) => void;
}

const UploadComponent: React.FC<UploadComponentProps> = ({ setTableData }) => {
  const [file, setFile] = useState<File | null>(null);
  const [progressBar, setProgressBar] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }
    setIsUploading(true);
    setErrorMessage("");
    setTableData([]);
    const formData = new FormData();
    formData.append("theCSV", file);
    try {
      await axios
        .post("http://localhost:8080/v1/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (e) => {
            if (e?.loaded && e?.total) {
              const progress = Math.round((e.loaded / e.total) * 100);
              setProgressBar(progress);
              // console.log(`Upload Progress: ${progress}%`);
            }
          },
        })
        .then((res) => setTableData(res.data));
    } catch (error: any) {
      setErrorMessage(`${error?.response.data.message}`);
    }

    setIsUploading(false);
  };

  return (
    <div style={{ boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", transition: "0.3s", margin: "10px", padding: "30px" }}>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {isUploading && <h1>Uploading... Progress: {progressBar}%</h1>}
      {errorMessage && <h1>ERROR : {errorMessage}</h1>}
    </div>
  );
};

export default UploadComponent;
