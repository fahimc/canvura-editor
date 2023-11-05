import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import "./Page.css";
import { v4 } from "uuid";
import { guideLines } from "../util/guide-lines";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export interface PageApi {
  add(type: string, item: any): void;
  fabricCanvas: fabric.Canvas;
  getObjects(): any[];
}

interface PageProps {
  scale: number;
  getApi(canvas: PageApi): void;
  setCurrentPage(): void;
  createPage(pageNumber: number): void;
  changePageOrder(pageNumber: number, moveDown: boolean): void;
  setShowObjectToolbar: (show: boolean) => void;
  pageNumber: number;
  duplicatePage: (pageNumber: number) => void;
  deletePage: (pageNumber: number) => void;
  setFontWeight: (weight: number) => void;
  setFontItalic: (value: boolean) => void;
  pageData?: any;
}

export const Page = (props: PageProps) => {
  const width = 1080;
  const height = 1080;
  let [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | undefined>(
    undefined
  );
  const [layerItems, setLayerItems] = useState<any[]>([]);
  const [locked, setLocked] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scale, getApi } = props;
  useEffect(() => {
    if (canvasRef.current && !fabricCanvas) {
      fabricCanvas = new fabric.Canvas(canvasRef.current, {
        backgroundColor: "white",
      });
      fabricCanvas.setWidth(width);
      fabricCanvas.setHeight(height);

      const handleSelection = (e?: any) => {
        if (e?.selected[0].fontWeight) {
          props.setFontWeight(e?.selected[0].fontWeight);
        }
        props.setFontItalic(e?.selected[0].fontStyle === "italic");

        props.setShowObjectToolbar(true);
      };

      fabricCanvas.on("selection:updated", handleSelection);
      fabricCanvas.on("selection:created", handleSelection);

      guideLines(fabricCanvas);

      setFabricCanvas(fabricCanvas);

      getApi({
        fabricCanvas,
        add(type: string, item: any) {
          fabricCanvas?.add(item);
          layerItems.push({
            id: v4(),
            type,
            item,
            object: fabricCanvas?._activeObject,
          });
          setLayerItems(layerItems);
          handleSelection();
        },
        getObjects() {
          return layerItems;
        },
      });
    }
    if (fabricCanvas) {
      console.log(scale);
      fabricCanvas.setDimensions({
        width: width * scale,
        height: height * scale,
      });
      fabricCanvas.setZoom(scale);
    }
    if (fabricCanvas && props.pageData) {
      fabricCanvas.loadFromJSON(props.pageData, () => {});
    } else if (fabricCanvas && props.pageData === undefined) {
      fabricCanvas.clear();
      fabricCanvas.backgroundColor = "white";
    }
  }, [scale, props.pageData]);

  const lockCanvas = (isLocked: boolean) => {
    if (fabricCanvas) {
      fabricCanvas.getObjects().forEach((item) => {
        item.set("selectable", !isLocked);
        item.set("evented", !isLocked);
        item.set("lockMovementX", isLocked);
        item.set("lockMovementY", isLocked);
      });
      setLocked(isLocked);
    }
  };

  return (
    <div
      className="page-container"
      style={{
        width: `${width * scale}px`,
        height: `${height * scale}px`,
      }}
      onClick={() => props.setCurrentPage()}
    >
      <div className="page-toolbar">
        <div className="title">Page {props.pageNumber}</div>
        <div className="actions">
          <button
            disabled={props.pageNumber <= 1}
            onClick={() => props.changePageOrder(props.pageNumber - 1, false)}
          >
            <ExpandLessIcon sx={{ color: "rgb(153, 146, 150)" }} />
          </button>
          <button
            onClick={() => props.changePageOrder(props.pageNumber - 1, true)}
          >
            <ExpandMoreIcon sx={{ color: "rgb(153, 146, 150)" }} />
          </button>
          {/* <button>
            <VisibilityOffOutlinedIcon sx={{ color: "rgb(153, 146, 150)" }} />
          </button> */}
          <button onClick={() => lockCanvas(!locked)}>
            {locked ? (
              <LockOutlinedIcon sx={{ color: "rgb(153, 146, 150)" }} />
            ) : (
              <LockOpenIcon sx={{ color: "rgb(153, 146, 150)" }} />
            )}
          </button>
          <button onClick={() => props.duplicatePage(props.pageNumber - 1)}>
            <ContentCopyIcon sx={{ color: "rgb(153, 146, 150)" }} />
          </button>
          <button onClick={() => props.deletePage(props.pageNumber - 1)}>
            <DeleteOutlineIcon sx={{ color: "rgb(153, 146, 150)" }} />
          </button>
          <button onClick={() => props.createPage(props.pageNumber - 1)}>
            <NoteAddOutlinedIcon sx={{ color: "rgb(153, 146, 150)" }} />
          </button>
        </div>
      </div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
