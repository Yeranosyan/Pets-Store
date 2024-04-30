import { useEffect, useState } from "react";
import { getPets } from "../api/api";
import { Link } from "react-router-dom";
import { useSnackbar } from "../provider/SnackbarContext";
import PSButton from "./PSButton";
import CustomSnackbar from "./CustomSnackbar";
import SelectPetsStatus from "./SelectPetsStatus";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

export default function PetsList() {
  const {
    isSnackbarOpenUserCreated,
    closeSnackbarUserCreated,

    isSnackbarOpenUserLogged,
    closeSnackbarLogged,

    isSnackbarUserUpdate,
    closeSnackbarUserUpdated,

    isSnackbarOpenCreated,
    closeSnackbarCreated,

    isSnackbarOpenDelete,
    closeSnackbarDelete,

    isSnackbarOpenOrder,
    closeSnackbarOrder,
  } = useSnackbar();

  const [pets, setPets] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState("available");

  useEffect(() => {
    const fetchPets = async () => {
      let petsStatus = [];
      try {
        petsStatus = await getPets(selectedStatus);

        petsStatus = petsStatus.data.map(({ id, name, category, status }) => ({
          id,
          name,
          category: category ? category.name : "",
          status,
        }));
        setPets(petsStatus);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPets("available");
  }, [selectedStatus]);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  return (
    <>
      <CustomSnackbar
        open={isSnackbarOpenUserCreated}
        onClose={closeSnackbarUserCreated}
        message="User was created successfully."
      />
      <CustomSnackbar
        open={isSnackbarOpenUserLogged}
        onClose={closeSnackbarLogged}
        message="User was logging successfully."
      />
      <CustomSnackbar
        open={isSnackbarUserUpdate}
        onClose={closeSnackbarUserUpdated}
        message="User was updated successfully."
      />
      <CustomSnackbar
        open={isSnackbarOpenCreated}
        onClose={closeSnackbarCreated}
        message="Pet was created successfully."
      />
      <CustomSnackbar
        open={isSnackbarOpenDelete}
        onClose={closeSnackbarDelete}
        message="Pet was deleted successfully."
      />
      <CustomSnackbar
        open={isSnackbarOpenOrder}
        onClose={closeSnackbarOrder}
        message="Pet was ordered successfully."
      />
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "74rem",
          maxHeight: "470px",
          margin: "auto",
        }}
      >
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <SelectPetsStatus
                  style={{ width: "100px" }}
                  onStatusChange={handleStatusChange}
                />
              </TableCell>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center" style={{ width: "100px" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pets.map((pet) => (
              <TableRow
                key={pet.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  align="center"
                  style={{
                    width: "130px",
                  }}
                >
                  {pet.status}
                </TableCell>
                <TableCell align="center">{pet.id}</TableCell>
                <TableCell align="center" scope="row">
                  {pet.name}
                </TableCell>
                <TableCell align="center">{pet.category}</TableCell>
                <TableCell
                  align="center"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <Link
                    style={{
                      textDecoration: "none",
                    }}
                    to={`/details/${pet.id}/${pet.name}/${pet.category}/${pet.status}`}
                  >
                    <PSButton
                      variant="contained"
                      buttonText="Details"
                      startIcon={<InfoRoundedIcon fontSize="small" />}
                    />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
