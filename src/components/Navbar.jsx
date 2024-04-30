import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../provider/SnackbarContext";
import ManageUserDialog from "./ManageUserDialog";
import PSButton from "./PSButton";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const Navbar = () => {
  const navigate = useNavigate();
  const { openSnackbarUserUpdated, closeSnackbarUserUpdated } = useSnackbar();
  const [isUserUpdatedOpen, setIsUserUpdatedOpen] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  const handleUserUpdateOpen = () => {
    setIsUserUpdatedOpen(true);
  };

  const handleUserUpdateClose = () => {
    setIsUserUpdatedOpen(false);
  };

  const onUserUpdated = () => {
    openSnackbarUserUpdated();
    setTimeout(closeSnackbarUserUpdated, 2000);
  };

  return (
    <>
      {isUserUpdatedOpen && (
        <ManageUserDialog
          isOpen={isUserUpdatedOpen}
          onClose={handleUserUpdateClose}
          onSuccess={onUserUpdated}
        />
      )}
      <div className="navbar">
        <div className="left">
          <img
            src="/icon.png"
            alt="logo"
            width={30}
            height={30}
            style={{ marginRight: "5px" }}
          />
          <h2>PET STORE SHOP</h2>
        </div>
        <div className="right">
          <PSButton
            style={{ marginRight: "5px" }}
            variant="contained"
            buttonText="Manage User"
            startIcon={<ManageAccountsIcon fontSize="small" />}
            onClick={handleUserUpdateOpen}
          />
          <PSButton
            variant="contained"
            buttonText="Logout"
            startIcon={<LogoutIcon fontSize="small" />}
            onClick={handleLogout}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
