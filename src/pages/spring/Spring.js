import withCanvas from '../../components/withCanvas';

function Spring({ context: ctx, width, height }) {
  const defaultY = height / 2;
  const x = width / 2;
  let y = defaultY + 400;
  let v = 0;
  let a = 0;
  const ballRadius = 20;

  const renderAuxiliary = () => {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#ddd';
    ctx.moveTo(0, defaultY);
    ctx.lineTo(width, defaultY);
    ctx.stroke();
    ctx.restore();
  };

  const render = () => {
    ctx.clearRect(0, 0, width, height);
    renderAuxiliary();

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  const update = () => {
    const delta = y - defaultY;
    // F = k * delta;
    // a = k * delta;
    a = -0.02 * delta;
    v += a;
    v *= 0.99; // friction
    y += v;
  };

  const animate = () => {
    requestAnimationFrame(animate);
    render();
    update();
  };

  animate();
}

export default withCanvas(Spring);
