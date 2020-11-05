import * as React from 'react';

interface WindowProps {
  position: Position;
}

export enum Position {
  BottomLeft = 0,
  BottomRight = 1,
}

const padding = 10;
const borderWidth = 1;
const windowHeight = 150;
const windowWidth = 500;

const distanceFromCorner = 5;

const Window: React.FC<WindowProps> = ({ position, children }) => {
  const canvas = document.querySelector('canvas');
  const canvasHeight = parseInt(canvas.getAttribute('height'));
  const left = distanceFromCorner;
  const top =
    canvasHeight -
    padding * 2 -
    borderWidth -
    windowHeight -
    distanceFromCorner;
  return (
    <div
      className="text normal"
      style={{
        position: 'absolute',
        height: windowHeight,
        left,
        top,
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
