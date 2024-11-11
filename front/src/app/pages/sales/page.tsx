"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import SalesListCard from "./components/SalesListCard";
import SalesListTable from "./components/SalesListTable";
import CardIcon from '@mui/icons-material/ViewComfy';
import TableIcon from "@mui/icons-material/TableRows";

const SalesList: React.FC = () => {
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const router = useRouter();

  useEffect(() => {
    const savedViewMode = localStorage.getItem("viewMode") as "cards" | "table";
    if (savedViewMode) {
      setViewMode(savedViewMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  return (
    <div className="flex flex-col items-end w-3/5">
      <div className="flex gap-4 w-full justify-end mb-4">
        <div className="flex gap-4">
          <Button
            sx={{
              backgroundColor: viewMode === "cards" ? "#6B7280" : "#9CA3AF",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#6B7280",
              },
            }}
            variant="contained"
            size="small"
            onClick={() => setViewMode("cards")}
          >
            <CardIcon />
          </Button>
          <Button
            sx={{
              backgroundColor: viewMode === "table" ? "#6B7280" : "#9CA3AF",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#6B7280",
              },
            }}
            variant="contained"
            size="small"
            onClick={() => setViewMode("table")}
          >
            <TableIcon />
          </Button>
        </div>
      </div>
      {viewMode === "cards" ? <SalesListCard /> : <SalesListTable />}
    </div>
  );
};

export default SalesList;
