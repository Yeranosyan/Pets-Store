import { useState } from "react";
import { postPet } from "../api/api";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import PSButton from "./PSButton";

const CreatePet = ({ isOpen, onClose, onSuccess }) => {
  const [pet, setPet] = useState({
    name: "",
    category: "",
    status: "",
  });

  const handleInputChange = (e) => {
    const { name, category, status, value } = e.target;
    setPet((prevPet) => ({
      ...prevPet,
      [name]: value,
      [category]: value,
      [status]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const petData = {
      id: 1,
      name: pet.name,
      category: {
        id: 1,
        name: pet.category,
      },
      photoUrls: ["string"],
      tags: [
        {
          id: 1,
          name: "string",
        },
      ],
      status: pet.status,
    };

    postPet(petData)
      .then((response) => {
        if (response.status === 200) {
          console.log("Pet created successfully");
          onSuccess();
          onClose();
        }
      })
      .catch((error) => console.error("Error creating pet:", error));
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>{"Create New Pet"}</DialogTitle>
      <DialogContent>
        <TextField
          id="name"
          value={pet.name}
          name="name"
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />
        <TextField
          id="category"
          value={pet.category}
          name="category"
          label="Category"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />
        <FormControl fullWidth style={{ marginTop: "20px" }}>
          <InputLabel id="demo-simple-select-label">Pet status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            label="Pet status"
            id="demo-simple-select"
            value={pet.status}
            name="status"
            onChange={handleInputChange}
          >
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="sold">Sold</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <PSButton variant="outlined" buttonText="Cancel" onClick={onClose} />
        <PSButton
          variant="contained"
          type="submit"
          buttonText="Create"
          onClick={handleSubmit}
        />
      </DialogActions>
    </Dialog>
  );
};

export default CreatePet;
