import React, { createElement, useEffect, useRef, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import "./Sidebar.css";
import {
  ViewQuilt,
  Interests,
  Title,
  Upload,
  NavigateBefore,
} from "@mui/icons-material";
import { ColorPanel } from "./color-panel/ColorPanel";

export type SectionType =
  | "design"
  | "elements"
  | "upload"
  | "position"
  | "color"
  | "border-color"
  | "font-family"
  | "text"
  | "";
export const Sidebar = (props: {
  createElement: (item: any) => void;
  handleImage: (e: any) => void;
  showPosition: boolean;
  section: string;
  updateSection: (section: string) => void;
  setBgColor: (color: string) => void;
  setBorderColor: (color: string) => void;
  setFont: (font: { name: string; path: string }) => void;
  layers?: any[];
  showSection?: string;
}) => {
  const [showContent, setShowContent] = useState(false);
  const [sectionType, setSection] = useState<SectionType>("");

  const elementImages = [
    { type: "rect", src: "/shapes/square.png" },
    { type: "circle", src: "/shapes/circle.png" },
    { type: "triangle", src: "/shapes/triangle.png" },
    { type: "diamond", src: "/shapes/diamond.png" },
    { type: "line", src: "/shapes/line.png" },
    { type: "rounded-square", src: "/shapes/rounded-square.png" },
  ];

  const fontFamilyList = [
    { name: "Open Sans Light", path: "/font/open-sans/OpenSans-Light.ttf" },
    { name: "Open Sans Regular", path: "/font/open-sans/OpenSans-Regular.ttf" },
    { name: "Open Sans Medium", path: "/font/open-sans/OpenSans-Medium.ttf" },
    { name: "Open Sans Bold", path: "/font/open-sans/OpenSans-Bold.ttf" },
  ];

  useEffect(() => {
    if (!showContent) setShowContent(true);
    console.log(props.section);
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
          <ColorPanel setBgColor={props.setBgColor} />
        )}
        {sectionType === "border-color" && (
          <ColorPanel setBgColor={props.setBorderColor} />
        )}
        {sectionType === "font-family" && (
          <div className="font-family">
            <h1>Font</h1>
            {fontFamilyList.map((item) => (
              <div onClick={() => props.setFont(item)} className="font-item">
                {item.name}
              </div>
            ))}
          </div>
        )}
        <div className="handle" onClick={() => setShowContent(false)}>
          <NavigateBefore sx={{ color: "white" }} />
        </div>
      </div>
    </>
  );
};
