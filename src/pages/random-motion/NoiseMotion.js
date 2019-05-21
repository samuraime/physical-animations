import SimplexNoise from 'simplex-noise';
import withCanvas from '../../components/withCanvas';
import Vector from '../../utils/Vector';
import { noiseMap } from '../../utils';

function NoiseMotion({ context: ctx, width, height }) {
  const location = new Vector(width / 2, height / 2);
  const simplex = new SimplexNoise(Math.random());
  let tx = 0;
  let ty = 10000;

  const draw = () => {
    ctx.fillRect(location.x, location.y, 4, 4);
  };

  const updateLocation = () => {
    location.x = noiseMap(simplex.noise2D(tx, 0), 0, width);
    location.y = noiseMap(simplex.noise2D(ty, 0), 0, height);
    tx += 0.005;
    ty += 0.005;
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

export default withCanvas(NoiseMotion);