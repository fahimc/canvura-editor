import { fabric } from "fabric";
let viewportTransform: any;
let zoom = 1;
let verticalLines: any[] = [];
let horizontalLines: any[] = [];
const aligningLineOffset = 5;
const aligningLineMargin = 4;
const aligningLineWidth = 1;
const aligningLineColor = "rgb(255,0,0)";
const aligningDash = [5, 5];
export const guideLines = (canvas: any) => {
  let ctx = canvas.getSelectionContext();
  canvas.on("mouse:down", function () {
    viewportTransform = canvas.viewportTransform;
    zoom = canvas.getZoom();
  });

  canvas.on("object:moving", function (e: any) {
    if (!canvas._currentTransform) return;
    let activeObject = e.target;
    let activeObjectCenter = activeObject.getCenterPoint();
    let activeObjectBoundingRect = activeObject.getBoundingRect();
    let activeObjectHalfHeight =
      activeObjectBoundingRect.height / (2 * viewportTransform[3]);
    let activeObjectHalfWidth =
      activeObjectBoundingRect.width / (2 * viewportTransform[0]);

    canvas
      .getObjects()
      .filter((object: any) => object !== activeObject && object.visible)
      .forEach((object: any) => {
        let objectCenter = object.getCenterPoint();
        let objectBoundingRect = object.getBoundingRect();
        let objectHalfHeight =
          objectBoundingRect.height / (2 * viewportTransform[3]);
        let objectHalfWidth =
          objectBoundingRect.width / (2 * viewportTransform[0]);

        // snap by the horizontal center line
        snapVertical(objectCenter.x, activeObjectCenter.x, objectCenter.x);
        // snap by the left object edge matching left active edge
        snapVertical(
          objectCenter.x - objectHalfWidth,
          activeObjectCenter.x - activeObjectHalfWidth,
          objectCenter.x - objectHalfWidth + activeObjectHalfWidth
        );
        // snap by the left object edge matching right active edge
        snapVertical(
          objectCenter.x - objectHalfWidth,
          activeObjectCenter.x + activeObjectHalfWidth,
          objectCenter.x - objectHalfWidth - activeObjectHalfWidth
        );
        // snap by the right object edge matching right active edge
        snapVertical(
          objectCenter.x + objectHalfWidth,
          activeObjectCenter.x + activeObjectHalfWidth,
          objectCenter.x + objectHalfWidth - activeObjectHalfWidth
        );
        // snap by the right object edge matching left active edge
        snapVertical(
          objectCenter.x + objectHalfWidth,
          activeObjectCenter.x - activeObjectHalfWidth,
          objectCenter.x + objectHalfWidth + activeObjectHalfWidth
        );

        function snapVertical(objEdge: any, activeEdge: any, snapCenter: any) {
          if (isInRange(objEdge, activeEdge)) {
            verticalLines.push({
              x: objEdge,
              y1:
                objectCenter.y < activeObjectCenter.y
                  ? objectCenter.y - objectHalfHeight - aligningLineOffset
                  : objectCenter.y + objectHalfHeight + aligningLineOffset,
              y2:
                activeObjectCenter.y > objectCenter.y
                  ? activeObjectCenter.y +
                    activeObjectHalfHeight +
                    aligningLineOffset
                  : activeObjectCenter.y -
                    activeObjectHalfHeight -
                    aligningLineOffset,
            });
            activeObject.setPositionByOrigin(
              new fabric.Point(snapCenter, activeObjectCenter.y),
              "center",
              "center"
            );
          }
        }

        // snap by the vertical center line
        snapHorizontal(objectCenter.y, activeObjectCenter.y, objectCenter.y);
        // snap by the top object edge matching the top active edge
        snapHorizontal(
          objectCenter.y - objectHalfHeight,
          activeObjectCenter.y - activeObjectHalfHeight,
          objectCenter.y - objectHalfHeight + activeObjectHalfHeight
        );
        // snap by the top object edge matching the bottom active edge
        snapHorizontal(
          objectCenter.y - objectHalfHeight,
          activeObjectCenter.y + activeObjectHalfHeight,
          objectCenter.y - objectHalfHeight - activeObjectHalfHeight
        );
        // snap by the bottom object edge matching the bottom active edge
        snapHorizontal(
          objectCenter.y + objectHalfHeight,
          activeObjectCenter.y + activeObjectHalfHeight,
          objectCenter.y + objectHalfHeight - activeObjectHalfHeight
        );
        // snap by the bottom object edge matching the top active edge
        snapHorizontal(
          objectCenter.y + objectHalfHeight,
          activeObjectCenter.y - activeObjectHalfHeight,
          objectCenter.y + objectHalfHeight + activeObjectHalfHeight
        );

        function snapHorizontal(
          objEdge: any,
          activeObjEdge: any,
          snapCenter: any
        ) {
          if (isInRange(objEdge, activeObjEdge)) {
            horizontalLines.push({
              y: objEdge,
              x1:
                objectCenter.x < activeObjectCenter.x
                  ? objectCenter.x - objectHalfWidth - aligningLineOffset
                  : objectCenter.x + objectHalfWidth + aligningLineOffset,
              x2:
                activeObjectCenter.x > objectCenter.x
                  ? activeObjectCenter.x +
                    activeObjectHalfWidth +
                    aligningLineOffset
                  : activeObjectCenter.x -
                    activeObjectHalfWidth -
                    aligningLineOffset,
            });
            activeObject.setPositionByOrigin(
              new fabric.Point(activeObjectCenter.x, snapCenter),
              "center",
              "center"
            );
          }
        }
      });
  });

  canvas.on("before:render", () => {
    canvas.clearContext(canvas.contextTop);
  });

  canvas.on("after:render", function () {
    verticalLines.forEach((line) => drawVerticalLine(ctx, line));
    horizontalLines.forEach((line) => drawHorizontalLine(ctx, line));

    verticalLines = [];
    horizontalLines = [];
  });

  canvas.on("mouse:up", function () {
    canvas.renderAll();
  });
};

function drawVerticalLine(ctx: any, coords: any) {
  drawLine(
    ctx,
    coords.x + 0.5,
    coords.y1 > coords.y2 ? coords.y2 : coords.y1,
    coords.x + 0.5,
    coords.y2 > coords.y1 ? coords.y2 : coords.y1
  );
}

function drawHorizontalLine(ctx: any, coords: any) {
  drawLine(
    ctx,
    coords.x1 > coords.x2 ? coords.x2 : coords.x1,
    coords.y + 0.5,
    coords.x2 > coords.x1 ? coords.x2 : coords.x1,
    coords.y + 0.5
  );
}

function drawLine(ctx: any, x1: any, y1: any, x2: any, y2: any) {
  ctx.save();
  ctx.lineWidth = aligningLineWidth;
  ctx.strokeStyle = aligningLineColor;
  ctx.setLineDash(aligningDash);
  ctx.beginPath();
  ctx.moveTo(
    x1 * zoom + viewportTransform[4],
    y1 * zoom + viewportTransform[5]
  );
  ctx.lineTo(
    x2 * zoom + viewportTransform[4],
    y2 * zoom + viewportTransform[5]
  );
  ctx.stroke();
  ctx.restore();
}
/**
 * return true if value2 is within value1 +/- aligningLineMargin
 * @param {number} value1
 * @param {number} value2
 * @returns Boolean
 */
function isInRange(value1: any, value2: any) {
  return (
    value2 > value1 - aligningLineMargin && value2 < value1 + aligningLineMargin
  );
}
