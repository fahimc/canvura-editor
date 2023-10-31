import React, { useState } from "react";
import LineWeightIcon from "@mui/icons-material/LineWeight";
import "./ObjectToolbar.css";

export const ObjectToolbar = (props: {
  setSection: (section: string) => void;
}) => {
  return (
    <div>
      <button onClick={() => props.setSection("color")}>
        <div className="color-button"></div>
      </button>
      <button onClick={() => {}}>
        <LineWeightIcon />
      </button>
    </div>
  );
};
