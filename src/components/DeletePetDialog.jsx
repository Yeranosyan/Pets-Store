import { deletePetById } from "../api/api";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PSButton from "./PSButton";

const DeletePetDialog = ({ isOpen, onClose, selectedPet, onSuccess }) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    deletePetById(selectedPet.id)
      .then((response) => {
        if (response.status === 200) {
          console.log("Pet deleted successfully");
          navigate("/pets-table");
          onSuccess();
        } else {
          console.error("Failed to delete pet");
        }
      })
      .catch((error) => console.error("Error deleting pet:", error));
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{`Delete ${selectedPet.name} from category: ${selectedPet.category} ?`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this Pet: {selectedPet.name}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <PSButton
          buttonText="Yes"
          variant="contained"
          onClick={handleSubmit}
          autoFocus
        />
        <PSButton buttonText="No" variant="outlined" onClick={onClose} />
      </DialogActions>
    </Dialog>
  );
};

export default DeletePetDialog;
