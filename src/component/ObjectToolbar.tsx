import React, { useState } from "react";
import LineWeightIcon from "@mui/icons-material/LineWeight";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import "./ObjectToolbar.css";
import { useDetectClickOutside } from "react-detect-click-outside";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const ObjectToolbar = (props: {
  setSection: (section: string) => void;
  setBorder: (strokeWidth: number, dash: number[]) => void;
  currentColor: string;
  currentBorderColor: string;
}) => {
  const [modelSection, setModalSection] = useState<string>("border");
  const [borderWidth, setBorderWidth] = useState<number>(1);
  let dashArray: number[] = [];
  function setBorder(strokeWidth: number, dash: number[]) {
    dashArray = dash;
    setBorderWidth(strokeWidth);
    props.setBorder(strokeWidth, dashArray);
  }
  const [showModal, setShowModal] = useState(false);
  const modalRef = useDetectClickOutside({
    onTriggered: () => {
      // setShowModal(false);
    },
  });
  return (
    <>
      <div className="toolbar-container">
        <button onClick={() => props.setSection("color")}>
          <div
            className="color-button"
            style={{ backgroundColor: props.currentColor || "#d9d9d9" }}
          ></div>
        </button>
        <button onClick={() => props.setSection("border-color")}>
          <div
            className="border-color-button"
            style={{ borderColor: props.currentBorderColor || "#d9d9d9" }}
          ></div>
        </button>
        <button onClick={() => setShowModal(!showModal)}>
          <LineWeightIcon />
        </button>
        <button
          className="font-selector"
          onClick={() => props.setSection("font-family")}
        >
          <div>
            <span>Arimo</span>
            <span>
              <KeyboardArrowDownIcon />
            </span>
          </div>
        </button>
        <div
          className={`toolbar-modal ${showModal ? " show" : ""}`}
          ref={modalRef}
        >
          {modelSection === "border" && (
            <div>
              <div className="line-style-container">
                <button
                  className="line-style-button"
                  onClick={() => setBorder(0, [])}
                >
                  <DoDisturbIcon />
                </button>
                <button
                  className="line-style-button"
                  onClick={() =>
                    setBorder(borderWidth === 0 ? 1 : borderWidth, [])
                  }
                >
                  <img src="icon/border-1.svg" />
                </button>
                <button
                  className="line-style-button"
                  onClick={() =>
                    setBorder(borderWidth === 0 ? 1 : borderWidth, [5, 5])
                  }
                >
                  <img src="icon/border-2.svg" />
                </button>
                <button
                  className="line-style-button"
                  onClick={() =>
                    setBorder(borderWidth === 0 ? 1 : borderWidth, [3, 3])
                  }
                >
                  <img src="icon/border-3.svg" />
                </button>
                <button
                  className="line-style-button"
                  onClick={() =>
                    setBorder(borderWidth === 0 ? 1 : borderWidth, [2, 2])
                  }
                >
                  <img src="icon/border-4.svg" />
                </button>
              </div>
              <div className="row">
                <span>Border weight</span>
                <input
                  value={borderWidth}
                  onChange={(event) =>
                    setBorder(Number(event.target.value), dashArray)
                  }
                ></input>
              </div>
              <div>
                <div className="slidecontainer">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    defaultValue={1}
                    value={borderWidth}
                    className="slider"
                    id="myRange"
                    onChange={(event) =>
                      setBorder(Number(event.target.value), dashArray)
                    }
                  />
                </div>
              </div>
              {/* <div className="row">
                <span>Corner rounding</span>
                <input
                  value={borderWidth}
                  onChange={(event) =>
                    setBorder(Number(event.target.value), dashArray)
                  }
                ></input>
              </div>
              <div>
                <div className="slidecontainer">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    defaultValue={1}
                    value={borderWidth}
                    className="slider"
                    id="myRange"
                    onChange={(event) =>
                      setBorder(Number(event.target.value), dashArray)
                    }
                  />
                </div>
              </div> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
