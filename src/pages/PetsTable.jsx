import Inventory from "../components/Inventory";
import Navbar from "../components/Navbar";
import PetsMenu from "../components/PetsMenu";
import PetsList from "../components/PetsList";

function PetsManagement() {
  return (
    <>
      <Navbar />
      <PetsMenu />
      <Inventory />
      <PetsList />
    </>
  );
}

export default PetsManagement;
