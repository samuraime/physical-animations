import withCanvas from '../../components/withCanvas';

function SimpleRandom({ context: ctx, width, height }) {
  const draw = () => {};

  const update = () => {
    requestAnimationFrame(() => {

    });
  };

  update();
}

export default withCanvas(SimpleRandom);
