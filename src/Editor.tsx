import React, { useState } from "react";
import "./Editor.css";
import { Page } from "./component/Page";
import { Sidebar } from "./component/Sidebar";
import { fabric } from "fabric";

function Editor() {
  const [scale, setScale] = useState(1);
  const [pages, setPages] = useState([{}, {}]);
  const apis: fabric.Canvas[] = [];
  let currentCanvasIndex = 0;

  const getApi = (index: number, fabricCanvas: fabric.Canvas) => {
    apis[index] = fabricCanvas;
  };

  const setCurrentPage = (index: number) => {
    currentCanvasIndex = index;
  };

  function handleImage(e: any) {
    console.log(e);
    var reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const imgInstance = new fabric.Image(img, {
          left: 100,
          top: 100,
        });
        console.log(imgInstance);

        // canvas.width = img.width;
        // canvas.height = img.height;
        // ctx.drawImage(img, 0, 0);
        apis[currentCanvasIndex].add(imgInstance);
      };
      console.log(event);
      img.src = (event.target?.result as string) || "";
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  const createElement = (type: string) => {
    if (apis[currentCanvasIndex]) {
      switch (type) {
        case "rect":
          const rect = new fabric.Rect({
            top: 100,
            left: 100,
            width: 100,
            height: 100,
            fill: "red",
          });

          apis[currentCanvasIndex].add(rect);

          break;
        case "circle":
          const circle = new fabric.Circle({
            radius: 50,
            fill: "green",
            left: 100,
            top: 100,
          });

          apis[currentCanvasIndex].add(circle);
          break;
        case "triangle":
          const triangle = new fabric.Triangle({
            width: 20,
            height: 30,
            fill: "blue",
            left: 50,
            top: 50,
          });

          apis[currentCanvasIndex].add(triangle);
          break;
        case "rounded-square":
          const rounded = new fabric.Rect({
            top: 100,
            left: 100,
            width: 100,
            height: 100,
            rx: 10,
            ry: 10,
            fill: "red",
          });

          apis[currentCanvasIndex].add(rounded);
          break;
        case "line":
          const line = new fabric.Rect({
            top: 100,
            left: 100,
            width: 200,
            height: 5,
            fill: "red",
          });
          apis[currentCanvasIndex].add(line);
          break;
        case "textbox":
          const text = new fabric.Textbox("Sample Text", { width: 100 });

          apis[currentCanvasIndex].add(text);
          break;
        case "image":
          break;
      }
    }
  };

  return (
    <div className="editor-container">
      <Sidebar createElement={createElement} handleImage={handleImage} />
      <div className="main-container">
        <div className="editor-toolbar">
          <button>position</button>
        </div>
        <div className="page-holder">
          {pages.map((item, index) => {
            return (
              <Page
                key={index}
                scale={scale}
                getApi={(canvas) => getApi(index, canvas)}
                setCurrentPage={() => setCurrentPage(index)}
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
