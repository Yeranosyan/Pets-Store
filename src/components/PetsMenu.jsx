import { useState } from "react";
import { useSnackbar } from "../provider/SnackbarContext";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import PSButton from "./PSButton";
import CreatePet from "./CreatePet";

function PetsMenu() {
  const [isPetCreatedOpen, setIsPetCreatedOpen] = useState(false);
  const { openSnackbarCreated, closeSnackbarCreated } = useSnackbar();

  const handlePetCreateOpen = () => {
    setIsPetCreatedOpen(true);
  };
  const handlePetCreateClose = () => {
    setIsPetCreatedOpen(false);
  };

  const onPetCreated = () => {
    setTimeout(() => {
      openSnackbarCreated();
      setTimeout(closeSnackbarCreated, 2000);
    }, 2000);
  };

  return (
    <>
      {isPetCreatedOpen && (
        <CreatePet
          isOpen={isPetCreatedOpen}
          onClose={handlePetCreateClose}
          onSuccess={onPetCreated}
        />
      )}

      <div className="table-header">
        <h2 style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/list.png"
            alt="logo"
            width={25}
            height={25}
            style={{ marginRight: "5px" }}
          />
          Pets Management
        </h2>
        <PSButton
          style={{ gap: "5px" }}
          variant="contained"
          buttonText="Add Pet"
          startIcon={<AddCircleRoundedIcon fontSize="small" />}
          onClick={handlePetCreateOpen}
        />
      </div>
    </>
  );
}

export default PetsMenu;
