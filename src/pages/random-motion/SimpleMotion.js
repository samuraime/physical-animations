import withCanvas from '../../components/withCanvas';
import Vector from '../../utils/Vector';
import { random } from '../../utils';

function SimpleMotion({ context: ctx, width, height }) {
  const walker = new Vector(width / 2, height / 2);

  const draw = () => {
    ctx.fillRect(walker.x, walker.y, 4, 4);
  };

  const updateLocation = () => {
    walker.x += random(-5, 5);
    walker.y += random(-5, 5);
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

export default withCanvas(SimpleMotion);
