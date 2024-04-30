import { Link } from "react-router-dom";
import PSButton from "../components/PSButton";

const NotFoundPage = () => {
  return (
    <div className="page-not-found">
      <h2>404 Page not found!</h2>
      <Link className="btn" to="/pets-table">
        <PSButton buttonText="Go Home" variant="contained" />
      </Link>
    </div>
  );
};

export default NotFoundPage;
