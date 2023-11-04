import React, { useState } from "react";
import "./Editor.css";
import { Page, PageApi } from "./component/Page";
import { Sidebar } from "./component/Sidebar";
import { fabric } from "fabric";
import { ObjectToolbar } from "./component/ObjectToolbar";

const colorPalette = {
  lightGrey: "#d9d9d9",
};
const apis: PageApi[] = [];
function Editor() {
  const [scale, setScale] = useState(1);
  const [isPosition, setIsPosition] = useState(false);
  const [showObjectToolbar, setShowObjectToolbar] = useState(false);
  const [section, setSection] = useState("");
  const [isColorPalette, setIsColorPalette] = useState(false);
  const [pages, setPages] = useState([{}, {}]);
  const [layers, setLayers] = useState<any[]>([]);
  const [currentColor, setCurrentColor] = useState<string>("");
  const [currentBorderColor, setCurrentBorderColor] = useState<string>("black");
  let currentCanvasIndex = 0;

  const setBgColor = (color: string) => {
    apis[currentCanvasIndex].fabricCanvas.getActiveObject()?.set("fill", color);
    apis[currentCanvasIndex].fabricCanvas.renderAll();
    setCurrentColor(color);
  };
  const setBorderColor = (color: string) => {
    apis[currentCanvasIndex].fabricCanvas
      .getActiveObject()
      ?.set("stroke", color);
    apis[currentCanvasIndex].fabricCanvas.renderAll();
    setCurrentBorderColor(color);
  };

  const setFont = (font: { name: string; path: string }) => {
    console.log(font);
    const fontFile = new FontFace(font.name, font.path);
    document.fonts.add(fontFile);

    fontFile.load().then(
      () => {
        apis[currentCanvasIndex].fabricCanvas
          .getActiveObject()
          ?.set("fontFamily" as any, font.name);
      },
      (err) => {
        console.error(err);
      }
    );
  };

  const setBorder = (strokeWidth: number, dash: number[]) => {
    apis[currentCanvasIndex].fabricCanvas
      .getActiveObject()
      ?.set("strokeWidth", strokeWidth);
    apis[currentCanvasIndex].fabricCanvas
      .getActiveObject()
      ?.set("stroke", currentBorderColor);
    apis[currentCanvasIndex].fabricCanvas
      .getActiveObject()
      ?.set("strokeDashArray", dash);
    apis[currentCanvasIndex].fabricCanvas.renderAll();
  };

  const getApi = (index: number, api: PageApi) => {
    apis[index] = api;
  };

  const setCurrentPage = (index: number) => {
    currentCanvasIndex = index;
  };

  function handleImage(e: any) {
    var reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const imgInstance = new fabric.Image(img, {
          left: 100,
          top: 100,
        });

        apis[currentCanvasIndex].add("image", imgInstance);
      };
      console.log(event);
      img.src = (event.target?.result as string) || "";
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  const createElement = (type: string) => {
    setIsPosition(false);
    if (apis[currentCanvasIndex]) {
      switch (type) {
        case "rect":
          const rect = new fabric.Rect({
            top: 100,
            left: 100,
            width: 100,
            height: 100,
            fill: colorPalette.lightGrey,
          });

          apis[currentCanvasIndex].add(type, rect);

          break;
        case "circle":
          const circle = new fabric.Circle({
            radius: 50,
            fill: colorPalette.lightGrey,
            left: 100,
            top: 100,
          });

          apis[currentCanvasIndex].add(type, circle);
          break;
        case "triangle":
          const triangle = new fabric.Triangle({
            width: 20,
            height: 30,
            fill: colorPalette.lightGrey,
            left: 50,
            top: 50,
          });

          apis[currentCanvasIndex].add(type, triangle);
          break;
        case "rounded-square":
          const rounded = new fabric.Rect({
            top: 100,
            left: 100,
            width: 100,
            height: 100,
            rx: 10,
            ry: 10,
            fill: colorPalette.lightGrey,
          });

          apis[currentCanvasIndex].add(type, rounded);
          break;
        case "line":
          const line = new fabric.Rect({
            top: 100,
            left: 100,
            width: 200,
            height: 5,
            fill: colorPalette.lightGrey,
          });
          apis[currentCanvasIndex].add(type, line);
          break;
        case "textbox":
          const text = new fabric.Textbox("Sample Text", {
            width: 100,
          });

          apis[currentCanvasIndex].add(type, text);
          break;
        case "image":
          break;
      }
    }
  };

  return (
    <div className="editor-container">
      <Sidebar
        createElement={createElement}
        handleImage={handleImage}
        showPosition={isPosition}
        section={section}
        updateSection={setSection}
        setBgColor={setBgColor}
        setBorderColor={setBorderColor}
        layers={layers}
        setFont={setFont}
      />
      <div className="main-container">
        <div className="editor-toolbar">
          {showObjectToolbar && (
            <ObjectToolbar
              setSection={setSection}
              setBorder={setBorder}
              currentColor={currentColor}
              currentBorderColor={currentBorderColor}
            />
          )}
          <button
            onClick={() => {
              setSection("position");
              if (apis[currentCanvasIndex]) {
                setLayers(apis[currentCanvasIndex].getObjects());
              }
            }}
          >
            Position
          </button>
        </div>
        <div className="page-holder">
          {pages.map((item, index) => {
            return (
              <Page
                key={index}
                scale={scale}
                getApi={(canvas) => getApi(index, canvas)}
                setCurrentPage={() => setCurrentPage(index)}
                setShowObjectToolbar={setShowObjectToolbar}
              ></Page>
            );
          })}
        </div>
        <div className="editor-footer">
          <span>{pages.length} Pages</span>
          <div className="slidecontainer">
            <input
              type="range"
              min="1"
              max="100"
              defaultValue={100}
              // value="100"
              className="slider"
              id="myRange"
              onChange={(event) => {
                setScale(Number(event.target.value) / 100);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;
