import { useState } from "react";
import { putPet } from "../api/api";
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

const EditPetDialog = ({ selectedPet, isOpen, onClose, onSuccess }) => {
  const [pet, setPet] = useState({
    name: selectedPet?.name || "",
    category: selectedPet?.category?.name || "",
    status: selectedPet?.status || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPet((prevPet) => ({
      ...prevPet,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedPet?.id) return;

    const formData = new FormData();
    formData.append("name", pet.name);
    formData.append("category", pet.category);
    formData.append("status", pet.status);

    const petData = {
      id: selectedPet.id,
      name: pet.name,
      category: {
        id: selectedPet.id,
        name: pet.category,
      },
      photoUrls: ["string"],
      tags: [
        {
          id: selectedPet.id,
          name: "string",
        },
      ],
      status: pet.status,
    };

    putPet(petData)
      .then((response) => {
        if (response.status === 200) {
          console.log("Pet updated successfully");
          onSuccess();
          onClose();
        }
      })
      .catch((error) => console.error(error));
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
      <DialogTitle>{`Edit ${selectedPet?.name} ?`}</DialogTitle>
      <DialogContent>
        <TextField
          id="name"
          value={pet?.name}
          name="name"
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />
        <TextField
          id="category"
          value={pet?.category}
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
            value={pet?.status}
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
          buttonText="Update"
          onClick={handleSubmit}
        />
      </DialogActions>
    </Dialog>
  );
};

export default EditPetDialog;
