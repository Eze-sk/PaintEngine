import { DEFAULT_CANVAS_SIZE } from "@consts/startupData";
import { Resizable } from "re-resizable";
import { useRef, useEffect } from "react";

const { W, H } = DEFAULT_CANVAS_SIZE;

export default function CanvasWrapper() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = W;
      canvasRef.current.height = H;
    }
  }, []);

  return (
    <Resizable
      minWidth={50}
      minHeight={50}
      defaultSize={{ width: W, height: H }}
      onResize={(_, __, ref) => {
        if (canvasRef.current) {
          canvasRef.current.width = ref.offsetWidth;
          canvasRef.current.height = ref.offsetHeight;
        }
      }}
      enable={{
        top: false,
        right: true,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: true,
        bottomLeft: false,
        topLeft: false,
      }}
      handleStyles={{
        right: {
          cursor: "e-resize",
        },
        bottom: {
          cursor: "n-resize",
        },
      }}
    >
      <div className="relative w-full h-full">
        <canvas ref={canvasRef} className="bg-white w-full h-full block">
          Canvas is not supported by your browser
        </canvas>
        <div className="resizing-guide -right-1.25" />
        <div className="resizing-guide -right-1.25 top-1/2" />
        <div className="resizing-guide left-1/2" />
      </div>
    </Resizable>
  );
}
