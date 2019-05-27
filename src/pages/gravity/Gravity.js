import withCanvas from '../../components/withCanvas';
import Vector from '../../utils/Vector';

function Gravity({ context: ctx, width, height }) {
  const center = new Vector(width / 2, height / 2);
  const sunLocation = new Vector(center.x, center.y);
  const sunMass = 1000;
  const earthMass = 1;
  const earthLocation = new Vector(0, height / 4);
  const earchVelocity = new Vector(20, 0);

  const render = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.arc(sunLocation.x, sunLocation.y, 100, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(earthLocation.x, earthLocation.y, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  };

  const resetLocation = () => {
    earthLocation.add(earchVelocity);

    // F = G * m1 * m2 / r ** 2
    const r2 = Vector.squaredDist(sunLocation, earthLocation);
    const gravityMag = 100 * earthMass * sunMass / r2;
    const gravity = Vector.sub(sunLocation, earthLocation).setMag(gravityMag);
    const earthAcceleration = gravity.div(earthMass);
    earchVelocity.add(earthAcceleration);
  };

  const update = () => {
    requestAnimationFrame(update);
    render();
    resetLocation();
  };

  update();
}

export default withCanvas(Gravity);
