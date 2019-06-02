import withCanvas from '../../components/withCanvas';
import Vector from '../../utils/Vector';

function Gravity({ context: ctx, width, height }) {
  const center = new Vector(width / 2, height / 2);
  const sunLocation = new Vector(center.x, center.y);
  const sunMass = 2000;
  const earthMass = 1;
  const earthLocation = new Vector(width / 2, height / 8);
  const earchVelocity = new Vector(15, 0);

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

  const update = () => {
    earthLocation.add(earchVelocity);
    // F = G * m1 * m2 / r ** 2
    const r2 = Vector.squaredDist(sunLocation, earthLocation);
    const gravityMag = 100 * earthMass * sunMass / r2;
    const gravity = Vector.sub(sunLocation, earthLocation).setMag(gravityMag);
    const earthAcceleration = gravity.div(earthMass);
    earchVelocity.add(earthAcceleration);
  };

  const animate = () => {
    requestAnimationFrame(animate);
    render();
    update();
  };

  animate();
}

export default withCanvas(Gravity);
