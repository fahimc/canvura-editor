import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";
import "./Page.css";

interface PageProps {
  scale: number;
}

export const Page = (props: PageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let fabricCanvas: fabric.Canvas | undefined;
  const { scale } = props;
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
    // fabricCanvas?.setZoom(scale);
    // fabricCanvas?.setWidth(1080 * scale);
    // fabricCanvas?.setHeight(1080 * scale);
  }, []);
  return (
    <div className="page-container" style={{ transform: `scale(${scale})` }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
