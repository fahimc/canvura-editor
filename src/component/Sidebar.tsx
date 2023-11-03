import React, { createElement, useEffect, useRef, useState } from "react";
import PaletteIcon from "@mui/icons-material/Palette";
import { HexColorPicker } from "react-colorful";
import { useDetectClickOutside } from "react-detect-click-outside";
import "./Sidebar.css";
import {
  ViewQuilt,
  Interests,
  Title,
  Upload,
  NavigateBefore,
} from "@mui/icons-material";
import { solidColourPalette } from "../util/colors";

export type SectionType =
  | "design"
  | "elements"
  | "upload"
  | "position"
  | "color"
  | "text"
  | "";
export const Sidebar = (props: {
  createElement: (item: any) => void;
  handleImage: (e: any) => void;
  showPosition: boolean;
  section: string;
  updateSection: (section: string) => void;
  setBgColor: (color: string) => void;
  layers?: any[];
  showSection?: string;
}) => {
  const [showContent, setShowContent] = useState(false);
  const [userColors, setUserColors] = useState<string[]>([]);
  const [showColourOverlay, setShowColourOverlay] = useState(false);
  const [color, setColor] = useState("#aabbcc");
  const [sectionType, setSection] = useState<SectionType>("");
  const colorOverlayRef = useDetectClickOutside({
    onTriggered: () => {
      if (!userColors.find((item) => item === color)) {
        console.log(userColors, color);
        setUserColors([...userColors, color]);
        setShowColourOverlay(false);
      }
    },
  });
  const elementImages = [
    { type: "rect", src: "/shapes/square.png" },
    { type: "circle", src: "/shapes/circle.png" },
    { type: "triangle", src: "/shapes/triangle.png" },
    { type: "diamond", src: "/shapes/diamond.png" },
    { type: "line", src: "/shapes/line.png" },
    { type: "rounded-square", src: "/shapes/rounded-square.png" },
  ];

  function setOverlayColor(c: string) {
    props.setBgColor(c);
    setColor(c);
  }

  useEffect(() => {
    if (!showContent) setShowContent(true);

    if (props.section) setSection(props.section as any);
  }, [props.showPosition, props.section]);

  return (
    <>
      <div className="toolbar">
        <button
          onClick={() => {
            if (!showContent) setShowContent(true);
            setSection("design");
          }}
        >
          <ViewQuilt
            sx={{ color: "white", width: "24px", height: "24px" }}
          ></ViewQuilt>
          <span>Design</span>
        </button>
        <button
          onClick={() => {
            if (!showContent) setShowContent(true);
            setSection("elements");
          }}
        >
          <Interests sx={{ color: "white" }}></Interests>
          <span>Elements</span>
        </button>
        <button
          onClick={() => {
            if (!showContent) setShowContent(true);
            setSection("text");
          }}
        >
          <Title sx={{ color: "white" }}></Title>
          <span>Text</span>
        </button>
        <button
          onClick={() => {
            if (!showContent) setShowContent(true);
            setSection("upload");
          }}
        >
          <Upload sx={{ color: "white" }}></Upload>
          <span>Upload</span>
        </button>
      </div>
      <div className={`toolbar-content ${showContent ? "show" : ""}`}>
        {sectionType === "elements" &&
          elementImages.map((item) => (
            <button
              onClick={() => {
                props.createElement(item.type);
              }}
            >
              <img src={item.src} />
            </button>
          ))}
        {sectionType === "text" && (
          <button
            className="textbox"
            onClick={() => {
              props.createElement("textbox");
            }}
          >
            Add a textbox
          </button>
        )}
        {sectionType === "upload" && (
          <input
            type="file"
            id="inp"
            onInput={(e: any) => {
              props.handleImage(e);
            }}
          />
        )}
        {sectionType === "position" && (
          <div className="position-container">
            {props.layers?.map((item) => {
              return <div className="position-item">{item.type}</div>;
            })}
          </div>
        )}
        {sectionType === "color" && (
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
                className={`colour-picker-overlay ${
                  showColourOverlay && "show"
                }`}
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
        )}
        <div className="handle" onClick={() => setShowContent(false)}>
          <NavigateBefore sx={{ color: "white" }} />
        </div>
      </div>
    </>
  );
};
