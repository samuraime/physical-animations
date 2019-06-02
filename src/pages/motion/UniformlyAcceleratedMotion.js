import withCanvas from '../../components/withCanvas';

function UniformlyAcceleratedMotion({ context: ctx, width, height }) {
  const arrow = {
    x: 0,
    y: height / 2,
    v: 0,
    a: 0.5,
  };

  const render = () => {
    const size = 100;
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(arrow.x, arrow.y);
    ctx.beginPath();
    ctx.moveTo(size / 2 - size / 8, 0);
    ctx.lineTo(-size / 2 + size / 8, size / 8);
    ctx.lineTo(0, 0);
    ctx.lineTo(-size / 2 + size / 8, -size / 8);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  const update = () => {
    arrow.x += arrow.v;
    arrow.v += arrow.a;
  };

  const animate = () => {
    if (arrow.x < width) {
      requestAnimationFrame(animate);
    }
    render();
    update();
  };

  animate();
}

export default withCanvas(UniformlyAcceleratedMotion);
