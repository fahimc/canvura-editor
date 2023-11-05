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
  | "font-color"
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
  setFontColor: (color: string) => void;
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
    {
      name: "Open Sans Light",
      path: "https://fonts.gstatic.com/s/opensans/v20/mem5YaGs126MiZpBA-UN7rgOX-hpOqc.woff2",
    },
    {
      name: "Roboto Regular",
      path: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu72xKKTU1Kg.woff2",
    },
    {
      name: "Lato Regular",
      path: "https://fonts.gstatic.com/s/lato/v17/S6uyw4BMUTPHjx4wXg.woff2",
    },
    {
      name: "Noto Sans JP",
      path: "https://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEj756wwr4v0qHnANADNsISRDl2PRkiiWsg.0.woff2",
    },
    {
      name: "Lato",
      path: "https://fonts.gstatic.com/s/lato/v20/S6uyw4BMUTPHjx4wXiWtFCc.woff2",
    },
    {
      name: "Lato Bold",
      path: "https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh6UVSwaPGR_p.woff2",
      weight: 700,
    },
    {
      name: "Oswald",
      path: "https://fonts.gstatic.com/s/oswald/v36/TK3iWkUHHAIjg752GT8G.woff2",
    },
    {
      name: "Lobster",
      path: "https://fonts.gstatic.com/s/lobster/v30/neILzCirqoswsqX9zoKmMw.woff2",
      weight: 400,
    },

    {
      name: "Roboto Mono Regular",
      path: "https://fonts.gstatic.com/s/robotomono/v23/L0x5DF4xlVMF-BfR8bXMIjhLq38.woff2",
      weight: 400,
    },
    {
      name: "Roboto Mono Extra Bold",
      path: "https://fonts.gstatic.com/s/robotomono/v23/L0x5DF4xlVMF-BfR8bXMIjhLq38.woff2",
      weight: 700,
    },
    {
      name: "Agbalumo",
      path: "https://fonts.gstatic.com/s/agbalumo/v2/55xvey5uMdT2N37KZfMCgLg.woff2",
      weight: 400,
    },
    {
      name: "Anton",
      path: "https://fonts.gstatic.com/s/anton/v25/1Ptgg87LROyAm3Kz-C8.woff2",
      weight: 400,
    },
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
        {sectionType === "font-color" && (
          <ColorPanel setBgColor={props.setFontColor} />
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
