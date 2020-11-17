import * as React from 'react';

interface WindowProps {
  position: Position;
}

export enum Position {
  BottomLeft = 0,
  BottomRight = 1,
  BottomCenter = 2,
}

const padding = 10;
const borderWidth = 1;
const windowHeight = 150;
const windowWidth = 500;

const distanceFromCorner = 5;

const calcPosition = (windowDimension: number, canvasDimension: number) =>
  canvasDimension -
  padding * 2 -
  borderWidth -
  windowDimension -
  distanceFromCorner;

const Window: React.FC<WindowProps> = ({ position, children }) => {
  const canvas = document.querySelector('canvas');
  const canvasHeight = parseInt(canvas.getAttribute('height'));
  const canvasWidth = parseInt(canvas.getAttribute('width'));
  let left;
  let right;
  let top;

  if (position === Position.BottomLeft) {
    left = distanceFromCorner;
    top = calcPosition(windowHeight, canvasHeight);
  }
  if (position === Position.BottomRight) {
    left = calcPosition(windowWidth, canvasWidth);
    top = calcPosition(windowHeight, canvasHeight);
  }
  if (position === Position.BottomCenter) {
    left = calcPosition(windowWidth / 2, canvasWidth / 2);
    top = calcPosition(windowHeight, canvasHeight);
  }
  return (
    <div
      className="text normal"
      style={{
        borderRadius: 8,
        position: 'absolute',
        height: windowHeight,
        left,
        top,
        right,
        background:
          'linear-gradient(90deg, rgba(10,66,78,1) 0%, rgba(0,117,154,1) 100%)',
        width: windowWidth,
        color: 'white',
        padding: 10,
        border: `${borderWidth}px solid white`,
      }}
    >
      {children}
    </div>
  );
};

export default Window;
