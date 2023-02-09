import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import jsPDF from "jspdf";
import { Box, Container } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
}));

const Search = () => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
    } catch (error) {
      console.error(error);
    }
  };
  const handleDownload = () => {
    const pdf = new jsPDF("p", "pt", "letter");
    const pageHeight = pdf.internal.pageSize.height;

    let content = selected;
    let lines = content.split("\n");
    let y = 40;
    for (let i = 0; i < lines.length; i++) {
      let textLines = pdf.splitTextToSize(
        lines[i],
        pdf.internal.pageSize.width - 40
      );
      for (let j = 0; j < textLines.length; j++) {
        if (y + 20 > pageHeight) {
          pdf.addPage();
          y = 40;
        }
        pdf.text(20, y, textLines[j]);
        y += 20;
      }
    }

    pdf.save("document.pdf");
    setSelected(null);
  };

  const submitSearchTerm = async (e) => {
    if(!searchTerm == ""){
      const response = await axios.get(
        `http://localhost:5000/api/search?term=${searchTerm}`
      );
      setResults(response.data);
    }
  }

  return (
    <form>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            id="search-term"
            label="Search Term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </Grid>
        <Grid item xs={12}>


          <Button style={{marginTop:"2rem"}} variant="contained" color="primary" onClick={submitSearchTerm} >
            Search
          </Button>
        </Grid>
        <Grid item xs={12}>
          {results.map((file) => (
            <Container >

            <Paper key={file._id} className={classes.root}>
              <p>{file.filename}</p>
              <p>{file.content}</p>
              {selected == null ? (
                <Button
                variant="contained" color="primary"
                key={file._id}
                onClick={() => {
                  window.scrollTo(0, document.body.scrollHeight)
                  setSelected(file.content)}}
                >
                  Select Docs
                </Button>
              ) : (
                ""
              )}
            </Paper>
                </Container>
          ))}
          {selected && (
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              {selected&&<h4 style={{color:'#28bf02',textTransform:"uppercase"}}>✅ File Selected</h4>}
              <Button variant="contained" color="primary" onClick={handleDownload}>
                Download PDF
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default Search;
