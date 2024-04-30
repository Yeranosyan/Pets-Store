import { Link } from "react-router-dom";
import PetDetails from "../components/PetDetails";
import PSButton from "../components/PSButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PetsDetails = () => {
  return (
    <>
      <div className="table-header">
        <h2 style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/details.png"
            alt="logo"
            width={25}
            height={25}
            style={{ marginRight: "5px" }}
          />
          Pets Details
        </h2>
        <Link className="btn" to="/pets-table">
          <PSButton
            style={{ gap: "5px" }}
            buttonText="Go Back"
            variant="contained"
            startIcon={<ArrowBackIcon fontSize="small" />}
          />
        </Link>
      </div>
      <PetDetails />
    </>
  );
};

export default PetsDetails;
