import React, { createElement, useEffect, useRef, useState } from "react";
import PaletteIcon from "@mui/icons-material/Palette";
import { HexColorPicker } from "react-colorful";
import { useDetectClickOutside } from "react-detect-click-outside";
import { solidColourPalette } from "../../util/colors";

export interface ColorPanelProps {
  setBgColor: (color: string) => void;
}
export const ColorPanel = (props: ColorPanelProps) => {
  const [showColourOverlay, setShowColourOverlay] = useState(false);
  const [userColors, setUserColors] = useState<string[]>([]);
  const [color, setColor] = useState("#aabbcc");
  const colorOverlayRef = useDetectClickOutside({
    onTriggered: () => {
      if (!userColors.find((item) => item === color)) {
        console.log(userColors, color);
        setUserColors([...userColors, color]);
        setShowColourOverlay(false);
      }
    },
  });
  function setOverlayColor(c: string) {
    props.setBgColor(c);
    setColor(c);
  }
  return (
    <div className="color-section">
      <div className="color-title">
        <PaletteIcon
          sx={{
            marginRight: "10px",
            width: "24px",
            color: "var( --dark-font-color)",
          }}
        />{" "}
        <span>Document colours</span>
      </div>
      <div className="color-container">
        <div
          className="color-item color-picker"
          onClick={() => setShowColourOverlay(!showColourOverlay)}
        >
          <span className="plus-container">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M7.25 13.25a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5Z"
              ></path>
            </svg>
          </span>
        </div>
        <div
          ref={colorOverlayRef}
          className={`colour-picker-overlay ${showColourOverlay && "show"}`}
        >
          <HexColorPicker color={color} onChange={setOverlayColor} />
          <input
            type="text"
            value={color}
            onInput={(e: any) => setOverlayColor(e.target.value)}
          />
        </div>
      </div>
      <div className="color-title">
        <PaletteIcon
          sx={{
            marginRight: "10px",
            width: "24px",
            color: "var( --dark-font-color)",
          }}
        />{" "}
        <span>Brand kit</span>
      </div>
      <div className="color-container">
        {userColors?.map((item) => {
          return (
            <div
              className="color-item"
              style={{ backgroundColor: item }}
              onClick={() => props.setBgColor(item)}
            ></div>
          );
        })}
      </div>
      <div className="color-title">
        <PaletteIcon
          sx={{
            marginRight: "10px",
            width: "24px",
            color: "var( --dark-font-color)",
          }}
        />{" "}
        <span>Default colours</span>
      </div>
      <div className="color-container">
        {solidColourPalette?.map((item) => {
          return (
            <div
              className="color-item"
              style={{ backgroundColor: item.color }}
              onClick={() => props.setBgColor(item.color)}
            ></div>
          );
        })}
      </div>
    </div>
  );
};
