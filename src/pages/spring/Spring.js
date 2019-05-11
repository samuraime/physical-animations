import withCanvas from '../../components/withCanvas';

function Spring({ context: ctx, width, height }) {
  const defaultY = height / 2;
  const x = width / 2;
  let y = defaultY + 200;
  let v = 0;
  let a = 0;
  const ballRadius = 20;

  const drawAuxiliary = () => {
    const cx = width / 2;

    ctx.save();

    ctx.beginPath();
    ctx.strokeStyle = '#ddd';
    ctx.moveTo(0, defaultY);
    ctx.lineTo(width, defaultY);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#333';
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, y);
    ctx.stroke();

    ctx.restore();
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    drawAuxiliary();

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  const update = () => {
    requestAnimationFrame(() => {
      draw();

      const delta = y - defaultY;
      // F = k * delta;
      // a = k * delta;
      a = -0.005 * delta;
      v += a;
      y += v;

      update();
    });
  };

  update();
}

export default withCanvas(Spring);
