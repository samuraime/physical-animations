import withCanvas from '../../components/withCanvas';
import Vector from '../../utils/Vector';

class Planet extends Vector {
  constructor({ x, y, m, v, r }) {
    super(x, y);
    this.m = m;
    this.v = v;
    this.r = r;
  }
}

function Gravity({ context: ctx, width, height }) {
  const center = new Vector(width / 2, height / 2);
  const sun = new Planet({
    x: center.x,
    y: center.y,
    m: 2000,
    v: new Vector(0, 0),
    r: 100,
  });
  const earth = new Planet({
    x: width / 2,
    y: height / 8,
    m: 1,
    v: new Vector(15, 0),
    r: 20,
  });
  const planets = [sun, earth];

  const render = () => {
    ctx.clearRect(0, 0, width, height);
    planets.forEach(({ x, y, r }) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    });
  };

  const update = () => {
    earth.add(earth.v);
    // F = G * m1 * m2 / r ** 2
    const G = 100;
    const r2 = Vector.squaredDist(sun, earth);
    const gravityMag = G * earth.m * sun.m / r2;
    const gravity = Vector.sub(sun, earth).setMag(gravityMag);
    const a = gravity.div(earth.m);
    earth.v.add(a);
  };

  const animate = () => {
    requestAnimationFrame(animate);
    render();
    update();
  };

  animate();
}

export default withCanvas(Gravity);
