import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectPetsStatus = ({ onStatusChange }) => {
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleChange = (event) => {
    const status = event.target.value;
    setSelectedStatus(status);
    onStatusChange(status);
  };

  return (
    <Box maxWidth={130}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Pets status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedStatus}
          label="Pets status"
          onChange={handleChange}
        >
          <MenuItem value="available">Available</MenuItem>
          <MenuItem value="sold">Sold</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectPetsStatus;
