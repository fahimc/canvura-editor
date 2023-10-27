import React, { createElement, useEffect, useRef, useState } from "react";
import "./Sidebar.css";
import {
  ViewQuilt,
  Interests,
  Title,
  Upload,
  NavigateBefore,
} from "@mui/icons-material";

export type SectionType =
  | "design"
  | "elements"
  | "upload"
  | "position"
  | "text"
  | "";
export const Sidebar = (props: {
  createElement: (item: any) => void;
  handleImage: (e: any) => void;
  showPosition: boolean;
  layers?: any[];
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

  useEffect(() => {
    if (props.showPosition) {
      if (!showContent) setShowContent(true);
      setSection("position");
    } else {
      if (sectionType === "position" && showContent) setShowContent(false);
    }
  }, [props.showPosition]);

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
            {props.layers?.map((item) => (
              <div>layer</div>
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
