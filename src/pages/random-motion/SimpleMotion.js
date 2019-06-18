import Vector from 'vector-es';
import withCanvas from '../../components/withCanvas';
import { random } from '../../utils';

function SimpleMotion({ context: ctx, width, height }) {
  const walker = new Vector(width / 2, height / 2);

  const render = () => {
    ctx.fillRect(walker.x, walker.y, 4, 4);
  };

  const update = () => {
    walker.x += random(-5, 5);
    walker.y += random(-5, 5);
  };

  const animate = () => {
    requestAnimationFrame(animate);
    render();
    update();
  };

  animate();
}

export default withCanvas(SimpleMotion);
