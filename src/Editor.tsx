import React, { useState } from "react";
import "./Editor.css";
import { Page } from "./component/Page";

function Editor() {
  const [scale, setScale] = useState(1);
  return (
    <div className="editor-container">
      <div className="toolbar"></div>
      <div className="toolbar-content"></div>
      <div className="main-container">
        <div className="editor-toolbar">
          <button>position</button>
        </div>
        <div className="page-holder">
          <Page scale={scale}></Page>
          <Page scale={scale}></Page>
        </div>
        <div className="editor-footer">
          zoom <button onClick={() => setScale(scale + 0.1)}>+</button>
          <button onClick={() => setScale(scale - 0.1)}>-</button>
          <div className="slidecontainer">
            <input
              type="range"
              min="1"
              max="100"
              value="100"
              className="slider"
              id="myRange"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;
