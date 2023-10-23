import React from "react";
import "./Editor.css";
import { Page } from "./component/Page";

function Editor() {
  return (
    <div className="editor-container">
      <div className="toolbar"></div>
      <div className="toolbar-content"></div>
      <div className="main-container">
        <div className="editor-toolbar">
          <button>position</button>
        </div>
        <Page></Page>
        <Page></Page>
      </div>
    </div>
  );
}

export default Editor;
