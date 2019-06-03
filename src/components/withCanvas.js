import React, { useRef, useEffect, memo } from 'react';

/**
 * @param {Function} draw
 */
export default function withCanvas(draw) {
  if (typeof draw !== 'function') {
    throw new TypeError('The first argument of `withCanvas` should be a function');
  }

  function CanvasComponent(props) {
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const dpi = 2;
      const width = canvas.clientWidth * dpi;
      const height = canvas.clientHeight * dpi;
      canvas.width = width;
      canvas.height = height;

      return draw({
        canvas,
        context,
        width,
        height,
        dpi,
      });
    }, []);

    return (
      <canvas ref={canvasRef} {...props} />
    );
  }

  CanvasComponent.displayName = draw.name;

  return memo(CanvasComponent);
}
