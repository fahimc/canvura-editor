import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./NumberInput.css";
export const NumberInput = (props: {
  fontSize: number;
  setFontSize: (value: number) => void;
}) => {
  return (
    <div className="input-number">
      <button
        onClick={() =>
          props.setFontSize(props.fontSize - 1 > 0 ? props.fontSize - 1 : 0)
        }
      >
        <RemoveIcon />
      </button>
      <input
        value={props.fontSize}
        onChange={(e) => {
          props.setFontSize(Number(e.target.value) as any);
        }}
      />
      <button onClick={() => props.setFontSize(props.fontSize + 1)}>
        <AddIcon />
      </button>
    </div>
  );
};
