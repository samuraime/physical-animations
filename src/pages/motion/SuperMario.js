import withCanvas from '../../components/withCanvas';
import Vector from '../../utils/Vector';

function SuperMario() {
  const mario = new Vector();
  const v = new Vector(0, 0);
  const g = 10;
  const jumpVelocity = 10;
  const moveVelocity = 2;

  const draw = () => {};

  const updateLocation = () => {
    
  };

  const update = () => {
    requestAnimationFrame(() => {

      update();
    });
  };

  update();
}

export default withCanvas(SuperMario);
