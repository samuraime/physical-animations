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

  const update = () => {
    requestAnimationFrame(() => {
      render();

      // F = G * m1 * m2 / r ** 2
      const r = Vector.dist(sunLocation, earthLocation);
      const gravityMag = 100 * earthMass * sunMass / r ** 2;
      const gravity = Vector.sub(sunLocation, earthLocation).setMag(gravityMag);

      const force = gravity;
      const earthAcceleration = force.div(earthMass);
      earchVelocity.add(earthAcceleration);
      earthLocation.add(earchVelocity);

      update();
    });
  };

  update();
}

export default withCanvas(Gravity);
