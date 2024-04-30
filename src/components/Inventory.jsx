import { useState, useEffect } from "react";
import { getStoreInventory } from "../api/api";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Inventory() {
  const [expanded, setExpanded] = useState(false);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const response = await getStoreInventory();
      if (response.status === 200) {
        console.log("Inventory fetched successfully");
        const inventoryData = response.data;
        setInventory({
          pending: inventoryData?.pending,
          available: inventoryData?.available, // If on the client this data is not present (Swagger API, not properly working)
        });
      }
    };
    fetchInventory();
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="inventory">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Available
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            available pets in store
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{ color: "green" }}>
            {inventory?.available}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Pending</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            pending pets in store
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{ color: "salmon" }}>
            {inventory?.pending}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
