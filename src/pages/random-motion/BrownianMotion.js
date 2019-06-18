import Vector from 'vector-es';
import withCanvas from '../../components/withCanvas';
import { random } from '../../utils';

function BrownianMotion({ context: ctx, width, height }) {
  const location = new Vector(width / 2, height / 2);
  const velocity = new Vector(0, 0);

  const render = () => {
    ctx.fillRect(location.x, location.y, 4, 4);
  };

  const update = () => {
    const deltaV = new Vector(random(-0.1, 0.1), random(-0.1, 0.1));
    velocity.add(deltaV);
    location.add(velocity);
    velocity.mult(0.98); // friction
  };

  const animate = () => {
    requestAnimationFrame(animate);
    render();
    update();
  };

  animate();
}

export default withCanvas(BrownianMotion);
