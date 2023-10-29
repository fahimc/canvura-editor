import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import "./Page.css";
import { v4 } from "uuid";
import { guideLines } from "../util/guide-lines";

export interface PageApi {
  add(type: string, item: any): void;
  fabricCanvas: fabric.Canvas;
  getObjects(): any[];
}

interface PageProps {
  scale: number;
  getApi(canvas: PageApi): void;
  setCurrentPage(): void;
  updateSection: (section: string) => void;
}

export const Page = (props: PageProps) => {
  const width = 1080;
  const height = 1080;
  let [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | undefined>(
    undefined
  );
  const [layerItems, setLayerItems] = useState<any[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scale, getApi } = props;
  useEffect(() => {
    if (canvasRef.current && !fabricCanvas) {
      fabricCanvas = new fabric.Canvas(canvasRef.current, {
        backgroundColor: "white",
      });
      fabricCanvas.setWidth(width);
      fabricCanvas.setHeight(height);

      var grid = 25;

      // // create grid
      // for (var i = 0; i < width / grid; i++) {
      //   fabricCanvas.add(
      //     new fabric.Line([i * grid, 0, i * grid, height], {
      //       stroke: "#ccc",
      //       selectable: false,
      //     })
      //   );
      //   fabricCanvas.add(
      //     new fabric.Line([0, i * grid, height, i * grid], {
      //       stroke: "#ccc",
      //       selectable: false,
      //     })
      //   );
      // }

      // // snap to grid
      // fabricCanvas.on("object:moving", function (options: any) {
      //   options.target.set({
      //     left: Math.round(options.target.left / grid) * grid,
      //     top: Math.round(options.target.top / grid) * grid,
      //   });
      // });
      const handleSelection = () => {
        console.log("selected");
        props.updateSection("color");
      };
      fabricCanvas.on("selection:updated", handleSelection);

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
  }, [scale]);
  return (
    <div
      className="page-container"
      style={
        {
          // width: `${width} * ${scale}px`,
          // height: `${height} * ${scale}px`,
        }
      }
      onClick={() => props.setCurrentPage()}
    >
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
