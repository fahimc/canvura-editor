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
  const [pages, setPages] = useState<any[]>([undefined]);
  const [layers, setLayers] = useState<any[]>([]);
  const [currentColor, setCurrentColor] = useState<string>("");
  const [fontSize, setFontSize] = useState<number>(16);
  const [currentBorderColor, setCurrentBorderColor] = useState<string>("black");
  const [currentFontColor, setCurrentFontColor] = useState<string>("black");
  const [currentFontWeight, setCurrentFontWeight] = useState<number>(400);
  const [currentFontItalic, setCurrentFontItalic] = useState<boolean>(false);
  const [currentFontStrikeThrough, setCurrentFontStrikeThrough] =
    useState<boolean>(false);
  const [currentFontUnderline, setCurrentFontUnderline] =
    useState<boolean>(false);
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
  const setFontColor = (color: string) => {
    apis[currentCanvasIndex].fabricCanvas.getActiveObject()?.set("fill", color);
    apis[currentCanvasIndex].fabricCanvas.renderAll();
    setCurrentFontColor(color);
  };

  const setFontWeight = (weight: number) => {
    apis[currentCanvasIndex].fabricCanvas
      .getActiveObject()
      ?.set("fontWeight" as any, weight);
    setCurrentFontWeight(weight);
    apis[currentCanvasIndex].fabricCanvas.renderAll();
  };

  const setItalic = (value: boolean) => {
    apis[currentCanvasIndex].fabricCanvas
      .getActiveObject()
      ?.set("fontStyle" as any, value ? "italic" : "");
    setCurrentFontItalic(value);
    apis[currentCanvasIndex].fabricCanvas.renderAll();
  };

  const setCurrentFontSize = (value: number) => {
    apis[currentCanvasIndex]?.fabricCanvas
      ?.getActiveObject()
      ?.set("fontSize" as any, value);
    setFontSize(value);
    apis[currentCanvasIndex]?.fabricCanvas?.renderAll();
  };

  const setUnderline = (value: boolean) => {
    apis[currentCanvasIndex].fabricCanvas
      .getActiveObject()
      ?.set("underline" as any, value);
    setCurrentFontUnderline(value);
    apis[currentCanvasIndex].fabricCanvas.renderAll();
  };

  const setStrikethrough = (value: boolean) => {
    apis[currentCanvasIndex].fabricCanvas
      .getActiveObject()
      ?.set("linethrough" as any, value);
    setCurrentFontStrikeThrough(value);
    apis[currentCanvasIndex].fabricCanvas.renderAll();
  };

  const setFont = (font: {
    name: string;
    path: string;
    weight?: string | number;
    family?: string;
  }) => {
    const fontFile = new FontFace(font.name, `url(${font.path})`);
    document.fonts.add(fontFile);

    fontFile.load().then(() => {
      apis[currentCanvasIndex]?.fabricCanvas
        ?.getActiveObject()
        ?.set("fontFamily" as any, font.family || font.name);
      if (font.weight)
        apis[currentCanvasIndex]?.fabricCanvas
          ?.getActiveObject()
          ?.set("fontWeight" as any, font.weight);
      apis[currentCanvasIndex]?.fabricCanvas?.renderAll();
    });
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

  const changePageOrder = (pageNumber: number, moveDown: boolean) => {
    const pageList = [...pages];
    if (moveDown && pageList[pageNumber] && pageList[pageNumber + 1]) {
      const pageData = apis[pageNumber].fabricCanvas.toJSON();
      const pageData2 = apis[pageNumber + 1].fabricCanvas.toJSON();
      pageList[pageNumber] = pageData2;
      pageList[pageNumber + 1] = pageData;
      setPages(pageList);
      apis[pageNumber].fabricCanvas.loadFromJSON(pageData2, () => {});
      apis[pageNumber + 1].fabricCanvas.loadFromJSON(pageData, () => {});
    } else {
      const pageData = apis[pageNumber].fabricCanvas.toJSON();
      const pageData2 = apis[pageNumber - 1].fabricCanvas.toJSON();
      pageList[pageNumber] = pageData2;
      pageList[pageNumber - 1] = pageData;
      setPages(pageList);
      apis[pageNumber].fabricCanvas.loadFromJSON(pageData2, () => {});
      apis[pageNumber - 1].fabricCanvas.loadFromJSON(pageData, () => {});
    }
  };

  const duplicatePage = (pageNumber: number) => {
    const pageList = [...pages];
    console.log(pageNumber);
    const pageData = apis[pageNumber].fabricCanvas.toJSON();
    console.log(pageData);
    pageList.splice(pageNumber + 1, 0, { ...pageData });
    setPages(pageList);
  };

  const deletePage = (pageNumber: number) => {
    const pageList = [...pages];
    pageList.splice(pageNumber, 1);
    setPages(pageList);
  };

  const createPage = (pageNumber?: number) => {
    if (pageNumber === undefined) {
      setPages([...pages, undefined]);
    } else {
      console.log(pageNumber);
      const pageList: any[] = apis.map((item) => item.fabricCanvas.toJSON());
      pageList.splice(pageNumber + 1, 0, undefined);
      setPages(pageList);
    }
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
            fontSize: fontSize,
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
        setFontColor={setFontColor}
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
              currentFontColor={currentFontColor}
              fontSize={fontSize}
              setFontSize={setCurrentFontSize}
              setFontWeight={setFontWeight}
              setItalic={setItalic}
              setUnderline={setUnderline}
              setStrikethrough={setStrikethrough}
              currentFontWeight={currentFontWeight}
              currentFontItalic={currentFontItalic}
              currentFontUnderline={currentFontUnderline}
              currentFontStrikeThrough={currentFontStrikeThrough}
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
                pageNumber={index + 1}
                scale={scale}
                getApi={(canvas) => getApi(index, canvas)}
                setCurrentPage={() => setCurrentPage(index)}
                setShowObjectToolbar={setShowObjectToolbar}
                changePageOrder={changePageOrder}
                duplicatePage={duplicatePage}
                pageData={item}
                deletePage={deletePage}
                createPage={createPage}
                setFontWeight={setFontWeight}
                setFontItalic={setItalic}
              ></Page>
            );
          })}
          <button className="add-page-button" onClick={() => createPage()}>
            + Add Page
          </button>
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
