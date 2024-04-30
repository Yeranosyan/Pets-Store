import { useEffect, useState } from "react";
import { getPetById } from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "../provider/SnackbarContext";
import PSButton from "./PSButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DriveFileRenameOutlineSharpIcon from "@mui/icons-material/DriveFileRenameOutlineSharp";
import DeletePetDialog from "./DeletePetDialog";
import OrderPetDialog from "./OrderPetDialog";
import EditPetDialog from "./EditPetDialog";
import CustomSnackbar from "./CustomSnackbar";

const PetDetails = () => {
  const { id } = useParams();
  const { isSnackbarOpenUpdate, openSnackbarUpdate, closeSnackbarUpdate } =
    useSnackbar();
  const navigate = useNavigate();
  const [petDetailsData, setPetDetailsData] = useState([]);
  const [selectedPet, setSelectedPet] = useState({});
  const [petUpdated, setPetUpdated] = useState(false);
  const [isPetUpdatedOpen, setIsPetUpdatedOpen] = useState(false);
  const [isPetDeleteOpen, setIsPetDeleteOpen] = useState(false);
  const [isPetOrderOpen, setIsPetOrderOpen] = useState(false);
  const {
    openSnackbarDelete,
    closeSnackbarDelete,

    openSnackbarPetOrder,
    closeSnackbarPetOrder,
  } = useSnackbar();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await getPetById(id);
        if (response.data && typeof response.data === "object") {
          const { id, name, category, status } = response.data;
          setPetDetailsData([
            { id, name, category: category ? category.name : "", status },
          ]);
          setSelectedPet({ id, name, category, status });
        } else {
          console.error("Response data is not an object:", response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPet();
  }, [id, petUpdated]);

  const handlePetDeleteOpen = (pet) => {
    setSelectedPet(pet);
    setIsPetDeleteOpen(true);
  };

  const handlePetDeleteClose = () => {
    setIsPetDeleteOpen(false);
  };

  const onPetDeleted = () => {
    navigate("/pets-table");
    setTimeout(() => {
      openSnackbarDelete();
      setTimeout(closeSnackbarDelete, 2000);
    }, 2000);
  };

  const handlePetOrderOpen = (pet) => {
    setSelectedPet(pet);
    setIsPetOrderOpen(true);
  };
  const handlePetOrderClose = () => {
    setIsPetOrderOpen(false);
  };

  const onPetOrder = () => {
    navigate("/pets-table");
    setTimeout(() => {
      openSnackbarPetOrder();
      setTimeout(closeSnackbarPetOrder, 2000);
    }, 2000);
  };
  const handlePetUpdateOpen = (pet) => {
    setIsPetUpdatedOpen(true);
    setSelectedPet(pet);
  };
  const handlePetUpdateClose = () => {
    setIsPetUpdatedOpen(false);
  };
  const onPetUpdated = () => {
    setPetUpdated(openSnackbarUpdate);
    setTimeout(() => {
      setTimeout(closeSnackbarUpdate, 2000);
    }, 2000);
  };

  const statusColorSelectedPet = (status) => {
    switch (status) {
      case "available":
        return "#6A994E";
      case "pending":
        return "#F68E5F";
      case "sold":
        return "#BC4749";
      default:
        return "";
    }
  };
  const availableToOrder = (status) => {
    if (status === "available") {
      return (
        <PSButton
          variant="contained"
          buttonText="Order"
          startIcon={<ShoppingCartIcon fontSize="small" />}
          onClick={handlePetOrderOpen}
        />
      );
    }
  };

  return (
    <>
      {isPetUpdatedOpen && (
        <EditPetDialog
          selectedPet={selectedPet}
          isOpen={isPetUpdatedOpen}
          onSuccess={onPetUpdated}
          onClose={handlePetUpdateClose}
        />
      )}
      <CustomSnackbar
        open={isSnackbarOpenUpdate}
        onClose={closeSnackbarUpdate}
        message="Pet was updated successfully."
      />
      {isPetDeleteOpen && (
        <DeletePetDialog
          isOpen={isPetDeleteOpen}
          onClose={handlePetDeleteClose}
          selectedPet={selectedPet}
          onSuccess={onPetDeleted}
        />
      )}
      {isPetOrderOpen && (
        <OrderPetDialog
          isOpen={isPetOrderOpen}
          onClose={handlePetOrderClose}
          onSuccess={onPetOrder}
          selectedPet={selectedPet}
        />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          textAlign: "center",
          alignItems: "center",
          marginTop: "4rem",
        }}
      >
        {petDetailsData.map((pet) => (
          <div key={pet.id} style={{ textAlign: "left" }}>
            <h3 style={{ margin: "5px 0" }}>Pet ID</h3>
            <p style={{ margin: "5px 0 10px" }}>{pet.id}</p>
            <h3 style={{ margin: "5px 0" }}>Pet Name</h3>
            <p style={{ margin: "5px 0 10px" }}>{pet.name}</p>
            <h3 style={{ margin: "5px 0" }}>Pet Category</h3>
            <p style={{ margin: "5px 0 10px" }}>{pet.category}</p>
            <h3 style={{ margin: "5px 0" }}>Pet Status</h3>
            <p
              style={{
                maxWidth: "70px",
                margin: "5px 0 10px",
                padding: "5px 10px",
                color: "white",
                backgroundColor: statusColorSelectedPet(selectedPet.status),
                borderRadius: "5px",
                textAlign: "center",
              }}
            >
              {pet.status}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <h3 style={{ textAlign: "left" }}>Actions</h3>
              {availableToOrder(selectedPet.status)}
              <PSButton
                variant="outlined"
                buttonText="Edit"
                onClick={() => handlePetUpdateOpen(pet)}
                startIcon={<DriveFileRenameOutlineSharpIcon fontSize="small" />}
              />
              <PSButton
                variant="outlined"
                buttonText="Delete"
                startIcon={<DeleteIcon fontSize="small" />}
                onClick={() => handlePetDeleteOpen(pet)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PetDetails;
