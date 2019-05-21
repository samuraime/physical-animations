import withCanvas from '../../components/withCanvas';
import Vector from '../../utils/Vector';
import { random } from '../../utils';

function NodeGarden({ context: ctx, width, height }) {
  const draw = () => {
  };

  const updateLocation = () => {
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

export default withCanvas(NodeGarden);
