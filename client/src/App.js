import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Search from "./Components/Search";
import Upload from "./Components/Upload";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Upload" value="1" />
            <Tab label="Search" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Upload />
        </TabPanel>
        <TabPanel value="2">
          <Search />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
