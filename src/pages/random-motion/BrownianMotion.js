import withCanvas from '../../components/withCanvas';
import Vector from '../../utils/Vector';
import { random } from '../../utils';

function BrownianMotion({ context: ctx, width, height }) {
  const location = new Vector(width / 2, height / 2);
  const velocity = new Vector(0, 0);

  const draw = () => {
    ctx.fillRect(location.x, location.y, 4, 4);
  };

  const updateLocation = () => {
    const deltaV = new Vector(random(-0.1, 0.1), random(-0.1, 0.1));
    velocity.add(deltaV);
    location.add(velocity);
    velocity.mult(0.98); // friction
  };

  const update = () => {
    requestAnimationFrame(() => {
      update();
      draw();
      updateLocation();
    });
  };

  update();
}

export default withCanvas(BrownianMotion);
