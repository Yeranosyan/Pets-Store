import { useState, useEffect } from "react";
import { getUser, putUserUpdate } from "../api/api";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import PSButton from "./PSButton";

const ManageUserDialog = ({ isOpen, onClose, onSuccess }) => {
  const [user, setUser] = useState({
    id: 1,
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    userStatus: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((userUpdate) => ({
      ...userUpdate,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser("Gagik");
      console.log(response);
      if (response.status === 200) {
        console.log("User fetched successfully");
        const userData = response.data;
        setUser({
          id: userData?.id || 1,
          username: userData?.username || "",
          firstName: userData?.firstName || "",
          lastName: userData?.lastName || "",
          email: userData?.email || "",
          password: userData?.password || "",
          phone: userData?.phone || "",
          userStatus: userData?.userStatus || 1,
        });
      }
    };
    fetchUser();
  }, [isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await putUserUpdate(user.username, user);
      if (response.status === 200) {
        console.log("User updated successfully");
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{`Edit ${user.firstName} ?`}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            id="username"
            value={user?.username}
            name="username"
            label="User Name"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
          <TextField
            id="firstName"
            value={user?.firstName}
            name="firstName"
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
          <TextField
            id="lastName"
            value={user?.lastName}
            name="lastName"
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
          <TextField
            id="email"
            value={user?.email}
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
          <TextField
            id="password"
            value={user?.password}
            name="password"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
          <TextField
            id="phone"
            value={user?.phone}
            name="phone"
            label="Phone"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
          <DialogActions>
            <PSButton
              variant="outlined"
              buttonText="Cancel"
              onClick={onClose}
            />
            <PSButton
              variant="contained"
              type="submit"
              buttonText="Update"
              onClick={handleSubmit}
            />
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ManageUserDialog;
