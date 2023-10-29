import React, { useState } from "react";
import "./ObjectToolbar.css";

export const ObjectToolbar = (props: {
  setSection: (section: string) => void;
}) => {
  return (
    <div>
      <button onClick={() => props.setSection("color")}>
        <div className="color-button"></div>
      </button>
    </div>
  );
};
