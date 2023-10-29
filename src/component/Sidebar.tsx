import React, { createElement, useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PaletteIcon from "@mui/icons-material/Palette";

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
    props.updateSection("");
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
              {
                console.log(item);
              }
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
              <span>Default colours</span>
            </div>
            <div className="color-container">
              {solidColourPalette?.map((item) => {
                return (
                  <div
                    className="color-item"
                    style={{ backgroundColor: item.color }}
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
