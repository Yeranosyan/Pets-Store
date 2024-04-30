import { useEffect, useState } from "react";
import { getPetById, postOrder } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PSButton from "./PSButton";

const OrderPetDialog = ({ isOpen, onClose, onSuccess }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedPetName, setSelectedPetName] = useState("");
  const [selectedPetCategory, setSelectedPetCategory] = useState("");

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await getPetById(id);
        if (response.data && typeof response.data === "object") {
          const { name, category } = response.data;
          const categoryName = category ? category.name : "";
          setSelectedPetName(name);
          setSelectedPetCategory(categoryName);
        } else {
          console.error("Response data is not an object:", response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPet();
  }, [id]);

  const orderPetData = {
    id: 10,
    petId: 198772,
    quantity: 7,
    shipDate: "2024-04-23",
    status: "approved",
    complete: true,
  };

  const handleSubmit = () => {
    postOrder(orderPetData)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          console.log("Pet ordered successfully");
          navigate("/pets-table");
          onSuccess();
        } else {
          console.error("Failed to order pet");
        }
      })
      .catch((error) => console.error("Error ordering pet:", error));
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        {`You want to order pet ${selectedPetName}, from category ${selectedPetCategory}?`}
        <br />
        <span style={{ color: "green" }}>
          Your pet order ID: {orderPetData.petId}
        </span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{`Your shipping date will be: ${orderPetData.shipDate}`}</DialogContentText>
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

export default OrderPetDialog;
