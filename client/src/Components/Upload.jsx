import React from "react";
import { useState } from "react";
import axios from "axios";
import docsIcon from "./assets/docsIcon.svg";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import { Box, Button, Container } from "@mui/material";
import './style.css'

function Upload() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("No selected file");
  const [loading, setLoading] = useState(false)

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };
  const submitData = async (e) => {
    setLoading(true)
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post("http://localhost:5000/api/upload", formData);

    if(response.data){
        setLoading(false)
        setFileName("No Selected File");
        setFile(null);
    }
  };

  return (
    <Container maxWidth="sm">
      {!loading ? <Box>
        <form className="uploadForm"
          onClick={() => document.querySelector(".input-field").click()}
        >
          <input
            type="file"
            accept=".docx"
            id="input-field"
            className="input-field"
            hidden
            onChange={handleFileChange}
          />
          {file ? (
            <img src={docsIcon} width={60} height={60} alt={fileName} />
          ) : (
            <Box>
                <Box sx={{display:'flex',justifyContent:'center'}}>
              <MdCloudUpload color="#1475cf" size={60} />
                </Box>
              <p>Choose Your Docx File</p>
            </Box>
          )}
        </form>
        <Box className="uploaded-row">
          <AiFillFileImage color="#1475cf" />
          <Box>
            {fileName}
            <MdDelete
              onClick={() => {
                setFileName("No Selected File");
                setFile(null);
              }}
            />
          </Box>
        </Box>
        {file && (
          <Box>
            <Button variant="contained" onClick={submitData}>
              Submit
            </Button>
          </Box>
        )}
      </Box> : ""}
    </Container>
  );
}

export default Upload;
