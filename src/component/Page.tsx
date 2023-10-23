import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";
import "./Page.css";

export const Page = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let fabricCanvas: fabric.Canvas | undefined;
  useEffect(() => {
    if (canvasRef.current && !fabricCanvas) {
      console.log("here");
      fabricCanvas = new fabric.Canvas(canvasRef.current, {
        backgroundColor: "white",
      });
      fabricCanvas.setWidth(1080);
      fabricCanvas.setHeight(1080);
      var rect = new fabric.Rect({
        top: 100,
        left: 100,
        width: 60,
        height: 70,
        fill: "red",
      });

      fabricCanvas.add(rect);
    }
  }, []);
  return (
    <div className="page-container">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
